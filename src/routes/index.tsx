import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SceneIdade } from "@/components/knowa/scene-idade";
import { SceneConvocacao } from "@/components/knowa/scene-convocacao";
import { SceneDesafio } from "@/components/knowa/scene-desafio";
import { SceneDescoberta } from "@/components/knowa/scene-descoberta";
import { SceneDesenho } from "@/components/knowa/scene-desenho";
import { SceneCadastro } from "@/components/knowa/scene-cadastro";
import { SceneEnvio } from "@/components/knowa/scene-envio";
import { SceneFuturo } from "@/components/knowa/scene-futuro";
import { CADASTRO_VAZIO, type Cadastro } from "@/lib/knn-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Missão Mundo KNN: Meu Mundo Sem Fronteiras" },
      {
        name: "description",
        content:
          "Uma aventura em Knowa Island para crianças de 5 a 8 anos: explore a ilha com Jacob Knowa, fale com Rhino e envie sua descoberta.",
      },
      { property: "og:title", content: "Missão Mundo KNN: Meu Mundo Sem Fronteiras" },
      {
        property: "og:description",
        content:
          "Entre em Knowa Island com Jacob Knowa: trilhas, selos de explorador e uma região que ninguém nunca viu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Missao,
});

const SCENES = [
  "idade",
  "convocacao",
  "desafio",
  "descoberta",
  "desenho",
  "cadastro",
  "envio",
] as const;
type SceneId = (typeof SCENES)[number] | "futuro";

function Missao() {
  const [scene, setScene] = useState<SceneId>("idade");
  const [cadastro, setCadastro] = useState<Cadastro>(CADASTRO_VAZIO);

  function reiniciar() {
    setCadastro(CADASTRO_VAZIO);
    setScene("idade");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-abyss">
      {/* palco mobile fixo: a experiência é um aparelho, não uma página */}
      <div
        className="relative h-[100dvh] max-h-[860px] w-full max-w-[390px] overflow-hidden bg-abyss sm:rounded-[34px] sm:border sm:border-border"
        style={{ boxShadow: "var(--shadow-plate)" }}
      >
        <div key={scene} className="anim-fade h-full w-full">
          {scene === "idade" && (
            <SceneIdade
              onChoose={(idade) => {
                setCadastro((c) => ({ ...c, idade }));
                setScene(idade >= 5 && idade <= 8 ? "convocacao" : "futuro");
              }}
            />
          )}
          {scene === "convocacao" && <SceneConvocacao onAdvance={() => setScene("desafio")} />}
          {scene === "desafio" && <SceneDesafio onAdvance={() => setScene("descoberta")} />}
          {scene === "descoberta" && (
            <SceneDescoberta onRestart={() => setScene("desenho")} />
          )}
          {scene === "desenho" && <SceneDesenho onAdvance={() => setScene("cadastro")} />}
          {scene === "cadastro" && (
            <SceneCadastro
              idade={cadastro.idade}
              onSubmit={(c) => {
                setCadastro(c);
                setScene("envio");
              }}
            />
          )}
          {scene === "envio" && <SceneEnvio cadastro={cadastro} onRestart={reiniciar} />}
          {scene === "futuro" && <SceneFuturo onRestart={reiniciar} />}
        </div>

        {/* trilha de progresso da missão */}
        {scene !== "futuro" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-40 flex justify-center gap-1.5">
            {SCENES.map((s) => (
              <span
                key={s}
                className={
                  s === scene
                    ? "h-1 w-7 rounded-full bg-lantern/90"
                    : "h-1 w-3 rounded-full bg-parchment/25"
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
