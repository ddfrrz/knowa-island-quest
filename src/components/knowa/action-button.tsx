import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  tone?: "ember" | "coral" | "quiet";
  disabled?: boolean;
};

/** The one primary action of a scene. Carved-plate look, 56px+ touch target. */
export function ActionButton({ children, onClick, tone = "ember", disabled }: Props) {
  const tones = {
    ember: "bg-ember text-primary-foreground border-lantern/50",
    coral: "bg-coral text-accent-foreground border-coral/60",
    quiet: "bg-abyss/60 text-parchment border-border backdrop-blur-md",
  } as const;

  const glow = {
    ember: "var(--glow-lantern)",
    coral: "var(--glow-coral)",
    quiet: "none",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full overflow-hidden rounded-2xl border py-4 font-display text-[19px] font-semibold tracking-tight transition-transform duration-200 active:scale-[0.97] disabled:opacity-70 ${tones[tone]}`}
      style={{ boxShadow: disabled ? "none" : glow[tone] }}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && tone !== "quiet" && (
        <span
          className="absolute inset-y-0 w-1/3 opacity-30"
          style={{
            background:
              "linear-gradient(100deg, transparent, oklch(1 0 0 / 0.85), transparent)",
            animation: "k-shine 3.6s ease-in-out infinite",
          }}
        />
      )}
    </button>
  );
}
