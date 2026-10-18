import CompareClient from "./CompareClient";

export const metadata = {
  title: "Compare States | HTR",
  description: "Compare up to four states side by side on sourced coverage, access, hospital and federal-program indicators.",
};

export default function ComparePage() {
  return <CompareClient />;
}
