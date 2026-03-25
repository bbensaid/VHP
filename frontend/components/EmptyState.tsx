import Link from "next/link";

interface Props {
  icon?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function EmptyState({ icon = "📭", title, description, ctaLabel, ctaHref }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
      <p className="text-4xl mb-4">{icon}</p>
      <p className="text-lg font-black text-slate-700 mb-2">{title}</p>
      <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-block bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
