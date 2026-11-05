import express from "express";

import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
const app = express(); // creamos una intancia de aplicacion de express,  app contendra todos los metodos que necesitamos para crear un servidor

const PORT = environments.port; // guardamos el puerto que viene del .env en una constante
app.use(cors());
app.use(express.json());

//Endpoint GET de productos
app.get("/api/products", async (req, res) => {
  /* es necesario usar el async para que me permita usar el await 
  se extraen los resultado de la consulta, no la info completa de las tablas*/
  const [rows] = await connection.query("SELECT * FROM products");
  res.status(200).json({
    //json me permite verlo en el navegador (convierte la respuesta a ese formato)
    payload: rows,
  });
});

//Endpoint GET productos by id
//solicito productos por id
app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id; // const id me permite con el objeto req extraer el numero del id para luego ejecutar la consulta

  const [rows] = await connection.query(
    `SELECT * FROM products WHERE id = ?`,
    [id], //ejecuto consulta que busca producto por id, el id = ? es la forma segura de pasar id
  );

  res.status(200).json({
    //json me permite verlo en el navegador (convierte la respuesta a ese formato)
    payload: rows,
  });
});

//Aca la aplicacion escucha las peticiones en puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
