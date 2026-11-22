const formulario = document.getElementById("formulario-bienvenida"); //guardo el formulario del index.html

formulario.addEventListener("submit", (event) => {
  //esto permite indicarle al formulario que hacer
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const mensajeError = document.getElementById("mensaje-error");

  if (nombre === "") {
    mensajeError.textContent = "Ingresa tu nombre para avanzar";
    return;
  }
  mensajeError.textContent = ""; //limpia el mensaje si el error se corrije

  //introducimos el nombre del cliente y permite pasar a la parte de productos
  sessionStorage.setItem("nombreCliente", nombre);
  window.location.href = "productos.html";
});
