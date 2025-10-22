// Al hacer clic en el botón
document.getElementById("btnCargar").addEventListener("click", function() {
  const contenedor = document.getElementById("resultado");
  contenedor.textContent = "Cargando...";

  // Petición AJAX usando fetch
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(datos => {
      let html = "<ul>";
      for (let usuario of datos) {
        html += `<li><strong>${usuario.name}</strong> (${usuario.email})</li>`;
      }
      html += "</ul>";
      contenedor.innerHTML = html;
    })
    .catch(err => {
      contenedor.textContent = "Error al obtener datos: " + err.message;
    });
});
