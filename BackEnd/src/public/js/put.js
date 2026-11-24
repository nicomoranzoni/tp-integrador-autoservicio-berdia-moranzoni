const urlBase = "http://localhost:3000";
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedor-form");
const getProductForm = document.getElementById("getProductForm");

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
                            <button id="btn-modificar">Modificar</button>
                            </li>
                            </ul>
                            `;

    contenedorProductos.innerHTML = htmlProducto;

    const btnModificar = document.getElementById("btn-modificar");
    btnModificar.addEventListener("click", () => {

        const confirmacion = confirm("Querés modificar este producto?");

        if (!confirmacion) {
            alert("Modificacion cancelada");
        } else {
            renderizarFormularioPut(producto);
        }
    });
}


function renderizarFormularioPut(producto) {
    console.table(producto);

    let htmlForm = `
            <!-- Formulario PUT product -->
            <h3>Modificar producto</h3>
            
            <form id="modifyProductForm">
                
                <input type="hidden" name="id" id="idProd" value="${producto.id}">
                
                <label for="categoryProd">Categoria</label>
                <select name="category" id="categoryProd" required>
                    <option value="tablet">Tablet</option>
                    <option value="Celular">Celular</option>
                </select>
                    
                <label for="imageProd">Imagen</label>
                <input type="text" name="image" id="imageProd" value="${producto.image}" required>

                <label for="nameProd">Nombre</label>
                <input type="text" name="name" id="nameProd" value="${producto.name}" required>

                <label for="priceProd">Precio</label>
                <input type="number" name="price" id="priceProd" min="1" value="${producto.price}" required>

                <label for="activeProd">Estado</label>
                <select name="active" id="activeProd" required>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>

                <input type="submit" value="Modificar producto">

            </form>
            `;

    contenedorForm.innerHTML = htmlForm;

    const modifyProductForm = document.getElementById("modifyProductForm");

    modifyProductForm.addEventListener("submit", async event => {

        event.preventDefault();

        const formData = new FormData(event.target);

        const formObj = Object.fromEntries(formData.entries());

        formObj.price = Number(formObj.price);
        formObj.name = formObj.name.trim();

        const errores = validarFormulario(formObj);

        if (errores.length > 0) {
            console.error(errores);
            return mostrarListaErrores(errores)
        };

        try {
            const response = await fetch(`${urlBase}/api/products`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const data = await response.json(); 

            if (!response.ok) {
                contenedorForm.innerHTML = "";
                console.error(data.message);
                return mostrarMensaje("error", data.message);
            }
            contenedorForm.innerHTML = "";
            console.log(data.message);
            mostrarMensaje("exito", data.message);

        } catch (error) {
            console.error("Ocurrio un error al modificar un producto: ", error);
        }
    })
}