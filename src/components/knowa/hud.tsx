type HudProps = {
  chapter: string;
  place: string;
  seals: number;
  totalSeals?: number;
};

/** Floating expedition HUD — compass rose + earned seals. No navbar, ever. */
export function Hud({ chapter, place, seals, totalSeals = 3 }: HudProps) {
  return (
    <>
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32"
      style={{
        background:
          "linear-gradient(to bottom, oklch(0.15 0.03 168 / 0.85), oklch(0.15 0.03 168 / 0.35) 55%, transparent)",
      }}
    />
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-5">
      <div className="flex items-center gap-3">
        <Compass />
        <div className="leading-none">
          <p className="font-display text-[15px] font-semibold tracking-tight text-parchment">
            {place}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {chapter}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-border bg-abyss/55 px-2.5 py-2 backdrop-blur-md">
        {Array.from({ length: totalSeals }).map((_, i) => (
          <span
            key={i}
            className={
              i < seals
                ? "size-2.5 rounded-full bg-lantern"
                : "size-2.5 rounded-full border border-parchment/30"
            }
            style={i < seals ? { boxShadow: "var(--glow-lantern)" } : undefined}
          />
        ))}
      </div>
    </div>
    </>
  );
}

function Compass() {
  return (
    <div className="relative grid size-11 shrink-0 place-items-center rounded-full border border-lantern/35 bg-abyss/55 backdrop-blur-md">
      <svg viewBox="0 0 44 44" className="size-11">
        <circle cx="22" cy="22" r="15" className="fill-none stroke-parchment/20" strokeWidth="1" />
        <g className="stroke-parchment/45" strokeWidth="1" strokeLinecap="round">
          <path d="M22 5v4M22 35v4M5 22h4M35 22h4" />
        </g>
        <path d="M22 9 L25.5 22 L22 20 Z" className="fill-coral" />
        <path d="M22 35 L18.5 22 L22 24 Z" className="fill-parchment/70" />
        <circle cx="22" cy="22" r="2" className="fill-lantern" />
      </svg>
    </div>
  );
}
