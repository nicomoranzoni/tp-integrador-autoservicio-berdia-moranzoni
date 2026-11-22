/*===========================
    Rutas de autenticacion
===========================*/

import { Router } from "express";
import connection from "../database/db.js";

const router = Router();

//login - post

router.post("/login", async (req, res) => {
  try {
    //extraemos los datos de la peticion del post - recibe datos del formulario
    const { email, password } = req.body;

    //confirmamos que vengan los datos
    if (!email || !password) {
      return res.status(400).json({
        message: "Es necesario todos los campos",
      });
    }

    //buscamos el usuario por mail y password
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const [rows] = await connection.query(sql, [email, password]);

    //confirmamos que exista el usuario
    if (rows.length === 0) {
      return res.status(401).json({
        message: "No existe el usuario ingresado",
      });
    }

    //guardamos usuario de la sesion
    const user = rows[0];
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    //muestra de login aceptado o error(temporal: JSON. Despues sera res.redirect al dashboard)
    res.status(200).json({
      message: "Login exitoso",
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error en el login: ", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

// POST que cierra sesion
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error al destruir la sesion: ", err);
      return res.status(500).json({ message: "Error al cerrar la sesion" });
    }
    res.status(200).json({ message: "Sesion cerrada" });
  });
});

export default router;
