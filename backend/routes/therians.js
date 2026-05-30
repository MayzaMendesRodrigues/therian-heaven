import { Router } from "express";
import {
  createTherian,
  deleteTherian,
  getTherianById,
  listTherians,
  updateTherian,
} from "../controllers/therians.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", listTherians);
router.get("/:id", getTherianById);
router.post("/", auth, createTherian);
router.put("/:id", auth, updateTherian);
router.delete("/:id", auth, deleteTherian);

export default router;
