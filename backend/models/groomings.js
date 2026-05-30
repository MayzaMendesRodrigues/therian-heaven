import mongoose from "mongoose";

export const services = [
  { id: "banho", nome: "Banho", duracao: "45 min", preco: 70 },
  { id: "tosa", nome: "Tosa completa", duracao: "1h 30", preco: 120 },
  { id: "hidratacao", nome: "Hidratacao", duracao: "1h", preco: 90 },
  { id: "combo", nome: "Combo banho + tosa", duracao: "2h", preco: 170 },
];

const serviceIds = services.map((service) => service.id);

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      enum: serviceIds,
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    duracao: {
      type: String,
      required: true,
      trim: true,
    },
    preco: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const groomingSchema = new mongoose.Schema({
  servico: {
    type: serviceSchema,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  typeOfTherian: {
    type: String,
    required: true,
    trim: true,
  },
  pet: {
    type: String,
    required: true,
    trim: true,
  },
  tutor: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: String,
    required: true,
    trim: true,
  },
});

const Grooming = mongoose.model("Grooming", groomingSchema);

export default Grooming;
