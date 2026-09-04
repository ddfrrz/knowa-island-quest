import { useState } from "react";
import { ActionButton } from "./action-button";
import { Hud } from "./hud";
import {
  montarRegistro,
  salvarRegistro,
  type Cadastro,
  type Registro,
} from "@/lib/knn-config";

type Props = {
  idade: number | null;
  onSubmit: (c: Cadastro, registro: Registro) => void;
};

function Campo({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  readOnly,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-lantern">
        {label}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 h-[52px] w-full rounded-2xl border border-border bg-canopy/70 px-4 text-[16px] text-parchment outline-none transition-colors placeholder:text-parchment/35 focus:border-lagoon"
      />
    </label>
  );
}

export function SceneCadastro({ idade, onSubmit }: Props) {
  const [explorador, setExplorador] = useState("");
  const [escola, setEscola] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [participacao, setParticipacao] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function registrar() {
    if (enviando) return;
    setEnviando(true);
    const cadastro: Cadastro = {
      explorador,
      idade,
      escola,
      responsavel,
      whatsapp,
      email,
      participacao,
      marketing,
    };
    const registro = montarRegistro(cadastro);
    await salvarRegistro(registro);
    setEnviando(false);
    onSubmit(cadastro, registro);
  }


  const pronto =
    explorador.trim().length > 1 &&
    escola.trim().length > 1 &&
    responsavel.trim().length > 2 &&
    whatsapp.replace(/\D/g, "").length >= 10 &&
    participacao;

  return (
    <div className="paper-grain relative h-full w-full overflow-hidden bg-abyss">
      <Hud chapter="Registro da expedição" place="Diário de bordo" seals={2} />

      <div className="h-full overflow-y-auto px-6 pb-10 pt-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-coral">
          Etapa 02
        </p>
        <h2
          className="mt-2 font-display text-[30px] font-semibold leading-[0.95] tracking-tight text-parchment"
          style={{ textWrap: "balance" }}
        >
          Chame um <span className="italic text-lagoon">responsável</span>
        </h2>
        <p className="mt-2 max-w-[30ch] text-[14px] leading-snug text-parchment/75">
          O registro guarda a participação do explorador antes do envio do desenho.
        </p>

        <div className="mt-6 space-y-4 rounded-[22px] border border-border bg-canopy/40 p-4 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-parchment/60">
            01 Explorador
          </p>
          <Campo
            label="Nome"
            value={explorador}
            onChange={setExplorador}
            placeholder="Primeiro nome"
          />
          <div className="grid grid-cols-[1fr_92px] gap-3">
            <Campo label="Escola" value={escola} onChange={setEscola} placeholder="Nome da escola" />
            <Campo label="Idade" value={idade ? String(idade) : ""} readOnly />
          </div>
        </div>

        <div className="mt-4 space-y-4 rounded-[22px] border border-border bg-canopy/40 p-4 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-parchment/60">
            02 Responsável
          </p>
          <Campo
            label="Nome do responsável"
            value={responsavel}
            onChange={setResponsavel}
            placeholder="Nome completo"
          />
          <Campo
            label="WhatsApp"
            value={whatsapp}
            onChange={setWhatsapp}
            inputMode="tel"
            placeholder="(00) 00000-0000"
          />
          <Campo
            label="E-mail (opcional)"
            value={email}
            onChange={setEmail}
            type="email"
            inputMode="email"
            placeholder="seuemail@email.com"
          />
        </div>

        <div className="mt-4 space-y-3 rounded-[22px] border border-border bg-canopy/30 p-4">
          <label className="flex items-start gap-3 text-[13px] leading-snug text-parchment/85">
            <input
              type="checkbox"
              checked={participacao}
              onChange={(e) => setParticipacao(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--coral)]"
            />
            <span>
              <b className="text-parchment">Autorizo a participação.</b> Sou responsável pela
              criança e autorizo o registro para a Missão Mundo KNN.
            </span>
          </label>
          <label className="flex items-start gap-3 text-[13px] leading-snug text-parchment/70">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--coral)]"
            />
            <span>Quero receber novidades e experiências da KNN. Opcional.</span>
          </label>
        </div>

        <div className="mt-6">
          <ActionButton
            tone={pronto ? "ember" : "quiet"}
            disabled={!pronto}
            onClick={() =>
              onSubmit({
                explorador,
                idade,
                escola,
                responsavel,
                whatsapp,
                email,
                participacao,
                marketing,
              })
            }
          >
            Registrar expedição
          </ActionButton>
          {!pronto && (
            <p className="mt-3 text-center text-[11px] leading-snug text-parchment/60">
              Preencha nome, escola, responsável e WhatsApp e marque a autorização para
              liberar o registro.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
