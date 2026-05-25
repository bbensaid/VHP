import type { ComparisonTableBlock } from "@/types/course";

export function ComparisonTableRenderer({ block }: { block: ComparisonTableBlock }) {
  return (
    <div className="space-y-2">
      {block.heading && <h3 className="text-lg font-semibold text-slate-900">{block.heading}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2.5 pr-3 font-semibold text-slate-400 w-1/4" />
              <th className="text-left py-2.5 px-3 font-semibold text-slate-900 w-[37.5%]">{block.leftLabel}</th>
              <th className="text-left py-2.5 pl-3 font-semibold text-slate-900 w-[37.5%]">{block.rightLabel}</th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className={`border-b border-slate-100 ${i % 2 !== 0 ? "bg-slate-50" : ""}`}>
                <td className="py-2.5 pr-3 font-medium text-slate-500 align-top">{row.label}</td>
                <td className="py-2.5 px-3 text-slate-700 leading-relaxed align-top">{row.left}</td>
                <td className="py-2.5 pl-3 text-slate-700 leading-relaxed align-top">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
