document.getElementById("btnFrase").addEventListener("click", function() {
  const div = document.getElementById("frase");
  div.textContent = "Cargando...";

  // Petición AJAX usando fetch
  fetch("https://catfact.ninja/fact")
    .then(res => res.json())
    .then(data => {
      div.innerHTML = `
        <blockquote>
          “${data.fact}”
        </blockquote>
      `;
    })
    .catch(error => {
      div.textContent = "Error al obtener la frase: " + error.message;
    });
});
