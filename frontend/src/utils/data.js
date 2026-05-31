import { Bath, Check, Scissors, Sparkles } from "lucide-react";
export const servicos = [
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

export const horarios = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
];