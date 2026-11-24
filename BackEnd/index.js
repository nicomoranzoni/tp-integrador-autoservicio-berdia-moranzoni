import express from "express";

import environments from "./src/api/config/environments.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { authRoutes, productRoutes, userRoutes, viewRoutes } from "./src/api/routes/index.js";
import cors from "cors";
import { __dirname, join } from "./src/api/utils/index.js";
import session from "express-session";
const app = express(); // creamos una intancia de aplicacion de express,  app contendra todos los metodos que necesitamos para crear un servidor

const {port, session_key} = environments; // guardamos el puerto que viene del .env en una constante
const PORT = port;
app.set("view engine", "ejs")
app.set("views", join(__dirname,"src/views"))
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname,"src/public")))
app.use(express.urlencoded({extended: true})); 

app.use(loggerUrl);

app.use(session({
    secret: session_key,
    resave: false, 
    saveUninitialized: true 
}));

app.get("/", (req, res) => {
    res.send("Hola mundo desde Express.js");
});

// Redirijo todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

// Redirijo todas las peticiones a /dashboard a viewRoutes.js (view.routes.js)
app.use("/dashboard", viewRoutes);

// Rutas de autenticacion
app.use("/", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});