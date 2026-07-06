import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Service | HTR",
  description:
    "Terms of service governing use of the Health Transformation Review platform, including subscriber access, content licensing, and acceptable use.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Health
        Transformation Review platform, websites, applications, content, and services (collectively,
        the &ldquo;Service&rdquo;), operated by HTR Health, LLC (&ldquo;HTR,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By creating an account or using the Service, you
        agree to these Terms. If you do not agree, do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old and able to form a binding contract. By using the Service
        you represent that you meet these requirements.
      </p>

      <h2>2. Accounts</h2>
      <p>
        You are responsible for the accuracy of your account information (including name, email,
        organization, profession, and role), for safeguarding your credentials, and for all activity
        under your account. Notify us promptly of any unauthorized use.
      </p>

      <h2>3. The Service</h2>
      <p>
        HTR provides educational content, analysis, an online Academy with courses and
        certifications, AI-assisted tools, data dashboards, and related materials concerning U.S.
        healthcare policy and transformation. The Service is provided for professional education and
        informational purposes only.
      </p>

      <h2>4. Not Professional Advice</h2>
      <p>
        The Service does not provide medical, clinical, legal, financial, tax, or other professional
        advice and is not a substitute for advice from a qualified professional. See our{" "}
        <Link href="/disclaimer">Disclaimer</Link>. You are solely responsible for decisions you
        make based on the Service.
      </p>

      <h2>5. Subscriptions and Payment</h2>
      <p>
        Certain features require a paid subscription (Student, Subscriber, Professional, or Team).
        Fees, billing intervals, and renewal terms are described at checkout and in our{" "}
        <Link href="/billing-policy">Subscription, Billing &amp; Refund Policy</Link>, which is
        incorporated by reference. Payments are processed by Stripe; we do not store full
        payment-card numbers.
      </p>

      <h2>6. License to You</h2>
      <p>
        Subject to these Terms and your subscription, HTR grants you a limited, non-exclusive,
        non-transferable, revocable license to access and use the Service and its content for your
        own professional and educational use.
      </p>

      <h2>7. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>copy, scrape, resell, or redistribute paid content except as expressly permitted;</li>
        <li>share account access in violation of your subscription;</li>
        <li>reverse-engineer or disrupt the Service;</li>
        <li>misuse AI features to generate unlawful, infringing, or harmful content;</li>
        <li>upload unlawful content or violate others&rsquo; rights; or</li>
        <li>
          use the Service to provide clinical care to patients in reliance on it as a medical device.
        </li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <p>
        The Service, including the book <em>Transforming American Healthcare</em>, the HTR Academy
        courses, software, text, graphics, and the &ldquo;HTR&rdquo; and &ldquo;Health
        Transformation Review&rdquo; marks, is owned by HTR or its licensors and protected by law.
        Except for content expressly offered under an open license, all rights are reserved.
      </p>

      <h2>9. AI Features</h2>
      <p>
        The Service includes AI-assisted features (the &ldquo;AI Analyst&rdquo; and related tools)
        powered by third-party models. AI output may be inaccurate, incomplete, or outdated, and must
        be independently verified. AI output does not constitute professional advice.
      </p>

      <h2>10. User Content</h2>
      <p>
        You retain ownership of content you submit (e.g., notes, saved items). You grant HTR a
        license to host and process it to operate the Service.
      </p>

      <h2>11. Third-Party Services</h2>
      <p>
        The Service integrates third-party providers (e.g., Supabase, Stripe, Sanity, Sentry, and AI
        model providers). Their services are governed by their own terms.
      </p>

      <h2>12. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES
        OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
        ACCURACY, AND NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.
      </p>

      <h2>13. Limitation of Liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, HTR WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS OR DATA. HTR&rsquo;S TOTAL
        LIABILITY FOR ANY CLAIM WILL NOT EXCEED THE AMOUNTS YOU PAID TO HTR IN THE TWELVE (12) MONTHS
        BEFORE THE CLAIM.
      </p>

      <h2>14. Indemnification</h2>
      <p>
        You agree to indemnify and hold HTR harmless from claims arising out of your misuse of the
        Service or violation of these Terms.
      </p>

      <h2>15. Termination</h2>
      <p>
        We may suspend or terminate your access for violation of these Terms. You may cancel at any
        time as described in the Billing Policy.
      </p>

      <h2>16. Changes</h2>
      <p>
        We may update these Terms; material changes will be posted with a new &ldquo;Last
        updated&rdquo; date and, where required, notice to you.
      </p>

      <h2>17. Governing Law; Disputes</h2>
      <p>
        These Terms are governed by the laws of the State of California, without regard to
        conflict-of-laws rules. Venue lies in the state and federal courts located in California.
      </p>

      <h2>18. Contact</h2>
      <p>
        Questions about these Terms?{" "}
        <a href="mailto:hello@htr.com" className="text-brand-policy hover:underline">
          hello@htr.com
        </a>
        .
      </p>
    </LegalPage>
  );
}
