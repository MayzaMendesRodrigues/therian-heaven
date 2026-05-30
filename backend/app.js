import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import groomingRouter from "./routes/groomings.js";
import therianRouter from "./routes/therians.js";
import userRouter from "./routes/users.js";

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI nao configurada no .env");
}

try {
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB conectado com sucesso");
} catch (error) {
  console.error("Erro ao conectar ao MongoDB", error);
  process.exit(1);
}

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origem nao permitida pelo CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Servidor Therian Haven rodando" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/therians", therianRouter);
app.use("/groomings", groomingRouter);
app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Rota nao encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
