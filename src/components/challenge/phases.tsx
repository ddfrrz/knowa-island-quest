import { useEffect, useMemo, useState } from "react";
import { ChallengeButton, Screen, Terminal, WorldMap } from "./ui";
import { Jacob, JacobFala, JacobTrilha } from "./jacob";
import { BarraXP, Diario, DrawPad, GanhouXP, nivelDe, type EntradaDiario } from "./game";
import { DESTINOS, type Destino } from "@/lib/knn-challenge";

/* ---------- 00 · escolha do companheiro ---------- */

export function EscolherGuia({ onAdvance }: { onAdvance: () => void }) {
  const [escolhido, setEscolhido] = useState(false);

  return (
    <Screen glow="lagoon">
      <div className="flex h-full flex-col justify-center px-6 pb-10">
        <p className="anim-fade font-mono text-[11px] uppercase tracking-[0.34em] text-coral">
          ● Transmissão recebida
        </p>
        <h1 className="anim-rise mt-3 font-mono text-[30px] font-bold uppercase leading-[0.95] tracking-tight text-parchment">
          O mundo está
          <br />
          <span className="text-lagoon">esperando</span> por você
        </h1>

        <div className="mt-7 grid place-items-center">
          <Jacob pose={escolhido ? "cheer" : "idle"} size={168} />
        </div>

        <div className="mt-4 rounded-2xl border border-lagoon/30 bg-[oklch(0.13_0.03_240_/_0.8)] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
            Companheiro de missão
          </p>
          <p className="mt-1 font-mono text-[20px] font-bold uppercase tracking-tight text-parchment">
            Jacob Knowa
          </p>
          <p className="mt-1 font-mono text-[13px] leading-snug text-parchment/70">
            {escolhido
              ? "Você não precisa fazer essa missão sozinho. Jacob vai com você até o fim."
              : "Explorador da Knowa Island. Ele conhece o caminho e vai com você."}
          </p>
        </div>

        <div className="mt-6">
          {escolhido ? (
            <ChallengeButton onClick={onAdvance}>Começar a aventura</ChallengeButton>
          ) : (
            <ChallengeButton onClick={() => setEscolhido(true)}>
              Escolher Jacob como guia
            </ChallengeButton>
          )}
        </div>
      </div>
    </Screen>
  );
}

/* ---------- fase 01 · encontre a palavra ---------- */

const PALAVRAS = [
  { en: "TRAVEL", pt: "VIAJAR" },
  { en: "WATER", pt: "ÁGUA" },
  { en: "FRIEND", pt: "AMIGO" },
  { en: "DREAM", pt: "SONHO" },
] as const;

export function FasePalavra({
  xp,
  onAdvance,
}: {
  xp: number;
  onAdvance: (palavra: string, ganho: number) => void;
}) {
  const palavra = useMemo(() => PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]!, []);
  const [etapa, setEtapa] = useState<"achou" | "desenho" | "revelou">("achou");

  return (
    <Screen glow="lagoon">
      <BarraXP xp={xp} />
      <div className="flex h-full flex-col px-6 pb-10 pt-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
          Fase 01 · encontre a palavra
        </p>
        <JacobTrilha ponto={etapa === "achou" ? 0 : etapa === "desenho" ? 1 : 2} total={3} />

        {etapa === "achou" && (
          <>
            <JacobFala
              pose="point"
              texto={`Encontrei uma palavra escondida: ${palavra.en}. Você consegue descobrir o que ela significa?`}
            />
            <div className="anim-pop mt-6 rounded-2xl border border-citrus/45 bg-citrus/10 py-7 text-center">
              <p className="font-mono text-[34px] font-bold tracking-[0.14em] text-citrus">
                {palavra.en}
              </p>
            </div>
            <div className="mt-auto pt-8">
              <ChallengeButton onClick={() => setEtapa("desenho")}>
                Quero tentar
              </ChallengeButton>
            </div>
          </>
        )}

        {etapa === "desenho" && (
          <>
            <p className="mt-2 font-mono text-[17px] font-bold uppercase leading-tight tracking-tight text-parchment">
              Desenhe o que você acha que significa
            </p>
            <p className="mt-1 font-mono text-[12px] text-parchment/60">
              {palavra.en} · não existe resposta errada
            </p>
            <div className="mt-4">
              <DrawPad onDone={() => setEtapa("revelou")} rotulo="Terminei" />
            </div>
          </>
        )}

        {etapa === "revelou" && (
          <>
            <JacobFala pose="cheer" texto="Boa! Você descobriu!" />
            <div className="anim-pop mt-6 rounded-2xl border border-citrus/45 bg-citrus/10 py-7 text-center">
              <p className="font-mono text-[26px] font-bold tracking-[0.1em] text-parchment">
                {palavra.en} = <span className="text-citrus">{palavra.pt}</span>
              </p>
            </div>
            <div className="mt-5">
              <GanhouXP valor={100} />
            </div>
            <div className="mt-auto pt-6">
              <ChallengeButton onClick={() => onAdvance(palavra.en, 100)}>
                Continuar
              </ChallengeButton>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}

/* ---------- fase 02 · monte a frase ---------- */

function MontarFrase({
  alvo,
  embaralhadas,
  onOk,
}: {
  alvo: string[];
  embaralhadas: string[];
  onOk: () => void;
}) {
  const [seq, setSeq] = useState<string[]>([]);
  const certo = seq.join(" ") === alvo.join(" ");

  return (
    <div>
      <div className="min-h-[62px] rounded-2xl border border-lagoon/30 bg-[oklch(0.13_0.03_240_/_0.8)] p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-parchment/45">
          sua mensagem
        </p>
        <p className="mt-1 font-mono text-[20px] font-bold tracking-[0.1em] text-parchment">
          {seq.length ? seq.join(" ") : "_"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {embaralhadas.map((p, i) => {
          const usada = seq.includes(p);
          return (
            <button
              key={`${p}-${i}`}
              type="button"
              onClick={() => setSeq((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]))}
              className={`rounded-xl border px-4 py-3.5 font-mono text-[15px] font-bold tracking-[0.1em] transition-all active:scale-95 ${
                usada
                  ? "border-lagoon bg-lagoon/20 text-lagoon"
                  : "border-parchment/20 bg-parchment/5 text-parchment"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => setSeq([])}
          className="rounded-xl border border-parchment/20 px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-parchment/70"
        >
          Refazer
        </button>
        <div className="flex-1">
          <ChallengeButton disabled={!certo} onClick={onOk}>
            Enviar
          </ChallengeButton>
        </div>
      </div>
    </div>
  );
}

export function FaseFrase({ xp, onAdvance }: { xp: number; onAdvance: (ganho: number) => void }) {
  const [enviado, setEnviado] = useState(false);

  return (
    <Screen glow="grape">
      <BarraXP xp={xp} />
      <div className="flex h-full flex-col px-6 pb-10 pt-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
          Fase 02 · monte a frase
        </p>
        <JacobTrilha ponto={enviado ? 2 : 0} total={3} />

        {!enviado ? (
          <>
            <JacobFala pose="think" texto="Precisamos mandar uma mensagem! Coloque as palavras na ordem." />
            <div className="mt-5">
              <MontarFrase
                alvo={["I", "AM", "READY"]}
                embaralhadas={["READY", "I", "AM"]}
                onOk={() => setEnviado(true)}
              />
            </div>
          </>
        ) : (
          <>
            <JacobFala pose="cheer" texto="Mensagem enviada! O mundo já sabe que você está pronto." />
            <div className="anim-pop mt-6 rounded-2xl border border-citrus/45 bg-citrus/10 p-5 text-center">
              <p className="font-mono text-[18px] font-bold tracking-[0.18em] text-citrus">
                MESSAGE SENT
              </p>
              <p className="mt-1 font-mono text-[14px] text-parchment">I AM READY</p>
            </div>
            <div className="mt-5">
              <GanhouXP valor={150} />
            </div>
            <div className="mt-auto pt-6">
              <ChallengeButton onClick={() => onAdvance(150)}>Continuar</ChallengeButton>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}

/* ---------- fase 03 · o mapa ---------- */

const CURIOSIDADES: Record<string, string> = {
  nyc: "Uma cidade famosa pelos táxis amarelos.",
  toronto: "Uma cidade cheia de gente de todos os países do mundo.",
  london: "Uma cidade famosa por seus ônibus vermelhos.",
  paris: "Uma cidade com uma torre gigante feita de ferro.",
  berlin: "Uma cidade onde os muros viraram obras de arte.",
  sydney: "Uma cidade com um teatro em forma de velas de barco.",
};

export function FaseMapa({
  xp,
  onAdvance,
}: {
  xp: number;
  onAdvance: (destino: Destino, ganho: number) => void;
}) {
  const [id, setId] = useState<string | null>(null);
  const destino = DESTINOS.find((d) => d.id === id) || null;

  return (
    <Screen glow="lagoon">
      <BarraXP xp={xp} />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
          Fase 03 · o mapa
        </p>
        <div className="mt-2">
          <JacobFala pose="point" texto="Para onde vamos?" />
        </div>

        <div className="mt-4">
          <WorldMap
            markers={DESTINOS.map((d) => ({ id: d.id, x: d.x, y: d.y, label: d.cidade }))}
            activeId={id}
            onSelect={setId}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {DESTINOS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setId(d.id)}
              className={`rounded-xl border p-3 text-left transition-all active:scale-95 ${
                d.id === id ? "border-citrus bg-citrus/10" : "border-parchment/15 bg-parchment/5"
              }`}
            >
              <p className="font-mono text-[12px] font-bold tracking-[0.12em] text-parchment">
                {d.cidade}
              </p>
            </button>
          ))}
        </div>

        {destino && (
          <div className="anim-fade mt-4">
            <Terminal>
              <p className="text-[16px] font-bold tracking-[0.1em] text-parchment">
                {destino.cidade}
              </p>
              <p className="mt-1 text-[13px] text-parchment/80">{CURIOSIDADES[destino.id]}</p>
            </Terminal>
          </div>
        )}

        <div className="mt-6">
          <ChallengeButton disabled={!destino} onClick={() => destino && onAdvance(destino, 100)}>
            {destino ? "Continuar" : "Escolha um lugar"}
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- fase 04 · memory ---------- */

const PARES = [
  { par: "sun", texto: "SUN" },
  { par: "sun", texto: "SOL" },
  { par: "book", texto: "BOOK" },
  { par: "book", texto: "LIVRO" },
  { par: "game", texto: "GAME" },
  { par: "game", texto: "JOGO" },
];

function embaralhar<T>(a: T[]) {
  return [...a].sort(() => Math.random() - 0.5);
}

export function FaseMemory({ xp, onAdvance }: { xp: number; onAdvance: (ganho: number) => void }) {
  const cartas = useMemo(() => embaralhar(PARES.map((c, i) => ({ ...c, id: i }))), []);
  const [abertas, setAbertas] = useState<number[]>([]);
  const [feitas, setFeitas] = useState<string[]>([]);
  const [ganho, setGanho] = useState(0);

  useEffect(() => {
    if (abertas.length !== 2) return;
    const [a, b] = abertas.map((i) => cartas.find((c) => c.id === i)!) as [typeof cartas[number], typeof cartas[number]];
    const t = setTimeout(() => {
      if (a.par === b.par) {
        setFeitas((f) => [...f, a.par]);
        setGanho((g) => g + 50);
      }
      setAbertas([]);
    }, 620);
    return () => clearTimeout(t);
  }, [abertas, cartas]);

  const completo = feitas.length === 3;

  return (
    <Screen glow="grape">
      <BarraXP xp={xp + ganho} />
      <div className="flex h-full flex-col px-6 pb-10 pt-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
          Fase 04 · memory
        </p>
        <JacobFala
          pose={completo ? "cheer" : "think"}
          texto={completo ? "Você achou todos os pares!" : "Ache o par de cada palavra."}
        />

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {cartas.map((c) => {
            const aberta = abertas.includes(c.id) || feitas.includes(c.par);
            return (
              <button
                key={c.id}
                type="button"
                disabled={aberta || abertas.length === 2}
                onClick={() => setAbertas((s) => (s.length < 2 ? [...s, c.id] : s))}
                className={`h-[78px] rounded-xl border font-mono text-[13px] font-bold tracking-[0.08em] transition-all active:scale-95 ${
                  feitas.includes(c.par)
                    ? "border-citrus bg-citrus/15 text-citrus"
                    : aberta
                      ? "border-lagoon bg-lagoon/15 text-parchment"
                      : "border-parchment/20 bg-parchment/5 text-parchment/30"
                }`}
              >
                {aberta ? c.texto : "?"}
              </button>
            );
          })}
        </div>

        {ganho > 0 && (
          <div className="mt-5">
            <GanhouXP valor={ganho} />
          </div>
        )}

        <div className="mt-auto pt-6">
          <ChallengeButton disabled={!completo} onClick={() => onAdvance(ganho)}>
            Continuar
          </ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- fase 05 · portais ---------- */

const PORTAIS = [
  {
    id: "aventura",
    nome: "AVENTURA",
    cena: "Você encontrou uma ilha desconhecida. O que faria?",
    opcoes: ["EXPLORAR", "VOLTAR", "CHAMAR AJUDA"],
  },
  {
    id: "tecnologia",
    nome: "TECNOLOGIA",
    cena: "Um robô perdido pede ajuda em inglês. O que faria?",
    opcoes: ["AJUDAR", "OBSERVAR", "CHAMAR JACOB"],
  },
  {
    id: "arte",
    nome: "ARTE",
    cena: "Um muro branco espera uma pintura. O que faria?",
    opcoes: ["PINTAR", "FOTOGRAFAR", "CONVIDAR AMIGOS"],
  },
  {
    id: "natureza",
    nome: "NATUREZA",
    cena: "Uma trilha some dentro da floresta. O que faria?",
    opcoes: ["SEGUIR", "MARCAR O MAPA", "ACAMPAR"],
  },
];

export function FasePortais({
  xp,
  onAdvance,
}: {
  xp: number;
  onAdvance: (portal: string, decisao: string, ganho: number) => void;
}) {
  const [portalId, setPortalId] = useState<string | null>(null);
  const [decisao, setDecisao] = useState<string | null>(null);
  const portal = PORTAIS.find((p) => p.id === portalId);

  return (
    <Screen glow="citrus">
      <BarraXP xp={xp} />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lagoon">
          Fase 05 · o desafio final
        </p>
        <JacobFala
          pose="point"
          texto={portal ? "Boa escolha. Agora decida." : "Você chegou até aqui. Agora escolha seu portal."}
        />

        {!portal ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {PORTAIS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPortalId(p.id)}
                className="relative h-[128px] overflow-hidden rounded-2xl border border-lagoon/35 bg-[oklch(0.13_0.03_240)] transition-all active:scale-95"
              >
                <span
                  className="anim-breathe pointer-events-none absolute inset-x-4 inset-y-3 rounded-[40%] border border-citrus/40"
                  style={{ boxShadow: "0 0 32px 2px oklch(0.87 0.19 118 / 0.35) inset" }}
                />
                <span className="relative font-mono text-[13px] font-bold tracking-[0.14em] text-parchment">
                  {p.nome}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="anim-fade mt-5">
              <Terminal>
                <p className="text-[10px] uppercase tracking-[0.26em] text-parchment/45">
                  portal {portal.nome}
                </p>
                <p className="mt-1 text-[14px] leading-snug text-parchment">{portal.cena}</p>
              </Terminal>
            </div>
            <div className="mt-4 space-y-2.5">
              {portal.opcoes.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setDecisao(o)}
                  className={`w-full rounded-xl border p-4 text-left font-mono text-[14px] font-bold tracking-[0.1em] transition-all active:scale-[0.98] ${
                    decisao === o
                      ? "border-citrus bg-citrus/15 text-citrus"
                      : "border-parchment/15 bg-parchment/5 text-parchment"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            <p className="mt-3 font-mono text-[11px] text-parchment/55">
              Aqui não existe resposta errada. É a sua escolha.
            </p>
            <div className="mt-6">
              <ChallengeButton
                disabled={!decisao}
                onClick={() => decisao && onAdvance(portal.nome, `${portal.nome}: ${decisao}`, 100)}
              >
                Confirmar escolha
              </ChallengeButton>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}

/* ---------- world boss ---------- */

const BOSS = { pergunta: "Qual palavra significa AMIGO?", opcoes: ["HOUSE", "FRIEND", "WATER"], certa: "FRIEND" };

export function FaseBoss({ xp, onAdvance }: { xp: number; onAdvance: (ganho: number) => void }) {
  const [etapa, setEtapa] = useState(0);
  const [resp, setResp] = useState<string | null>(null);
  const [sequencia] = useState(() => embaralhar(["▲", "●", "■"]));
  const [toque, setToque] = useState<string[]>([]);
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    if (etapa !== 2) return;
    setMostrar(true);
    const t = setTimeout(() => setMostrar(false), 2200);
    return () => clearTimeout(t);
  }, [etapa]);

  const puzzleOk = toque.join("") === sequencia.join("");
  const vida = 100 - etapa * 33;

  return (
    <Screen glow="coral">
      <BarraXP xp={xp} />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-coral">
          ▲ World boss
        </p>

        <div className="anim-sway mt-3 grid h-[132px] place-items-center rounded-2xl border border-coral/40 bg-coral/10">
          <div
            className="anim-breathe size-20 rounded-[42%] border-2 border-coral bg-coral/25"
            style={{ boxShadow: "var(--glow-coral)" }}
          />
        </div>
        <div className="mt-2 h-[6px] w-full overflow-hidden rounded-full bg-parchment/12">
          <div
            className="h-full rounded-full bg-coral transition-[width] duration-500"
            style={{ width: `${Math.max(0, vida)}%` }}
          />
        </div>

        <div className="mt-4">
          <JacobFala
            pose={etapa >= 3 ? "victory" : etapa === 0 ? "scared" : "point"}
            texto={
              etapa >= 3
                ? "Conseguimos! O boss foi derrotado."
                : etapa === 0
                  ? "Três desafios rápidos e vencemos essa!"
                  : "Continua! Falta pouco."
            }
          />
        </div>

        {etapa === 0 && (
          <div className="mt-5">
            <p className="font-mono text-[14px] text-parchment">{BOSS.pergunta}</p>
            <div className="mt-3 space-y-2.5">
              {BOSS.opcoes.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setResp(o);
                    if (o === BOSS.certa) setTimeout(() => setEtapa(1), 420);
                  }}
                  className={`w-full rounded-xl border py-4 font-mono text-[14px] font-bold tracking-[0.12em] transition-all active:scale-95 ${
                    resp === o && o !== BOSS.certa
                      ? "border-coral bg-coral/15 text-coral"
                      : resp === o
                        ? "border-citrus bg-citrus/15 text-citrus"
                        : "border-parchment/20 bg-parchment/5 text-parchment"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {etapa === 1 && (
          <div className="mt-5">
            <p className="font-mono text-[14px] text-parchment">Monte a frase.</p>
            <div className="mt-3">
              <MontarFrase
                alvo={["I", "CAN", "DO", "IT"]}
                embaralhadas={["DO", "I", "IT", "CAN"]}
                onOk={() => setEtapa(2)}
              />
            </div>
          </div>
        )}

        {etapa === 2 && (
          <div className="mt-5">
            <p className="font-mono text-[14px] text-parchment">
              {mostrar ? "Memorize a ordem." : "Repita a ordem."}
            </p>
            <div className="mt-3 flex justify-center gap-3">
              {(mostrar ? sequencia : embaralhar(sequencia)).map((s, i) => (
                <button
                  key={`${s}-${i}`}
                  type="button"
                  disabled={mostrar}
                  onClick={() => {
                    const novo = [...toque, s];
                    setToque(novo);
                    if (novo.length === 3) {
                      if (novo.join("") === sequencia.join("")) setTimeout(() => setEtapa(3), 400);
                      else setTimeout(() => setToque([]), 500);
                    }
                  }}
                  className={`grid size-[74px] place-items-center rounded-2xl border font-mono text-[26px] transition-all active:scale-95 ${
                    mostrar
                      ? "border-citrus bg-citrus/15 text-citrus"
                      : "border-parchment/20 bg-parchment/5 text-parchment"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-3 text-center font-mono text-[12px] text-parchment/60">
              {toque.join(" ") || "_"}
            </p>
            {puzzleOk && <p className="mt-2 text-center font-mono text-[12px] text-citrus">Correto!</p>}
          </div>
        )}

        {etapa >= 3 && (
          <div className="mt-5">
            <div className="anim-pop rounded-2xl border border-citrus/45 bg-citrus/10 p-5 text-center">
              <p className="font-mono text-[18px] font-bold tracking-[0.18em] text-citrus">
                BOSS DEFEATED
              </p>
            </div>
            <div className="mt-4">
              <GanhouXP valor={500} />
            </div>
            <div className="mt-5">
              <ChallengeButton onClick={() => onAdvance(500)}>World challenge</ChallengeButton>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}

/* ---------- missão completa + diário ---------- */

export function MissaoCompleta({
  xp,
  entradas,
  onAdvance,
}: {
  xp: number;
  entradas: EntradaDiario[];
  onAdvance: () => void;
}) {
  const nivel = nivelDe(xp);
  return (
    <Screen glow="citrus">
      <BarraXP xp={xp} />
      <div className="h-full overflow-y-auto px-6 pb-10 pt-20">
        <p className="anim-stamp font-mono text-[12px] uppercase tracking-[0.3em] text-citrus">
          ★ World challenge complete
        </p>
        <h2 className="anim-rise mt-2 font-mono text-[26px] font-bold uppercase leading-[1] tracking-tight text-parchment">
          Nível {nivel.n}
          <br />
          {nivel.nome}
        </h2>

        <div className="mt-4 grid place-items-center">
          <Jacob pose="victory" size={132} />
        </div>

        <div className="mt-4">
          <Diario entradas={entradas} />
        </div>

        <p className="mt-4 font-mono text-[13px] leading-snug text-parchment/75">
          Você começou como explorador. Agora já sabe encontrar seu caminho pelo mundo.
        </p>

        <div className="mt-6">
          <ChallengeButton onClick={onAdvance}>Desbloquear recompensa</ChallengeButton>
        </div>
      </div>
    </Screen>
  );
}
