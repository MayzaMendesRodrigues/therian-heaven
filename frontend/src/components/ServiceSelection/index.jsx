import { Clock } from "lucide-react";

export function ServiceSelection({
  servicos,
  currentServiceId,
  onSelectService,
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {servicos.map(({ id, icon: Icon, nome, duracao, preco }) => {
        const active = currentServiceId === id;
        const selectedService = { id, nome, duracao, preco };

        return (
          <button
            type="button"
            key={id}
            onClick={() => onSelectService(selectedService)}
            className={`text-left rounded-3xl p-4 border transition-all duration-200 flex items-start gap-3 ${
              active
                ? "border-primary bg-primary/10 shadow-soft"
                : "border-border bg-background hover:border-primary/50"
            }`}
          >
            <div
              className={`grid place-items-center h-10 w-10 rounded-xl ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold text-sm">{nome}</p>
                <span className="text-sm font-semibold text-primary">
                  R$ {preco}
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
  );
}
