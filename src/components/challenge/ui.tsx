import type { ReactNode } from "react";

/** Chrome compartilhado do KNN World Challenge: terminal de campo, não storybook. */

export function Screen({
  children,
  glow = "lagoon",
}: {
  children: ReactNode;
  glow?: "lagoon" | "grape" | "coral" | "citrus";
}) {
  const glows = {
    lagoon: "oklch(0.78 0.16 197 / 0.28)",
    grape: "oklch(0.6 0.22 305 / 0.32)",
    coral: "oklch(0.68 0.22 28 / 0.28)",
    citrus: "oklch(0.87 0.19 118 / 0.24)",
  } as const;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.16_0.03_240)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(75% 45% at 50% 12%, ${glows[glow]}, transparent 72%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.78 0.16 197 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.16 197 / 0.5) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(80% 70% at 50% 40%, black, transparent 85%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, oklch(1 0 0 / 0.7) 0 1px, transparent 1px 4px)",
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export function MissionBar({ code, label, step }: { code: string; label: string; step: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-5 pt-5">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
        <span>{code}</span>
        <span className="text-parchment/45">KNN WORLD CHALLENGE</span>
      </div>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-parchment/70">
        {label}
      </p>
      <div className="mt-3 flex gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={`h-[3px] flex-1 rounded-full ${
              i < step ? "bg-lagoon" : "bg-parchment/15"
            }`}
            style={i === step - 1 ? { boxShadow: "var(--glow-lagoon)" } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function ChallengeButton({
  children,
  onClick,
  disabled,
  tone = "signal",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "signal" | "ghost" | "alert";
}) {
  const tones = {
    signal: "bg-lagoon text-[oklch(0.16_0.03_240)] border-lagoon",
    alert: "bg-coral text-accent-foreground border-coral",
    ghost: "bg-transparent text-parchment border-parchment/25",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl border py-4 font-mono text-[13px] font-bold uppercase tracking-[0.18em] transition-transform duration-150 active:scale-[0.98] disabled:opacity-40 ${tones[tone]}`}
      style={
        disabled || tone === "ghost"
          ? undefined
          : { boxShadow: tone === "alert" ? "var(--glow-coral)" : "var(--glow-lagoon)" }
      }
    >
      {children}
    </button>
  );
}

export function Terminal({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-lagoon/30 bg-[oklch(0.13_0.03_240_/_0.8)] p-4 font-mono text-[13px] leading-relaxed text-lagoon backdrop-blur-md">
      {children}
    </div>
  );
}

/** Mapa-múndi vetorial simplificado do painel de missões. */
export function WorldMap({
  markers,
  activeId,
  onSelect,
}: {
  markers: { id: string; x: number; y: number; label: string }[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-lagoon/25 bg-[oklch(0.12_0.03_240)]">
      <svg viewBox="0 0 100 56" className="absolute inset-0 size-full">
        <defs>
          <pattern id="wc-dots" width="1.6" height="1.6" patternUnits="userSpaceOnUse">
            <circle cx="0.8" cy="0.8" r="0.32" fill="oklch(0.78 0.16 197 / 0.5)" />
          </pattern>
          <clipPath id="wc-land">
            <path d="M8 16 L22 11 L33 15 L30 24 L24 27 L20 36 L15 33 L12 24 Z" />
            <path d="M25 34 L31 33 L34 42 L29 52 L25 47 Z" />
            <path d="M44 12 L54 9 L60 14 L57 20 L48 22 L44 18 Z" />
            <path d="M46 24 L57 21 L64 26 L61 36 L52 40 L47 32 Z" />
            <path d="M62 12 L82 9 L92 18 L84 28 L72 26 L64 20 Z" />
            <path d="M80 38 L92 36 L94 46 L84 48 Z" />
          </clipPath>
        </defs>
        <rect width="100" height="56" fill="url(#wc-dots)" clipPath="url(#wc-land)" />
        <g className="stroke-lagoon/20" strokeWidth="0.2">
          <path d="M0 14h100M0 28h100M0 42h100M20 0v56M50 0v56M80 0v56" />
        </g>
      </svg>

      {markers.map((m) => {
        const on = m.id === activeId;
        return (
          <button
            key={m.id}
            type="button"
            onClick={onSelect ? () => onSelect(m.id) : undefined}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            aria-label={m.label}
          >
            <span
              className={`block size-3 rounded-full border ${
                on ? "border-citrus bg-citrus" : "border-lagoon bg-lagoon/40"
              }`}
              style={{ boxShadow: on ? "0 0 22px 2px oklch(0.87 0.19 118 / 0.7)" : undefined }}
            />
          </button>
        );
      })}
    </div>
  );
}
