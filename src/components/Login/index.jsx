import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="si-email">E-mail</Label>
                  <Input
                    id="si-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="si-password">Senha</Label>
                  <Input id="si-password" type="password" required />
                </div>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="su-name">Nome completo</Label>
                  <Input id="su-name" placeholder="Seu nome" required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="su-phone">Telefone</Label>
                    <Input
                      id="su-phone"
                      placeholder="(11) 99999-0000"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="su-city">Cidade</Label>
                    <Input id="su-city" placeholder="Sua cidade" required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="su-address">Endereço</Label>
                  <Input
                    id="su-address"
                    placeholder="Rua, número, bairro"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="su-email">E-mail</Label>
                  <Input
                    id="su-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="su-password">Senha</Label>
                  <Input id="su-password" type="password" required />
                </div>

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
