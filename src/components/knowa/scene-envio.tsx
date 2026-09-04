import { useState } from "react";
import { Fireflies } from "./atmosphere";
import { ActionButton } from "./action-button";
import { Hud } from "./hud";
import {
  linkWhatsApp,
  registrarEnvioWhatsApp,
  type Cadastro,
  type Registro,
} from "@/lib/knn-config";

type Props = { cadastro: Cadastro; registro: Registro | null; onRestart: () => void };

export function SceneEnvio({ cadastro, registro, onRestart }: Props) {
  const [enviado, setEnviado] = useState(false);

  function abrirWhatsApp() {
    window.open(linkWhatsApp(cadastro), "_blank", "noopener,noreferrer");
    if (registro && !enviado) void registrarEnvioWhatsApp(registro);
    setEnviado(true);
  }


  return (
    <div className="vignette paper-grain relative h-full w-full overflow-hidden bg-abyss">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 26%, oklch(0.78 0.2 145 / 0.35), transparent 72%)",
        }}
      />
      <Fireflies />
      <Hud chapter="Missão completa" place="Posto de envio" seals={3} />

      <div className="relative z-20 flex h-full flex-col px-6 pb-10 pt-24">
        <div
          className="anim-stamp mx-auto grid size-24 place-items-center rounded-full border-2 border-lantern bg-ember/25"
          style={{ boxShadow: "var(--glow-lantern)" }}
        >
          <span className="font-display text-[13px] font-semibold uppercase tracking-widest text-lantern">
            KNN
          </span>
        </div>

        <p className="mt-7 text-center text-[11px] font-bold uppercase tracking-[0.34em] text-citrus">
          Envie sua descoberta
        </p>
        <h2
          className="mt-2 text-center font-display text-[29px] font-semibold leading-[0.95] tracking-tight text-parchment"
          style={{ textWrap: "balance" }}
        >
          Mande a foto do desenho pelo{" "}
          <span className="italic text-lagoon">WhatsApp</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[30ch] text-center text-[14px] leading-snug text-parchment/75">
          A mensagem já vem pronta com os dados da expedição. O responsável só precisa
          anexar a foto do desenho.
        </p>

        <div className="mt-6 rounded-[20px] border border-border bg-canopy/45 p-4 text-left backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.28em] text-parchment/55">
            Explorador registrado
          </p>
          <p className="mt-1 font-display text-[19px] font-semibold text-parchment">
            {cadastro.explorador || "Explorador"}
            {cadastro.idade ? `, ${cadastro.idade} anos` : ""}
          </p>
          <p className="mt-1 text-[13px] text-parchment/65">{cadastro.escola}</p>
        </div>

        <div className="mt-auto space-y-3 pt-6">
          <ActionButton tone="coral" onClick={abrirWhatsApp}>
            Abrir WhatsApp
          </ActionButton>
          {enviado && (
            <ActionButton tone="quiet" onClick={onRestart}>
              Começar outra expedição
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
