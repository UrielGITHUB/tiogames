

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("juegos-container");
  const paginador = document.getElementById("paginacion");
  const buscador = document.getElementById("buscador");
  const juegosPorPagina = 12;
  let juegosData = [];
  let juegosFiltrados = [];

  // Obtener la página desde la URL (?page=2)
  function obtenerPaginaActual() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("page")) || 1;
  }

  // Mostrar juegos según la página
  function mostrarJuegos(juegos, pagina) {
    contenedor.innerHTML = "";
    const inicio = (pagina - 1) * juegosPorPagina;
    const fin = inicio + juegosPorPagina;
    const juegosPagina = juegos.slice(inicio, fin);
  
    if (juegosPagina.length === 0) {
      contenedor.innerHTML = "<p style='color:#fff;'>No hay juegos para mostrar.</p>";
      paginador.innerHTML = "";
      return;
    }
  
    juegosPagina.forEach(juego => {
      const div = document.createElement("div");
      div.classList.add("juego");
      div.dataset.categorias = juego.categorias.join(',');
  
      div.innerHTML = `
        <a href="juego.html?id=${juego.id}">
          <div class="img-juego"><img src="${juego.imagen}" alt="${juego.titulo}"></div>
          <div class="back-juego">
            <h3>${juego.titulo}</h3>
            <p>Update: ${juego.fecha}</p>
          </div>
        </a>
      `;
      contenedor.appendChild(div);
    });
  
    // Agregar evento a los botones luego de renderizar
    const botones = document.querySelectorAll('.filtros-categorias button');
    const juegosDOM = document.querySelectorAll('.juego');
  
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const filtro = btn.dataset.filtro;
  
        botones.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
  
        juegosDOM.forEach(juego => {
          const categorias = juego.dataset.categorias.split(',');
          if (filtro === 'todos' || categorias.includes(filtro)) {
            juego.style.display = 'flex';
          } else {
            juego.style.display = 'none';
          }
        });
      });
    });
  
    generarPaginacion(juegos.length, pagina);
  }
  

  // Crear los botones de paginación
  function generarPaginacion(totalJuegos, paginaActual) {
    paginador.innerHTML = "";
    const totalPaginas = Math.ceil(totalJuegos / juegosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement("a");
      boton.href = `?page=${i}`;
      boton.textContent = i;
      if (i === paginaActual) boton.classList.add("activo");
      paginador.appendChild(boton);
    }
  }

  // Buscar juegos
  function filtrarJuegos(texto) {
    return juegosData.filter(j =>
      j.titulo.toLowerCase().includes(texto) ||
      j.descripcion.toLowerCase().includes(texto)
    );
  }

  // Escuchar el buscador
  if (buscador) {
    buscador.addEventListener("input", e => {
      const texto = e.target.value.toLowerCase();
      juegosFiltrados = filtrarJuegos(texto);
      history.replaceState(null, "", "?page=1"); // Reinicia a página 1 al buscar
      mostrarJuegos(juegosFiltrados, 1);
    });
  }

  // Cargar juegos desde JSON
  fetch("data/juegos.json")
    .then(res => res.json())
    .then(juegos => {
      juegosData = juegos;
      juegosFiltrados = [...juegosData]; // inicial sin filtro
      const pagina = obtenerPaginaActual();
      mostrarJuegos(juegosFiltrados, pagina);
    })
    .catch(err => {
      contenedor.innerHTML = "<p>Error al cargar los juegos.</p>";
      console.error(err);
    });
});


const botones = document.querySelectorAll('.filtros-categorias button');
const juegos = document.querySelectorAll('.juego');


botones.forEach(btn => {
btn.addEventListener('click', () => {
  const filtro = btn.dataset.filtro;

  botones.forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');

  juegos.forEach(juego => {
    const categorias = juego.dataset.categorias.split(',');
    if (filtro === 'todos' || categorias.includes(filtro)) {
      juego.style.display = 'flex';
    } else {
      juego.style.display = 'none';
    }
  });
});
});

document.addEventListener('DOMContentLoaded', () =>{
const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300){
    btnSubir.style.display="block";
  } else {
    btnSubir.style.display="none";
  }
});

btnSubir.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
});


const btn_categorias = document.getElementById('open-categorias');

btn_categorias.addEventListener('click', () => {
  const div_categorias = document.getElementById('div-categoria')
  if (div_categorias.style.display === "block"){
    div_categorias.style.display = "none";
  } else {
    div_categorias.style.display = "block";
  }
});
