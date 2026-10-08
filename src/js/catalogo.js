/* ==========================================================
   1. IDENTIFICAR LA VARIANTE
   Leemos lo que viene después de ? en la dirección.
   Si no se indica una categoría válida, mostramos peluches.
   ========================================================== */

const parametros = new URLSearchParams(window.location.search);

const nombres = {
  ropa: "Ropa",
  peluches: "Peluches",
  vinilos: "CDs/Vinilos",
  bolsos: "Bolsos",
  accesorios: "Accesorios",
  sale: "Sale"
};

let categoria = parametros.get("categoria");

if (parametros.get("ofertas") === "true") {
  categoria = "sale";
}

if (!nombres[categoria]) {
  categoria = "peluches";
}

/* Actualizamos el título de la pestaña y el título accesible. */
document.title = nombres[categoria] + " | YokoMarket";

document.getElementById("titulo-catalogo").textContent =
  "Catálogo de " + nombres[categoria];

/* ==========================================================
   2. MOSTRAR LA SECCIÓN CORRESPONDIENTE
   Las otras variantes permanecen ocultas.
   ========================================================== */

if (categoria === "ropa") {
  document.body.classList.add("es-ropa");
  document.getElementById("seccion-ropa").hidden = false;
}

if (categoria === "peluches") {
  document.getElementById("banner-peluches").hidden = false;
}

if (categoria === "sale") {
  document.getElementById("banner-sale").hidden = false;
}

/* Marcamos el enlace actual y comunicamos su estado accesible. */
const enlaces = document.querySelectorAll("[data-categoria]");

enlaces.forEach(function (enlace) {
  if (enlace.getAttribute("data-categoria") === categoria) {
    enlace.classList.add("activa");
    enlace.setAttribute("aria-current", "page");
  }
});

/* ==========================================================
   3. OPCIONES DEL FILTRO
   En ropa mostramos sus subcategorías.
   En los demás catálogos ofrecemos las categorías generales.
   ========================================================== */

const filtroCategoria = document.getElementById("filtro-categoria");

let opciones = [
  { valor: "ropa", texto: "Ropa" },
  { valor: "peluches", texto: "Peluches" },
  { valor: "vinilos", texto: "CDs/Vinilos" },
  { valor: "bolsos", texto: "Bolsos" },
  { valor: "accesorios", texto: "Accesorios" }
];

if (categoria === "ropa") {
  opciones = [
    { valor: "oversize", texto: "Oversize" },
    { valor: "baggy", texto: "Baggy" },
    { valor: "graficos", texto: "Gráficos" },
    { valor: "basicos", texto: "Básicos" }
  ];
}

opciones.forEach(function (opcion) {
  const elemento = document.createElement("option");

  elemento.value = opcion.valor;
  elemento.textContent = opcion.texto;

  filtroCategoria.appendChild(elemento);
});

/* ==========================================================
   4. CARDS EXTRA DE ROPA
   Pulsar una card selecciona su opción en el filtro.
   Todavía no modifica los productos de muestra.
   ========================================================== */

const aviso = document.getElementById("aviso-catalogo");
const botonesEstilo = document.querySelectorAll("[data-estilo]");

botonesEstilo.forEach(function (boton) {
  boton.addEventListener("click", function () {
    filtroCategoria.value = boton.getAttribute("data-estilo");

    aviso.textContent =
      "Estilo seleccionado: " + boton.textContent.trim() +
      ". Los productos todavía son de muestra.";
  });
});

/* ==========================================================
   5. GENERAR LOS PRODUCTOS DE LA REFERENCIA
   Figma repite diez veces el llavero de $35.000.
   Este objeto contiene sus datos y el bucle crea las tarjetas.
   Más adelante lo sustituiremos por el catálogo real en JSON.
   ========================================================== */

const productoMuestra = {
  nombre: "Llavero Coco cocodrilo",
  precio: "$35.000",
  imagen: "../assets/images/llavero-coco.png"
};

const lista = document.getElementById("lista-productos");

for (let numero = 0; numero < 10; numero = numero + 1) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta-producto");

  const imagen = document.createElement("img");
  imagen.src = productoMuestra.imagen;
  imagen.alt = "Llavero Coco con forma de cocodrilo";
  imagen.width = 196;
  imagen.height = 196;

  const nombre = document.createElement("h3");
  nombre.textContent = productoMuestra.nombre;

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.textContent = productoMuestra.precio;

  /* El orden de inserción determina el orden visual. */
  tarjeta.appendChild(imagen);
  tarjeta.appendChild(nombre);
  tarjeta.appendChild(precio);

  lista.appendChild(tarjeta);
}