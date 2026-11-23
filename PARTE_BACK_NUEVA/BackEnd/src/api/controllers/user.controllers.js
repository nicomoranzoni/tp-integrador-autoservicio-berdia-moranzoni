/*============================
    Controladores usuario
============================*/

import { insertNewUser } from "../models/user.models.js";

// Crear usuario admin
export const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [result] = await insertNewUser(name, email, password);

    console.log(result);

    // cuadno este integrada la vista hay que cambiar el  JSON por res.render:
    // res.render("createUser", {
    //   title: "Crear usuario",
    //   about: "Crear usuario admin",
    //   message: "Usuario creado exitosamente"
    // });

    // usamos res.status.json para probar hasta integrar la vista del back
    res.status(201).json({
      message: "Usuario creado exitosamente",
      userId: result.insertId,
    });
  } catch (error) {
    console.log("Error creando usuario: ", error);
    res.status(500).json({
      message: "Error interno al crear usuario",
    });
  }
};