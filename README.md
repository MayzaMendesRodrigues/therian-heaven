<img width="907" height="557" alt="Group 16" src="https://github.com/user-attachments/assets/1ab75786-e7a2-493e-895a-5db3cd40a1d2" />

 # 🐾 Therian Heaven

> *"Um lar para quem late, mia, ruge e às vezes também paga boleto."*

---

## O que é isso aqui?

Therian Heaven é uma plataforma full-stack de adoção e cuidados para **Therians** — pets com personalidade, histórias únicas e às vezes necessidades especiais que o petshop da esquina simplesmente não está preparado para lidar.

Aqui você pode:
- **Adotar** um companheiro peludo (ou escamoso, ou emplumado — sem julgamentos)
- **Agendar banhos e tosas** porque higiene é importante mesmo pra quem vive na lama
- **Cadastrar seu Therian** para encontrar um lar novo (ou pelo menos um humano tolerável)

---

## Stack Tecnológica

*Ou: "por que usamos essas coisas em vez de jQuery"*

### Frontend
| Tecnologia | Versão | Por que? |
|---|---|---|
| **React** | 19 | Porque o Vue não foi convidado |
| **Vite** | 8 | Para o `npm run dev` não levar 40 anos |
| **TailwindCSS** | 3 | Porque escrever CSS de verdade é sofrimento |
| **shadcn/ui** | - | Componentes bonitos que fingimos ter feito |
| **Radix UI** | - | Acessibilidade sem choro |
| **React Hook Form + Zod** | - | Validação de formulário que funciona de verdade |
| **React Router DOM** | 7 | SPA que não 404 na cara dura |
| **Recharts** | - | Gráficos que estão lá... por precaução |
| **date-fns** | - | Porque `new Date()` sozinho é um pesadelo |
| **Lucide React** | - | Ícones bonitinhos sem culpa |

### Backend
| Tecnologia | Versão | Por que? |
|---|---|---|
| **Node.js + Express** | - | API REST que faz o trabalho sujo |
| **MongoDB + Mongoose** | - | Banco que aceita schemas flexíveis como a nossa sanidade |
| **JWT** | - | Autenticação sem sessão no servidor (modernos demais) |
| **CORS** | - | Para o browser parar de reclamar |

---

## Pré-requisitos

Antes de rodar, certifique-se que você tem:

- **Node.js** instalado (se não tem, o que você está fazendo aqui?)
- **MongoDB** — pode ser local ou Atlas (gratuito e na nuvem, igual a dívida)
- **npm** ou outro gerenciador de pacotes da sua escolha existencial
- Café ☕ (opcional, mas fortemente recomendado)

---

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/NicolasSG/therian-heaven.git
cd therian-heaven
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` (não commita isso, sério):

```env
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/therian-heaven
PORT=4000
JWT_SECRET=uma-string-secreta-que-nao-seja-123456
```

Rode o servidor:

```bash
npm run dev
```

O backend vai subir em `http://localhost:4000`. Se aparecer um erro de conexão com o banco, é o MongoDB te ignorando — revise a URI.

**Bônus:** popule o banco com pets de exemplo:

```bash
npm run seed:therians
```

### 3. Configurar o Frontend

```bash
cd ../frontend
npm install
```

Se precisar apontar para outro backend, crie um `.env`:

```env
VITE_API_URL=http://localhost:4000
```

Rode o frontend:

```bash
npm run dev
```

Acesse `http://localhost:5173` e seja recebido pela tela inicial com nosso mascote.

---

## Estrutura do Projeto

```
therian-heaven/
├── backend/
│   ├── app.js                  # Coração do servidor
│   ├── controllers/            # Quem manda de verdade
│   │   ├── users.js
│   │   ├── therians.js
│   │   └── groomings.js
│   ├── models/                 # Formatos do banco
│   ├── routes/                 # Endereços da API
│   ├── middlewares/            # Auth: "você tem permissão?"
│   └── scripts/                # Seeds para popular o banco
│
└── frontend/
    └── src/
        ├── pages/              # As telas
        │   ├── Home (/)
        │   ├── Appointment (/agendamento)
        │   ├── FindAHome (/encontre-um-lar)
        │   └── Adoption (/adocao)
        ├── components/         # Blocos de UI
        │   ├── ui/             # shadcn/ui components
        │   ├── Header/
        │   ├── Footer/
        │   ├── Main/           # Hero section
        │   ├── Services/       # Cards de serviço
        │   ├── Adoption/       # Galeria de adoção
        │   ├── CardAdoption/   # Card individual do pet
        │   ├── DialogAdoption/ # Modal com detalhes
        │   ├── Login/
        │   └── CTA/
        ├── utils/              # Cliente HTTP
        ├── hooks/              # Hooks customizados
        └── lib/                # Helpers e utilitários
```

---

## Rotas da API

**Base URL:** `http://localhost:4000`

### Públicas (sem autenticação, pra quem ainda não confia)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Servidor vivo? Sim. |
| `GET` | `/health` | Health check |
| `POST` | `/login` | Entrar na plataforma |
| `GET` | `/therians` | Listar todos os pets |
| `GET` | `/therians/:id` | Ver um pet específico |

### Protegidas (JWT obrigatório, sem desculpas)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/users` | Criar conta |
| `POST` | `/therians` | Cadastrar um pet |
| `PUT` | `/therians/:id` | Atualizar pet |
| `DELETE` | `/therians/:id` | Remover pet (tristeza) |
| `POST` | `/grooming` | Agendar serviço |
| `GET` | `/grooming` | Listar agendamentos |

---

## Funcionalidades

### Adoção
- Galeria de pets disponíveis
- Modal com ficha completa: nome, espécie, idade, peso, dieta, histórico de vacinas...
- Dono pode remover o próprio cadastro (autonomia total)

### Agendamento de Serviços
Escolha entre:
- **Banho** — R$ 70
- **Tosa** — R$ 90
- **Hidratação** — R$ 110
- **Combo** — R$ 170 (o pet merece)

Horários disponíveis: 09:00 às 18:00 (o petshop precisa dormir).

### Cadastro de Therians
Formulário completo com:
- Informações básicas (nome, espécie/theriotype, idade, sexo, peso)
- Localização (cidade, estado)
- Dieta (Carnívoro, Vegetariano, Vegano, Onívoro)
- Histórico de vacinas e castração
- Necessidades especiais
- Microchip
- Foto (via URL — não inventamos hospedagem de imagem ainda)

---

## Design

- **Fonte Display:** Outfit
- **Fonte Body:** Figtree
- **Cores:** tons de terra, verde sálvia e terracota — porque pets merecem um site que parece um jardim, não uma planilha
- **Bordas:** arredondadas demais (32-48px). É intencional.
- **Modo:** sem dark mode por enquanto. Os pets preferem claridade.

---

## Scripts Disponíveis

### Backend
```bash
npm run dev            # Inicia o servidor
npm run seed:therians  # Popula o banco com pets
```

### Frontend
```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Build para produção
npm run lint     # Verifica o código (e o estilo de vida)
npm run preview  # Preview do build de produção
```

---

## Variáveis de Ambiente

### Backend (`backend/.env`)
```env
MONGODB_URI=   # String de conexão MongoDB
PORT=4000      # Porta do servidor (padrão: 4000)
JWT_SECRET=    # Segredo para assinar os tokens
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:4000   # URL da API
```

---

## Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/nome-da-feature`
3. Faça suas alterações com commits descritivos
4. Abra um Pull Request com uma descrição clara do que foi feito
5. Aguarde review (com paciência — somos humanos, não bots)

---

## Aviso Legal

Nenhum animal foi prejudicado na criação desta plataforma. Todos os Therians cadastrados no banco de seed são fictícios. Qualquer semelhança com pets reais é mera coincidência e também uma benção.

---

## A Equipe

As pessoas responsáveis por isso tudo — vá pedir um petisco (vulgo biscoito) ou deixar um carinho no nosso LinkedIn:


- 🐾 **Mayza Rodrigues**  
  ↳ https://www.linkedin.com/in/mayza-ynara-mendes-rodrigues/

- 🐾 **Luiz Hondo**  
  ↳ https://www.linkedin.com/in/luizhondo/

- 🐾 **Gisela Elia**  
  ↳ https://www.linkedin.com/in/giselaelia/

- 🐾 **Nicolas SG**  
  ↳ https://www.linkedin.com/in/nicolas-sg-br/

- 🐾 **Marcela Couto**  
  ↳ https://www.linkedin.com/in/marcela-graef-do-couto-8163472b0/



Cinco pessoas que decidiram, em sã consciência, construir um lar digital para Therians. Aplausos.

---

    *Feito com carinho, café e uma pitada saudável de caos.* 🐾

---


---

*Feito com carinho, no Hacka da CodeCon* 🐾
