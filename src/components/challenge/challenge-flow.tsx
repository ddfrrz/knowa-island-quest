import { useState } from "react";
import {
  DestinoConfirmado,
  MissaoDecisao,
  MissaoDestino,
  MissaoDispositivo,
  MissaoFinal,
  MissaoMensagem,
  MissaoProblema,
  Transmissao,
} from "./missions";
import { CadastroChallenge, Desbloqueado, RecompensaGate } from "./reward";
import { PROGRESSO_VAZIO, type Progresso } from "@/lib/knn-challenge";
import { CADASTRO_VAZIO, type Cadastro, type Registro } from "@/lib/knn-config";

type Etapa =
  | "transmissao"
  | "m1"
  | "m2"
  | "m3"
  | "m4"
  | "m5"
  | "m6"
  | "confirmado"
  | "recompensa"
  | "cadastro"
  | "unlocked";

export function ChallengeFlow({
  idade,
  onRestart,
}: {
  idade: number | null;
  onRestart: () => void;
}) {
  const [etapa, setEtapa] = useState<Etapa>("transmissao");
  const [progresso, setProgresso] = useState<Progresso>(PROGRESSO_VAZIO);
  const [cadastro, setCadastro] = useState<Cadastro>({ ...CADASTRO_VAZIO, idade });
  const [registro, setRegistro] = useState<Registro | null>(null);

  return (
    <div key={etapa} className="anim-fade h-full w-full">
      {etapa === "transmissao" && <Transmissao onAdvance={() => setEtapa("m1")} />}
      {etapa === "m1" && <MissaoMensagem onAdvance={() => setEtapa("m2")} />}
      {etapa === "m2" && <MissaoDispositivo onAdvance={() => setEtapa("m3")} />}
      {etapa === "m3" && (
        <MissaoDestino
          onAdvance={(destino) => {
            setProgresso((p) => ({ ...p, destino }));
            setEtapa("m4");
          }}
        />
      )}
      {etapa === "m4" && <MissaoProblema onAdvance={() => setEtapa("m5")} />}
      {etapa === "m5" && (
        <MissaoDecisao
          onAdvance={(decisao) => {
            setProgresso((p) => ({ ...p, decisao }));
            setEtapa("m6");
          }}
        />
      )}
      {etapa === "m6" && (
        <MissaoFinal
          onAdvance={(destinoFinal, motivo) => {
            setProgresso((p) => ({ ...p, destinoFinal, motivo }));
            setEtapa("confirmado");
          }}
        />
      )}
      {etapa === "confirmado" && (
        <DestinoConfirmado
          destino={progresso.destino}
          destinoFinal={progresso.destinoFinal}
          onAdvance={() => setEtapa("recompensa")}
        />
      )}
      {etapa === "recompensa" && <RecompensaGate onAdvance={() => setEtapa("cadastro")} />}
      {etapa === "cadastro" && (
        <CadastroChallenge
          idade={idade}
          progresso={progresso}
          onSubmit={(c, r) => {
            setCadastro(c);
            setRegistro(r);
            setEtapa("unlocked");
          }}
        />
      )}
      {etapa === "unlocked" && (
        <Desbloqueado
          cadastro={cadastro}
          progresso={progresso}
          registro={registro}
          onRestart={onRestart}
        />
      )}
    </div>
  );
}
