import { useState } from "react";
import { ChallengeButton, MissionBar, Screen, Terminal, WorldMap } from "./ui";
import { DESTINOS, type Destino } from "@/lib/knn-challenge";

/* ---------- abertura ---------- */

export function Transmissao({ onAdvance }: { onAdvance: () => void }) {
  return (
    <Screen glow="lagoon">
      <div className="flex h-full flex-col justify-center px-6 pb-10">
        <p className="anim-fade font-mono text-[11px] uppercase tracking-[0.34em] text-coral">
          ● Transmissão recebida
        </p>
        <h1
          className="anim-rise mt-4 font-mono text-[34px] font-bold uppercase leading-[0.95] tracking-tight text-parchment"
          style={{ animationDelay: "120ms" }}
        >
          O mundo está
          <br />
          <span className="text-lagoon">esperando</span>
          <br />
          por você
        </h1>
        <div className="anim-rise mt-7" style={{ animationDelay: "320ms" }}>
          <Terminal>
            <p>&gt; Uma mensagem acabou de chegar de algum lugar do mundo.</p>
            <p className="mt-2">&gt; Precisamos de alguém capaz de decifrá-la.</p>
            <p className="mt-2 text-citrus">&gt; Você foi escolhido.</p>
          </Terminal>
        </div>
        <div className="anim-rise mt-8" style={{ animationDelay: "520ms" }}>
          <ChallengeButton onClick={onAdvance}>Aceitar a missão</ChallengeButton>
        </div>
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.26em] text-parchment/40">
          6 missões · agente 09-15
        </p>
      </div>
    </Screen>
  );
}

/* ---------- missão 01 ---------- */

const OPCOES_M1 = ["MOUNTAIN", "TOWER", "DESERT", "STATION"];

export function MissaoMensagem({ onAdvance }: { onAdvance: () => void }) {
  const [escolha, setEscolha] = useState<string | null>(null);
  const certo = escolha === "TOWER";

  return (
    <Screen glow="lagoon">
      <MissionBar code="Missão 01" label="A mensagem" step={1} />
      <div className="flex h-full flex-col px-6 pb-10 pt-32">
        <Terminal>
          <p className="text-[10px] uppercase tracking-[0.26em] text-parchment/45">
            sinal parcial
          </p>
          <p className="mt-2 text-[19px] font-bold tracking-wide text-parchment">
            MEET ME AT THE{" "}
            <span className={certo ? "text-citrus" : "text-coral"}>
              {certo ? "TOWER" : "[ ??? ]"}
            </span>{" "}
            BRIDGE
          </p>
        </Terminal>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-parchment/55">
          Complete a palavra que falta
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {OPCOES_M1.map((p) => {
            const on = escolha === p;
            const erro = on && p !== "TOWER";
            return (
              <button
                key={p}
                type="button"
                onClick={() => setEscolha(p)}
                className={`rounded-xl border py-4 font-mono text-[13px] font-bold tracking-[0.14em] transition-all active:scale-95 ${
                  erro
                    ? "border-coral bg-coral/15 text-coral"
                    : on
                      ? "border-citrus bg-citrus/15 text-citrus"
                      : "border-parchment/20 bg-parchment/5 text-parchment/80"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {escolha && !certo && (
          <p className="anim-fade mt-4 font-mono text-[12px] text-coral">
            &gt; Sinal recusado. Tente outra palavra.
          </p>
        )}

        {certo && (
          <div className="anim-rise mt-6">
            <div className="rounded-xl border border-citrus/40 bg-citrus/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-citrus">
                Localização identificada
              </p>
              <p className="mt-1 font-mono text-[30px] font-bold tracking-tight text-parchment">
                LONDON
              </p>
              <p className="mt-1 font-mono text-[11px] text-parchment/60">
                Tower Bridge · 51.5055° N, 0.0754° W
              </p>
            </div>
          </div>
        )}

        <div className="mt-auto pt-8">
          <ChallengeButton disabled={!certo} onClick={onAdvance}>
            Avançar para missão 02
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- missão 02 ---------- */

const COMANDOS = ["LOGIN", "SEARCH", "SEND", "MAP", "MESSAGE"];

export function MissaoDispositivo({ onAdvance }: { onAdvance: () => void }) {
  const [seq, setSeq] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);
  const pronto = seq.join(" ") === "SEND MESSAGE";

  function tocar(c: string) {
    if (enviado) return;
    setSeq((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c].slice(-2)));
  }

  return (
    <Screen glow="grape">
      <MissionBar code="Missão 02" label="O mundo conectado" step={2} />
      <div className="flex h-full flex-col px-6 pb-10 pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-parchment/55">
          Dispositivo de campo · monte o comando
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {COMANDOS.map((c) => {
            const on = seq.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => tocar(c)}
                className={`rounded-lg border px-3.5 py-3 font-mono text-[12px] font-bold tracking-[0.14em] transition-all active:scale-95 ${
                  on
                    ? "border-lagoon bg-lagoon/20 text-lagoon"
                    : "border-parchment/20 bg-parchment/5 text-parchment/75"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <Terminal>
            <p className="text-[10px] uppercase tracking-[0.26em] text-parchment/45">comando</p>
            <p className="mt-1 text-[18px] font-bold tracking-wide text-parchment">
              {seq.length ? seq.join(" ") : "_"}
            </p>
            <div className="mt-4 space-y-1 text-[12px] text-parchment/70">
              <p>
                <span className="text-parchment/45">TO:</span> KNN Explorer
              </p>
              <p>
                <span className="text-parchment/45">MSG:</span>{" "}
                <span className="text-citrus">I&apos;M READY.</span>
              </p>
            </div>
          </Terminal>
        </div>

        {enviado && (
          <div className="anim-rise mt-5 rounded-xl border border-citrus/40 bg-citrus/10 p-4">
            <p className="font-mono text-[13px] font-bold tracking-[0.16em] text-citrus">
              MESSAGE SENT
            </p>
            <p className="mt-1 font-mono text-[12px] text-parchment/75">
              AGENT STATUS: <span className="text-parchment">ACTIVE</span>
            </p>
          </div>
        )}

        <div className="mt-auto space-y-3 pt-8">
          {!enviado ? (
            <ChallengeButton disabled={!pronto} onClick={() => setEnviado(true)}>
              Transmit
            </ChallengeButton>
          ) : (
            <ChallengeButton onClick={onAdvance}>Avançar para missão 03</ChallengeButton>
          )}
          {!pronto && !enviado && (
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/40">
              Selecione as duas palavras na ordem certa
            </p>
          )}
        </div>
      </div>
    </Screen>
  );
}

/* ---------- missão 03 ---------- */

export function MissaoDestino({ onAdvance }: { onAdvance: (d: Destino) => void }) {
  const [id, setId] = useState<string | null>(null);
  const destino = DESTINOS.find((d) => d.id === id) || null;

  return (
    <Screen glow="lagoon">
      <MissionBar code="Missão 03" label="Escolha seu caminho" step={3} />
      <div className="flex h-full flex-col px-6 pb-10 pt-32">
        <WorldMap
          markers={DESTINOS.map((d) => ({ id: d.id, x: d.x, y: d.y, label: d.cidade }))}
          activeId={id}
          onSelect={setId}
        />

        <div className="mt-4 grid grid-cols-2 gap-2">
          {DESTINOS.map((d) => {
            const on = d.id === id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setId(d.id)}
                className={`rounded-xl border p-3 text-left transition-all active:scale-95 ${
                  on
                    ? "border-citrus bg-citrus/10"
                    : "border-parchment/15 bg-parchment/5"
                }`}
              >
                <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-parchment">
                  {d.cidade}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-lagoon">
                  {d.traco}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-6">
          <ChallengeButton disabled={!destino} onClick={() => destino && onAdvance(destino)}>
            {destino ? `Rumo a ${destino.cidade}` : "Escolha um destino"}
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- missão 04 ---------- */

const PISTAS = [
  { rotulo: "PISTA 01", texto: "TICKET · DEPARTURE 19:40 · GATE CLOSED" },
  { rotulo: "PISTA 02", texto: "NOTE · \"I MISSED THE LAST TRAIN\"" },
  { rotulo: "PISTA 03", texto: "MAP · HOTEL 12 KM AWAY" },
];

const RESPOSTAS_M4 = [
  { id: "a", texto: "O agente perdeu o transporte e está longe do ponto de encontro." },
  { id: "b", texto: "O agente chegou cedo e já está no hotel." },
  { id: "c", texto: "A mensagem foi enviada da cidade errada." },
];

export function MissaoProblema({ onAdvance }: { onAdvance: () => void }) {
  const [resp, setResp] = useState<string | null>(null);
  const certo = resp === "a";

  return (
    <Screen glow="coral">
      <MissionBar code="Missão 04" label="O problema" step={4} />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral">
          ▲ Alerta
        </p>
        <p className="mt-2 font-mono text-[15px] leading-snug text-parchment">
          Uma mensagem foi interceptada. Cruze as pistas e descubra o que aconteceu.
        </p>

        <div className="mt-5 space-y-2.5">
          {PISTAS.map((p) => (
            <div
              key={p.rotulo}
              className="rounded-xl border border-parchment/15 bg-parchment/5 p-3.5"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-lagoon">
                {p.rotulo}
              </p>
              <p className="mt-1 font-mono text-[13px] text-parchment/85">{p.texto}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-parchment/55">
          Sua conclusão
        </p>
        <div className="mt-3 space-y-2.5">
          {RESPOSTAS_M4.map((r) => {
            const on = resp === r.id;
            const erro = on && r.id !== "a";
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setResp(r.id)}
                className={`w-full rounded-xl border p-3.5 text-left font-mono text-[13px] leading-snug transition-all active:scale-[0.98] ${
                  erro
                    ? "border-coral bg-coral/15 text-coral"
                    : on
                      ? "border-citrus bg-citrus/15 text-citrus"
                      : "border-parchment/15 bg-parchment/5 text-parchment/80"
                }`}
              >
                {r.texto}
              </button>
            );
          })}
        </div>

        {certo && (
          <p className="anim-fade mt-4 font-mono text-[12px] text-citrus">
            &gt; Correto. Você descobriu isso sozinho.
          </p>
        )}

        <div className="mt-7">
          <ChallengeButton disabled={!certo} onClick={onAdvance}>
            Avançar para missão 05
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- missão 05 ---------- */

const ESCOLHAS_M5 = [
  {
    id: "guiar",
    titulo: "Levar a pessoa até o próximo ponto",
    consequencia: "Você perde tempo, mas ganha um aliado que conhece a cidade.",
  },
  {
    id: "traduzir",
    titulo: "Traduzir o caminho e seguir sozinho",
    consequencia: "Você chega antes e registra a rota para os outros agentes.",
  },
  {
    id: "chamar",
    titulo: "Pedir ajuda a alguém da estação",
    consequencia: "Você aprende três palavras novas e uma rota secreta.",
  },
];

export function MissaoDecisao({ onAdvance }: { onAdvance: (decisao: string) => void }) {
  const [id, setId] = useState<string | null>(null);
  const escolha = ESCOLHAS_M5.find((e) => e.id === id);

  return (
    <Screen glow="grape">
      <MissionBar code="Missão 05" label="Decisão" step={5} />
      <div className="flex h-full flex-col px-6 pb-10 pt-32">
        <p className="font-mono text-[15px] leading-snug text-parchment">
          Você encontrou alguém que precisa de ajuda para chegar ao próximo ponto da missão.
          O que você faria?
        </p>

        <div className="mt-5 space-y-2.5">
          {ESCOLHAS_M5.map((e) => {
            const on = e.id === id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => setId(e.id)}
                className={`w-full rounded-xl border p-3.5 text-left transition-all active:scale-[0.98] ${
                  on ? "border-lagoon bg-lagoon/12" : "border-parchment/15 bg-parchment/5"
                }`}
              >
                <p className="font-mono text-[13px] leading-snug text-parchment">{e.titulo}</p>
              </button>
            );
          })}
        </div>

        {escolha && (
          <div className="anim-fade mt-5">
            <Terminal>
              <p className="text-[10px] uppercase tracking-[0.26em] text-parchment/45">
                consequência
              </p>
              <p className="mt-1 text-[13px] text-parchment/85">{escolha.consequencia}</p>
            </Terminal>
          </div>
        )}

        <div className="mt-auto pt-8">
          <ChallengeButton disabled={!escolha} onClick={() => escolha && onAdvance(escolha.titulo)}>
            Confirmar decisão
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- missão 06 ---------- */

export function MissaoFinal({
  onAdvance,
}: {
  onAdvance: (destinoFinal: string, motivo: string) => void;
}) {
  const [destinoFinal, setDestinoFinal] = useState("");
  const [motivo, setMotivo] = useState("");
  const pronto = destinoFinal.trim().length > 1 && motivo.trim().length > 3;

  return (
    <Screen glow="citrus">
      <MissionBar code="Missão 06" label="World boss" step={6} />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-citrus">
          The final decision
        </p>
        <p className="mt-3 font-mono text-[15px] leading-snug text-parchment">
          Você recebeu uma passagem para qualquer lugar do mundo. A condição: escolher o
          próximo destino e explicar por quê.
        </p>

        <label className="mt-6 block">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
            Where would you go?
          </span>
          <input
            value={destinoFinal}
            onChange={(e) => setDestinoFinal(e.target.value)}
            placeholder="Digite seu destino..."
            className="mt-2 h-[52px] w-full rounded-xl border border-parchment/20 bg-parchment/5 px-4 font-mono text-[16px] text-parchment outline-none placeholder:text-parchment/30 focus:border-lagoon"
          />
        </label>

        <label className="mt-4 block">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
            Why?
          </span>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={3}
            placeholder="Porque..."
            className="mt-2 w-full resize-none rounded-xl border border-parchment/20 bg-parchment/5 p-4 font-mono text-[15px] leading-snug text-parchment outline-none placeholder:text-parchment/30 focus:border-lagoon"
          />
        </label>

        <div className="mt-7">
          <ChallengeButton
            disabled={!pronto}
            onClick={() => onAdvance(destinoFinal.trim(), motivo.trim())}
          >
            Confirmar destino
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- confirmação ---------- */

export function DestinoConfirmado({
  destino,
  destinoFinal,
  onAdvance,
}: {
  destino: Destino | null;
  destinoFinal: string;
  onAdvance: () => void;
}) {
  const marker = destino
    ? [{ id: destino.id, x: destino.x, y: destino.y, label: destino.cidade }]
    : [{ id: "x", x: 50, y: 34, label: destinoFinal }];

  return (
    <Screen glow="citrus">
      <div className="flex h-full flex-col justify-center px-6 pb-10">
        <p className="anim-fade font-mono text-[11px] uppercase tracking-[0.3em] text-citrus">
          Destination confirmed
        </p>
        <h2 className="anim-rise mt-2 font-mono text-[30px] font-bold uppercase leading-[0.95] tracking-tight text-parchment">
          {destinoFinal}
        </h2>

        <div className="anim-rise mt-5" style={{ animationDelay: "180ms" }}>
          <WorldMap markers={marker} activeId={marker[0]?.id ?? null} />
        </div>

        <p
          className="anim-rise mt-6 font-mono text-[17px] font-bold uppercase tracking-[0.1em] text-lagoon"
          style={{ animationDelay: "360ms" }}
        >
          You have a place in the world.
        </p>
        <p
          className="anim-stamp mt-4 font-mono text-[13px] uppercase tracking-[0.3em] text-citrus"
          style={{ animationDelay: "520ms" }}
        >
          ★ Mission complete
        </p>

        <div className="mt-8">
          <ChallengeButton onClick={onAdvance}>Ver minha recompensa</ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}
