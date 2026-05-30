import {
  ArrowRight,
  Bath,
  Scissors,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Service() {
  const services = [
    {
      icon: Bath,
      title: "Banho relaxante",
      desc: "Produtos hipoalergênicos e água na temperatura ideal.",
    },
    {
      icon: Scissors,
      title: "Tosa higiênica",
      desc: "Cortes seguros, no estilo certo para a raça do seu pet.",
    },
    {
      icon: Sparkles,
      title: "Hidratação",
      desc: "Tratamento profundo para pelos macios e brilhantes.",
    },
    {
      icon: ShieldCheck,
      title: "Cuidado seguro",
      desc: "Profissionais treinados, ambiente calmo e monitorado.",
    },
  ];
  return (
    <section className="mx-auto  px-6 py-20 bg-green-600 ">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <p className="text-sm font-medium text-sage-deep uppercase tracking-wider">
            Nossos serviços
          </p>
          <h2 className="mt-2 text-4xl font-bold text-foreground">
            Tudo o que seu therianZinho precisa em um só lugar
          </h2>
        </div>
        <NavLink
          to="/agendamento"
          className="text-sm font-medium text-sage-deep inline-flex items-center gap-1 hover:gap-2 transition-all"
        >
          Ver todos os serviços <ArrowRight className="h-4 w-4" />
        </NavLink>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-soft hover:-translate-y-1 transition-all text-red-600"
          >
            <div className="grid place-items-center h-12 w-12 rounded-xl bg-sage-soft mb-4">
              <Icon className="h-5 w-5 text-sage-deep" />
            </div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
