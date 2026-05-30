import mongoose from "mongoose";
import Therian from "../models/therians.js";

const getTherianFilter = (id) => {
  const numericId = Number(id);

  if (!Number.isNaN(numericId)) {
    return { id: numericId };
  }

  if (mongoose.Types.ObjectId.isValid(id)) {
    return { _id: id };
  }

  return null;
};

const handleTherianError = (error, res, next) => {
  if (error.name === "ValidationError") {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error.code === 11000) {
    res.status(409).json({ message: "Therian ja cadastrado" });
    return;
  }

  next(error);
};

export const listTherians = async (req, res, next) => {
  try {
    const therians = await Therian.find();
    res.json(therians);
  } catch (error) {
    next(error);
  }
};

export const getTherianById = async (req, res, next) => {
  try {
    const filter = getTherianFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const therian = await Therian.findOne(filter);

    if (!therian) {
      res.status(404).json({ message: "Therian nao encontrado" });
      return;
    }

    res.json(therian);
  } catch (error) {
    next(error);
  }
};

export const createTherian = async (req, res, next) => {
  try {
    const therian = await Therian.create(req.body);
    res.status(201).json(therian);
  } catch (error) {
    handleTherianError(error, res, next);
  }
};

export const updateTherian = async (req, res, next) => {
  try {
    const filter = getTherianFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const therian = await Therian.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });

    if (!therian) {
      res.status(404).json({ message: "Therian nao encontrado" });
      return;
    }

    res.json(therian);
  } catch (error) {
    handleTherianError(error, res, next);
  }
};

export const deleteTherian = async (req, res, next) => {
  try {
    const filter = getTherianFilter(req.params.id);

    if (!filter) {
      res.status(400).json({ message: "ID invalido" });
      return;
    }

    const therian = await Therian.findOneAndDelete(filter);

    if (!therian) {
      res.status(404).json({ message: "Therian nao encontrado" });
      return;
    }

    res.json({ message: "Therian removido com sucesso" });
  } catch (error) {
    next(error);
  }
};
