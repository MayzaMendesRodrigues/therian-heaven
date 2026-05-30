import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardAdoption from "../CardAdoption";

function hasAuthToken() {
  return Boolean(localStorage.getItem("jwt") || localStorage.getItem("token"));
}

export default function Adoption({ preview = false }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(hasAuthToken);

  useEffect(() => {
    function syncAuth() {
      setIsLoggedIn(hasAuthToken());
    }

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth:change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth:change", syncAuth);
    };
  }, []);

  useEffect(() => {
    if (!preview && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, preview]);

  const viewAllPath = isLoggedIn ? "/adoption" : "/login";

  return (
    <div>
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-medium text-sage-deep uppercase tracking-wider">
                Adoção
              </p>
              <h2 className="mt-2 text-4xl font-bold text-foreground bg-yellow-600 text-blue-600">
                Eles estão à sua espera
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl text-red-600">
                Enquanto você lê esta mensagem, muitos deles passam mais um dia
                sem uma família. Adotar não muda apenas a vida de um animal —
                muda o mundo dele.
              </p>
            </div>
            {preview && (
              <NavLink
                to={viewAllPath}
                className="text-sm font-medium text-sage-deep inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Ver todos <ArrowRight className="h-4 w-4" />
              </NavLink>
            )}
          </div>
          {preview || isLoggedIn ? (
            <CardAdoption limit={preview ? 3 : null} />
          ) : null}
        </div>
      </section>
    </div>
  );
}
