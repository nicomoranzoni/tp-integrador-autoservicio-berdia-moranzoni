/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import { productRoutes } from "./src/api/routes/index.js";

/*==================
    Config
==================*/
const app = express(); // instancia de express
const PORT = environments.port; // puerto desde el .env

/*==================
    Middlewares
==================*/
app.use(cors());
app.use(express.json());

/*==================
    Rutas
==================*/
app.get("/", (req, res) => {
  res.send("Hola mundo desde Express.js");
});

// Redirijo todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

/*==================
    Servidor
==================*/
// //Aca la aplicacion escucha las peticiones en puerto

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
