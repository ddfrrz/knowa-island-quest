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

          {/* expedition trail — hand-dotted, drawn in with a mask */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none">
            <defs>
              <mask id="trail-reveal">
                <path
                  d="M26 68 C 32 58, 38 54, 44 47 C 52 42, 56 62, 63 74"
                  stroke="#fff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={100}
                  style={{
                    strokeDasharray: "100",
                    strokeDashoffset: "100",
                    animation: "k-draw 1800ms cubic-bezier(0.22,1,0.36,1) 400ms forwards",
                  }}
                />
              </mask>
            </defs>
            <path
              d="M26 68 C 32 58, 38 54, 44 47 C 52 42, 56 62, 63 74"
              stroke="var(--color-parchment)"
              strokeOpacity="0.9"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="0.4 3.2"
              mask="url(#trail-reveal)"
              style={{ filter: "drop-shadow(0 1px 2px oklch(0 0 0 / 0.75))" }}
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
            <span className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              {revealed ? (
                <>
                  <svg viewBox="0 0 48 48" className="anim-pop size-10">
                    <circle
                      cx="24"
                      cy="24"
                      r="21"
                      className="fill-none stroke-coral"
                      strokeWidth="1.5"
                      strokeDasharray="2 4"
                    />
                    <path
                      d="M24 11 L27.4 20.6 L37 21 L29.4 27 L32 36.4 L24 30.9 L16 36.4 L18.6 27 L11 21 L20.6 20.6 Z"
                      className="fill-coral stroke-parchment/85"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <span
                    className="anim-pop mt-1.5 rounded-full border border-coral/60 bg-abyss/85 px-2 py-0.5 font-display text-[10px] font-semibold tracking-wide text-parchment"
                    style={{ animationDelay: "220ms" }}
                  >
                    Costa Perdida
                  </span>
                </>
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
        <div className="mt-5 flex flex-1 flex-col">
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
          <p className="mt-2.5 max-w-[30ch] text-[15px] leading-snug text-parchment/75">
            {revealed
              ? "Nenhum explorador chegou lá. Jacob marcou o ponto — e a próxima missão começa nessa costa."
              : "Nem Jacob conhece esse pedaço da ilha. Toque na névoa e veja o que ela esconde."}
          </p>

          <div className="mt-auto flex items-center gap-3 pt-4">
            <span className="ink-rule h-px flex-1 opacity-40" />
            <span className="font-display text-[11px] tracking-[0.2em] text-muted-foreground">
              {revealed ? "12° 04' S · 71° 18' O" : "Setor 4 · não cartografado"}
            </span>
            <span className="ink-rule h-px flex-1 opacity-40" />
          </div>
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
