const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Initialize the client
const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: false,
  token: 'YOUR_WRITE_TOKEN', // You need a token with write access from manage.sanity.io
  apiVersion: '2026-03-02',
});

const contentDir = path.join(__dirname, 'sanity/content');

async function bulkImport() {
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.json'));
  
  console.log(`Found ${files.length} files. Starting bulk upload...`);

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const doc = JSON.parse(rawData);

      // Ensure the document has an _id based on the filename if one isn't present
      // This ensures that re-running the script "overwrites" instead of duplicating.
      if (!doc._id) {
        doc._id = file.replace('.json', '').replace(/[^a-zA-Z0-9]/g, '-');
      }

      console.log(`Uploading: ${doc.title || file}...`);
      
      // .createOrReplace() is exactly what you asked for: 
      // It loads new ones and overwrites existing ones.
      await client.createOrReplace(doc);
      
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
  console.log('Bulk import complete.');
}

bulkImport();