/*********************************************
   MENÚ HAMBURGUESA
*********************************************/
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const mainContainer = document.querySelector(".g-container") 
    || document.querySelector(".container");

    sidebar.classList.toggle("active");
    if (mainContainer) {
        mainContainer.classList.toggle("blurred");
    }
}

// Cerrar el menú si se hace clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const mainContainer = document.querySelector(".g-container") || document.querySelector(".container");

    if (sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("active");
            if (mainContainer) {
                mainContainer.classList.remove("blurred");
            }
        }
    }
});


/*********************************************
   CARRUSEL INFINITO
*********************************************/
document.addEventListener("DOMContentLoaded", function () {

    function InfiniteCarousel(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        let currentIndex = 0;

        // Duplicar elementos para efecto infinito
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        function updateSlidePosition() {
            const widthSlide = track.children[0].offsetWidth;
            track.style.transition = "transform 0.4s ease-in-out";
            track.style.transform = `translateX(${-widthSlide * currentIndex}px)`;
        }

        nextBtn.addEventListener("click", () => {
            if (currentIndex >= track.children.length / 2) {
                track.style.transition = "none";
                currentIndex = 0;
                updateSlidePosition();
                setTimeout(() => {
                    track.style.transition = "transform 0.4s ease-in-out";
                    currentIndex++;
                    updateSlidePosition();
                }, 50);
            } else {
                currentIndex++;
                updateSlidePosition();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex <= 0) {
                track.style.transition = "none";
                currentIndex = track.children.length / 2;
                updateSlidePosition();
                setTimeout(() => {
                    track.style.transition = "transform 0.4s ease-in-out";
                    currentIndex--;
                    updateSlidePosition();
                }, 50);
            } else {
                currentIndex--;
                updateSlidePosition();
            }
        });
    }

    // Cargar un carrusel desde un archivo JSON del mismo dominio
    function cargarCarruselDesdeJSON(trackId, jsonUrl, prevBtnId, nextBtnId, mensajeVacio) {
        const track = document.getElementById(trackId);
        if (!track) return;
        fetch(jsonUrl, { cache: "no-store" })
            .then(r => r.json())
            .then(items => {
                if (!items || items.length === 0) {
                    track.innerHTML = `<p class='sin-videos'>${mensajeVacio}</p>`;
                    return;
                }
                items.filter(p => p.imagen).forEach(p => {
                    const div = document.createElement("div");
                    div.classList.add("carousel-item", "tmdb-item");
                    const a = document.createElement("a");
                    if (p.url) { a.href = p.url; a.target = "_blank"; a.rel = "noopener"; }
                    const img = document.createElement("img");
                    img.src = p.imagen;
                    img.alt = p.titulo;
                    const title = document.createElement("div");
                    title.classList.add("carousel-title");
                    title.textContent = p.titulo;
                    a.appendChild(img);
                    a.appendChild(title);
                    div.appendChild(a);
                    track.appendChild(div);
                });
                new InfiniteCarousel(trackId, prevBtnId, nextBtnId);
            })
            .catch(err => {
                console.error("Error cargando carrusel " + trackId + ":", err);
                track.innerHTML = "<p class='sin-videos'>No se pudo cargar</p>";
            });
    }

    // Libros desde Open Library
    cargarCarruselDesdeJSON("books-track", "/js/libros.json", "prevBookBtn", "nextBookBtn", "Aún no hay libros en mi lista");
    // Juegos desde RAWG
    cargarCarruselDesdeJSON("games-track", "/js/juegos.json", "prevGameBtn", "nextGameBtn", "Aún no hay juegos en mi lista");
    // Películas desde TMDb
    cargarCarruselDesdeJSON("tmdb-track", "/js/gustos.json", "prevPeliculaBtn", "nextPeliculaBtn", "Aún no hay películas en mi lista WebMovie");
});



    
        /*********************************************
           EFECTO FADE-IN (aparición secuencial)
        *********************************************/
           function initFadeInEffects() {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((el, index) => {
                const delay = 300 * index;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
            });
        }
    
        // Iniciar efectos de aparición
        initFadeInEffects();
 

  /*******************************************
   Efecto fade-in al cargar la página
*******************************************/
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los .fade-in
  const fadeEls = document.querySelectorAll('.fade-in');

  fadeEls.forEach((el, index) => {
    // Retraso de 200ms * index, ajusta si quieres
    const delay = 200 * index;
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });
});





