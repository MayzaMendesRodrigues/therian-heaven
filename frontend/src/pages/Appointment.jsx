import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Bath,
  Scissors,
  Sparkles,
  Check,
  Clock,
  CalendarCheck,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import api from "@/utils/Api";
import { Subtitle } from "@/components/ui/subtitle";
import {
  validatePetName,
  validateBreed,
  validateTutorName,
  validatePhone,
} from "../validation/validators";

const servicos = [
  { id: "banho", icon: Bath, nome: "Banho", duracao: "45 min", preco: 70 },
  {
    id: "tosa",
    icon: Scissors,
    nome: "Tosa completa",
    duracao: "1h 30",
    preco: 120,
  },
  {
    id: "hidratacao",
    icon: Sparkles,
    nome: "Hidratação",
    duracao: "1h",
    preco: 90,
  },
  {
    id: "combo",
    icon: Check,
    nome: "Combo banho + tosa",
    duracao: "2h",
    preco: 170,
  },
];

const horarios = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
];

export default function Appointment() {
  const [servico, setServico] = useState("banho");
  const [horario, setHorario] = useState("10:30");
  const [feedback, setFeedback] = useState(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [petNameError, setPetNameError] = useState("");
  const [breedError, setBreedError] = useState("");
  const [tutorNameError, setTutorNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      servico: servicos[0],
      horario: "10:30",
      pet: "",
      raca: "",
      tutor: "",
      tel: "",
      data: "",
    },
  });

  useEffect(() => {
    register("servico", { required: true });
    register("horario", { required: true });
  }, [register]);

  function handleServiceSelect(selectedService) {
    setServico(selectedService.id);
    setValue("servico", selectedService, { shouldValidate: true });
  }

  function handleTimeSelect(selectedTime) {
    setHorario(selectedTime);
    setValue("horario", selectedTime, { shouldValidate: true });
  }

  async function onSubmit(formData) {
    setFeedback(null);

    const appointment = {
      servico: formData.servico,
      date: formData.data,
      time: formData.horario,
      typeOfTherian: formData.raca,
      pet: formData.pet,
      tutor: formData.tutor,
      tel: formData.tel,
    };

    try {
      await api.createGrooming(appointment);
      setConfirmedAppointment({
        servico: formData.servico,
        data: formData.data,
        horario: formData.horario,
        pet: formData.pet,
        tutor: formData.tutor,
      });
      reset({
        servico: servicos[0],
        horario: "10:30",
        pet: "",
        raca: "",
        tutor: "",
        tel: "",
        data: "",
      });
      setServico("banho");
      setHorario("10:30");
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error.message === "Acesso negado"
            ? "Faca login antes de confirmar o agendamento."
            : error.message,
      });
    }
  }

  return (
    <>
      <Dialog
        open={!!confirmedAppointment}
        onOpenChange={(open) => {
          if (!open) setConfirmedAppointment(null);
        }}
      >
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

          {confirmedAppointment && (
            <div className="mt-2 rounded-2xl bg-secondary/30 p-4 space-y-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Therian</span>
                <span className="font-medium">{confirmedAppointment.pet}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serviço</span>
                <span className="font-medium">
                  {confirmedAppointment.servico?.nome}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium">
                  {new Date(
                    confirmedAppointment.data + "T00:00:00",
                  ).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Horário</span>
                <span className="font-medium">
                  {confirmedAppointment.horario}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold text-primary">
                  R$ {confirmedAppointment.servico?.preco}
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-2 sm:justify-center">
            <Button
              className="w-full rounded-full h-11"
              onClick={() => setConfirmedAppointment(null)}
            >
              <Check className="h-4 w-4 mr-2" /> Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex flex-col font-sans bg-secondary/10">
        <Subtitle
          tag="Agendamento"
          title="Cuidados especiais para seu Therian"
          description="Agende um horário para banho, tosa ou hidratação. Cuidamos do seu pet com todo amor e segurança que ele merece."
        />

        <section className="mx-auto max-w-7xl w-full px-6 grid lg:grid-cols-[1fr_360px] gap-8 pb-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card rounded-[2rem] p-8 shadow-soft border border-border/60 space-y-8"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">
                1. Escolha o serviço
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {servicos.map(({ id, icon: Icon, nome, duracao, preco }) => {
                  const active = servico === id;
                  const selectedService = { id, nome, duracao, preco };

                  return (
                    <button
                      type="button"
                      key={id}
                      onClick={() => handleServiceSelect(selectedService)}
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
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                2. Dados do Therian e tutor
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="pet">Nome do Therian</Label>
                  <Input
                    id="pet"
                    {...register("pet", {
                      required: true,
                      minLength: 2,
                      maxLength: 50,
                    })}
                    required
                    minLength={2}
                    maxLength={50}
                    placeholder="Ex: Thor"
                    onChange={(e) => validatePetName(e, setPetNameError)}
                  />
                  {petNameError && (
                    <p className="text-sm text-destructive">{petNameError}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="raca">Raça / porte</Label>
                  <Input
                    id="raca"
                    {...register("raca", {
                      required: true,
                      minLength: 2,
                      maxLength: 50,
                    })}
                    required
                    minLength={2}
                    maxLength={50}
                    placeholder="Ex: Shih Tzu, pequeno"
                    onChange={(e) => validateBreed(e, setBreedError)}
                  />
                  {breedError && (
                    <p className="text-sm text-destructive">{breedError}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tutor">Seu nome</Label>
                  <Input
                    id="tutor"
                    {...register("tutor", {
                      required: true,
                      minLength: 2,
                      maxLength: 100,
                    })}
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Como podemos te chamar?"
                    onChange={(e) => validateTutorName(e, setTutorNameError)}
                  />
                  {tutorNameError && (
                    <p className="text-sm text-destructive">{tutorNameError}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tel">WhatsApp</Label>
                  <Input
                    id="tel"
                    {...register("tel", {
                      required: true,
                      minLength: 10,
                      maxLength: 15,
                    })}
                    required
                    type="tel"
                    minLength={10}
                    maxLength={15}
                    pattern={"[0-9\\s\\(\\)\\+\\-]+"}
                    placeholder="(11) 99999-0000"
                    onChange={(e) => validatePhone(e, setPhoneError)}
                  />
                  {phoneError && (
                    <p className="text-sm text-destructive">{phoneError}</p>
                  )}
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    {...register("data", { required: true })}
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">
                3. Horário disponível
              </h2>
              <div className="flex flex-wrap gap-2">
                {horarios.map((h) => {
                  const active = horario === h;
                  return (
                    <button
                      type="button"
                      key={h}
                      onClick={() => handleTimeSelect(h)}
                      className={`px-4 h-10 rounded-full text-sm font-medium border transition-all duration-200 ${
                        active
                          ? "bg-primary/10 text-primary border-primary"
                          : "bg-background border-border hover:border-primary/50"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {feedback && (
              <p className="text-sm font-medium text-destructive">
                {feedback.message}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full h-12"
              disabled={isSubmitting}
            >
              <CalendarCheck className="h-4 w-4 mr-2" />{" "}
              {isSubmitting ? "Salvando..." : "Confirmar agendamento"}
            </Button>
          </form>

          <aside className="space-y-4">
            <div className="bg-card rounded-3xl p-6 border border-border/60 shadow-soft">
              <h3 className="font-semibold text-lg">Resumo</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviço</span>
                  <span className="font-medium">
                    {servicos.find((s) => s.id === servico)?.nome}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horário</span>
                  <span className="font-medium">{horario}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 mt-3">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold text-primary">
                    R$ {servicos.find((s) => s.id === servico)?.preco}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-3xl p-6 border border-border/60">
              <h3 className="font-semibold text-primary">Cuidados especiais</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{" "}
                  Produtos hipoalergênicos
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{" "}
                  Ambiente calmo e seguro
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />{" "}
                  Equipe treinada em bem-estar animal
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
