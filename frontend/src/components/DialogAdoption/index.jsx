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
      `${name} foi reprovado após perguntar se o pet poderia dormir no chão.`,
      `${name} demonstrou expectativas irreais sobre a própria autoridade dentro da residência.`,
      `${name} tentou impor horários para alimentação. O pet classificou isso como uma red flag.`,
      `${name} não atingiu a pontuação mínima no teste de abrir sachês sob pressão.`,
      `${name} foi considerado excessivamente otimista ao acreditar que seus objetos permaneceriam intactos.`,
      `${name} declarou gostar de silêncio. A entrevista terminou imediatamente.`,
      `${name} não conseguiu justificar por que precisa de espaço na própria cama.`,
      `${name} apresentou comportamento suspeito ao reclamar de pegadas de lama dentro de casa.`,
      `${name} acredita que plantas decorativas devem sobreviver mais de uma semana.`,
      `${name} falhou ao explicar por que o pet não deveria ocupar 98% do sofá.`,
      `${name} demonstrou resistência ao conceito de passeios durante condições climáticas questionáveis.`,
      `${name} foi incapaz de prometer atenção exclusiva durante reuniões online.`,
      `${name} não apresentou experiência prévia em interpretar miados sem contexto.`,
      `${name} tentou argumentar que fios elétricos não são brinquedos.`,
      `${name} foi considerado financeiramente instável após descobrir o preço dos petiscos premium.`,
      `${name} acredita que "não" possui significado jurídico perante um gato.`,
      `${name} demonstrou desconforto ao ouvir a expressão "surpresa no tapete".`,
      `${name} falhou no teste prático de ignorar o próprio jantar para servir o pet primeiro.`,
      `${name} não soube responder quantas fotos por dia pretende tirar do futuro chefe.`,
      `${name} foi reprovado por achar que a casa continuaria sendo dele após a adoção.`,
      `${name} apresentou sinais preocupantes de apego às próprias roupas sem pelos.`,
      `${name} tentou negociar a quantidade de brinquedos espalhados pela sala.`,
      `${name} não demonstrou preparo emocional para ser observado enquanto usa o banheiro.`,
      `${name} afirmou que pretende trabalhar sem um animal deitado sobre o teclado.`,
      `${name} foi considerado incompatível com o cargo de humano de estimação.`,
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
            duration: 8000,
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl bg-card border border-border/50 shadow-soft [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                      <span className="text-xs rounded-full bg-success-soft text-success-deep px-2.5 py-1 font-medium">
                        {selected.species}
                      </span>
                      <span className="text-xs rounded-full bg-secondary text-secondary-foreground px-2.5 py-1 font-medium">
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
                <div className="rounded-2xl border border-border bg-muted/40 p-5">
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
                    className="flex-1 rounded-full h-12 shadow-soft"
                    onClick={handleSendAdoption}
                  >
                    <Heart className="h-4 w-4 mr-2" /> Enviar pedido de adoção
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full h-12 px-7 bg-secondary text-secondary-foreground hover:bg-secondary-hover border-0"
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
        <DialogContent className="max-w-sm rounded-3xl text-center bg-card border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Voce ja e um realizador de sonhos! 🥳
            </DialogTitle>
            <DialogDescription>
              Aguarde a resposta do humano para saber se seu pedido de adoção
              foi aprovado ou não.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ENM_grufMdc?si=5ZnaRdR5OeFmiUal&autoplay=1&loop=1&playlist=ENM_grufMdc&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <DialogFooter>
            <Button
              className="w-full rounded-full h-12 shadow-soft"
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
