import { useState } from "react";
import {
  EscolherGuia,
  FaseBoss,
  FaseFrase,
  FaseMapa,
  FaseMemory,
  FasePalavra,
  FasePortais,
  MissaoCompleta,
} from "./phases";
import type { EntradaDiario } from "./game";
import { Desbloqueado } from "./reward";
import { PROGRESSO_VAZIO, type Progresso } from "@/lib/knn-challenge";
import type { Cadastro, Registro } from "@/lib/knn-config";

type Etapa =
  | "guia"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "boss"
  | "completa"
  | "unlocked";

export function ChallengeFlow({
  idade,
  cadastro,
  registro,
  onRestart,
}: {
  idade: number | null;
  cadastro: Cadastro;
  registro: Registro | null;
  onRestart: () => void;
}) {
  const [etapa, setEtapa] = useState<Etapa>("guia");
  const [xp, setXp] = useState(0);
  const [diario, setDiario] = useState<EntradaDiario[]>([]);
  const [progresso, setProgresso] = useState<Progresso>(PROGRESSO_VAZIO);

  function registrar(ganho: number, entrada: EntradaDiario) {
    setXp((v) => v + ganho);
    setDiario((d) => [...d, entrada]);
  }

  return (
    <div key={etapa} className="anim-fade h-full w-full">
      {etapa === "guia" && <EscolherGuia onAdvance={() => setEtapa("f1")} />}

      {etapa === "f1" && (
        <FasePalavra
          xp={xp}
          onAdvance={(palavra, ganho) => {
            registrar(ganho, {
              titulo: "Missão 01",
              texto: `Você descobriu sua primeira palavra: ${palavra}.`,
            });
            setEtapa("f2");
          }}
        />
      )}

      {etapa === "f2" && (
        <FaseFrase
          xp={xp}
          onAdvance={(ganho) => {
            registrar(ganho, {
              titulo: "Missão 02",
              texto: "Você enviou sua primeira mensagem.",
            });
            setEtapa("f3");
          }}
        />
      )}

      {etapa === "f3" && (
        <FaseMapa
          xp={xp}
          onAdvance={(destino, ganho) => {
            setProgresso((p) => ({ ...p, destino, destinoFinal: destino.cidade }));
            registrar(ganho, {
              titulo: "Missão 03",
              texto: `Você escolheu seu destino: ${destino.cidade}.`,
            });
            setEtapa("f4");
          }}
        />
      )}

      {etapa === "f4" && (
        <FaseMemory
          xp={xp}
          onAdvance={(ganho) => {
            registrar(ganho, { titulo: "Missão 04", texto: "Você achou todos os pares." });
            setEtapa("f5");
          }}
        />
      )}

      {etapa === "f5" && (
        <FasePortais
          xp={xp}
          onAdvance={(portal, decisao, ganho) => {
            setProgresso((p) => ({ ...p, decisao, motivo: `Interesse por ${portal.toLowerCase()}` }));
            registrar(ganho, {
              titulo: "Missão 05",
              texto: `Você atravessou o portal ${portal}.`,
            });
            setEtapa("boss");
          }}
        />
      )}

      {etapa === "boss" && (
        <FaseBoss
          xp={xp}
          onAdvance={(ganho) => {
            registrar(ganho, { titulo: "World boss", texto: "Você venceu o desafio final." });
            setEtapa("completa");
          }}
        />
      )}

      {etapa === "completa" && (
        <MissaoCompleta xp={xp} entradas={diario} onAdvance={() => setEtapa("unlocked")} />
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
