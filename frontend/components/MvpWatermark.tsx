"use client";

/**
 * MvpWatermark — diagonal repeating watermark overlay for MVP / testing phase.
 * Fixed, full-screen, pointer-events-none so it never blocks any interaction.
 * Remove this component from layout.tsx when ready for production launch.
 */
export default function MvpWatermark() {
  const text = "MVP · FOR TESTING ONLY";
  // 6 rows fill a tall viewport when rotated -35° at large font size
  const rows = Array.from({ length: 6 });

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          transform: "rotate(-35deg)",
          transformOrigin: "center center",
        }}
      >
        {rows.map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-around",
              whiteSpace: "nowrap",
            }}
          >
            {[0, 1].map((j) => (
              <span
                key={j}
                style={{
                  fontSize: "52px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "rgba(239, 68, 68, 0.12)",  // rose-500 at 12% opacity
                  textTransform: "uppercase",
                  padding: "0 80px",
                  userSelect: "none",
                }}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
