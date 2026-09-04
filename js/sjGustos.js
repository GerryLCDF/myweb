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

        const originals = Array.from(track.children);
        const totalOriginals = originals.length;
        if (totalOriginals === 0) return;

        // Triplicar el set para tener contenido de sobra en ambos extremos.
        // Al empezar en la segunda copia, siempre hay tarjetas antes y después.
        for (let i = 0; i < 2; i++) {
            originals.forEach(item => track.appendChild(item.cloneNode(true)));
        }

        // currentIndex = índice visual dentro del track (0..totalOriginals*3).
        // Arranca en totalOriginals (inicio de la 2ª copia) para permitir
        // retroceder sin ver el "vacío" del principio.
        let currentIndex = totalOriginals;

        // Límite superior = final de la 2ª copia (aún hay 3ª copia de sobra)
        const maxIndex = totalOriginals * 2;

        // Paso de desplazamiento en píxeles (tarjeta + márgenes)
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

        // Posicionarse al inicio sin animación (se muestra la 2ª copia)
        update(false);

        nextBtn.addEventListener("click", () => {
            currentIndex += pasoPorClic();
            // Si pasamos del límite, envolvemos al mismo punto en la copia
            // anterior: el contenido es idéntico, así que el salto es invisible.
            if (currentIndex > maxIndex) {
                currentIndex -= totalOriginals;
                update(false);
            } else {
                update(true);
            }
        });

        prevBtn.addEventListener("click", () => {
            currentIndex -= pasoPorClic();
            if (currentIndex < totalOriginals) {
                currentIndex += totalOriginals;
                update(false);
            } else {
                update(true);
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





