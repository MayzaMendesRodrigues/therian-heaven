import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    function syncUser() {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("auth:change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth:change", syncUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("auth:change"));
  }

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-background border-b border-border/60">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <NavLink
              to="/"
              className="flex items-center gap-2 font-display font-bold text-lg text-foreground"
            >
              <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground">
                {/* <PawPrint className="h-4 w-4" /> */}
              </span>
              Therian Heaven
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

              <NavLink
                to="/encontre-um-lar"
                className="hover:text-foreground transition-colors"
              >
                Encontre um lar
              </NavLink>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4 gap-2 bg-accent text-foreground"
                  onClick={handleLogout}
                >
                  <span className="max-w-32 truncate">{user.nome}</span>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Sair</span>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4 gap-2 bg-accent text-foreground hover:bg-accent-foreground hover:text-accent"
                >
                  <NavLink to="/login">Entrar</NavLink>
                </Button>
              )}

              <Button
                asChild
                size="sm"
                className="rounded-full px-5 text-foreground bg-secondary"
              >
                <NavLink to="/agendamento">Agendar banho</NavLink>
              </Button>
            </div>
          </div>
        </header>
      </div>
    </header>
  );
}


