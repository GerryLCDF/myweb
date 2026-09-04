/*********************************************
   MENÚ HAMBURGUESA: lo gestiona js/menu.js (común)
*********************************************/


/*********************************************
   CARRUSEL INFINITO
*********************************************/
document.addEventListener("DOMContentLoaded", function () {

    function InfiniteCarousel(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const container = track.closest(".carousel-container");
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        const items = Array.from(track.children);
        const total = items.length;
        if (total === 0) return;

        // Nº de tarjetas que entran en el viewport (y cuántas se mueven por clic)
        function pasoPorClic() {
            const visible = container ? container.clientWidth : 800;
            const step = itemStep();
            return Math.max(1, Math.min(total, Math.round(visible / step)));
        }

        // Paso en píxeles (tarjeta + márgenes)
        function itemStep() {
            const first = track.children[0];
            if (!first) return 160;
            const style = getComputedStyle(first);
            const ml = parseFloat(style.marginLeft) || 0;
            const mr = parseFloat(style.marginRight) || 0;
            return first.offsetWidth + ml + mr;
        }

        function setTransition(on) {
            track.style.transition = on
                ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";
        }

        function setPos(px) {
            track.style.transform = `translateX(${px}px)`;
        }

        // ---------- SIGUIENTE ----------
        // Desliza a la izquierda y, al terminar, recicla los primeros items al final
        nextBtn.addEventListener("click", () => {
            if (track.dataset.busy === "1") return;
            track.dataset.busy = "1";
            const n = pasoPorClic();

            setTransition(true);
            setPos(-n * itemStep());

            const done = () => {
                const moved = Array.from(track.children).slice(0, n);
                moved.forEach(item => track.appendChild(item));
                setTransition(false);
                setPos(0);
                track.removeEventListener("transitionend", done);
                track.dataset.busy = "0";
            };
            track.addEventListener("transitionend", done, { once: true });
        });

        // ---------- ANTERIOR ----------
        // Recicla los últimos items al principio y desliza de vuelta a la derecha
        prevBtn.addEventListener("click", () => {
            if (track.dataset.busy === "1") return;
            track.dataset.busy = "1";
            const n = pasoPorClic();

            // Mueve los últimos n items al inicio (sin transición, se reaprovechan)
            const moved = Array.from(track.children).slice(-n);
            moved.forEach(item => track.insertBefore(item, track.firstChild));
            setTransition(false);
            setPos(-n * itemStep()); // posiciona como si viniera de la izquierda

            // Fuerza el reflow para que el cambio de posición sea efectivo
            void track.offsetWidth;

            setTransition(true);
            setPos(0);

            const done = () => {
                track.removeEventListener("transitionend", done);
                track.dataset.busy = "0";
            };
            track.addEventListener("transitionend", done, { once: true });
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
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        const delay = 300 * index;
        setTimeout(() => {
            el.classList.add('visible');
        }, delay);
    });
});





