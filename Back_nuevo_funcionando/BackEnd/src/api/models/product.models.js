
import connection from "../database/db.js";

const selectAllProducts = () => {
    return connection.query("SELECT * FROM products");
}


const selectActiveProducts = () => {
    const sql = "SELECT * FROM products WHERE products.active = ?";
    return connection.query(sql, [1]);
}


const selectProductById = (id) => {
    const sql = `SELECT * FROM products WHERE products.id = ?`
    return connection.query(sql, [id,]);
}


const insertNewProduct = (name, image, category, price) => {

    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [name, image, category, price]);
}

const updateProduct = (name, image, price, category, active, id) => {
    
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";

    return connection.query(sql, [name, image, price, category, active, id]);
}

const deleteProduct = (id) => {

    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct,
    selectActiveProducts
}