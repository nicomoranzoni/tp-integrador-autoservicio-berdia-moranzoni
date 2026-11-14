//hacemos referencia  los contenedores
const contenedorTablets = document.getElementById("contenedor-tablets");
const contenedorCelulares = document.getElementById("contenedor-celulares");

async function cargarProductos() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  const productos = data.payload;

  productos.forEach((producto) => {
    //armamos la tajerta del producto
    const card = `
        <div class="card-producto">
        <img src="${producto.image}" alt="${producto.name}" />
        <h4>${producto.name}</h4>
        <p>$${producto.price}</p>
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
