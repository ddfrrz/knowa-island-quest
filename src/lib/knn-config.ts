/** Dados fixos da campanha. Nenhuma chamada de backend acontece aqui. */
export const KNN = {
  campaign: "Missão Mundo KNN",
  campaignSlug: "missao-mundo",
  whatsapp: "554734221010",
  experience58: "Meu Mundo Sem Fronteiras",
  experience915: "KNN World Challenge",
};

export type Cadastro = {
  explorador: string;
  idade: number | null;
  escola: string;
  responsavel: string;
  whatsapp: string;
  email: string;
  participacao: boolean;
  marketing: boolean;
};

export const CADASTRO_VAZIO: Cadastro = {
  explorador: "",
  idade: null,
  escola: "",
  responsavel: "",
  whatsapp: "",
  email: "",
  participacao: false,
  marketing: false,
};

export function mensagemWhatsApp(c: Cadastro) {
  return [
    `Olá! Sou responsável por ${c.explorador || "um explorador"} e concluímos a ${KNN.campaign}.`,
    `Experiência: ${KNN.experience58}.`,
    c.escola ? `Escola: ${c.escola}.` : "",
    "Estou enviando a foto do desenho da descoberta em Knowa Island.",
  ]
    .filter(Boolean)
    .join(" ");
}

export function linkWhatsApp(c: Cadastro) {
  return `https://wa.me/${KNN.whatsapp}?text=${encodeURIComponent(mensagemWhatsApp(c))}`;
}
