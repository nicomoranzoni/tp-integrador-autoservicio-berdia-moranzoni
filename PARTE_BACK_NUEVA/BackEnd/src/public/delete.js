const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
                <p class="mensaje ${tipo}">${mensaje}</p>
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
            return mostrarMensaje("error", data.message);
        }

        const producto = data.payload[0];

        renderizarProducto(producto);

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
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
                    <li class="li-listados">
                        <button id="btn-eliminar">Eliminar</button>
                    </li>
                </ul>
            `;

    contenedorProductos.innerHTML = htmlProducto;

    const btnEliminar = document.getElementById("btn-eliminar");
    btnEliminar.addEventListener("click", () => {

        const confirmacion = confirm("Queres eliminar este producto?");

        if (!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/api/products/${id}`, {
            method: "DELETE"
        });

        console.log(response); 

        const data = await response.json();

        if (!response.ok) {
            console.error(data.message);
            return mostrarMensaje("error", data.message);
        }

        console.log(data.message);
        return mostrarMensaje("exito", data.message);


    } catch (error) {
        console.error("Erro al eliminar un producto: ", error);
    }
}