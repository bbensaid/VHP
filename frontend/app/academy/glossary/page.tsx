import { client } from "@/lib/sanity";
import GlossaryClient from "./GlossaryClient";

export const metadata = {
  title: "Glossary | HTR Academy",
  description: "Searchable definitions for healthcare transformation terminology — policy, economics, clinical, technology, equity, and operations terms used across the HTR platform.",
};

export const revalidate = 3600; // re-fetch at most once per hour

type GlossaryTerm = {
  _id: string;
  term: string;
  description: string;
  pillars?: string[];
};

async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  const query = `*[_type == "definition"] | order(term asc) {
    _id,
    term,
    description,
    pillars
  }`;
  try {
    return await client.fetch(query, {}, { next: { revalidate: 3600 } });
  } catch {
    return [];
  }
}

export default async function GlossaryPage() {
  const allTerms = await getGlossaryTerms();
  return <GlossaryClient allTerms={allTerms} />;
}
