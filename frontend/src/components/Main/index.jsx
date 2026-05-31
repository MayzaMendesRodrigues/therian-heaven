import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import therian from "@/assets/therian-images/therian11.png";
import { NavLink } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)]" />

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card/70 border border-border px-3 py-1 text-xs font-medium text-highlight">
              <Heart className="h-3.5 w-3.5 fill-current text-accent" />
              Mais de 2.000 therianZinhos cuidados
            </span>

            <h1 className="mt-5 font-display text-5xl md:text-6xl font-bold leading-[1.05] text-foreground max-w-2xl">
              Um paraíso criado para eles.
            </h1>

            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Banho, tosa e muito carinho em um lugar criado para therianzinhos.
              Um espaço onde eles recebem os cuidados que merecem e podem
              encontrar uma família para chamar de lar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 bg-background/60 border-border hover:bg-card text-highlight"
              >
                <NavLink to="/adocao">
                  <Heart className="h-4 w-4 text-accent" />
                  <p>Adotar um therianZinho</p>
                </NavLink>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 text-foreground font-medium">
                <Star className="h-4 w-4 fill-current text-accent" /> 2.3/5
                <span className="text-foreground font-normal">
                  de tutores felizes
                </span>
              </div>
            </div>
          </div>

          <div className="relative w-full min-h-[60vh] lg:min-h-[80vh] flex items-center space-between overflow-visible">
            <div className="absolute -inset-4 md:-inset-10 -rotate-1 rounded-[60px] md:rounded-[120px] rounded-bl-[180px] md:rounded-bl-[300px] -z-10" />

            <img
              src={therian}
              alt="Imagem de um therianZinho feliz e saudável, representando o cuidado e amor que oferecemos aos nossos amigos peludos."
              width={1536}
              height={1280}
              className="relative w-full h-[70vh] md:h-[70vh] lg:h-[70vh] object-cover 
               rounded-[60px] md:rounded-[100px] 
               rounded-bl-[150px] md:rounded-bl-[250px] 
               rounded-tr-[40px] md:rounded-tr-[150px]
               lg:-mr-32 lg:w-[100%] lg:max-w-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
