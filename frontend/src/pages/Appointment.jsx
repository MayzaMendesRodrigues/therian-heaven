import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subtitle } from "@/components/ui/subtitle";

import api from "@/utils/Api";
import { servicos, horarios } from "@/utils/data";
import {
  validatePetName,
  validateBreed,
  validateTutorName,
  validatePhone,
} from "@/validation/validators";
import { ConfirmationDialog } from "./components/ConformationDialog";
import { ServiceSelection } from "./components/ServiceSelection";
import { SidebarSummary } from "./components/SidebarSummary";

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
            ? "Faça login antes de confirmar o agendamento."
            : error.message,
      });
    }
  }

  const currentSelectedService = servicos.find((s) => s.id === servico);

  return (
    <>
      <ConfirmationDialog
        appointment={confirmedAppointment}
        onClose={() => setConfirmedAppointment(null)}
      />

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
              <ServiceSelection
                servicos={servicos}
                currentServiceId={servico}
                onSelectService={handleServiceSelect}
              />
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
              <CalendarCheck className="h-4 w-4 mr-2" />
              {isSubmitting ? "Salvando..." : "Confirmar agendamento"}
            </Button>
          </form>

          <SidebarSummary
            selectedService={currentSelectedService}
            horario={horario}
          />
        </section>
      </div>
    </>
  );
}
