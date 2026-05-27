import type { GlossaryBlock } from "@/types/course";

export function GlossaryBlockRenderer({ block }: { block: GlossaryBlock }) {
  return (
    <div className="space-y-2">
      {block.heading && <h3 className="text-lg font-semibold text-slate-900">{block.heading}</h3>}
      <dl className="space-y-4">
        {(block.terms ?? []).map((term, i) => (
          <div key={i} className="border-l-2 border-slate-200 pl-4 space-y-1">
            <dt className="text-base font-semibold text-slate-900">{term.term}</dt>
            <dd className="text-sm text-slate-600 leading-relaxed">{term.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
