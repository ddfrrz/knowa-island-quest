import { useState } from "react";
import sceneDesafio from "@/assets/scene-desafio.jpg";
import { Fireflies, Mist } from "./atmosphere";
import { ActionButton } from "./action-button";
import { Hud } from "./hud";

const LETTERS = ["H", "E", "L", "L", "O"] as const;

export function SceneDesafio({ onAdvance }: { onAdvance: () => void }) {
  const [lit, setLit] = useState(0);
  const [shake, setShake] = useState(false);
  const done = lit === LETTERS.length;

  function tap(index: number) {
    if (done) return;
    if (index === lit) {
      setLit(index + 1);
    } else {
      setShake(true);
      window.setTimeout(() => setShake(false), 380);
    }
  }

  return (
    <div className="vignette paper-grain relative h-full w-full overflow-hidden bg-abyss">
      <img
        src={sceneDesafio}
        alt="Rhino observa a criança entre as samambaias iluminadas por lampiões"
        width={896}
        height={1344}
        loading="lazy"
        className="anim-fade absolute inset-0 size-full object-cover object-[46%_38%]"
        style={{ animationDuration: "1200ms" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 26% at 34% 52%, oklch(0.86 0.14 82 / 0.28), transparent 72%)",
        }}
      />
      <Mist className="inset-x-[-10%] top-[30%] h-36" />
      <Fireflies />

      <Hud chapter="Capítulo 1" place="Clareira dos Lampiões" seals={done ? 1 : 0} />

      {/* Rhino's word, floating in the scene as a carved sign */}
      <div className="absolute inset-x-0 top-[21%] z-20 flex justify-center px-6">
        <div
          className="anim-pop anim-sway rounded-[16px] border border-lantern/30 bg-abyss/60 px-5 py-3 backdrop-blur-md"
          style={{ animationDelay: "500ms", boxShadow: "var(--shadow-lift)" }}
        >
          <p className="text-center text-[10px] uppercase tracking-[0.26em] text-coral">Rhino</p>
          <p className="mt-1 text-center text-[15px] leading-snug text-parchment/90">
            {done ? "Ele entendeu! Rhino abriu a trilha." : "Ele espera uma palavra amiga."}
          </p>
        </div>
      </div>

      <div className="scene-veil absolute inset-x-0 bottom-0 z-20 px-6 pb-9 pt-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-lantern">
          Desafio 01
        </p>
        <h2
          className="mt-2 font-display text-[30px] font-semibold leading-[0.95] tracking-tight text-parchment"
          style={{ textWrap: "balance" }}
        >
          Diga <span className="italic text-lantern">hello</span> para Rhino
        </h2>

        {/* the interaction: stone tiles, tapped in order */}
        <div
          className="mt-6 flex justify-between gap-2"
          style={shake ? { animation: "k-sway 380ms ease-in-out 2" } : undefined}
        >
          {LETTERS.map((letter, i) => {
            const on = i < lit;
            const next = i === lit && !done;
            return (
              <button
                key={i}
                type="button"
                onClick={() => tap(i)}
                aria-label={`Letra ${letter}`}
                className={`relative grid h-[62px] flex-1 place-items-center rounded-2xl border font-display text-2xl font-semibold transition-all duration-300 active:scale-95 ${
                  on
                    ? "border-lantern/70 bg-ember text-primary-foreground"
                    : "border-border bg-abyss/60 text-parchment/60 backdrop-blur-md"
                }`}
                style={{
                  boxShadow: on ? "var(--glow-lantern)" : "none",
                  transform: on ? "translateY(-4px)" : undefined,
                }}
              >
                {letter}
                {next && (
                  <span className="anim-breathe absolute inset-0 rounded-2xl border-2 border-lantern" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {done ? (
            <div className="flex items-center gap-4">
              <div
                className="anim-stamp grid size-14 shrink-0 place-items-center rounded-full border-2 border-lantern bg-ember/25"
                style={{ boxShadow: "var(--glow-lantern)" }}
              >
                <span className="font-display text-lg font-semibold text-lantern">I</span>
              </div>
              <div className="flex-1">
                <ActionButton tone="coral" onClick={onAdvance}>
                  Seguir a trilha
                </ActionButton>
              </div>
            </div>
          ) : (
            <p className="text-center text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              Toque nas pedras na ordem certa
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
