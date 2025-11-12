// src/controllers/authController.js
import { authServices } from "../services/authService.js";
import { generateToken } from "../utils/auth.js";

export const authControllers = {
    // Registro tradicional
    async register(req, res) {
        try {
            const { email, name, password } = req.body;
            const result = await authServices.register({ email, name, password });

            res.status(201).json({
                success: true,
                message: "Usuario registrado exitosamente",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Callback de Google
    async googleCallback(req, res) {  // ✔ Recibe req y res
        try {
            const user = req.user;  // Passport agrega el usuario a req
            const token = generateToken(user.id, user.email);

            // Redirige al frontend con token
            res.redirect(`http://localhost:5173/login-sucess?token=${token}`);
        } catch (error) {
            // Redirige al frontend a la página de error
            res.redirect(`http://localhost:5173/login-error?message=${error.message}`);
        }
    }
};
