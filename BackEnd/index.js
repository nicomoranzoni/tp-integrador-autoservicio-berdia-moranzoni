/*==================
    Importaciones
==================*/
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
import {
  productRoutes,
  authRoutes,
  userRoutes,
} from "./src/api/routes/index.js";
import session from "express-session"; //importo session

/*==================
    Config
==================*/
const app = express(); // instancia de express
const { port, session_key } = environments;
const PORT = port; // puerto desde el .env

/*==================
    Middlewares
==================*/
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Middleware para parsear los datos de form HTML

//middleware de sesion, coniguro las sesiones con la clave secreta
app.use(
  session({
    secret: session_key,
    resave: false,
    saveUninitialized: true,
  }),
);

/*==================
    Rutas
==================*/
app.get("/", (req, res) => {
  res.send("Hola mundo desde Express.js");
});

// redirigimos las peticiones  a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

app.use("/", authRoutes); //rutas para el login

app.use("/api/users", userRoutes);

/*==================
    Servidor
==================*/
// //Aca la aplicacion escucha las peticiones en puerto

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
