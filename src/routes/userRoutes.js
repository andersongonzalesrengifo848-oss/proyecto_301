import express from 'express';
import express from '../ontrollers/userController.js';
//Traer controlador 

const router = express.Router();

//Rutas para llamar al usuario
router.get('/',userController.getUsers);
router.post('/',userController.createUser);

export default router;