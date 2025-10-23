// API pública para pruebas
const BASE = "https://jsonplaceholder.typicode.com/posts";
const salida = document.getElementById("salida");

function show(data) {
  if (typeof data === "string") {
    salida.textContent = data;
  } else {
    salida.textContent = JSON.stringify(data, null, 2);
  }
}


async function doGet() {
  try {
    const r = await fetch(BASE);
    const d = await r.json();
    show(d.slice(0, 3)); // muestra 3 para no saturar
  } catch (e) { show("GET error: " + e.message); }
}

async function doPost() {
  try {
    const r = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
      { 
        title: "Nuevo post", 
        body: "Texto de prueba", 
        userId: 1 
      })
     });
    const d = await r.json();
    show(d);
  } catch (e) { show("POST error: " + e.message); }
}

async function doPut() {
  try {
    const r = await fetch(`${BASE}/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
      { 
        id: 1, 
        title: "Post actualizado", 
        body: "Contenido modificado", 
        userId: 1 
      })
    });
    const d = await r.json();
    show(d);
  } catch (e) { show("PUT error: " + e.message); }
}

async function doPatch() {
  try {
    const r = await fetch(`${BASE}/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
      { 
        title: "Título (PATCH)" 
      })
    });
    const d = await r.json();
    show(d);
  } catch (e) { show("PATCH error: " + e.message); }
}

async function doDelete() {
  try {
    const r = await fetch(`${BASE}/1`, { method: "DELETE" });
    show(`DELETE status: ${r.status} (simulado)`);
  } catch (e) { show("DELETE error: " + e.message); }
}

// Wire-up
document.getElementById("btnGet").onclick = doGet;
document.getElementById("btnPost").onclick = doPost;
document.getElementById("btnPut").onclick = doPut;
document.getElementById("btnPatch").onclick = doPatch;
document.getElementById("btnDelete").onclick = doDelete;
