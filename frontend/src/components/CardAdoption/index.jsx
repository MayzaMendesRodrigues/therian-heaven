"use client";

import { useEffect, useState } from "react";
import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/utils/Api";
import { DialogAdoption } from "../DialogAdoption";

const therianImages = Object.values(
  import.meta.glob("@/assets/therian-images/*.png", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

function getImageIndex(seed) {
  const chars = String(seed).split("");
  const total = chars.reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return total % therianImages.length;
}

function normalizeTherian(therian, index) {
  const imageIndex = getImageIndex(therian.id || therian._id || index);

  return {
    id: therian._id || therian.id || therian.nome,
    name: therian.nome,
    age: `${therian.idade} anos`,
    species: therian.theriotype,
    breed: therian.theriotype,
    sex: therian.sexo,
    weight: "Nao informado",
    size: therian.escolaridade || "Nao informado",
    trait: therian.theriotype,
    local: `${therian.cidade}, ${therian.estado}`,
    img: therianImages[imageIndex],
    bio: therian.descricao,
    castrado: therian.castrado,
    vermifugado: !therian.necessidadesEspeciais?.length,
    microchip: therian.id ? String(therian.id) : "Nao informado",
    alimentacao: therian.alimentacao || "Nao informado",
    vacinas: (therian.vacinas || []).map((vacina) => ({
      nome: vacina.nome,
      data: vacina.data || String(vacina.ano || ""),
      aplicada: vacina.status === "Aplicada",
    })),
  };
}

export default function CardAdoption({ limit = null }) {
  const [selected, setSelected] = useState(null);
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTherians() {
      try {
        const therians = await api.getTherians();

        if (!ignore) {
          setAnimais(
            therians.filter((therian) => therian.status).map(normalizeTherian),
          );
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Nao foi possivel carregar os therians.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTherians();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <p className="text-sm text-muted-foreground">Carregando therians...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <p className="text-sm font-medium text-destructive">{error}</p>
      </section>
    );
  }

  if (!animais.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <p className="text-sm text-muted-foreground">
          Nenhum therian disponivel para adocao no momento.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animais.slice(0, limit || animais.length).map((a) => (
          <article
            key={a.id}
            className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border/50 hover:shadow-soft transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
              <img
                src={a.img}
                alt={a.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(event) => {
                  event.currentTarget.src = therianImages[0];
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold">
                  {a.name}
                </h2>
                <span className="text-xs rounded-full bg-sage-soft text-sage-deep px-2.5 py-1 font-medium">
                  {a.species}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {a.age} - {a.trait}
              </p>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {a.local}
              </p>
              <Button
                onClick={() => setSelected(a)}
                className="mt-5 w-full rounded-full bg-success"
              >
                <Heart className="h-4 w-4 mr-2" /> Quero adotar {a.name}
              </Button>
            </div>
          </article>
        ))}
      </div>

      <DialogAdoption selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
