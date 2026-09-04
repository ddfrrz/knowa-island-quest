import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SceneConvocacao } from "@/components/knowa/scene-convocacao";
import { SceneDesafio } from "@/components/knowa/scene-desafio";
import { SceneDescoberta } from "@/components/knowa/scene-descoberta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Missão Mundo KNN — Meu Mundo Sem Fronteiras" },
      {
        name: "description",
        content:
          "Uma pequena aventura em Knowa Island: explore a ilha com Jacob Knowa, fale com Rhino e descubra o território escondido na névoa.",
      },
      { property: "og:title", content: "Missão Mundo KNN — Meu Mundo Sem Fronteiras" },
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

const SCENES = ["convocacao", "desafio", "descoberta"] as const;
type SceneId = (typeof SCENES)[number];

function Missao() {
  const [scene, setScene] = useState<SceneId>("convocacao");

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-abyss">
      {/* fixed mobile stage: the experience is a device, not a page */}
      <div
        className="relative h-[100dvh] max-h-[860px] w-full max-w-[390px] overflow-hidden bg-abyss sm:rounded-[34px] sm:border sm:border-border"
        style={{ boxShadow: "var(--shadow-plate)" }}
      >
        <div key={scene} className="anim-fade h-full w-full">
          {scene === "convocacao" && (
            <SceneConvocacao onAdvance={() => setScene("desafio")} />
          )}
          {scene === "desafio" && <SceneDesafio onAdvance={() => setScene("descoberta")} />}
          {scene === "descoberta" && (
            <SceneDescoberta onRestart={() => setScene("convocacao")} />
          )}
        </div>

        {/* scene ledger — where the child is in the story */}
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
      </div>
    </main>
  );
}
