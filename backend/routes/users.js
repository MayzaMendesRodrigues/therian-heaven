import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  loginUser,
  updateUser,
} from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, listUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
