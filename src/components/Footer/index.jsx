export default function index() {
  return (
    <footer
      id="contato"
      className="mt-24 border-t border-border/60 bg-secondary/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground">
              {/* <PawPrint className="h-4 w-4" /> */}
            </span>
            Therian Haven
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Banho, tosa e amor para o seu melhor amigo. Também cuidamos de quem
            ainda procura um lar.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Contato</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>(11) 99999-0000</li>
            <li>ola@therianhaven.com</li>
            <li>Rua das Flores, 123 — SP</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Horários</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Seg — Sex: 9h às 19h</li>
            <li>Sábado: 9h às 17h</li>
            <li>Domingo: fechado</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Feito com 🐾
      </div>
    </footer>
  );
}
