const FIREFLIES = [
  { left: "12%", bottom: "18%", delay: "0s", dur: "7s", size: 4 },
  { left: "28%", bottom: "34%", delay: "1.8s", dur: "9s", size: 3 },
  { left: "47%", bottom: "12%", delay: "3.2s", dur: "8s", size: 5 },
  { left: "63%", bottom: "40%", delay: "0.9s", dur: "10s", size: 3 },
  { left: "78%", bottom: "24%", delay: "2.6s", dur: "7.5s", size: 4 },
  { left: "88%", bottom: "48%", delay: "4.4s", dur: "9.5s", size: 3 },
];

/** Drifting lantern-flies. Pure atmosphere: no interaction, no layout cost. */
export function Fireflies({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-lantern"
          style={{
            left: f.left,
            bottom: f.bottom,
            width: f.size,
            height: f.size,
            boxShadow: "var(--glow-lantern)",
            animation: `k-firefly ${f.dur} ease-in-out ${f.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Slow drifting mist band used to separate depth planes. */
export function Mist({ className = "" }: { className?: string }) {
  return (
    <div
      className={`anim-mist pointer-events-none absolute ${className}`}
      style={{
        background:
          "radial-gradient(60% 50% at 50% 50%, oklch(0.9 0.02 150 / 0.28), transparent 70%)",
      }}
    />
  );
}
