const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProductForm");
const createProductForm = document.getElementById("createProductForm");

function validarFormulario(data) {
    const errores = [];

    if (!data.name || !data.price || !data.image || !data.category) {
        errores.push("Faltan campos requeridos");
    }

    if (data.name.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (data.price < 0) {
        errores.push("El precio debe ser un numero entero mayor a 0");
    }

    return errores;
}


function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${tipo}">${mensaje}</p>
    `;
}

function mostrarListaErrores(array) {
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores += `<p class="mensaje error">${error}</p>`
    });

    contenedorProductos.innerHTML = htmlErrores;
}


createProductForm.addEventListener("submit", async event => {

    event.preventDefault(); // Evitamos el envio por defecto del <form>

    const formData = new FormData(event.target);
    console.log(formData);

    const formObj = Object.fromEntries(formData.entries());
    console.log(formObj);

    formObj.price = Number(formObj.price);
    formObj.name = formObj.name.trim();

    const errores = validarFormulario(formObj);

    if (errores.length > 0) {
        console.error(errores);
        return mostrarListaErrores(errores)
    };

    console.log(JSON.stringify(formObj));

    try {
        const response = await fetch(`${urlBase}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        });
        console.log(response);
        const data = await response.json(); 

        if (!response.ok) {
            if (data.listaErrores) {
                return mostrarListaErrores(data.listaErrores);
            }

            return mostrarMensaje("error", data.message);
        }

        let mensaje = `${data.message} con id ${data.productId}`;
        console.log(mensaje);
        mostrarMensaje("exito", mensaje);

    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return mostrarMensaje("error", "Error de conexion con el servidor");
    }
});