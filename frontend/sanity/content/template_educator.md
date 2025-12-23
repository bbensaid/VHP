**ACT AS:** Lead Instructor for Health Strategy.
**TASK:** Create a Masterclass Module for the **Technology** (or Education) pillar.

**TOPIC:** [Enter Topic, e.g., "Implementing FHIR Standards"]
**TONE:** Instructional, clear, step-by-step.

**OUTPUT REQUIREMENT:**
Provide **only** a valid JSON object matching the schema below.

**SCHEMA & FORMATTING RULES:**
{
  "title": "Module: [Title]",
  "slug": { "current": "kebab-case-slug" },
  "pillar": "Technology", // Or relevant pillar
  "status": "Active", 
  "impactLevel": "High",
  "summary": "Learning objectives and scope.",
  "publishedAt": "ISO-Date-String",
  "body": [
     // 1. VIDEO PLACEHOLDER (Use Image type with video caption)
     { 
       "_type": "image", 
       "alt": "Video Thumbnail", 
       "caption": "WATCH: Lecture 1 - The Fundamentals (15:00)" 
     },

     // 2. LEARNING OBJECTIVES (Use Bullet List)
     { "_type": "block", "style": "h2", "children": [{ "_type": "span", "text": "Learning Objectives" }] },
     { "_type": "block", "style": "normal", "listItem": "bullet", "children": [{ "_type": "span", "text": "Objective 1..." }] },
     { "_type": "block", "style": "normal", "listItem": "bullet", "children": [{ "_type": "span", "text": "Objective 2..." }] },

     // 3. STEP-BY-STEP INSTRUCTION
     { "_type": "block", "style": "h2", "children": [{ "_type": "span", "text": "Step 1: [Action]" }] },
     { "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "Instructional text..." }] },
     
     // 4. PRO TIP (Use Blockquote)
     { "_type": "block", "style": "blockquote", "children": [{ "_type": "span", "text": "Pro Tip: [Insider Advice]" }] }
  ]
}