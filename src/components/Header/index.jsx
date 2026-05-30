import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header className="header-container">
      <div className="header-wrapper">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <NavLink
              to="/"
              className="flex items-center gap-2 font-display font-bold text-lg text-foreground"
            >
              <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground">
                {/* <PawPrint className="h-4 w-4" /> */}
              </span>
              Therian Haven
            </NavLink>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <NavLink
                to="/"
                className="hover:text-foreground transition-colors"
              >
                Início
              </NavLink>
              <NavLink
                to="/agendamento"
                className="hover:text-foreground transition-colors"
              >
                Agendamento
              </NavLink>
              <NavLink
                to="/adocao"
                className="hover:text-foreground transition-colors"
              >
                Adoção
              </NavLink>
            </nav>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full px-5"
            >
              <NavLink to="/login">Entrar</NavLink>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full px-5 bg-amber-600"
            >
              <NavLink to="/agendamento">Agendar banho</NavLink>
            </Button>
          </div>
        </header>
      </div>
    </header>
  );
}
