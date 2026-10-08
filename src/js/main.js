// Buscamos los dos elementos del HTML mediante sus identificadores.
const botonMenu = document.getElementById("boton-menu");
const navegacion = document.getElementById("navegacion");

// Esta variable recuerda el estado del menú mientras la página está abierta.
let menuAbierto = false;

// Escuchamos el clic del usuario.
botonMenu.addEventListener("click", function () {
  if (menuAbierto === false) {
    // Añadir la clase activa el estilo .navegacion.abierta.
    navegacion.classList.add("abierta");
    botonMenu.textContent = "Cerrar menú";
    botonMenu.setAttribute("aria-expanded", "true");
    menuAbierto = true;
  } else {
    navegacion.classList.remove("abierta");
    botonMenu.textContent = "Abrir menú";
    botonMenu.setAttribute("aria-expanded", "false");
    menuAbierto = false;
  }
});