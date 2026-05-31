import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardAdoption from "../CardAdoption";
import { Subtitle } from "../ui/subtitle";

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
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <Subtitle
              tag="Adoção"
              title="Eles estão à sua espera"
              description="Enquanto você lê esta mensagem, muitos deles passam mais um dia esperando por uma família. Ao adotar, você não muda apenas a vida de um Therian — você se torna o mundo inteiro dele."
            />
            {preview && (
              <NavLink
                to={viewAllPath}
                className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
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
