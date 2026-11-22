//tomamos los elementos de html
const nombreClienteSpan = document.getElementById("nombre-cliente");
const fechaSpan = document.getElementById("fecha");
const contenedorTicket = document.getElementById("contenedor-ticket");
const totalSpan = document.getElementById("total");

//usamos sessionStorage para leer los datos guardados
const nombreCliente = sessionStorage.getItem("nombreCliente");
const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

nombreClienteSpan.textContent = nombreCliente;

const fechaHoy = new Date().toLocaleDateString();
fechaSpan.textContent = fechaHoy;

let total = 0; // iniciamos el total de productos en 0

carrito.forEach((item) => {
  const subtotal = item.price * item.cantidad;
  total += subtotal;

  contenedorTicket.innerHTML += `
    <div class="item-ticket">
      <p>${item.name} - Cantidad: ${item.cantidad} - Subtotal: $${formatearPrecio(subtotal)}</p>
    </div>
  `;
});
totalSpan.textContent = total;

//creamos un boton para volver a empezar una compra

const botonVolver = document.getElementById("volver");

botonVolver.addEventListener("click", () => {
  //como la compra termino, eliminamos los elementos del carrito y volvemos a la pantalla de bienvenida
  sessionStorage.removeItem("carrito");
  window.location.href = "index.html"; //redireccionamos a la pantalla de bienvenida
});

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR");
}
