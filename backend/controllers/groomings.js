import mongoose from "mongoose";
import Grooming from "../models/groomings.js";

const getGroomingFilter = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: id };
  }

  return null;
};

const handleGroomingError = (error, res, next) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ message: error.message });
    return;
  }

  next(error);
};

export const listGroomings = async (req, res, next) => {
  try {
    const groomings = await Grooming.find();
    res.json(groomings);
  } catch (error) {
    next(error);
  }
};

export const getGroomingById = async (req, res, next) => {
  try {
    const filter = getGroomingFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const grooming = await Grooming.findOne(filter);

    if (!grooming) {
      res.status(404).json({ message: "Agendamento nao encontrado" });
      return;
    }

    res.json(grooming);
  } catch (error) {
    next(error);
  }
};

export const createGrooming = async (req, res, next) => {
  try {
    const grooming = await Grooming.create(req.body);
    res.status(201).json(grooming);
  } catch (error) {
    handleGroomingError(error, res, next);
  }
};

export const updateGrooming = async (req, res, next) => {
  try {
    const filter = getGroomingFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const grooming = await Grooming.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });

    if (!grooming) {
      res.status(404).json({ message: "Agendamento nao encontrado" });
      return;
    }

    res.json(grooming);
  } catch (error) {
    handleGroomingError(error, res, next);
  }
};

export const deleteGrooming = async (req, res, next) => {
  try {
    const filter = getGroomingFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const grooming = await Grooming.findOneAndDelete(filter);

    if (!grooming) {
      res.status(404).json({ message: "Agendamento nao encontrado" });
      return;
    }

    res.json({ message: "Agendamento removido com sucesso" });
  } catch (error) {
    next(error);
  }
};
