import { redirect } from "next/navigation";

// /read has no index of its own — the chapter list lives on /book. The global
// breadcrumb links every path segment, so "Home / Read / Preface" would 404
// on "Read" without this.
export default function ReadIndexPage() {
  redirect("/book#chapters");
}
