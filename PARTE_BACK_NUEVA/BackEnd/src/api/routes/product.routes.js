import { Router } from "express"; 
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getActiveProducts, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router(); 

router.get("/", getAllProducts);

router.get("/active", getActiveProducts);

router.get("/:id", validateId, getProductById);

router.post("/", validateProduct, createProduct);

router.put("/", validateProduct, modifyProduct);

router.delete("/:id", validateId, removeProduct);

export default router;