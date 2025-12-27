"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input"; // <--- The Plugin
import { schemaTypes } from "./sanity/schemaTypes"; // Adjust this path if your schemas are elsewhere

export default defineConfig({
  basePath: "/studio", // <--- CRITICAL: Tells Sanity it lives at /studio
  name: "default",
  title: "Vermont Health Platform",
  projectId: "opa7sol7", // From your logs
  dataset: "production",

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
});
