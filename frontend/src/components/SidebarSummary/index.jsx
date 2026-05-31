import { Check } from "lucide-react";

export function SidebarSummary({ selectedService, horario }) {
  return (
    <aside className="space-y-4">
      <div className="bg-card rounded-3xl p-6 border border-border/60 shadow-soft">
        <h3 className="font-semibold text-lg">Resumo</h3>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Serviço</span>
            <span className="font-medium">{selectedService?.nome}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horário</span>
            <span className="font-medium">{horario}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 mt-3">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold text-primary">
              R$ {selectedService?.preco}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-3xl p-6 border border-border/60">
        <h3 className="font-semibold text-primary">Cuidados especiais</h3>
        <ul className="mt-3 space-y-2 text-sm text-foreground/80">
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            Produtos hipoalergênicos
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            Ambiente calmo e seguro
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            Equipe treinada em bem-estar animal
          </li>
        </ul>
      </div>
    </aside>
  );
}
