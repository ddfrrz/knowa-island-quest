import { useEffect, useState, type ReactNode } from "react";
import jacobPng from "@/assets/char-jacob.png";

/** Jacob 2D: poses simples com transformações CSS, sem sprite sheet. */
export type Pose = "idle" | "walk" | "point" | "cheer" | "think" | "scared" | "victory";

const POSE_CLASS: Record<Pose, string> = {
  idle: "jacob-idle",
  walk: "jacob-walk",
  point: "jacob-point",
  cheer: "jacob-cheer",
  think: "jacob-think",
  scared: "jacob-scared",
  victory: "jacob-victory",
};

export function Jacob({
  pose = "idle",
  size = 116,
  flip,
}: {
  pose?: Pose;
  size?: number;
  flip?: boolean;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size }}>
      <span
        className="pointer-events-none absolute inset-x-2 bottom-0 h-3 rounded-[50%] bg-lagoon/25 blur-[6px]"
        aria-hidden
      />
      <img
        src={jacobPng}
        alt="Jacob Knowa"
        className={`relative block w-full origin-bottom select-none ${POSE_CLASS[pose]}`}
        style={{
          transform: flip ? "scaleX(-1)" : undefined,
          filter: "drop-shadow(0 10px 18px oklch(0 0 0 / 0.55))",
        }}
        draggable={false}
      />
      {pose === "point" && (
        <span
          className="anim-breathe absolute -right-1 top-1/3 size-2.5 rounded-full bg-citrus"
          style={{ boxShadow: "0 0 18px 3px oklch(0.87 0.19 118 / 0.7)" }}
          aria-hidden
        />
      )}
      {pose === "think" && (
        <span className="absolute -top-2 right-0 font-mono text-[16px] text-lagoon" aria-hidden>
          ?
        </span>
      )}
      {(pose === "cheer" || pose === "victory") && (
        <span className="anim-pop absolute -top-3 right-0 font-mono text-[15px] text-citrus" aria-hidden>
          ★
        </span>
      )}
    </div>
  );
}

/** Jacob falando: aparece, digita a fala e segue. */
export function JacobFala({
  texto,
  pose = "idle",
  children,
}: {
  texto: string;
  pose?: Pose;
  children?: ReactNode;
}) {
  const [visivel, setVisivel] = useState("");

  useEffect(() => {
    setVisivel("");
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setVisivel(texto.slice(0, i));
      if (i >= texto.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [texto]);

  return (
    <div className="flex items-end gap-2">
      <Jacob pose={pose} size={92} />
      <div className="relative mb-3 flex-1 rounded-2xl rounded-bl-sm border border-lagoon/35 bg-[oklch(0.13_0.03_240_/_0.88)] px-4 py-3 backdrop-blur-md">
        <p className="font-mono text-[13px] leading-snug text-parchment">
          {visivel}
          <span className="ml-0.5 inline-block h-[13px] w-[7px] translate-y-[2px] bg-lagoon/80" />
        </p>
        {children}
      </div>
    </div>
  );
}

/** Jacob caminhando entre pontos da trilha da missão. */
export function JacobTrilha({ ponto, total }: { ponto: number; total: number }) {
  const pct = total > 1 ? (ponto / (total - 1)) * 100 : 0;
  return (
    <div className="relative h-16 w-full">
      <div className="absolute inset-x-2 bottom-3 h-[3px] rounded-full bg-parchment/12" />
      <div
        className="absolute bottom-3 left-2 h-[3px] rounded-full bg-lagoon transition-[width] duration-700"
        style={{ width: `calc(${pct}% - 8px)`, boxShadow: "var(--glow-lagoon)" }}
      />
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`absolute bottom-[7px] size-2 -translate-x-1/2 rounded-full ${
            i <= ponto ? "bg-citrus" : "bg-parchment/25"
          }`}
          style={{ left: `calc(8px + ${total > 1 ? (i / (total - 1)) * 100 : 0}% - ${(16 * (total > 1 ? i / (total - 1) : 0)).toFixed(0)}px)` }}
        />
      ))}
      <div
        className="absolute bottom-[2px] transition-[left] duration-700 ease-out"
        style={{ left: `calc(${pct}% - 6px)` }}
      >
        <span
          className="anim-breathe block size-3.5 rounded-full border border-citrus bg-citrus"
          style={{ boxShadow: "0 0 20px 3px oklch(0.87 0.19 118 / 0.7)" }}
        />
      </div>
    </div>
  );
}
