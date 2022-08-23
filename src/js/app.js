document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");
  let esFijo = false;
  window.addEventListener("scroll", function () {
    const alturaHeader = barra.offsetHeight;
    if (sobreFestival.getBoundingClientRect().bottom - alturaHeader < 0) {
      barra.classList.add("fijo");
      if (window.innerWidth > 768) {
        body.style.paddingTop = barra.offsetHeight + "px";
      }
    } else {
      barra.classList.remove("fijo");
      body.removeAttribute("style");
    }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (id) {
      id.preventDefault();
      const seccion = document.querySelector(id.target.attributes.href.value);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
      <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
      <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galería" />
    `;
    imagen.onclick = function () {
      mostrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
      <source srcset="build/img/grande/${id}.avif" type="image/avif" />
      <source srcset="build/img/grande/${id}.webp" type="image/webp" />
      <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galería" />
    `;
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  const cerrarImagen = document.createElement("p");
  cerrarImagen.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrarImagen);
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}
