import mongoose from "mongoose";
import validator from "validator";

const vacinaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    ano: {
      type: Number,
      required: true,
      min: 0,
    },
    data: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Aplicada",
      enum: ["Aplicada", "Pendente", "Atrasada"],
    },
  },
  { _id: false },
);

const therianSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  theriotype: {
    type: String,
    required: true,
    trim: true,
  },
  idade: {
    type: Number,
    required: true,
    min: 0,
  },
  sexo: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  descricao: {
    type: String,
    required: true,
    trim: true,
  },
  cidade: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    required: true,
    trim: true,
  },
  fotoPerfil: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: "URL da foto de perfil invalida",
    },
  },
  escolaridade: {
    type: String,
    required: true,
    trim: true,
  },
  alimentacao: {
    type: String,
    required: true,
    trim: true,
    enum: ["Vegetariano", "Vegano", "Carnivoro", "Onivoro"],
  },
  castrado: {
    type: Boolean,
    required: true,
    default: false,
  },
  necessidadesEspeciais: {
    type: [String],
    default: [],
  },
  vacinas: {
    type: [vacinaSchema],
    default: [],
  },
});

const Therian = mongoose.model("Therian", therianSchema);

export default Therian;
