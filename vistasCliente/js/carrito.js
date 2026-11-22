//agarro los elementos del html
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalSpan = document.getElementById("total");
const nombreClienteSpan = document.getElementById("nombre-cliente");
const nombreCliente = sessionStorage.getItem("nombreCliente"); // recuperamos el nombre del cliente guardado en la bienvenida
nombreClienteSpan.textContent = nombreCliente; //ponemos el nombre del cliente dentro del span

const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
//misma diamica que en la funcion agregarAlCarrito, lee si hay elementos en el array y sino utiliza uno vacio

function mostrarCarrito() {
  contenedorCarrito.innerHTML = ""; //es necesario limpiar cada vez porque cada vez que actualizamos cantidades se duplicarian
  let total = 0; // inicializamos el total en 0 para ir sumando

  carrito.forEach((item) => {
    const subtotal = item.price * item.cantidad;
    total += subtotal;

    contenedorCarrito.innerHTML += `
        <div class="item-carrito">
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>Precio: $${formatearPrecio(item.price)}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${formatearPrecio(subtotal)}</p>
        <button class="btn-cantidad" onclick="restarCantidad(${item.id})">-</button>
        <button class="btn-cantidad" onclick="sumarCantidad(${item.id})">+</button>
        <button class="btn-eliminar" onclick="eliminarProducto(${item.id})">Eliminar</button>
      </div>
    `;
  });

  totalSpan.textContent = formatearPrecio(total);
}

mostrarCarrito();

function sumarCantidad(id) {
  const item = carrito.find((producto) => producto.id === id);
  item.cantidad += 1;
  guardarYActualizar();
}

function restarCantidad(id) {
  const item = carrito.find((producto) => producto.id === id);
  item.cantidad -= 1;

  //en caso que la cantidad llegue a 0 eliminamos del carrito con funcion
  if (item.cantidad === 0) {
    eliminarProducto(id);
    return;
  }

  guardarYActualizar();
}

function eliminarProducto(id) {
  const indice = carrito.findIndex((producto) => producto.id === id);
  carrito.splice(indice, 1); //esto saca 1 unidad de l producto
  guardarYActualizar();
}

//creamos una funcion que guarde y actualice en el sessionStorage para no repetir en cada funicon
function guardarYActualizar() {
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

//creamos la funcionalidad de boton de confirmar compra para luego emitir el ticket
const botonConfirmar = document.getElementById("confirmar");

botonConfirmar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito esta vacio");
    return;
  }

  const confirmado = confirm("Deseas confirmar la compra?");
  if (confirmado) {
    window.location.href = "ticket.html";
  }
});

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR");
}
