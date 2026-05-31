import "dotenv/config";
import mongoose from "mongoose";
import Therian from "../models/therians.js";

const MONGODB_URI = process.env.MONGODB_URI;

const commonVaccines = [
  {
    nome: "V8 (1 dose)",
    ano: 2026,
    data: "15/02/2026",
    status: "Aplicada",
  },
  {
    nome: "V8 (2 dose)",
    ano: 2026,
    data: "08/03/2026",
    status: "Aplicada",
  },
  {
    nome: "V8 (3 dose)",
    ano: 2026,
    data: "29/03/2026",
    status: "Aplicada",
  },
  {
    nome: "Antirrabica",
    ano: 2026,
    data: "06/2026",
    status: "Pendente",
  },
];

const therians = [
  {
    id: 1,
    nome: "Rex",
    theriotype: "Husky Espiritual",
    idade: 32,
    sexo: "Macho",
    status: true,
    descricao:
      "Milhoes de anos de evolucao para eu ficar feliz quando alguem diz quem e um bom garoto.",
    cidade: "Sao Paulo",
    estado: "SP",
    fotoPerfil: "https://example.com/therians/rex.png",
    escolaridade: "Medio",
    alimentacao: "Carnivoro",
    castrado: false,
    necessidadesEspeciais: [],
    vacinas: commonVaccines,
  },
  {
    id: 2,
    nome: "Luna",
    theriotype: "SRD Muito Confusa",
    idade: 27,
    sexo: "Femea",
    status: true,
    descricao:
      "A sociedade espera muito de alguem que so queria brincar no parque.",
    cidade: "Sao Paulo",
    estado: "SP",
    fotoPerfil: "https://example.com/therians/luna.png",
    escolaridade: "Pequeno",
    alimentacao: "Vegetariano",
    castrado: false,
    necessidadesEspeciais: [],
    vacinas: commonVaccines,
  },
  {
    id: 3,
    nome: "Tobias",
    theriotype: "Border Collie Filosofico",
    idade: 24,
    sexo: "Macho",
    status: true,
    descricao: "Aparentemente sou humano. Erro de classificacao, eu imagino.",
    cidade: "Sao Paulo",
    estado: "SP",
    fotoPerfil: "https://example.com/therians/tobias.png",
    escolaridade: "Medio",
    alimentacao: "Vegano",
    castrado: false,
    necessidadesEspeciais: [],
    vacinas: commonVaccines,
  },
  {
    id: 4,
    nome: "Amora",
    theriotype: "Labrador Premium",
    idade: 22,
    sexo: "Femea",
    status: true,
    descricao:
      "Talvez eu seja humana. Mas ja viu um humano ficar tao feliz com comida?",
    cidade: "Sao Paulo",
    estado: "SP",
    fotoPerfil: "https://example.com/therians/amora.png",
    escolaridade: "Pequeno",
    alimentacao: "Vegetariano",
    castrado: false,
    necessidadesEspeciais: [],
    vacinas: commonVaccines,
  },
  {
    id: 5,
    nome: "Bolt",
    theriotype: "Vira-lata Cosmico",
    idade: 29,
    sexo: "Macho",
    status: true,
    descricao:
      "Se eu sou humano, por que gravetos continuam parecendo uma otima ideia?",
    cidade: "Sao Paulo",
    estado: "SP",
    fotoPerfil: "https://example.com/therians/bolt.png",
    escolaridade: "Grande",
    alimentacao: "Carnivoro",
    castrado: false,
    necessidadesEspeciais: [],
    vacinas: commonVaccines,
  },
];

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI nao configurada no .env");
}

await mongoose.connect(MONGODB_URI);

for (const therian of therians) {
  await Therian.findOneAndUpdate(
    { id: therian.id },
    { $set: therian },
    {
      returnDocument: "after",
      runValidators: true,
      upsert: true,
    },
  );
}

console.log(`${therians.length} therians inseridos/atualizados com sucesso.`);

await mongoose.disconnect();
