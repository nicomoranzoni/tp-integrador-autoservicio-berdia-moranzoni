import ProductModels from "../models/product.models.js";

//Obtenemos todos los productos
export const getAllProducts = async (req, res) => {
  //optimizacion -> manejo de errores con try y catch
  try {
    //llamamos al modelo desde el controlador
    const [rows] = await ProductModels.selectAllProducts();

    //devolvemos codigo 404 si no se encuentran productos
    if (rows.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos",
      });
    }

    res.status(200).json({
      payload: rows,
      total: rows.length,
    });
  } catch (error) {
    console.log("Error al obtener productos: ", error);

    res.status(500).json({
      message: "Error interno al obtener productos",
      //500 -> si falla la conexion a la base de datos
    });
  }
};

// GET active products
export const getActiveProducts = async (req, res) => {
  try {
    // Hacemos el llamado al modelo para obtener productos activos
    const [rows] = await ProductModels.selectActiveProducts();

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos activos",
      });
    }

    res.status(200).json({
      payload: rows,
    });
  } catch (error) {
    console.log("Error obteniendo productos activos: ", error);

    res.status(500).json({
      message: "Error interno al obtener productos",
    });
  }
};
// Obtener producto por id
export const getProductById = async (req, res) => {
  // Optimizacion 2: Filtro ids no validos en el middleware validateId

  // Optimizacion 1: Manejo de errores con try ...catch
  try {
    const [rows] = await ProductModels.selectProductById(req.id);

    // Optimizacion 4: Devuelvo codigo 404 si no existe producto con ese id
    if (rows.length === 0) {
      return res.status(404).json({
        message: `No se encontro producto con id ${req.id}`,
      });
    }

    // console.log(rows);
    res.status(200).json({
      payload: rows,
    });
  } catch (error) {
    console.log("Error obteniendo productos: ", error);

    // 500 si fallo la conexion a la BBDD
    res.status(500).json({
      message: "Error interno al obtener productos",
    });
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  // Optimizacion 1: Manejo de errores con try ...catch
  try {
    // El middleware app.use(express.json())  permite que el  JSON recibido del formulario ya este transformado en objeto JS

    // recibimos el objeto
    const { category, image, name, price } = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP

    const [result] = await ProductModels.insertNewProduct(
      name,
      image,
      category,
      price,
    );

    console.log(result);

    res.status(201).json({
      message: "Producto creado exitosamente",
      productId: result.insertId, // Devolvemos el id que se le asigno al nuevo producto
    });
  } catch (error) {
    console.log("Error obteniendo productos: ", error);

    // 500 si fallo la conexion a la BBDD
    res.status(500).json({
      message: "Error interno al obtener productos",
    });
  }
};

// Modificar producto
export const modifyProduct = async (req, res) => {
  // Optimizacion 1: Manejo de errores con try ...catch
  try {
    // TO DO, incorporar modificacion de status
    // El middleware app.use(express.json())  permite que el  JSON recibido del formulario ya este transformado en objeto JS
    const { id, name, image, price, category, active } = req.body;

    const [result] = await ProductModels.updateProduct(
      name,
      image,
      price,
      category,
      active,
      id,
    );

    console.log(result);

    // Optimizacion 2: Verificamos si realmente se actualizo algo respecto de la informacion previa del producto
    if (result.changedRows === 0) {
      return res.status(404).json({
        message: "No se actualizo el producto",
      });
    }

    res.status(200).json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.log("Error obteniendo productos: ", error);

    // 500 si fallo la conexion a la BBDD
    res.status(500).json({
      message: "Error interno al modificar productos",
    });
  }
};
// Eliminar producto
export const removeProduct = async (req, res) => {
  // Optimizacion 2: Filtro ids no validos en el middleware validateId

  // Optimizacion 1: Manejo de errores con try ...catch
  try {
    await ProductModels.deleteProduct(req.id);

    res.status(200).json({
      message: `Producto con id ${req.id} eliminado exitosamente`,
    });
  } catch (error) {
    console.log("Error obteniendo productos: ", error);

    // 500 si fallo la conexion a la BBDD
    res.status(500).json({
      message: "Error interno al obtener productos",
    });
  }
};
