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
