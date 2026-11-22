//hacemos referencia a los contenedores
const contenedorTablets = document.getElementById("contenedor-tablets");
const contenedorCelulares = document.getElementById("contenedor-celulares");
let productosGlobal = [];

// Traemos los productos de la API (una sola vez)
async function cargarProductos() {
  const response = await fetch("http://localhost:3000/api/products/active");
  const data = await response.json();
  productosGlobal = data.payload;

  renderizarProductos(); // dibujamos las cards
}

// Dibujamos las tarrjetas de los productos, Se vuelve a llamar cada vez que cambia una cantidad.
function renderizarProductos() {
  // Limpiamos los contenedores antes de dibujar (para no duplicar)
  contenedorTablets.innerHTML = "";
  contenedorCelulares.innerHTML = "";

  // Leemos el carrito para saber las cantidades
  //en primer paso lee si ya hay elementos en el carrito y sino crea un nuevo array vacio para iniciar
  const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

  productosGlobal.forEach((producto) => {
    // Buscamos si este producto esta en el carrito y con que cantidad
    const itemEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidad = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    const card = `
      <div class="card-producto">
        <img src="${producto.image}" alt="${producto.name}" />
        <h4>${producto.name}</h4>
        <p>$${formatearPrecio(producto.price)}</p>
        <div class="control-cantidad">
          <button onclick="restar(${producto.id})">-</button>
          <span>${cantidad}</span>
          <button onclick="sumar(${producto.id})">+</button>
        </div>
      </div>
    `;

    if (producto.category === "tablet") {
      contenedorTablets.innerHTML += card;
    } else {
      contenedorCelulares.innerHTML += card;
    }
  });
}

cargarProductos();

// Sumar 1 al producto (agregar al carrito)
function sumar(id) {
  const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  const producto = productosGlobal.find((p) => p.id === id);
  const itemEnCarrito = carrito.find((item) => item.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      image: producto.image,
      cantidad: 1,
    });
  }

  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarProductos(); // volvemos a dibujar para actualizar el numero
}

// Restar 1 al producto
function restar(id) {
  const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
  const itemEnCarrito = carrito.find((item) => item.id === id);

  if (!itemEnCarrito) return; // si no esta en el carrito, no hacemos nada

  itemEnCarrito.cantidad -= 1;

  // Si llega a 0, lo sacamos del carrito
  if (itemEnCarrito.cantidad === 0) {
    const indice = carrito.findIndex((item) => item.id === id);
    carrito.splice(indice, 1);
  }

  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarProductos(); // volvemos a dibujar
}

function formatearPrecio(precio) {
  return Number(precio).toLocaleString("es-AR");
}
