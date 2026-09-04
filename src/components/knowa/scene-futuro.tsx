import { Fireflies } from "./atmosphere";
import { ActionButton } from "./action-button";
import { KNN } from "@/lib/knn-config";

export function SceneFuturo({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="vignette paper-grain relative h-full w-full overflow-hidden bg-abyss">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 40% at 50% 30%, oklch(0.62 0.24 300 / 0.4), transparent 72%)",
        }}
      />
      <Fireflies />

      <div className="relative z-20 flex h-full flex-col justify-center px-6 pb-10">
        <div
          className="anim-breathe mx-auto grid size-24 place-items-center rounded-full border-2 border-lagoon/60"
          style={{ boxShadow: "var(--glow-lagoon)" }}
        >
          <span className="font-display text-3xl font-semibold text-lagoon">?</span>
        </div>
        <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.34em] text-lantern">
          {KNN.experience915}
        </p>
        <h2
          className="mt-3 text-center font-display text-[32px] font-semibold leading-[0.95] tracking-tight text-parchment"
          style={{ textWrap: "balance" }}
        >
          Uma nova aventura está sendo preparada
        </h2>
        <p className="mx-auto mt-3 max-w-[28ch] text-center text-[15px] leading-snug text-parchment/75">
          Essa faixa de idade entra em outra ilha, com desafios maiores. Ela chega em breve
          no mesmo sistema.
        </p>
        <div className="mt-9">
          <ActionButton tone="quiet" onClick={onRestart}>
            Voltar ao portão da ilha
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
