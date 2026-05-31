import {
  MapPin,
  Heart,
  Check,
  Calendar,
  PawPrint,
  Weight,
  Ruler,
  Stethoscope,
  Syringe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function DialogAdoption({ selected, onClose }) {
  const [successOpen, setSuccessOpen] = useState(false);

  function handleCloseSuccess() {
    setSuccessOpen(false);
    onClose();
  }

  function handleSendAdoption() {
    setSuccessOpen(true);

    const name = selected.name;
    const COUNTDOWN = 40;
    const approved = Math.random() < 0.5;

    const rejectionReasons = [
      `${name} foi reprovado após declarar que "o sofá é meu".`,
      `${name} tentou negociar quem manda na casa. O pet venceu a entrevista.`,
      `${name} apresentou sinais preocupantes de gostar de dormir sem um gato pisando no rosto.`,
      `${name} não sobreviveu à fase experimental de latidos às 4h da manhã.`,
      `${name} foi considerado emocionalmente frágil para encontrar vômito no tapete às 7h.`,
      `${name} acredita que portas fechadas impedem a entrada de gatos.`,
      `${name} demonstrou excesso de apego aos próprios móveis.`,
      `${name} afirmou que nunca falaria sozinho com um animal. A banca avaliadora caiu na risada.`,
      `${name} ainda acha que poderá ir ao banheiro desacompanhado.`,
      `${name} não apresentou evidências de que aceita ser ignorado após gastar uma fortuna em brinquedos.`,
      `${name} falhou ao responder quem ocupa o topo da cadeia alimentar da casa.`,
      `${name} não está preparado para pagar a comida premium e receber desprezo em troca.`,
      `${name} apresentou resistência ao conceito de pelos em absolutamente tudo.`,
      `${name} acredita que acordar cedo é uma escolha.`,
      `${name} foi informado sobre a existência de veterinários e decidiu fugir da entrevista.`,
    ];

    const rejectionReason =
      rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];

    const { update, dismiss } = toast({
      title: `⏳ ${name} · aguardando aprovação`,
      description: `${COUNTDOWN}s restantes`,
      duration: Infinity,
    });

    let remaining = COUNTDOWN;
    const interval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(interval);
        dismiss();
        if (approved) {
          toast({ title: `✓ Adoção de ${name} aprovada!`, duration: 1000 });
        } else {
          toast({
            title: `✗ Pedido de adoção reprovado`,
            description: rejectionReason,
            variant: "destructive",
            duration: 80000,
          });
        }
      } else {
        update({
          title: `⏳ ${name} · aguardando aprovação`,
          description: `${remaining}s restantes`,
        });
      }
    }, 1000);
  }

  return (
    <>
      <Dialog
        open={!!selected && !successOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl bg-success">
          {selected && (
            <>
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto bg-muted overflow-hidden relative">
                  <img
                    src={selected.img}
                    alt={selected.name}
                    placeholder="blur"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs rounded-full bg-sage-soft text-sage-deep px-2.5 py-1 font-medium">
                        {selected.species}
                      </span>
                      <span className="text-xs rounded-full bg-muted px-2.5 py-1 font-medium">
                        {selected.sex}
                      </span>
                    </div>
                    <DialogTitle className="font-display text-3xl font-bold">
                      {selected.name}
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      {selected.bio}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Grid de Informações Técnicas */}
                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <InfoItem
                      icon={<Calendar className="h-4 w-4" />}
                      label="Idade"
                      value={selected.age}
                    />
                    <InfoItem
                      icon={<PawPrint className="h-4 w-4" />}
                      label="Raça"
                      value={selected.breed}
                    />
                    <InfoItem
                      icon={<Weight className="h-4 w-4" />}
                      label="Peso"
                      value={selected.weight}
                    />
                    <InfoItem
                      icon={<Ruler className="h-4 w-4" />}
                      label="Porte"
                      value={selected.size}
                    />
                    <InfoItem
                      icon={<MapPin className="h-4 w-4" />}
                      label="Local"
                      value={selected.local}
                    />
                    <InfoItem
                      icon={<Stethoscope className="h-4 w-4" />}
                      label="Castrado"
                      value={selected.castrado ? "Sim" : "Não"}
                    />
                  </div>

                  {/* Dados de Resgate */}
                  <div className="mt-6 text-xs text-muted-foreground space-y-1.5 bg-muted/40 p-3 rounded-xl">
                    <p>
                      <strong className="text-foreground">Microchip:</strong>{" "}
                      {selected.microchip}
                    </p>
                    <p>
                      <strong className="text-foreground">Alimentação:</strong>{" "}
                      {selected.alimentacao}
                    </p>
                    <p>
                      <strong className="text-foreground">Vermifugado:</strong>{" "}
                      {selected.vermifugado ? "Sim" : "Não"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção Inferior: Carteira de Vacinação e Ações */}
              <div className="px-6 md:px-8 pb-8">
                <div className="rounded-2xl border border-border bg-sage-soft/10 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Syringe className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-xl font-semibold">
                      Carteira de vacinação
                    </h3>
                  </div>
                  <ul className="divide-y divide-border/60">
                    {selected.vacinas.map((v) => (
                      <li
                        key={v.nome}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full ${v.aplicada ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}
                          >
                            {v.aplicada ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Calendar className="h-4 w-4" />
                            )}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{v.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {v.data}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${v.aplicada ? "bg-success-soft text-success-deep" : "bg-warning-soft text-warning-deep"}`}
                        >
                          {v.aplicada ? "Aplicada" : "Pendente"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botões de Ação */}
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 rounded-full"
                    onClick={handleSendAdoption}
                  >
                    <Heart className="h-4 w-4 mr-2" /> Enviar pedido de adoção
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={onClose}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={successOpen}
        onOpenChange={(open) => !open && handleCloseSuccess()}
      >
        <DialogContent className="max-w-sm rounded-3xl text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Pedido enviado com sucesso
            </DialogTitle>
            <DialogDescription>
              Entraremos em contato em breve.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="w-full rounded-full"
              onClick={handleCloseSuccess}
            >
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <div className="text-primary bg-primary/10 p-2 rounded-xl">{icon}</div>
      <div>
        <span className="font-medium text-foreground block text-xs">
          {label}
        </span>
        <span className="text-xs">{value}</span>
      </div>
    </div>
  );
}
