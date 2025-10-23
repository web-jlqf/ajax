// API publica para pruebas
const BASE = "https://jsonplaceholder.typicode.com/posts";
const salida = document.getElementById("salida");

/**
 * Muestra los datos recibidos en el elemento de salida.
 * Si el dato es una cadena, la muestra directamente.
 * Si es un objeto o arreglo, lo convierte a formato JSON legible.
 * @param {string|Object} data - Datos o mensaje a mostrar.
 */
function show(data) {
  if (typeof data === "string") {
    salida.textContent = data;
  } else {
    salida.textContent = JSON.stringify(data, null, 2);
  }
}

/**
 * Realiza una peticion GET al endpoint BASE.
 * Muestra los primeros tres elementos de la respuesta.
 */
async function doGet() {
  try {
    const r = await fetch(BASE);
    const d = await r.json();
    show(d.slice(0, 3)); // muestra 3 para no saturar
  } catch (e) {
    show("GET error: " + e.message);
  }
}

/**
 * Realiza una peticion POST al endpoint BASE.
 * Envia un nuevo post como cuerpo en formato JSON.
 */
async function doPost() {
  try {
    const r = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Nuevo post",
        body: "Texto de prueba",
        userId: 1
      })
    });
    const d = await r.json();
    show(d);
  } catch (e) {
    show("POST error: " + e.message);
  }
}

/**
 * Realiza una peticion PUT al endpoint BASE/1.
 * Reemplaza completamente el contenido del post con id=1.
 */
async function doPut() {
  try {
    const r = await fetch(`${BASE}/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 1,
        title: "Post actualizado",
        body: "Contenido modificado",
        userId: 1
      })
    });
    const d = await r.json();
    show(d);
  } catch (e) {
    show("PUT error: " + e.message);
  }
}

/**
 * Realiza una peticion PATCH al endpoint BASE/1.
 * Modifica parcialmente el post con id=1.
 */
async function doPatch() {
  try {
    const r = await fetch(`${BASE}/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Titulo (PATCH)"
      })
    });
    const d = await r.json();
    show(d);
  } catch (e) {
    show("PATCH error: " + e.message);
  }
}

/**
 * Realiza una peticion DELETE al endpoint BASE/1.
 * Simula la eliminacion del post con id=1.
 */
async function doDelete() {
  try {
    const r = await fetch(`${BASE}/1`, { method: "DELETE" });
    show(`DELETE status: ${r.status} (simulado)`);
  } catch (e) {
    show("DELETE error: " + e.message);
  }
}

/**
 * Asigna los eventos click a los botones correspondientes.
 * Cada boton ejecuta la funcion asociada a su metodo HTTP.
 */
document.getElementById("btnGet").onclick = doGet;
document.getElementById("btnPost").onclick = doPost;
document.getElementById("btnPut").onclick = doPut;
document.getElementById("btnPatch").onclick = doPatch;
document.getElementById("btnDelete").onclick = doDelete;

