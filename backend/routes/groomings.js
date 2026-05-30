import { Router } from "express";
import {
  createGrooming,
  deleteGrooming,
  getGroomingById,
  listGroomings,
  updateGrooming,
} from "../controllers/groomings.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", listGroomings);
router.get("/:id", getGroomingById);
router.post("/", auth, createGrooming);
router.put("/:id", auth, updateGrooming);
router.delete("/:id", auth, deleteGrooming);

export default router;
