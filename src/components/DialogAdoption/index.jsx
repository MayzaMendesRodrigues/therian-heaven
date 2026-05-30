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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function DialogAdoption({ selected, onClose }) {
  return (
    <Dialog open={!!selected} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl bg-green-600">
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
                    <strong className="text-foreground">Resgatado em:</strong>{" "}
                    {selected.resgate}
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
                          className={`flex h-7 w-7 items-center justify-center rounded-full ${v.aplicada ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
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
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${v.aplicada ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
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
                  onClick={() => {
                    toast({
                      title: "Pedido de adoção enviado!",
                      description: `Entraremos em contato sobre ${selected.name} em breve.`,
                    });
                    onClose();
                  }}
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
