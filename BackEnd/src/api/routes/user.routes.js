/*======================
    Rutas usuario
======================*/

import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";

const router = Router();

// POST crear un nuevo usuario
router.post("/", createNewUser); //hacemos post a la raiz y ejectuamos crear nuevo usuario

export default router;
