import { useState } from "react";
import {
  Bath,
  Scissors,
  Sparkles,
  Check,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const servicos = [
  { id: "banho", icon: Bath, nome: "Banho", duracao: "45 min", preco: "R$ 70" },
  {
    id: "tosa",
    icon: Scissors,
    nome: "Tosa completa",
    duracao: "1h 30",
    preco: "R$ 120",
  },
  {
    id: "hidratacao",
    icon: Sparkles,
    nome: "Hidratação",
    duracao: "1h",
    preco: "R$ 90",
  },
  {
    id: "combo",
    icon: Check,
    nome: "Combo banho + tosa",
    duracao: "2h",
    preco: "R$ 170",
  },
];

const horarios = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
];

export default function Appointment() {
  const [servico, setServico] = useState("banho");
  const [horario, setHorario] = useState("10:30");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Agendamento enviado com sucesso!");
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-secondary/10">
      <section className="mx-auto max-w-7xl w-full px-6 pt-14 pb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wider">
          Agendamento
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight bg-purple-600 text-yellow-600">
          Reserve um horário
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Escolha o serviço, o melhor horário para seu therianZinho e deixe o
          resto com a gente.
        </p>
      </section>

      <section className="mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-[1fr_360px] gap-8 pb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-3xl p-8 shadow-lg border border-border/60 space-y-8"
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Escolha o serviço</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {servicos.map(({ id, icon: Icon, nome, duracao, preco }) => {
                const active = servico === id;
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setServico(id)}
                    className={`text-left rounded-2xl p-4 border transition-all flex items-start gap-3 ${
                      active
                        ? "border-primary bg-green-600 shadow-md -"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div
                      className={`grid place-items-center h-10 w-10 rounded-xl ${active ? "bg-purple-600 text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-semibold text-sm">{nome}</p>
                        <span className="text-sm font-semibold text-primary">
                          {preco}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" /> {duracao}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              2. Dados do pet e tutor
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pet">Nome do pet</Label>
                <Input id="pet" required placeholder="Ex: Thor" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="raca">Raça / porte</Label>
                <Input id="raca" required placeholder="Ex: Shih Tzu, pequeno" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tutor">Seu nome</Label>
                <Input
                  id="tutor"
                  required
                  placeholder="Como podemos te chamar?"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tel">WhatsApp</Label>
                <Input
                  id="tel"
                  required
                  type="tel"
                  placeholder="(11) 99999-0000"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" required type="date" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              3. Horário disponível
            </h2>
            <div className="flex flex-wrap gap-2">
              {horarios.map((h) => {
                const active = horario === h;
                return (
                  <button
                    type="button"
                    key={h}
                    onClick={() => setHorario(h)}
                    className={`px-4 h-10 rounded-full text-sm font-medium border transition-all ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full h-12">
            <CalendarCheck className="h-4 w-4 mr-2" /> Confirmar agendamento
          </Button>
        </form>

        <aside className="space-y-4">
          <div className="bg-card rounded-3xl p-6 border border-border/60 shadow-md">
            <h3 className="font-semibold text-lg">Resumo</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serviço</span>
                <span className="font-medium">
                  {servicos.find((s) => s.id === servico)?.nome}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horário</span>
                <span className="font-medium">{horario}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 mt-3">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-primary">
                  {servicos.find((s) => s.id === servico)?.preco}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-6 border border-border/60">
            <h3 className="font-semibold text-primary">Cuidados especiais</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{" "}
                Produtos hipoalergênicos
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{" "}
                Ambiente calmo e seguro
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{" "}
                Equipe treinada em bem-estar animal
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
