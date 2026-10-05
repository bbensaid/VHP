import { Fragment } from "react";

/**
 * Renders briefing text with {source-id} markers as numbered superscript links.
 * Consecutive markers collapse into one superscript ("1,3").
 */
export default function CitedText({
  text,
  numbers,
  hrefFor,
  supClassName = "",
}: {
  text: string;
  /** source id → citation number within this briefing */
  numbers: Record<string, number>;
  hrefFor: (n: number) => string;
  supClassName?: string;
}) {
  const parts = text.split(/((?:\{[a-z0-9-]+\})+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith("{")) return <Fragment key={i}>{part}</Fragment>;
        const ns = [...part.matchAll(/\{([a-z0-9-]+)\}/g)].map((m) => numbers[m[1]]).filter(Boolean);
        return <Cite key={i} ns={ns} hrefFor={hrefFor} className={supClassName} />;
      })}
    </>
  );
}

export function Cite({ ns, hrefFor, className = "" }: { ns: number[]; hrefFor: (n: number) => string; className?: string }) {
  return (
    <sup className={`ml-px text-[0.62em] font-bold leading-none ${className}`}>
      {[...new Set(ns)].sort((x, y) => x - y).map((n, j) => (
        <Fragment key={n}>
          {j > 0 && ","}
          <a href={hrefFor(n)} className="no-underline hover:underline" aria-label={`Source ${n}`}>
            {n}
          </a>
        </Fragment>
      ))}
    </sup>
  );
}
