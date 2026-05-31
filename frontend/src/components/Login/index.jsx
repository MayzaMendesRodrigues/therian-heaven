import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/utils/Api";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validatePhone,
  validateCity,
  validateAdress,
  validateEmail,
  validatePassword,
} from "../../validation/validators";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  const [adressError, setAdressError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSigninSubmit(e) {
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

      setFeedback({
        type: "success",
        message: "Login realizado com sucesso.",
      });
      navigate("/adoption");
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setFeedback(null);

    const formData = new FormData(form);

    const user = {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      cidade: formData.get("cidade"),
      endereco: formData.get("endereco"),
      email: formData.get("email"),
      senha: formData.get("senha"),
    };

    try {
      await api.signup(user);

      form.reset();
      setFeedback({
        type: "success",
        message: "Conta criada com sucesso! Usuario salvo no banco de dados.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30 font-sans">
      <main className="flex-1 grid place-items-center px-6 pb-16">
        <div className="w-full max-w-md bg-card rounded-3xl shadow-lg border border-border/50 p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Sua conta de adotante
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Entre ou crie uma conta para enviar pedidos de adoção.
          </p>

          <Tabs defaultValue="signin" className="mt-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-5">
              <form onSubmit={handleSigninSubmit} className="space-y-4">
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
                    placeholder="********"
                    minLength={8}
                    onChange={(e) => validatePassword(e, setPasswordError)}
                  />
                  {passwordError && (
                    <p className="text-sm text  -destructive">
                      {passwordError}
                    </p>
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
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="su-name">Nome completo</Label>
                  <Input
                    id="su-name"
                    name="nome"
                    placeholder="Seu nome"
                    type="text"
                    minLength={2}
                    required
                    onChange={(e) => validateName(e, setNameError)}
                  />
                  {nameError && (
                    <p className="text-sm text-destructive">{nameError}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="su-phone">Telefone</Label>
                    <Input
                      id="su-phone"
                      type="tel"
                      name="telefone"
                      placeholder="(11) 99999-0000"
                      required
                      minLength={10}
                      maxLength={15}
                      onChange={(e) => validatePhone(e, setPhoneError)}
                    />
                    {phoneError && (
                      <p className="text-sm text-destructive">{phoneError}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="su-city">Cidade</Label>
                    <Input
                      id="su-city"
                      name="cidade"
                      type="text"
                      placeholder="Sua cidade"
                      minLength={2}
                      required
                      onChange={(e) => validateCity(e, setCityError)}
                    />
                    {cityError && (
                      <p className="text-sm text-destructive">{cityError}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="su-address">Endereço</Label>
                  <Input
                    id="su-address"
                    name="endereco"
                    placeholder="Rua, número, bairro"
                    required
                    type="text"
                    minLength={5}
                    onChange={(e) => validateAdress(e, setAdressError)}
                  />
                  {adressError && (
                    <p className="text-sm text-destructive">{adressError}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="su-email">E-mail</Label>
                  <Input
                    id="su-email"
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
                  <Label htmlFor="su-password">Senha</Label>
                  <Input
                    id="su-password"
                    name="senha"
                    type="password"
                    minLength={8}
                    required
                    placeholder="********"
                    onChange={(e) => validatePassword(e, passwordError)}
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
                  {loading ? "Criando…" : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
