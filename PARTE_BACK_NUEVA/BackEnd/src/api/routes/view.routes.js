import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaCrearUser, vistaEliminar, vistaModificar, vistaPrincipal } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();

router.get("/principal", vistaPrincipal);

router.get("/consultar",vistaConsultar);

router.get("/crear",vistaCrear)

router.get("/crearUser",vistaCrearUser);

router.get("/modificar", vistaModificar)

router.get("/eliminar",vistaEliminar);

export default router;