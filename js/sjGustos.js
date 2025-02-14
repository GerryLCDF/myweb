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

    function createCarouselItems(track, items) {
        items.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("carousel-item");

            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.title;

            const title = document.createElement("div");
            title.classList.add("carousel-title");
            title.textContent = item.title;

            div.appendChild(img);
            div.appendChild(title);
            track.appendChild(div);
        });
    }

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

    // Referencias a los tracks
    const booksTrack = document.getElementById("books-track");
    const moviesTrack = document.getElementById("movies-track");
    const gamesTrack = document.getElementById("games-track");

    // Listas de elementos para cada carrusel
    const libros = [
        { src: "img/libros/Berserk.jpg", title: "Berserk" },
        { src: "img/libros/Godot Engine Game Development Projects.jpg", title: "Godot Engine Game Development Projects" },
        { src: "img/libros/H.P LOVECRAFT.jpg", title: "H.P. Lovecraft" },
        { src: "img/libros/How To Draw Ghibli Studio Characters.jpg", title: "How To Draw Ghibli Studio Characters" },
        { src: "img/libros/Komi Can’t Communicate, All.jpg", title: "Komi Can't Communicate (All Volumes)" },
        { src: "img/libros/La Divina Comedia.jpg", title: "La Divina Comedia" },
        { src: "img/libros/La nada nadea.jpg", title: "La Nada Nadae" },
        { src: "img/libros/La Poetica De Aristoteles.jpg", title: "La Poética de Aristóteles" },
        { src: "img/libros/Learning Python.jpg", title: "Learning Python" },
        { src: "img/libros/Matar a Platón.jpg", title: "Matar a Platón" },
        { src: "img/libros/Matemática Esencial para Game Devs.jpg", title: "Matemática Esencial para Game Devs" },
        { src: "img/libros/Ranma ½.jpg", title: "Ranma ½ (All Volumes)" },
        { src: "img/libros/Tecnicas de animacion.jpg", title: "Técnicas de Animación" },
        { src: "img/libros/Test Drive Blender.jpg", title: "Test Drive Blender" },
        { src: "img/libros/The Game Dev Roadmap.jpg", title: "The Game Dev Roadmap" },
        { src: "img/libros/Unity3D.jpg", title: "Unity3D" },
        { src: "img/libros/zelda-majora.jpg", title: "Zelda: Majora’s Mask" }
    ];
    

    const peliculas = [

    { src: "img/peliculas/totoro.webp", title: "Mi vecino Totoro" },
    { src: "img/peliculas/back_to_the_future.jpg", title: "Back to the Future" },
    { src: "img/peliculas/ready_player_one.jpg", title: "Ready Player One" },
    { src: "img/peliculas/drStrange.jpg", title: "Doctor Strange" },
    { src: "img/peliculas/baby_driver.webp", title: "Baby Driver" },
    { src: "img/peliculas/interstellar.webp", title: "Interstellar" },
    { src: "img/peliculas/invecil.jpg", title: "Invincible" },
    { src: "img/peliculas/dr who.jpg", title: "Doctor Who" },
    { src: "img/peliculas/indise_job.jpg", title: "Inside Job" },
    { src: "img/peliculas/kikis.jpg", title: "Kiki's Delivery Service" },
    { src: "img/peliculas/kira.jpg", title: "Akira" },
    { src: "img/peliculas/naufrago.jpg", title: "Náufrago" },
    { src: "img/peliculas/the_office.jpg", title: "The Office" },
    { src: "img/peliculas/Guardians of the Galaxy.jpg", title: "Guardians of the Galaxy" },
    { src: "img/peliculas/ambulante.jpg", title: "Ambulante" }
    
    ];

    const games = [
        { src: "img/games/BLASPHEMOUS.png", title: "BLASPHEMOUS" },
        { src: "img/games/BLASPHEMOUS2.png", title: "BLASPHEMOUS 2" },
        { src: "img/games/CELESTE.png", title: "CELESTE" },
        { src: "img/games/CULT OF THE LAMB.png", title: "CULT OF THE LAMB." },
        { src: "img/games/CUPHEAD.png", title: "CUPHEAD" },
        { src: "img/games/FALLOUT NV.png", title: "fallout NV" },
        { src: "img/games/HOLLOW KNIGHT.png", title: "HOLLOW KNIGHT" },
        { src: "img/games/marioWorld.jpg", title: "Mario world" },
        { src: "img/games/METAL SLUG.png", title: "METAL SLUG" },
        { src: "img/games/PARTY ANIMALS.png", title: "PARTY ANIMALS" },
        { src: "img/games/RED DEAD REdemption2.png", title: "Res Dead Redemption 2" },
        { src: "img/games/super64.webp", title: "mario 64" },
        { src: "img/games/TAILS OF IRON.png", title: "TAILS OF IRON" },
        { src: "img/games/TUNIC.png", title: "TUNIC" },
        { src: "img/games/VVVVVV.png", title: "VVVVVV" },
        { src: "img/games/zelda.webp", title: "zelda" }
    ];

    // Generar los carruseles con las listas
    createCarouselItems(booksTrack, libros);
    createCarouselItems(moviesTrack, peliculas);
    createCarouselItems(gamesTrack, games);

    // Inicializar los carruseles
    new InfiniteCarousel("books-track", "prevBookBtn", "nextBookBtn");
    new InfiniteCarousel("movies-track", "prevMovieBtn", "nextMovieBtn");
    new InfiniteCarousel("games-track", "prevGameBtn", "nextGameBtn");
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





