import mongoose from "mongoose";
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
    res.status(409).json({ message: "Usuario ja cadastrado" });
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
