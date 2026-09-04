import { useState } from "react";
import sceneMapa from "@/assets/scene-mapa.jpg";
import { ActionButton } from "./action-button";
import { Hud } from "./hud";

type Marker = { id: string; name: string; x: number; y: number; state: "done" | "now" };

const MARKERS: Marker[] = [
  { id: "1", name: "Vale de Manawa", x: 26, y: 68, state: "done" },
  { id: "2", name: "Clareira dos Lampiões", x: 44, y: 47, state: "done" },
  { id: "3", name: "Ponte de Corda", x: 63, y: 74, state: "now" },
];

export function SceneDescoberta({ onRestart }: { onRestart: () => void }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="paper-grain relative h-full w-full overflow-hidden bg-abyss">
      <Hud chapter="Capítulo 1" place="Carta de Knowa" seals={1} />

      <div className="flex h-full flex-col px-5 pb-8 pt-24">
        {/* the map plate */}
        <div
          className="vignette relative w-full overflow-hidden rounded-[26px] border border-lantern/20"
          style={{ aspectRatio: "1 / 1", boxShadow: "var(--shadow-plate)" }}
        >
          <img
            src={sceneMapa}
            alt="Carta pintada de Knowa Island com uma região coberta por névoa"
            width={1200}
            height={1200}
            loading="lazy"
            className="anim-fade absolute inset-0 size-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.16 0.03 168 / 0.55), transparent 45%)",
            }}
          />

          {/* expedition trail */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none">
            <path
              d="M26 68 C 32 58, 38 54, 44 47 C 52 42, 56 62, 63 74"
              stroke="var(--color-coral)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="0.6 3.4"
              style={{
                strokeDasharray: "60",
                strokeDashoffset: "60",
                animation: "k-draw 2000ms cubic-bezier(0.22,1,0.36,1) 400ms forwards",
                filter: "drop-shadow(0 1px 2px oklch(0 0 0 / 0.6))",
              }}
            />
          </svg>

          {MARKERS.map((m, i) => (
            <div
              key={m.id}
              className="anim-pop absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${700 + i * 220}ms` }}
            >
              <span
                className={`grid size-7 place-items-center rounded-full border-2 font-display text-[13px] font-semibold ${
                  m.state === "done"
                    ? "border-parchment/70 bg-ember text-primary-foreground"
                    : "border-lantern bg-abyss/80 text-lantern"
                }`}
                style={{ boxShadow: "var(--shadow-lift)" }}
              >
                {m.id}
              </span>
            </div>
          ))}

          {/* the unknown region */}
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="absolute right-[4%] top-[4%] h-[46%] w-[46%] rounded-[40%_46%_52%_44%] transition-transform duration-500 active:scale-[0.98]"
            aria-label="Investigar a região desconhecida"
            style={{
              background: revealed
                ? "radial-gradient(60% 60% at 50% 50%, oklch(0.68 0.17 32 / 0.28), transparent 72%)"
                : "radial-gradient(62% 62% at 50% 50%, oklch(0.92 0.02 120 / 0.55), oklch(0.9 0.02 120 / 0.18) 72%, transparent 88%)",
              backdropFilter: revealed ? "blur(0px)" : "blur(4px)",
              transition: "background 700ms ease, backdrop-filter 700ms ease",
            }}
          >
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {revealed ? (
                <svg viewBox="0 0 60 60" className="anim-pop size-16">
                  <path
                    d="M30 8 L36 24 L53 25 L40 36 L44 52 L30 43 L16 52 L20 36 L7 25 L24 24 Z"
                    className="fill-coral stroke-parchment/80"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <span
                  className="anim-breathe grid size-11 place-items-center rounded-full border-2 border-coral bg-abyss/70 font-display text-xl font-semibold text-coral"
                  style={{ boxShadow: "var(--glow-coral)" }}
                >
                  ?
                </span>
              )}
            </span>
          </button>
        </div>

        {/* the caption */}
        <div className="mt-6 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-coral">
            {revealed ? "Território encontrado" : "Região sem nome"}
          </p>
          <h2
            className="mt-2 font-display text-[30px] font-semibold leading-[0.95] tracking-tight text-parchment"
            style={{ textWrap: "balance" }}
          >
            {revealed ? (
              <>
                A <span className="italic text-lantern">Costa Perdida</span>
              </>
            ) : (
              <>
                Alguma coisa vive
                <br />
                dentro da <span className="italic text-lantern">névoa</span>
              </>
            )}
          </h2>
          <p className="mt-3 max-w-[30ch] text-[15px] leading-snug text-parchment/75">
            {revealed
              ? "Nenhum explorador chegou lá. Jacob marcou o ponto — e a próxima missão começa nessa costa."
              : "Nem Jacob conhece esse pedaço da ilha. Toque na névoa e veja o que ela esconde."}
          </p>
        </div>

        <div className="mt-6">
          {revealed ? (
            <ActionButton tone="coral" onClick={onRestart}>
              Marcar no meu diário
            </ActionButton>
          ) : (
            <p className="text-center text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              Toque na névoa do mapa
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
