import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  telefone: {
    type: String,
    required: true,
    trim: true,
  },
  cidade: {
    type: String,
    required: true,
    trim: true,
  },
  endereco: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Email invalido",
    },
  },
  senha: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
