// Importar el servicio de usuarios
import { userService } from '../services/userService.js';

export const userController = {
 // Obtener todos los usuarios
 async getUsers(req, res) {
  try {
   const users = await userService.getAllUsers();
   res.status(200).json({
    success: true,
    data: users,
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message,
   });
  }
 },
 // Crear un nuevo usuario
 async createUser(req, res) {
  try {
   const { email, name } = req.body;

   // Validación básica
   if (!email || !name) {
    return res.status(400).json({
     success: false,
     message: 'Email y nombre son obligatorios',
    });
   }

   // Crear usuario
   const newUser = await userService.createUser(null, { email, name });

   res.status(201).json({
    success: true,
    data: newUser,
    message: 'Usuario creado correctamente',
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: error.message,
   });
  }
 },
};