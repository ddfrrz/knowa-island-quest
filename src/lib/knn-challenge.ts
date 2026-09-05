/** Dados e registro do fluxo 9 a 15 anos: KNN World Challenge. */
import { KNN, lerOrigem, type Cadastro, type Registro } from "./knn-config";

export type Destino = {
  id: string;
  cidade: string;
  pais: string;
  traco: string;
  x: number;
  y: number;
};

export const DESTINOS: Destino[] = [
  { id: "nyc", cidade: "NEW YORK", pais: "USA", traco: "Tecnologia / velocidade", x: 26, y: 40 },
  { id: "toronto", cidade: "TORONTO", pais: "CANADA", traco: "Diversidade / conexão", x: 24, y: 33 },
  { id: "london", cidade: "LONDON", pais: "UK", traco: "Cultura / história", x: 47, y: 32 },
  { id: "paris", cidade: "PARIS", pais: "FRANCE", traco: "Arte / cultura", x: 49, y: 36 },
  { id: "berlin", cidade: "BERLIN", pais: "GERMANY", traco: "Criatividade / inovação", x: 53, y: 33 },
  { id: "sydney", cidade: "SYDNEY", pais: "AUSTRALIA", traco: "Natureza / aventura", x: 86, y: 76 },
];

export type Progresso = {
  destino: Destino | null;
  decisao: string;
  destinoFinal: string;
  motivo: string;
};

export const PROGRESSO_VAZIO: Progresso = {
  destino: null,
  decisao: "",
  destinoFinal: "",
  motivo: "",
};

export function montarRegistroChallenge(c: Cadastro, p: Progresso): Registro {
  const origem = lerOrigem();
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `WCH-${Date.now()}`,
    data: new Date().toISOString(),
    campanha: KNN.campaign,
    faixa_etaria: "9-15",
    experiencia: KNN.experience915,
    idade: c.idade,
    escola: c.escola || origem.escola,
    explorador: c.explorador,
    responsavel: c.responsavel,
    whatsapp: c.whatsapp,
    email: c.email,
    missao_atual: "world_boss",
    status_missao: "completa",
    recompensa: "Experiencia KNN World Challenge",
    whatsapp_utilizado: "nao",
    desenho_enviado: "nao_se_aplica",
    consentimento_participacao: c.participacao ? "sim" : "nao",
    consentimento_marketing: c.marketing ? "sim" : "nao",
    origem: origem.fonte || "direto",
    qr: origem.qr,
    campanha_qr: origem.campanha,
    status_crm: "participante",
    interesse: p.destinoFinal || p.destino?.cidade || "",
    experiencia_knn: p.destino ? `${p.destino.cidade} (${p.destino.traco})` : "",
    matricula: "",
    destino_escolhido: p.destino?.cidade || "",
    destino_final: p.destinoFinal,
    motivo_destino: p.motivo,
    decisao_missao: p.decisao,
  };
}

export function mensagemWhatsAppChallenge(c: Cadastro, p: Progresso) {
  return [
    `Olá! Sou ${c.responsavel || "o responsável"}, responsável por ${c.explorador || "um agente"}${
      c.idade ? ` (${c.idade} anos)` : ""
    }, e concluímos o ${KNN.experience915}.`,
    c.escola ? `Escola: ${c.escola}.` : "",
    p.destinoFinal ? `Destino escolhido: ${p.destinoFinal}.` : "",
    p.motivo ? `Motivo: ${p.motivo}.` : "",
    "Queremos desbloquear a experiência KNN.",
  ]
    .filter(Boolean)
    .join(" ");
}

export function linkWhatsAppChallenge(c: Cadastro, p: Progresso) {
  return `https://wa.me/${KNN.whatsapp}?text=${encodeURIComponent(
    mensagemWhatsAppChallenge(c, p),
  )}`;
}
