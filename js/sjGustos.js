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
        const container = track.closest(".carousel-container");
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        let currentIndex = 0;

        // Duplicar los elementos para el efecto infinito (2 copias del set)
        const originals = Array.from(track.children);
        originals.forEach(item => track.appendChild(item.cloneNode(true)));
        const totalOriginals = originals.length;

        // La tarjeta inicial (con su margen) da el paso de desplazamiento
        function itemStep() {
            const first = track.children[0];
            if (!first) return 160;
            const style = getComputedStyle(first);
            const ml = parseFloat(style.marginLeft) || 0;
            const mr = parseFloat(style.marginRight) || 0;
            return first.offsetWidth + ml + mr;
        }

        // Cuántas tarjetas avanzar por clic (las visibles en pantalla)
        function pasoPorClic() {
            const visible = container ? container.clientWidth : 800;
            const step = itemStep();
            return Math.max(1, Math.round(visible / step));
        }

        function update(animate) {
            const step = itemStep();
            track.style.transition = animate
                ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";
            track.style.transform = `translateX(${-step * currentIndex}px)`;
        }

        nextBtn.addEventListener("click", () => {
            const p = pasoPorClic();
            currentIndex += p;
            update(true);
            // Si nos pasamos de la primera copia, volver al inicio sin animación
            if (currentIndex >= totalOriginals + p) {
                setTimeout(() => {
                    currentIndex = 0;
                    update(false);
                }, 500);
            }
        });

        prevBtn.addEventListener("click", () => {
            const p = pasoPorClic();
            currentIndex -= p;
            update(true);
            if (currentIndex < 0) {
                // Saltar al final de la copia para seguir hacia atrás
                setTimeout(() => {
                    currentIndex = totalOriginals;
                    update(false);
                }, 500);
            }
        });

        // Adaptarse al cambiar el tamaño de la ventana
        window.addEventListener("resize", () => update(false));
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
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        const delay = 300 * index;
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
});





