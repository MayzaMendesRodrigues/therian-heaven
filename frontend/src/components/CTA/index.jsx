import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
export default function Cta() {
  return (
    <section className="flex justify-center mx-auto px-6 py-20 bg-surface-muted">
      <div className="rounded-3xl mx-auto max-w-7xl p-10 md:p-14 text-center bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-2xl mx-auto">
          Pronto para mimar seu pet ou abrir o coração para um novo amigo?
        </h2>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-7 h-12 shadow-soft"
          >
            <NavLink to="/agendamento">Agendar agora</NavLink>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-7 h-12 bg-secondary text-secondary-foreground hover:bg-secondary-hover"
          >
            <NavLink to="/adocao">Ver para adoção</NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
