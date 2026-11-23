import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";
const router = Router();

router.post("/", createNewUser);

export default router;