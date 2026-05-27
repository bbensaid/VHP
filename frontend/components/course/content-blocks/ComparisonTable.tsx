import type { ComparisonTableBlock } from "@/types/course";

export function ComparisonTableRenderer({ block }: { block: ComparisonTableBlock }) {
  return (
    <div className="my-10 overflow-hidden rounded-xl shadow-md border border-slate-200">
      {block.heading && (
        <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 text-center">
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{block.heading}</span>
        </div>
      )}
      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-slate-50 px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-left w-1/4 border-b-2 border-slate-200">
                Dimension
              </th>
              <th className="bg-rose-500 px-5 py-4 text-[10px] font-black text-white uppercase tracking-widest text-center border-b-2 border-rose-600 w-[37.5%]">
                ✗ {block.leftLabel}
              </th>
              <th className="bg-emerald-600 px-5 py-4 text-[10px] font-black text-white uppercase tracking-widest text-center border-b-2 border-emerald-700 w-[37.5%]">
                ✓ {block.rightLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {(block.rows ?? []).map((row, i) => (
              <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                <td className="px-5 py-4 font-bold text-slate-700 text-xs uppercase tracking-wide">{row.label}</td>
                <td className="px-5 py-4 text-slate-600 text-center bg-rose-50/30">{row.left}</td>
                <td className="px-5 py-4 text-slate-700 font-medium text-center bg-emerald-50/30">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
