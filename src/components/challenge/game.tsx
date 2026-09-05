import { useEffect, useRef, useState } from "react";
import { ChallengeButton } from "./ui";

/* ---------- XP e níveis ---------- */

export const XP_META = 1000;

export const NIVEIS = [
  { min: 0, nome: "EXPLORADOR", n: "01" },
  { min: 250, nome: "VIAJANTE", n: "02" },
  { min: 550, nome: "WORLD PLAYER", n: "03" },
  { min: 900, nome: "KNN EXPLORER", n: "04" },
] as const;

export function nivelDe(xp: number) {
  return [...NIVEIS].reverse().find((n) => xp >= n.min) ?? NIVEIS[0];
}

export function BarraXP({ xp: bruto }: { xp: number }) {
  const xp = Math.min(XP_META, bruto);
  const nivel = nivelDe(xp);
  const pct = Math.min(100, (xp / XP_META) * 100);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-5 pt-4">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.24em]">
        <span className="text-citrus">
          Nível {nivel.n} · {nivel.nome}
        </span>
        <span className="text-parchment/60">
          XP {xp} / {XP_META}
        </span>
      </div>
      <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-parchment/12">
        <div
          className="h-full rounded-full bg-citrus transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%`, boxShadow: "0 0 20px 1px oklch(0.87 0.19 118 / 0.6)" }}
        />
      </div>
    </div>
  );
}

/** Selo de XP ganho, aparece e some. */
export function GanhouXP({ valor }: { valor: number }) {
  return (
    <p className="anim-pop text-center font-mono text-[15px] font-bold tracking-[0.2em] text-citrus">
      +{valor} XP
    </p>
  );
}

/* ---------- diário do Jacob ---------- */

export type EntradaDiario = { titulo: string; texto: string };

export function Diario({ entradas }: { entradas: EntradaDiario[] }) {
  return (
    <div className="rounded-2xl border border-lantern/30 bg-[oklch(0.13_0.03_240_/_0.75)] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-lantern">
        Jacob&apos;s Journal
      </p>
      <div className="mt-3 space-y-2.5">
        {entradas.length === 0 && (
          <p className="font-mono text-[12px] text-parchment/45">
            O diário ainda está em branco.
          </p>
        )}
        {entradas.map((e) => (
          <div key={e.titulo} className="flex gap-2.5">
            <span className="mt-[3px] font-mono text-[12px] text-citrus">✓</span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-parchment">
                {e.titulo}
              </p>
              <p className="font-mono text-[12px] leading-snug text-parchment/65">{e.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- área de desenho ---------- */

export function DrawPad({
  onDone,
  rotulo = "Terminei",
}: {
  onDone: () => void;
  rotulo?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const desenhando = useRef(false);
  const [tocou, setTocou] = useState(false);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const r = c.getBoundingClientRect();
    c.width = r.width * dpr;
    c.height = r.height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "oklch(0.96 0.035 92)";
  }, []);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    desenhando.current = true;
    setTocou(true);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!desenhando.current) return;
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function end() {
    desenhando.current = false;
  }

  function limpar() {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    setTocou(false);
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-lagoon/30 bg-[oklch(0.12_0.03_240)]">
        <canvas
          ref={ref}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="block h-[210px] w-full touch-none"
        />
        {!tocou && (
          <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.22em] text-parchment/35">
            Desenhe aqui com o dedo
          </p>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={limpar}
          className="rounded-xl border border-parchment/20 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-parchment/70"
        >
          Limpar
        </button>
        <div className="flex-1">
          <ChallengeButton onClick={onDone}>{rotulo}</ChallengeButton>
        </div>
      </div>
    </div>
  );
}
