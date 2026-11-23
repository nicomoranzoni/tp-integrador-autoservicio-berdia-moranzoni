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
totalSpan.textContent = formatearPrecio(total);

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

//Creamos boton para descargar el ticket en pdf
const botonDescargar = document.getElementById("descargar-pdf");

botonDescargar.addEventListener("click", () => {
  //creamos documento pdf
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  //la libreria jsPDF usa paramentros de x y para ubicar el contenido
  ///creamos la posisicon verticak
  let y = 20;

  doc.setFontSize(18);
  doc.text("TechStore", 105, y, { align: "center" });
  y += 8;
  doc.setFontSize(11);
  doc.text("Comprobante de compra", 105, y, { align: "center" });
  y += 15;

  // Datos del cliente
  doc.setFontSize(12);
  doc.text(`Cliente: ${nombreCliente}`, 20, y);
  y += 7;
  doc.text(`Fecha: ${fechaHoy}`, 20, y);
  y += 10;

  // Linea separadora
  doc.line(20, y, 190, y);
  y += 10;

  // Productos
  carrito.forEach((item) => {
    const subtotal = item.price * item.cantidad;
    doc.text(
      `${item.name} - Cant: ${item.cantidad} - $${formatearPrecio(subtotal)}`,
      20,
      y,
    );
    y += 7;
  });

  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  // Total
  doc.setFontSize(14);
  doc.text(`Total: $${formatearPrecio(total)}`, 20, y);

  // Descargamos el PDF
  doc.save("ticket-techstore.pdf");
});
