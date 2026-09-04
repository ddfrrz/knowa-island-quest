import { useState } from "react";
import { Fireflies, Mist } from "./atmosphere";
import { ActionButton } from "./action-button";

const IDADES = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

type Props = { onChoose: (idade: number) => void };

/** Portao da ilha: o explorador diz a idade antes de entrar. */
export function SceneIdade({ onChoose }: Props) {
  const [idade, setIdade] = useState<number | null>(null);

  return (
    <div className="vignette paper-grain relative h-full w-full overflow-hidden bg-abyss">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 45% at 50% 22%, oklch(0.72 0.19 195 / 0.4), transparent 70%), radial-gradient(60% 40% at 20% 88%, oklch(0.78 0.2 145 / 0.28), transparent 72%)",
        }}
      />
      <Mist className="inset-x-[-10%] top-[34%] h-44" />
      <Fireflies />

      <div className="relative z-20 flex h-full flex-col px-6 pb-9 pt-14">
        <p className="anim-rise text-[11px] font-bold uppercase tracking-[0.34em] text-lantern">
          Missão Mundo KNN
        </p>
        <h1
          className="anim-rise mt-3 font-display text-[42px] font-semibold leading-[0.9] tracking-tight text-parchment"
          style={{ animationDelay: "160ms", textWrap: "balance" }}
        >
          Meu mundo
          <br />
          <span className="italic text-lagoon">sem fronteiras</span>
        </h1>
        <p
          className="anim-rise mt-4 max-w-[26ch] text-[15px] leading-snug text-parchment/80"
          style={{ animationDelay: "300ms" }}
        >
          Antes de entrar em Knowa Island, diga quantos anos você tem. A ilha muda de acordo
          com cada explorador.
        </p>

        <div
          className="anim-rise mt-7 grid grid-cols-4 gap-2.5"
          style={{ animationDelay: "420ms" }}
        >
          {IDADES.map((n) => {
            const on = idade === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setIdade(n)}
                className={`grid h-[58px] place-items-center rounded-2xl border font-display text-[22px] font-semibold transition-all duration-200 active:scale-95 ${
                  on
                    ? "border-lantern bg-ember text-primary-foreground"
                    : "border-border bg-canopy/60 text-parchment/80 backdrop-blur-md"
                }`}
                style={{ boxShadow: on ? "var(--glow-lantern)" : "none" }}
              >
                {n}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-8">
          <ActionButton disabled={idade === null} onClick={() => idade && onChoose(idade)}>
            {idade === null ? "Escolha sua idade" : `Entrar com ${idade} anos`}
          </ActionButton>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
            Explorador de 5 a 8 anos entra em Meu Mundo Sem Fronteiras
          </p>
        </div>
      </div>
    </div>
  );
}
