import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import swaggerUi from "swagger-ui-express";

import "./config/passport.js";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecretKey123",
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "API corriendo correctamente 🚀",
  });
});

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo y escuchando en el puerto ${PORT}`);
});
