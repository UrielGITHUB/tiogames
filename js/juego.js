document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-juego");
  
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    fetch("data/juegos.json")
      .then(res => res.json())
      .then(juegos => {
        const juego = juegos.find(j => j.id === id);
  
        if (juego) {
          contenedor.innerHTML = 
          `
            <h1>${juego.titulo}</h1>
            <img class="imagen-contenedor" src="${juego.imagen}" alt="Imagen">
            <h3>Descripcion:</h3>
            <p class="descripcion">${juego.descripcion}</p>
            <h3>Ficha tecnica:</h3>
            <p class="descripcion">Peso: ${juego.peso}</p>
            <p class="descripcion">Fecha de actualizacion: ${juego.fecha}</p>
            <p class="descripcion">Version: ${juego.version}</p>
            <h3>Requisitos</h3>
            <p class="descripcion">${juego.requisitos}</p>
            <h3>Contraseña</h3>
            <p class="descripcion">${juego.pass}</p>
            <a href="${juego.link}" target="_blank" class="boton-descarga">Links de descarga</a>
          `
          ;
        } else {
          contenedor.innerHTML = "<p>Juego no encontrado.</p>";
        }
      })
      .catch(err => {
        contenedor.innerHTML = "<p>Error al cargar el juego.</p>";
        console.error(err);
      });
});