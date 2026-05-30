"use client";

import { useState } from "react";
import { MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import therian from "@/assets/therian-images/therian21.png";
import therian2 from "@/assets/therian-images/therian1.png";
import therian3 from "@/assets/therian-images/therian4.png";
import therian4 from "@/assets/therian-images/therian6.png";

import { DialogAdoption } from "../DialogAdoption";

export default function CardAdoption() {
  const [selected, setSelected] = useState(null);

  const animais = [
    {
      name: "Rex",
      age: "32 anos",
      species: "Cão",
      breed: "Husky Espiritual",
      sex: "Macho",
      weight: "72 kg",
      size: "Médio",
      trait: "Golden retriever em espírito",
      local: "São Paulo, SP",
      img: therian,
      bio: "Milhões de anos de evolução para eu ficar feliz quando alguém diz 'quem é um bom garoto?'",
      castrado: false,
      vermifugado: true,
      microchip: "982000123456789",
      resgate: "Janeiro/2026",
      vacinas: [
        { nome: "V8 (1ª dose)", data: "15/02/2026", aplicada: true },
        { nome: "V8 (2ª dose)", data: "08/03/2026", aplicada: true },
        { nome: "V8 (3ª dose)", data: "29/03/2026", aplicada: true },
        { nome: "Antirrábica", data: "Agendada para 06/2026", aplicada: false },
      ],
    },

    {
      name: "Luna",
      age: "27 anos",
      species: "Cão",
      breed: "SRD (Muito Confusa)",
      sex: "Fêmea",
      weight: "58 kg",
      size: "Pequeno",
      trait: "Não pertenço à matilha",
      local: "São Paulo, SP",
      img: therian2,
      bio: "A sociedade espera muito de alguém que só queria brincar no parque.",
      castrado: false,
      vermifugado: true,
      microchip: "982000123456789",
      resgate: "Janeiro/2026",
      vacinas: [
        { nome: "V8 (1ª dose)", data: "15/02/2026", aplicada: true },
        { nome: "V8 (2ª dose)", data: "08/03/2026", aplicada: true },
        { nome: "V8 (3ª dose)", data: "29/03/2026", aplicada: true },
        { nome: "Antirrábica", data: "Agendada para 06/2026", aplicada: false },
      ],
    },

    {
      name: "Tobias",
      age: "24 anos",
      species: "Cão",
      breed: "Border Collie Filosófico",
      sex: "Macho",
      weight: "68 kg",
      size: "Médio",
      trait: "Sistema operacional errado",
      local: "São Paulo, SP",
      img: therian3,
      bio: "Aparentemente sou humano. Erro de classificação, eu imagino.",
      castrado: false,
      vermifugado: true,
      microchip: "982000123456789",
      resgate: "Janeiro/2026",
      vacinas: [
        { nome: "V8 (1ª dose)", data: "15/02/2026", aplicada: true },
        { nome: "V8 (2ª dose)", data: "08/03/2026", aplicada: true },
        { nome: "V8 (3ª dose)", data: "29/03/2026", aplicada: true },
        { nome: "Antirrábica", data: "Agendada para 06/2026", aplicada: false },
      ],
    },

    {
      name: "Amora",
      age: "22 anos",
      species: "Cão",
      breed: "Labrador Premium",
      sex: "Fêmea",
      weight: "54 kg",
      size: "Pequeno",
      local: "São Paulo, SP",
      img: therian4,
      trait: "Prioridades caninas",
      bio: "Talvez eu seja humana. Mas já viu um humano ficar tão feliz com comida?",
      castrado: false,
      vermifugado: true,
      microchip: "982000123456789",
      resgate: "Janeiro/2026",
      vacinas: [
        { nome: "V8 (1ª dose)", data: "15/02/2026", aplicada: true },
        { nome: "V8 (2ª dose)", data: "08/03/2026", aplicada: true },
        { nome: "V8 (3ª dose)", data: "29/03/2026", aplicada: true },
        { nome: "Antirrábica", data: "Agendada para 06/2026", aplicada: false },
      ],
    },

    {
      name: "Bolt",
      age: "29 anos",
      species: "Cão",
      breed: "Vira-lata Cósmico",
      sex: "Macho",
      weight: "80 kg",
      size: "Grande",
      trait: "Especialista em gravetos",
      local: "São Paulo, SP",
      img: therian,
      bio: "Se eu sou humano, por que gravetos continuam parecendo uma ótima ideia?",
      castrado: false,
      vermifugado: true,
      microchip: "982000123456789",
      resgate: "Janeiro/2026",
      vacinas: [
        { nome: "V8 (1ª dose)", data: "15/02/2026", aplicada: true },
        { nome: "V8 (2ª dose)", data: "08/03/2026", aplicada: true },
        { nome: "V8 (3ª dose)", data: "29/03/2026", aplicada: true },
        { nome: "Antirrábica", data: "Agendada para 06/2026", aplicada: false },
      ],
    },
  ];

  //   1. Humano por fora, vira-lata premium por dentro.
  // 2. A ciência diz que sou humano. Eu e o carteiro discordamos.
  // 3. Cão preso em um corpo humano e em um sistema tributário que não pediu.
  // 4. Ainda não sei usar a caixa de areia da sociedade.
  // 5. Metade humano, metade cachorro, 100% motivo de preocupação para meus vizinhos.
  // 6. Não sou estranho, só estou rodando o sistema operacional errado.
  // 7. Dizem que preciso agir como adulto. Eu prefiro correr atrás de coisas aleatórias.
  // 8. Aparentemente sou uma pessoa. Fonte: documentos oficiais.
  // 9. Golden retriever em espírito, ansiedade em forma física.
  // 10. Evoluí milhões de anos para acabar perseguindo uma bola imaginária.
  // 11. Não pertenço à matilha, pertenço ao caos.
  // 12. Tenho a inteligência de um humano e as prioridades de um cachorro.
  // 13. Fui domesticado pela internet.
  // 14. Sou um cão espiritual tentando sobreviver a reuniões no Zoom.
  // 15. Meu hobby é confundir psicólogos e biólogos ao mesmo tempo.
  // 16. Alguns buscam iluminação espiritual. Eu busco gravetos interessantes.
  // 17. O importante é correr livre. O resto é detalhe administrativo.
  // 18. Fui criado à imagem e semelhança de um labrador hiperativo.
  // 19. Meu ancestral caçava mamutes. Eu fico feliz quando ganho um biscoito.
  // 20. Se felicidade tivesse forma física, seria um cachorro vendo o tutor voltar para casa.
  // 21. A sociedade espera muito de alguém que só queria brincar no parque.
  // 22. Nem humano o suficiente para os humanos, nem cachorro o suficiente para os cachorros.
  // 23. Tenho diploma, responsabilidades e energia de filhote.
  // 24. A cada dia mais perto de abandonar tudo e viver perseguindo pombos.
  // 25. Minha personalidade inteira cabe em um rabo abanando.
  // 26. O mundo seria melhor se as reuniões começassem com petiscos.
  // 27. Ainda esperando a atualização que corrige o instinto de correr sem motivo.
  // 28. Talvez eu seja humano. Mas já viu um humano ficar tão feliz com comida?
  // 29. Não preciso de terapia, preciso de um campo aberto e uma bolinha.
  // 30. Sou a prova viva de que a evolução nem sempre sabe o que está fazendo.

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animais.map((a) => (
          <article
            key={a.name}
            className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border/50 hover:shadow-soft transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
              <img
                src={a.img}
                alt={a.name}
                placeholder="blur"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                {a.age} • {a.trait}
              </p>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {a.local}
              </p>
              <Button
                onClick={() => setSelected(a)}
                className="mt-5 w-full rounded-full  bg-green-600"
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
