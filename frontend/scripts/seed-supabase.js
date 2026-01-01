const { createClient } = require("@supabase/supabase-js");
const { createClient: createSanityClient } = require("next-sanity");
const path = require("path");
const fs = require("fs");

// 1. Load Environment Variables
function loadEnv() {
  const paths = [path.resolve(__dirname, ".env.local"), path.resolve(__dirname, "../.env.local")];
  for (const p of paths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf8");
      content.split("\n").forEach((line) => {
        const [key, ...values] = line.split("=");
        if (key) process.env[key.trim()] = values.join("=").trim().replace(/^["']|["']$/g, "");
      });
      return;
    }
  }
}
loadEnv();

// 2. Initialize Clients
const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-10-01",
  useCdn: false,
});

// USE THE SERVICE ROLE KEY (Bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedSupabase() {
  console.log("🔌 Connecting with Admin Privileges...");

  // A. FETCH SANITY CONTENT
  const courses = await sanity.fetch(`*[_type == "course"]{_id, title}`);
  const reports = await sanity.fetch(`*[_type == "report"]{_id, title}`);

  if (courses.length === 0) throw new Error("No courses found in Sanity. Run seed-courses.js first.");

  // B. GET OR CREATE USER (Using Admin API)
  const email = "aris.thorne@htr.com";
  
  console.log(`👤 Checking for user: ${email}...`);
  
  // 1. Check if user exists using Admin API
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) throw new Error(`List Users Failed: ${listError.message}`);

  let user = users.find(u => u.email === email);
  let userId;

  if (user) {
    console.log("   User already exists.");
    userId = user.id;
  } else {
    console.log("   Creating new user...");
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: "password123",
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: "Dr. Aris Thorne",
        avatar_url: ""
      }
    });
    
    if (createError) throw new Error(`Create User Failed: ${createError.message}`);
    userId = newUser.user.id;
  }

  console.log(`✅ Target User ID: ${userId}`);

  // C. SEED ENROLLMENTS (Using Admin Client to Bypass RLS)
  const enrollments = courses.slice(0, 2).map(c => ({
    user_id: userId,
    sanity_course_id: c._id,
    progress: Math.floor(Math.random() * 60) + 10
  }));

  const { error: enrollError } = await supabaseAdmin
    .from('enrollments')
    .upsert(enrollments, { onConflict: 'user_id, sanity_course_id' });

  if (enrollError) {
    console.error("❌ Enrollment Error:", enrollError);
  } else {
    console.log(`✅ Successfully linked ${enrollments.length} courses to user.`);
  }

  // D. SEED SAVED REPORTS
  if (reports.length > 0) {
    const savedReports = [{
      user_id: userId,
      sanity_report_id: reports[0]._id
    }];

    const { error: reportError } = await supabaseAdmin
      .from('saved_reports')
      .upsert(savedReports, { onConflict: 'user_id, sanity_report_id' });
      
    if (reportError) console.error("❌ Report Error:", reportError);
    else console.log(`✅ Successfully linked 1 report to user.`);
  }

  console.log("🚀 Seeding Complete.");
}

seedSupabase().catch(err => console.error(err));