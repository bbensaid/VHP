# Printable documentation generators

Source for the three printable guides in docs/ (the .docx files are git-ignored):

- inventory.js → HTR_Infrastructure_Inventory_2026-11-14.docx (needs diagrams/)
- content_guide.js → HTR_Content_Production_Guide_2026-11-14.docx
- ops_guide.js → HTR_Ecosystem_User_Operations_Guide_2026-11-14.docx
- docstyle.js: shared layout for the two guides; diagrams.py: draws diagrams/

Run from a folder with the `docx` npm package installed:

    node content_guide.js ../HTR_Content_Production_Guide_2026-11-14.docx
    node inventory.js ../HTR_Infrastructure_Inventory_2026-11-14.docx diagrams

The scripts require "./node_modules/docx": run them from a directory where
`npm install docx` has been done, or adjust that require path.
- m4a_memo.js → HTR_Medicare_for_All_Five_Pillar_Memo_2026-11-21.docx (M4A plan Phase 2; facts from book-audit/deep/sources/m4a)
- addendum_2026-11-15.js, addendum_2026-11-20.js, addendum_2026-11-22.js → the three documentation addendums (docs/HTR_Documentation_Addendum_*.docx). The last one also takes the project root as a third argument and reads the RHT data JSON so its tables match the website.
- rht_review_report.js → HTR_RHT_Program_Review_2026-11-22.docx (printable RHT review: Vermont, the 50-state dashboard and the state award lists). Its numbers come from the website's own code: `cd frontend && npx tsx scripts/export-rht-report.mts export.json`, then `node rht_review_report.js out.docx <project root> export.json`.

Run the 22 November addendum from a folder with the docx package installed:

    node addendum_2026-11-22.js ../HTR_Documentation_Addendum_3_2026-11-22.docx /path/to/Vermont-Health-Platform

