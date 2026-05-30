import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

const getUserFilter = (id) => {
  const numericId = Number(id);

  if (!Number.isNaN(numericId)) {
    return { id: numericId };
  }

  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: id };
  }

  return null;
};

const handleUserError = (error, res, next) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0];
    const message =
      field === "email"
        ? "Email ja cadastrado"
        : `Valor duplicado no campo ${field || "desconhecido"}`;

    res.status(409).json({ message });
    return;
  }

  next(error);
};

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const filter = getUserFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const user = await User.findOne(filter);

    if (!user) {
      res.status(404).json({ message: "Usuario nao encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const userResponse = user.toObject();
    delete userResponse.senha;

    res.status(201).json(userResponse);
  } catch (error) {
    handleUserError(error, res, next);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, senha, password } = req.body;
    const userPassword = senha || password;

    if (!email || !userPassword) {
      res.status(400).json({ message: "Informe email e senha" });
      return;
    }

    const user = await User.findOne({ email }).select("+senha");

    if (!user || user.senha !== userPassword) {
      res.status(401).json({ message: "Email ou senha invalidos" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1d" },
    );

    const userResponse = user.toObject();
    delete userResponse.senha;

    res.json({ token, user: userResponse });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const filter = getUserFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const user = await User.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({ message: "Usuario nao encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    handleUserError(error, res, next);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const filter = getUserFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const user = await User.findOneAndDelete(filter);

    if (!user) {
      res.status(404).json({ message: "Usuario nao encontrado" });
      return;
    }

    res.json({ message: "Usuario removido com sucesso" });
  } catch (error) {
    next(error);
  }
};
