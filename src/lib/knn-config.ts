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
    `Olá! Sou ${c.responsavel || "o responsável"}, responsável por ${c.explorador || "um explorador"}${
      c.idade ? ` (${c.idade} anos)` : ""
    }, e concluímos a ${KNN.campaign}.`,
    `Experiência: ${KNN.experience58}.`,
    c.escola ? `Escola: ${c.escola}.` : "",
    "Estou enviando a foto do desenho da descoberta em Knowa Island.",
  ]
    .filter(Boolean)
    .join(" ");
}


export function linkWhatsApp(c: Cadastro) {
  return `https://wa.me/${lerUnidade().whatsapp}?text=${encodeURIComponent(mensagemWhatsApp(c))}`;
}

/** URL do Web App do Google Apps Script ja usado pela campanha. */
export const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbytDC53mY-BoaaM_Ux57IlP5Y74xBv5TQS-eAyTa7v1r5IHsIH-E4hXemClKEYOjDj65w/exec";

/** Unidades da campanha. Cada QR aponta para ?unit=<id>. */
export const UNIDADES = {
  america: {
    id: "america",
    nome: "KNN América",
    whatsapp: KNN.whatsapp,
    sheets: SHEETS_URL,
  },
  bucarein: {
    id: "bucarein",
    nome: "KNN Bucarein",
    whatsapp: "554797618660",
    sheets:
      "https://script.google.com/macros/s/AKfycbx5cMIkGoznBFXdmKsedmvO0ay9BQzv-hLYArL4thOcIfMDRz5H52ivJMDdI1Sjia4M/exec",
  },
} as const;

export type UnidadeId = keyof typeof UNIDADES;
const UNIDADE_KEY = "mundoKnnUnidade";

/** Unidade fixa na sessão: URL válida define, sessão mantém, padrão América. */
export function lerUnidade() {
  if (typeof window === "undefined") return UNIDADES.america;
  const daUrl = (new URLSearchParams(window.location.search).get("unit") || "").toLowerCase();
  let id: string | null = null;
  if (daUrl in UNIDADES) {
    id = daUrl;
    try { window.sessionStorage.setItem(UNIDADE_KEY, id); } catch { /* */ }
  } else {
    try { id = window.sessionStorage.getItem(UNIDADE_KEY); } catch { id = null; }
  }
  return id && id in UNIDADES ? UNIDADES[id as UnidadeId] : UNIDADES.america;
}

export type Origem = { campanha: string; escola: string; fonte: string; qr: string };

export function lerOrigem(): Origem {
  if (typeof window === "undefined") {
    return { campanha: KNN.campaignSlug, escola: "", fonte: "", qr: "nao" };
  }
  const p = new URLSearchParams(window.location.search);
  const qrParam = (p.get("qr") || "").toLowerCase();
  const veioDeQr =
    qrParam === "1" ||
    qrParam === "sim" ||
    qrParam === "true" ||
    (p.get("source") || "").toLowerCase() === "qr" ||
    p.has("campaign");
  return {
    campanha: p.get("campaign") || KNN.campaignSlug,
    escola: p.get("school") || "",
    fonte: p.get("source") || "",
    qr: veioDeQr ? "sim" : "nao",
  };

}

export type Registro = Record<string, string | number | null>;

export function montarRegistro(
  c: Cadastro,
  etapa: "cadastro" | "completa" = "completa",
): Registro {
  const origem = lerOrigem();
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `MKN-${Date.now()}`,
    data: new Date().toISOString(),
    campanha: KNN.campaign,
    faixa_etaria: "5-8",
    experiencia: KNN.experience58,
    idade: c.idade,
    escola: c.escola || origem.escola,
    explorador: c.explorador,
    responsavel: c.responsavel,
    whatsapp: c.whatsapp,
    email: c.email,
    missao_atual: etapa === "cadastro" ? "cadastro_concluido" : "missao_completa",
    status_missao: etapa === "cadastro" ? "iniciada" : "completa",
    recompensa: "Certificado de Explorador + experiencia KNN",
    whatsapp_utilizado: "nao",
    desenho_enviado: "nao",
    consentimento_participacao: c.participacao ? "sim" : "nao",
    consentimento_marketing: c.marketing ? "sim" : "nao",
    origem: origem.fonte || "direto",
    qr: origem.qr,
    campanha_qr: origem.campanha,
    status_crm: "participante",
    interesse: "",
    experiencia_knn: "",
    matricula: "",
  };
}

/** Envia para a planilha sem travar a experiencia caso a API falhe. */
export async function salvarRegistro(registro: Registro): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem("mundoKnnUltimaParticipacao", JSON.stringify(registro));
  } catch {
    /* armazenamento indisponivel */
  }
  const unidade = lerUnidade();
  const corpo = { ...registro, unidade: unidade.id, unidade_nome: unidade.nome };
  if (!unidade.sheets) return false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    await fetch(unidade.sheets, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(corpo),
      signal: controller.signal,
    });
    clearTimeout(timer);
    return true;
  } catch {
    return false;
  }
}

/** Marca no registro que o WhatsApp foi aberto com a foto do desenho. */
export async function registrarEnvioWhatsApp(registro: Registro): Promise<boolean> {
  return salvarRegistro({
    ...registro,
    id: `${String(registro["id"])}-wpp`,
    data: new Date().toISOString(),
    whatsapp_utilizado: "sim",
    desenho_enviado: "iniciado",
  });
}
