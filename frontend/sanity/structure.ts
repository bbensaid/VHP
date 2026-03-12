import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("HTR Content")
    .items([
      // ── Editorial ──────────────────────────────────────────────────────────
      S.listItem()
        .title("Editorial")
        .child(
          S.list()
            .title("Editorial")
            .items([
              S.documentTypeListItem("post").title("Articles"),
              S.documentTypeListItem("policyAnalysis").title("Policy Analyses"),
              S.documentTypeListItem("caseStudy").title("Case Studies"),
              S.documentTypeListItem("analystNote").title("Analyst Notes"),
              S.documentTypeListItem("report").title("Reports"),
            ])
        ),

      S.divider(),

      // ── Academy ────────────────────────────────────────────────────────────
      S.listItem()
        .title("Academy")
        .child(
          S.list()
            .title("Academy")
            .items([
              S.documentTypeListItem("academyModule").title("Modules"),
              S.documentTypeListItem("course").title("Courses"),
              S.documentTypeListItem("webinar").title("Webinars"),
              S.documentTypeListItem("instructor").title("Instructors"),
            ])
        ),

      S.divider(),

      // ── Data & Intelligence ────────────────────────────────────────────────
      S.listItem()
        .title("Data & Intelligence")
        .child(
          S.list()
            .title("Data & Intelligence")
            .items([
              S.documentTypeListItem("dailyInsight").title("Daily Insights"),
              S.documentTypeListItem("ticker").title("Ticker"),
              S.documentTypeListItem("definition").title("Glossary"),
              S.documentTypeListItem("hospital").title("Hospitals"),
              S.documentTypeListItem("rhtState").title("State Profiles"),
            ])
        ),

      S.divider(),

      // ── People & Taxonomy ──────────────────────────────────────────────────
      S.listItem()
        .title("People & Taxonomy")
        .child(
          S.list()
            .title("People & Taxonomy")
            .items([
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("subscriber").title("Subscribers"),
            ])
        ),

      S.divider(),

      // ── Media ──────────────────────────────────────────────────────────────
      S.documentTypeListItem("audio").title("Audio"),
    ]);
