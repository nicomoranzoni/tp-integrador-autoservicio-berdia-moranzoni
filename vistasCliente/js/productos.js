//hacemos referencia  los contenedores
const contenedorTablets = document.getElementById("contenedor-tablets");
const contenedorCelulares = document.getElementById("contenedor-celulares");
let productosGlobal = [];

async function cargarProductos() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  const productos = data.payload;
  productosGlobal = productos;

  productos.forEach((producto) => {
    //armamos la tajerta del producto
    const card = `
        <div class="card-producto">
        <img src="${producto.image}" alt="${producto.name}" />
        <h4>${producto.name}</h4>
        <p>$${producto.price}</p>
         <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      </div>   
    `;

    //asignamos segun categoria - comparamos por valor y tipo
    if (producto.category === "tablet") {
      contenedorTablets.innerHTML += card;
    } else {
      contenedorCelulares.innerHTML += card;
    }
  });
}

cargarProductos();

//creamos la funcion para agregar productos al carrito
function agregarAlCarrito(id) {
  //en primer paso lee si ya hay elementos en el carrito y sino crea un nuevo array vacio para iniciar
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  //el local.getID trae el carrito que haya guardado como texto y luego el json.parse lo convierte en array

  const producto = productosGlobal.find((producto) => producto.id === id); //busco el producto guardado en el array por su id

  const productoEnCarrito = carrito.find((item) => item.id === id); //corroboro si el producto ya se encuentra en el carrito

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      name: producto.name,
      price: producto.price,
      image: producto.image,
      cantidad: 1,
    });
  }

  //guardamos el carrito actualizado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  /*en caso de necesitar borras el localStorage del carrito utilizo
  localStorage.removeItem("carrito")*/
}
