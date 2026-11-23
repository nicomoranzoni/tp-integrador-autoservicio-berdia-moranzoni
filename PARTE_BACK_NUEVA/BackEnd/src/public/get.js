const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
                <p class="mensaje error">${mensaje}</p>
            `;
}

getProductForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const idProd = event.target.idProd.value.trim();
    console.log(idProd);


    if (!idProd) {
        return mostrarError("Ingresa un id valido");
    }


    try {
        const response = await fetch(`${urlBase}/api/products/${idProd}`);
        console.log(response);

        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarError(data.message);
        }

        const producto = data.payload[0];

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return mostrarError("Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let htmlProducto = `
                <ul class="listados-container">
                    <li class="li-listados">
                        <img src="${producto.image}" alt="${producto.name}" class="img-listados">
                    </li>
                    <li class="li-listados">
                        Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong>
                    </li>
                </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;
}