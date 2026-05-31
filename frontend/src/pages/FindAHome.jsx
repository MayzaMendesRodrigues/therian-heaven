import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utils/Api";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePetName,
  validateSpecies,
  validateBreed,
  validateGender,
  validateAge,
  validateWeight,
  validateCity,
  validateState,
  validateProfilePicture,
  validateBasicNeeds,
  validateSpecialNeeds,
  validateMicrochip,
  validateTraining,
  validateVaccine,
  validateApplicationDate,
  validateBio,
} from "../validation/validators";

export default function FindAHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [alimentacao, setAlimentacao] = useState("Carnivoro");
  const [castrado, setCastrado] = useState(true);
  const [vermifugado, setVermifugado] = useState(true);
  const [vacinaAplicada, setVacinaAplicada] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [petNameError, setPetNameError] = useState("");
  const [speciesError, setSpeciesError] = useState("");
  const [breedError, setBreedError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");
  const [basicNeedsError, setBasicNeedsError] = useState("");
  const [specialNeedsError, setSpecialNeedsError] = useState("");
  const [microchipError, setMicrochipError] = useState("");
  const [trainingError, setTrainingError] = useState("");
  const [vaccineError, setVaccineError] = useState("");
  const [applicationDateError, setApplicationDateError] = useState("");
  const [bioError, setBioError] = useState("");

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);

    try {
      const data = await api.login({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      localStorage.setItem("jwt", data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth:change"));

      setFeedback({ type: "success", message: "Login realizado com sucesso!" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleCadastroSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const token = localStorage.getItem("jwt") || localStorage.getItem("token");

    if (!token) {
      setFeedback({
        type: "error",
        message: "Faca login antes de salvar o cadastro.",
      });
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const vacinaNome = formData.get("vacinaNome");
    const vacinaData = formData.get("vacinaData");

    const therian = {
      id: Date.now(),
      nome: formData.get("nome"),
      theriotype: formData.get("theriotype"),
      sexo: formData.get("sexo"),
      idade: Number(formData.get("idade")),
      alimentacao,
      cidade: formData.get("cidade"),
      estado: formData.get("estado"),
      fotoPerfil: formData.get("fotoPerfil"),
      escolaridade: formData.get("escolaridade"),
      descricao: formData.get("descricao"),
      castrado,
      necessidadesEspeciais: formData.get("necessidadesEspeciais")
        ? formData
            .get("necessidadesEspeciais")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      vacinas:
        vacinaNome && vacinaData
          ? [
              {
                nome: vacinaNome,
                data: vacinaData,
                ano: new Date().getFullYear(),
                status: vacinaAplicada ? "Aplicada" : "Pendente",
              },
            ]
          : [],
    };

    try {
      const created = await api.createTherian(therian);
      const storedUser = localStorage.getItem("user");
      if (created?._id && storedUser) {
        const user = JSON.parse(storedUser);
        localStorage.setItem(`therian_owner_${created._id}`, user._id);
      }
      form.reset();
      setAlimentacao("Carnivoro");
      setCastrado(true);
      setVermifugado(true);
      setVacinaAplicada(true);
      setFeedback({
        type: "success",
        message: "Cadastro salvo com sucesso! Redirecionando para adocao...",
      });
      setTimeout(() => navigate("/adoption"), 1200);
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30 font-sans py-12">
      <main className="flex-1 grid place-items-center px-6">
        <div className="w-full max-w-xl bg-card rounded-3xl shadow-lg border border-border/50 p-8">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            🐾 Cadastro do Focinho
          </h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Preencher as suas informações abaixo para que os humanos possam te
            conhecer melhor.
          </p>

          <Tabs
            defaultValue="signup"
            className="mt-6"
            onValueChange={() => setFeedback(null)}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-5">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="si-email">E-mail</Label>
                  <Input
                    id="si-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    onChange={(e) => validateEmail(e, setEmailError)}
                  />
                  {emailError && (
                    <p className="text-sm text-destructive">{emailError}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="si-password">Senha</Label>
                  <Input
                    id="si-password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    onChange={(e) => validatePassword(e, setPasswordError)}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
                {feedback && (
                  <p
                    className={
                      feedback.type === "success"
                        ? "text-sm font-medium text-success"
                        : "text-sm font-medium text-destructive"
                    }
                  >
                    {feedback.message}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={loading}
                >
                  {loading ? "Entrando…" : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-5">
              <form onSubmit={handleCadastroSubmit} className="space-y-5">
                {/* Nome e Espécie */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nome do therianZinho</Label>
                    <Input
                      id="name"
                      name="nome"
                      placeholder="Ex: Mel"
                      required
                      onChange={(e) => validatePetName(e, setPetNameError)}
                    />
                    {petNameError && (
                      <p className="text-sm text-destructive">{petNameError}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="species">Espécie / Theriotype</Label>
                    <Input
                      id="species"
                      name="theriotype"
                      placeholder="Ex: Cão, Lobo"
                      required
                      onChange={(e) => validateSpecies(e, setSpeciesError)}
                    />
                    {speciesError && (
                      <p className="text-sm text-destructive">{speciesError}</p>
                    )}
                  </div>
                </div>

                {/* Raça e Gênero */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="breed">Raça específica</Label>
                    <Input
                      id="breed"
                      name="raca"
                      placeholder="Ex: Vira-lata"
                      onChange={(e) => validateBreed(e, setBreedError)}
                    />
                    {breedError && (
                      <p className="text-sm text-destructive">{breedError}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="sex">Gênero / Sexo</Label>
                    <Input
                      id="sex"
                      name="sexo"
                      placeholder="Ex: Fêmea"
                      required
                      onChange={(e) => validateGender(e, setGenderError)}
                    />
                    {genderError && (
                      <p className="text-sm text-destructive">{genderError}</p>
                    )}
                  </div>
                </div>

                {/* Idade, Peso e Porte */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      name="idade"
                      type="number"
                      min={0}
                      placeholder="Ex: 54"
                      required
                      onChange={(e) => validateAge(e, setAgeError)}
                    />
                    {ageError && (
                      <p className="text-sm text-destructive">{ageError}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="weight">O seu peso</Label>
                    <Input
                      id="weight"
                      name="peso"
                      placeholder="Ex: 80 kg"
                      onChange={(e) => validateWeight(e, setWeightError)}
                    />
                    {weightError && (
                      <p className="text-sm text-destructive">{weightError}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="size">Porte</Label>
                    <Select defaultValue="Médio">
                      <SelectTrigger id="size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pequeno">Pequeno</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Grande">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Hábito Alimentar */}
                <div className="space-y-1.5">
                  <Label htmlFor="habitoAlimentar">Hábito Alimentar</Label>
                  <Select value={alimentacao} onValueChange={setAlimentacao}>
                    <SelectTrigger id="habitoAlimentar">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carnivoro">🥩 Carnívoro</SelectItem>
                      <SelectItem value="Vegetariano">
                        🥦 Vegetariano
                      </SelectItem>
                      <SelectItem value="Vegano">🌱 Vegano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Localização */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      name="cidade"
                      placeholder="Ex: Campinas"
                      required
                      onChange={(e) => validateCity(e, setCityError)}
                    />
                    {cityError && (
                      <p className="text-sm text-destructive">{cityError}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="estado">Estado (UF)</Label>
                    <Input
                      id="estado"
                      name="estado"
                      placeholder="SP"
                      maxLength={2}
                      required
                      onChange={(e) => validateState(e, setStateError)}
                    />
                    {stateError && (
                      <p className="text-sm text-destructive">{stateError}</p>
                    )}
                  </div>
                </div>

                {/* Imagem */}
                <div className="space-y-1.5">
                  <Label htmlFor="img">URL da Imagem / Foto de Perfil</Label>
                  <Input
                    id="img"
                    name="fotoPerfil"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    required
                    onChange={(e) =>
                      validateProfilePicture(e, setProfilePictureError)
                    }
                  />
                  {profilePictureError && (
                    <p className="text-sm text-destructive">
                      {profilePictureError}
                    </p>
                  )}
                </div>

                {/* Necessidades Básicas e Especiais */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="necessidadesBasicas">
                      Necessidades Básicas
                    </Label>
                    <Input
                      id="necessidadesBasicas"
                      name="necessidadesBasicas"
                      placeholder="Ex: Preferencia por guarana Jesus ..."
                      onChange={(e) =>
                        validateBasicNeeds(e, setBasicNeedsError)
                      }
                    />
                    {basicNeedsError && (
                      <p className="text-sm text-destructive">
                        {basicNeedsError}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="necessidadesEspeciais">
                      Necessidades Especiais
                    </Label>
                    <Input
                      id="necessidadesEspeciais"
                      name="necessidadesEspeciais"
                      placeholder="Que o meu lar tenha wifi"
                      onChange={(e) =>
                        validateSpecialNeeds(e, setSpecialNeedsError)
                      }
                    />
                    {specialNeedsError && (
                      <p className="text-sm text-destructive">
                        {specialNeedsError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Clínico, Resgate e Adestramento */}
                <div className="p-4 border border-dashed rounded-2xl bg-muted/10 space-y-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Ficha Clínica e Histórico
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="microchip" className="text-xs">
                        Microchip
                      </Label>
                      <Input
                        id="microchip"
                        name="microchip"
                        placeholder="#123"
                        onChange={(e) =>
                          validateMicrochip(e, setMicrochipError)
                        }
                      />
                      {microchipError && (
                        <p className="text-sm text-destructive">
                          {microchipError}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="escolaridade" className="text-xs">
                        Treinamento
                      </Label>
                      <Input
                        id="escolaridade"
                        name="escolaridade"
                        placeholder="Adestrado"
                        required
                        onChange={(e) => validateTraining(e, setTrainingError)}
                      />
                      {trainingError && (
                        <p className="text-sm text-destructive">
                          {trainingError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="castrado"
                        checked={castrado}
                        onCheckedChange={setCastrado}
                      />
                      <Label htmlFor="castrado" className="text-xs font-medium">
                        Castrado
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vermifugado"
                        checked={vermifugado}
                        onCheckedChange={setVermifugado}
                      />
                      <Label
                        htmlFor="vermifugado"
                        className="text-xs font-medium"
                      >
                        Vermifugado
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Carteira de Vacinação */}
                <div className="p-4 border rounded-2xl bg-primary/5 space-y-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                    Carteira de Vacinação
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Nome da Vacina</Label>
                      <Input
                        name="vacinaNome"
                        placeholder="Ex: Múltipla V10"
                        onChange={(e) => validateVaccine(e, setVaccineError)}
                      />
                      {vaccineError && (
                        <p className="text-sm text-destructive">
                          {vaccineError}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Data de Aplicação</Label>
                      <Input
                        name="vacinaData"
                        placeholder="Ex: 12/02/2026"
                        onChange={(e) =>
                          validateApplicationDate(e, setApplicationDateError)
                        }
                      />
                      {applicationDateError && (
                        <p className="text-sm text-destructive">
                          {applicationDateError}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="v-aplicada"
                      checked={vacinaAplicada}
                      onCheckedChange={setVacinaAplicada}
                    />
                    <Label htmlFor="v-aplicada" className="text-xs font-medium">
                      Vacina já Aplicada
                    </Label>
                  </div>
                </div>

                {/* Biografia / Descrição */}
                <div className="space-y-1.5">
                  <Label htmlFor="bio">Biografia do therianZinho</Label>
                  <Textarea
                    id="bio"
                    name="descricao"
                    placeholder="Conte a história do therianZinho, traquinagens e comportamento..."
                    required
                    onChange={(e) => validateBio(e, setBioError)}
                  />
                  {bioError && (
                    <p className="text-sm text-destructive">{bioError}</p>
                  )}
                </div>

                {feedback && (
                  <p
                    className={
                      feedback.type === "success"
                        ? "text-sm font-medium text-success"
                        : "text-sm font-medium text-destructive"
                    }
                  >
                    {feedback.message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-full mt-2"
                  disabled={loading}
                >
                  {loading ? "Salvando…" : "Salvar Cadastro 🐾"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
