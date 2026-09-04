import sceneConvocacao from "@/assets/scene-convocacao.jpg";
import { Fireflies, Mist } from "./atmosphere";
import { ActionButton } from "./action-button";
import { Hud } from "./hud";

export function SceneConvocacao({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="vignette paper-grain relative h-full w-full overflow-hidden bg-abyss">
      {/* depth plane 1 — the world */}
      <img
        src={sceneConvocacao}
        alt="Jacob Knowa afasta as folhas e descobre o vale iluminado de Knowa Island"
        width={896}
        height={1344}
        className="anim-fade absolute inset-0 size-full object-cover object-[52%_40%]"
        style={{ animationDuration: "1400ms" }}
      />

      {/* depth plane 2 — light and air */}
      <div
        className="pointer-events-none absolute inset-0 anim-breathe"
        style={{
          background:
            "radial-gradient(38% 22% at 54% 56%, oklch(0.86 0.14 82 / 0.35), transparent 70%)",
        }}
      />
      <Mist className="inset-x-[-10%] top-[26%] h-40" />
      <Fireflies />

      {/* depth plane 3 — interface */}
      <Hud chapter="Capítulo 1" place="Vale de Manawa" seals={0} />

      <div className="scene-veil absolute inset-x-0 bottom-0 z-20 px-6 pb-9 pt-24">
        <p
          className="anim-rise text-[11px] font-bold uppercase tracking-[0.34em] text-lantern"
          style={{ animationDelay: "300ms" }}
        >
          Missão Mundo KNN
        </p>

        <h1
          className="anim-rise mt-3 font-display text-[46px] font-semibold leading-[0.88] tracking-tight text-parchment"
          style={{ animationDelay: "440ms", textWrap: "balance" }}
        >
          Meu mundo
          <br />
          <span className="italic text-lantern">sem fronteiras</span>
        </h1>

        {/* Jacob speaks — a torn field-note, not a chat bubble */}
        <div
          className="anim-rise anim-sway relative mt-6 max-w-[19rem] origin-bottom-left rounded-[14px] border border-lantern/25 bg-abyss/70 px-4 py-3 backdrop-blur-md"
          style={{ animationDelay: "640ms", boxShadow: "var(--shadow-lift)" }}
        >
          <span className="absolute -left-1 top-4 h-8 w-1 rounded-full bg-coral" />
          <p className="text-[10px] uppercase tracking-[0.24em] text-coral">Jacob Knowa</p>
          <p className="mt-1.5 text-[15px] leading-snug text-parchment/90">
            Achei a entrada da ilha. Mas sozinho eu não passo — preciso de você.
          </p>
        </div>

        <div className="anim-rise mt-7" style={{ animationDelay: "820ms" }}>
          <ActionButton onClick={onAdvance}>Entrar em Knowa Island</ActionButton>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
            Toque para atravessar as folhas
          </p>
        </div>
      </div>
    </div>
  );
}
