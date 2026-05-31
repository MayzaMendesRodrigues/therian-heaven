import { Check, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function ConfirmationDialog({ appointment, onClose }) {
  return (
    <Dialog open={!!appointment} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl text-center">
        <DialogHeader className="items-center gap-3">
          <div className="grid place-items-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
            <PartyPopper className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Agendamento confirmado!
          </DialogTitle>
          <DialogDescription className="text-base">
            Tudo certo! Seu therianZinho está na agenda.
          </DialogDescription>
        </DialogHeader>

        {appointment && (
          <div className="mt-2 rounded-2xl bg-secondary/30 p-4 space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Therian</span>
              <span className="font-medium">{appointment.pet}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Serviço</span>
              <span className="font-medium">{appointment.servico?.nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data</span>
              <span className="font-medium">
                {new Date(appointment.data + "T00:00:00").toLocaleDateString(
                  "pt-BR",
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Horário</span>
              <span className="font-medium">{appointment.horario}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-primary">
                R$ {appointment.servico?.preco}
              </span>
            </div>
          </div>
        )}

        <DialogFooter className="mt-2 sm:justify-center">
          <Button className="w-full rounded-full h-11" onClick={onClose}>
            <Check className="h-4 w-4 mr-2" /> Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
