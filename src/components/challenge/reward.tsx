import { useState } from "react";
import { ChallengeButton, Screen, Terminal } from "./ui";
import {
  linkWhatsAppChallenge,
  type Progresso,
} from "@/lib/knn-challenge";
import {
  registrarEnvioWhatsApp,
  type Cadastro,
  type Registro,
} from "@/lib/knn-config";

/* ---------- portão da recompensa ---------- */

export function RecompensaGate({ onAdvance }: { onAdvance: () => void }) {
  return (
    <Screen glow="citrus">
      <div className="flex h-full flex-col justify-center px-6 pb-10">
        <div
          className="anim-stamp mx-auto grid size-24 place-items-center rounded-2xl border border-citrus/60 bg-citrus/10"
          style={{ boxShadow: "0 0 40px -6px oklch(0.87 0.19 118 / 0.6)" }}
        >
          <span className="font-mono text-[12px] font-bold tracking-[0.2em] text-citrus">
            KNN
          </span>
        </div>
        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-citrus">
          Your final reward is ready
        </p>
        <h2 className="mt-3 text-center font-mono text-[26px] font-bold uppercase leading-[1] tracking-tight text-parchment">
          Falta um passo
          <br />
          para desbloquear
        </h2>
        <p className="mx-auto mt-4 max-w-[30ch] text-center font-mono text-[13px] leading-snug text-parchment/70">
          Para liberar sua experiência KNN, chame um responsável para confirmar o registro.
        </p>
        <div className="mt-8">
          <ChallengeButton onClick={onAdvance}>Chamar responsável</ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- desbloqueado + WhatsApp ---------- */

export function Desbloqueado({
  cadastro,
  progresso,
  registro,
  onRestart,
}: {
  cadastro: Cadastro;
  progresso: Progresso;
  registro: Registro | null;
  onRestart: () => void;
}) {
  const [aberto, setAberto] = useState(false);

  function abrirWhatsApp() {
    window.open(linkWhatsAppChallenge(cadastro, progresso), "_blank", "noopener,noreferrer");
    if (registro && !aberto) {
      void registrarEnvioWhatsApp({
        ...registro,
        missao_atual: "world_boss",
        status_missao: "completa",
        interesse: progresso.destinoFinal || progresso.destino?.cidade || "",
        experiencia_knn: progresso.destino
          ? `${progresso.destino.cidade} (${progresso.destino.traco})`
          : "",
        destino_escolhido: progresso.destino?.cidade || "",
        destino_final: progresso.destinoFinal,
        motivo_destino: progresso.motivo,
        decisao_missao: progresso.decisao,
      });
    }
    setAberto(true);
  }

  return (
    <Screen glow="citrus">
      <div className="flex h-full flex-col justify-center px-6 pb-10">
        <p className="anim-stamp font-mono text-[13px] uppercase tracking-[0.34em] text-citrus">
          ★ Unlocked
        </p>
        <h2 className="anim-rise mt-3 font-mono text-[28px] font-bold uppercase leading-[1] tracking-tight text-parchment">
          Experiência KNN
          <br />
          liberada
        </h2>

        <div className="anim-rise mt-6" style={{ animationDelay: "160ms" }}>
          <Terminal>
            <p className="text-[10px] uppercase tracking-[0.26em] text-parchment/45">agente</p>
            <p className="mt-1 text-[16px] font-bold text-parchment">
              {cadastro.explorador || "Agente"}
              {cadastro.idade ? `, ${cadastro.idade} anos` : ""}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.26em] text-parchment/45">
              destino final
            </p>
            <p className="mt-1 text-[15px] text-lagoon">{progresso.destinoFinal}</p>
          </Terminal>
        </div>

        <div className="mt-auto space-y-3 pt-8">
          <ChallengeButton tone="alert" onClick={abrirWhatsApp}>
            Falar no WhatsApp
          </ChallengeButton>
          {aberto && (
            <ChallengeButton tone="ghost" onClick={onRestart}>
              Iniciar outra missão
            </ChallengeButton>
          )}
        </div>
      </div>
    </Screen>
  );
}
