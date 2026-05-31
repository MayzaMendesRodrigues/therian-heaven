import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import therianLogo from "@/assets/therian logo.png";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground overflow-hidden">
                <img
                  src={therianLogo}
                  alt="Therian Heaven"
                  className="h-full w-full object-cover"
                />
              </span>
              Therian Heaven
            </NavLink>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Início
              </NavLink>

              <NavLink
                to="/agendamento"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Agendamento
              </NavLink>

              <NavLink
                to="/adocao"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Adoção
              </NavLink>

              <NavLink
                to="/encontre-um-lar"
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Encontre um lar
              </NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />

              {user ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4 gap-2 bg-primary text-foreground hover:bg-primary-hover"
                  onClick={handleLogout}
                >
                  <span className="max-w-32 truncate drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{user.nome}</span>
                  <LogOut className="h-4 w-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" aria-hidden="true" />
                  <span className="sr-only">Sair</span>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full px-4 gap-2 bg-primary text-foreground hover:bg-primary-hover hover:text-primary-foreground"
                >
                  <NavLink to="/login" className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Entrar</NavLink>
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 text-muted-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Alternar menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Navegação Mobile */}
          {isMenuOpen && (
            <nav className="md:hidden border-t border-border/60 bg-background px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-5">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Início
              </NavLink>
              <NavLink
                to="/agendamento"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Agendamento
              </NavLink>
              <NavLink
                to="/adocao"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Adoção
              </NavLink>
              <NavLink
                to="/encontre-um-lar"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                Encontre um lar
              </NavLink>
            </nav>
          )}
        </header>
      </div>
    </header>
  );
}
