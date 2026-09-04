import { useState } from "react";
import sceneMapa from "@/assets/scene-mapa.jpg";
import charJacob from "@/assets/char-jacob.png";
import charTuga from "@/assets/char-tuga.png";
import charTila from "@/assets/char-tila.png";
import charKinn from "@/assets/char-kinn.png";
import { Fireflies, Mist } from "./atmosphere";
import { ActionButton } from "./action-button";
import { Hud } from "./hud";

type Props = { onAdvance: () => void };

/** Etapa do desenho no papel: 3 momentos, uma ação principal por tela. */
export function SceneDesenho({ onAdvance }: Props) {
  const [momento, setMomento] = useState<0 | 1 | 2>(0);

  return (
    <div className="vignette paper-grain relative h-full w-full overflow-hidden bg-abyss">
      {/* fundo: um pedaço do mapa da ilha, com enquadramento diferente por momento */}
      <img
        src={sceneMapa}
        alt="Trecho do mapa de Knowa Island"
        className="absolute inset-0 size-full object-cover transition-all duration-[1400ms] ease-out"
        style={{
          objectPosition:
            momento === 0 ? "70% 30%" : momento === 1 ? "30% 60%" : "50% 45%",
          transform: `scale(${momento === 1 ? 1.35 : 1.15})`,
          filter: momento === 1 ? "saturate(0.85) brightness(0.72)" : "saturate(1.05)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 34% at 50% 40%, oklch(0.87 0.17 85 / 0.28), transparent 72%)",
        }}
      />
      <Mist className="inset-x-[-10%] top-[24%] h-44" />
      <Fireflies />

      <Hud
        chapter="Capítulo 2"
        place={
          momento === 0
            ? "Território sem nome"
            : momento === 1
              ? "Mesa do explorador"
              : "Sua descoberta"
        }
        seals={momento === 2 ? 3 : 2}
      />

      {momento === 0 && <MomentoCriar onNext={() => setMomento(1)} />}
      {momento === 1 && <MomentoDesenhar onNext={() => setMomento(2)} />}
      {momento === 2 && <MomentoPronto onNext={onAdvance} />}
    </div>
  );
}

/* ---------- 1. CRIE SUA DESCOBERTA ---------- */

function MomentoCriar({ onNext }: { onNext: () => void }) {
  return (
    <>
      {/* território vazio no mapa: um recorte que ainda não foi desenhado */}
      <div className="absolute inset-x-0 top-[19%] z-10 flex justify-center">
        <div className="relative size-52">
          <svg viewBox="0 0 200 200" className="size-full">
            <path
              d="M46 118 C34 92 52 58 84 48 C112 39 148 52 158 82 C168 112 150 152 118 160 C88 168 58 146 46 118 Z"
              fill="oklch(0.2 0.045 190 / 0.55)"
              stroke="var(--color-lantern)"
              strokeWidth="2.5"
              strokeDasharray="7 9"
              strokeLinecap="round"
              className="anim-breathe"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-5xl font-semibold text-lantern">
            ?
          </span>
        </div>
      </div>

      <img
        src={charJacob}
        alt="Jacob Knowa observando o território desconhecido"
        className="anim-float pointer-events-none absolute bottom-[31%] right-[-6%] z-10 w-40 drop-shadow-2xl"
      />

      <div className="scene-veil absolute inset-x-0 bottom-0 z-20 px-6 pb-9 pt-24">
        <p className="anim-rise text-[11px] font-bold uppercase tracking-[0.34em] text-lantern">
          Etapa 3
        </p>
        <h2
          className="anim-rise mt-3 font-display text-[38px] font-semibold leading-[0.9] tracking-tight text-parchment"
          style={{ animationDelay: "180ms", textWrap: "balance" }}
        >
          Crie sua
          <br />
          <span className="italic text-lantern">descoberta</span>
        </h2>

        <div
          className="anim-rise anim-sway relative mt-5 max-w-[20rem] origin-bottom-left rounded-[14px] border border-lantern/25 bg-abyss/70 px-4 py-3 backdrop-blur-md"
          style={{ animationDelay: "360ms", boxShadow: "var(--shadow-lift)" }}
        >
          <span className="absolute -left-1 top-4 h-8 w-1 rounded-full bg-coral" />
          <p className="text-[10px] uppercase tracking-[0.24em] text-coral">Jacob Knowa</p>
          <p className="mt-1.5 text-[16px] leading-snug text-parchment/90">
            Existe um lugar na Knowa Island que ainda não existe. Agora é você quem vai
            imaginar esse lugar.
          </p>
        </div>

        <div className="anim-rise mt-7" style={{ animationDelay: "540ms" }}>
          <ActionButton onClick={onNext}>Quero criar esse lugar</ActionButton>
        </div>
      </div>
    </>
  );
}

/* ---------- 2. AGORA É COM VOCÊ ---------- */

const IDEIAS = [
  { nome: "Praia secreta", d: "M4 16 q7 -8 14 0 t14 0" },
  { nome: "Montanha", d: "M3 18 L12 5 L18 12 L23 7 L33 18 Z" },
  { nome: "Floresta", d: "M10 18 L10 12 M10 12 L5 12 L10 4 L15 12 Z M24 18 L24 13 L19 13 L24 6 L29 13 Z" },
  { nome: "Criatura", d: "M8 14 a7 6 0 1 1 14 0 a7 6 0 1 1 -14 0 M11 12 h.1 M19 12 h.1 M25 9 l6 -4 M25 13 l6 3" },
];

function MomentoDesenhar({ onNext }: { onNext: () => void }) {
  return (
    <>
      <img
        src={charTuga}
        alt="Tuga surfando"
        className="anim-float pointer-events-none absolute left-[1%] top-[13%] z-10 w-28 drop-shadow-xl"
        style={{ animationDelay: "1.2s" }}
      />
      <img
        src={charKinn}
        alt="Kinn comemorando"
        className="anim-float pointer-events-none absolute right-[1%] top-[20%] z-10 w-28 drop-shadow-xl"
        style={{ animationDelay: "0.4s" }}
      />

      <div className="scene-veil absolute inset-x-0 bottom-0 z-20 px-6 pb-9 pt-16">
        <p className="anim-rise text-[11px] font-bold uppercase tracking-[0.34em] text-citrus">
          Agora é com você
        </p>
        <h2
          className="anim-rise mt-3 font-display text-[31px] font-semibold leading-[1] tracking-tight text-parchment"
          style={{ animationDelay: "160ms", textWrap: "balance" }}
        >
          Pegue um papel e um lápis e desenhe um lugar que ainda não existe na Knowa
          Island.
        </h2>

        <div className="anim-rise mt-6 grid grid-cols-4 gap-2" style={{ animationDelay: "320ms" }}>
          {IDEIAS.map((ideia) => (
            <div key={ideia.nome} className="text-center">
              <div className="grid h-14 place-items-center rounded-2xl border border-border bg-abyss/55 backdrop-blur-md">
                <svg viewBox="0 0 36 22" className="h-6 w-9">
                  <path
                    d={ideia.d}
                    fill="none"
                    stroke="var(--color-lagoon)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-1.5 text-[9px] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                {ideia.nome}
              </p>
            </div>
          ))}
        </div>

        <p
          className="anim-rise mt-6 text-center font-display text-[17px] font-semibold uppercase tracking-[0.14em] text-lantern"
          style={{ animationDelay: "460ms" }}
        >
          Não existe resposta errada
        </p>

        <div className="anim-rise mt-5" style={{ animationDelay: "600ms" }}>
          <ActionButton onClick={onNext}>Terminei meu desenho</ActionButton>
        </div>
      </div>
    </>
  );
}

/* ---------- 3. MINHA DESCOBERTA ---------- */

function MomentoPronto({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="absolute inset-x-0 top-[15%] z-10 flex justify-center">
        <div
          className="anim-stamp grid size-40 place-items-center rounded-full border-2 border-lantern bg-abyss/55 backdrop-blur-md"
          style={{ boxShadow: "var(--glow-lantern)" }}
        >
          <div className="grid size-32 place-items-center rounded-full border border-lantern/40">
            <p className="text-center font-display text-[15px] font-semibold leading-tight text-lantern">
              NOVO
              <br />
              TERRITÓRIO
            </p>
          </div>
        </div>
      </div>

      <img
        src={charTila}
        alt="Tila comemorando a descoberta"
        className="anim-float pointer-events-none absolute left-[2%] top-[30%] z-10 w-32 drop-shadow-xl"
      />

      <div className="scene-veil absolute inset-x-0 bottom-0 z-20 px-6 pb-9 pt-20">
        <p className="anim-rise text-[11px] font-bold uppercase tracking-[0.34em] text-citrus">
          Minha descoberta
        </p>
        <h2
          className="anim-rise mt-3 font-display text-[36px] font-semibold leading-[0.92] tracking-tight text-parchment"
          style={{ animationDelay: "160ms", textWrap: "balance" }}
        >
          Sua descoberta
          <br />
          <span className="italic text-lantern">está pronta!</span>
        </h2>

        <div
          className="anim-rise anim-sway relative mt-5 max-w-[20rem] origin-bottom-left rounded-[14px] border border-lantern/25 bg-abyss/70 px-4 py-3 backdrop-blur-md"
          style={{ animationDelay: "340ms", boxShadow: "var(--shadow-lift)" }}
        >
          <span className="absolute -left-1 top-4 h-8 w-1 rounded-full bg-coral" />
          <p className="text-[10px] uppercase tracking-[0.24em] text-coral">Jacob Knowa</p>
          <p className="mt-1.5 text-[16px] leading-snug text-parchment/90">
            Você criou um lugar que não existia em Knowa Island. Agora ele faz parte do
            mapa da nossa ilha.
          </p>
        </div>

        <div className="anim-rise mt-7" style={{ animationDelay: "520ms" }}>
          <ActionButton tone="coral" onClick={onNext}>
            Continuar para o cadastro
          </ActionButton>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
            No final o responsável envia a foto pelo WhatsApp
          </p>
        </div>
      </div>
    </>
  );
}
