import { useState } from "react";
import { ChallengeButton, Screen, Terminal } from "./ui";
import {
  linkWhatsAppChallenge,
  montarRegistroChallenge,
  type Progresso,
} from "@/lib/knn-challenge";
import {
  lerOrigem,
  registrarEnvioWhatsApp,
  salvarRegistro,
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

/* ---------- cadastro ---------- */

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
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-lagoon">
        {label}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 h-[52px] w-full rounded-xl border border-parchment/20 bg-parchment/5 px-4 font-mono text-[16px] text-parchment outline-none placeholder:text-parchment/30 focus:border-lagoon"
      />
    </label>
  );
}

export function CadastroChallenge({
  idade,
  progresso,
  onSubmit,
}: {
  idade: number | null;
  progresso: Progresso;
  onSubmit: (c: Cadastro, r: Registro) => void;
}) {
  const [agente, setAgente] = useState("");
  const [escola, setEscola] = useState(() => lerOrigem().escola);
  const [responsavel, setResponsavel] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [participacao, setParticipacao] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const pronto =
    agente.trim().length > 1 &&
    escola.trim().length > 1 &&
    responsavel.trim().length > 2 &&
    whatsapp.replace(/\D/g, "").length >= 10 &&
    participacao;

  async function registrar() {
    if (enviando) return;
    setEnviando(true);
    const cadastro: Cadastro = {
      explorador: agente,
      idade,
      escola,
      responsavel,
      whatsapp,
      email,
      participacao,
      marketing,
    };
    const registro = montarRegistroChallenge(cadastro, progresso);
    await salvarRegistro(registro);
    setEnviando(false);
    onSubmit(cadastro, registro);
  }

  return (
    <Screen glow="lagoon">
      <div className="h-full overflow-y-auto px-6 pb-10 pt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-citrus">
          Unlock protocol
        </p>
        <h2 className="mt-2 font-mono text-[24px] font-bold uppercase leading-[1] tracking-tight text-parchment">
          Registro do agente
        </h2>
        <p className="mt-2 font-mono text-[13px] leading-snug text-parchment/65">
          O responsável confirma os dados e a experiência KNN é liberada.
        </p>

        <div className="mt-5 space-y-4 rounded-2xl border border-parchment/15 bg-parchment/5 p-4">
          <Campo label="Nome do agente" value={agente} onChange={setAgente} placeholder="Primeiro nome" />
          <div className="grid grid-cols-[1fr_88px] gap-3">
            <Campo label="Escola" value={escola} onChange={setEscola} placeholder="Nome da escola" />
            <Campo label="Idade" value={idade ? String(idade) : ""} readOnly />
          </div>
        </div>

        <div className="mt-4 space-y-4 rounded-2xl border border-parchment/15 bg-parchment/5 p-4">
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

        <div className="mt-4 space-y-3 rounded-2xl border border-parchment/15 bg-parchment/5 p-4">
          <label className="flex items-start gap-3 font-mono text-[12px] leading-snug text-parchment/85">
            <input
              type="checkbox"
              checked={participacao}
              onChange={(e) => setParticipacao(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--lagoon)]"
            />
            <span>
              <b className="text-parchment">Autorizo a participação.</b> Sou responsável e
              autorizo o registro no KNN World Challenge.
            </span>
          </label>
          <label className="flex items-start gap-3 font-mono text-[12px] leading-snug text-parchment/70">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[var(--lagoon)]"
            />
            <span>Quero receber novidades e experiências da KNN. Opcional.</span>
          </label>
        </div>

        <div className="mt-6">
          <ChallengeButton disabled={!pronto || enviando} onClick={() => void registrar()}>
            {enviando ? "Registrando..." : "Desbloquear recompensa"}
          </ChallengeButton>
          {!pronto && (
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-parchment/45">
              Preencha agente, escola, responsável, WhatsApp e a autorização
            </p>
          )}
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
    if (registro && !aberto) void registrarEnvioWhatsApp(registro);
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
