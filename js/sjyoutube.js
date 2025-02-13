// Lista de URLs de videos recientes (sólo cambia las URLs)
const videosRecientes = [
    "https://www.youtube.com/watch?v=d06wkmCKupM&t=1s",
    "https://www.youtube.com/watch?v=JIaUjE-Idaw",
    "https://www.youtube.com/watch?v=BEmrtp4oqZQ&t=3s"
  ];
  
  // Función para obtener el ID del video desde la URL
  function obtenerVideoID(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  }
  
  // Función para obtener la miniatura de YouTube
  function obtenerMiniatura(videoID) {
    return `https://i.ytimg.com/vi/${videoID}/hqdefault.jpg`;
  }
  
  // Función para obtener el título del video desde la API de YouTube
  async function obtenerTitulo(videoID) {
    const API_KEY = "AIzaSyDytxpg9lqi0DKUQs9sozlNmausHVuanpk"; // 🔴 Sustituye por tu API KEY de YouTube
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.items[0].snippet.title;
    } catch (error) {
      console.error("Error obteniendo título:", error);
      return "Título no disponible";
    }
  }
  
  // Función para mostrar los videos en la página
  async function mostrarVideos() {
    const videoContainer = document.getElementById("recent-videos");
    videoContainer.innerHTML = '';
  
    for (const url of videosRecientes) {
      const videoID = obtenerVideoID(url);
      const miniatura = obtenerMiniatura(videoID);
      const titulo = await obtenerTitulo(videoID);
  
      const videoElement = document.createElement("div");
      videoElement.classList.add("video-item");
  
      videoElement.innerHTML = `
        <img src="${miniatura}" alt="${titulo}">
        <p>${titulo}</p>
        <a href="${url}" target="_blank">Ver en YouTube</a>
      `;
  
      videoContainer.appendChild(videoElement);
    }
  }
  
  // Cargar los videos al iniciar la página
  document.addEventListener("DOMContentLoaded", mostrarVideos);
  

  
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


        /*********************************************
   MENÚ HAMBURGUESA CON EFECTO BORROSO
*********************************************/
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay"); // Fondo borroso
    const mainContent = document.querySelector(".content") || 
                        document.querySelector(".g-container") || 
                        document.querySelector(".container");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active"); // Activa el fondo borroso

    if (mainContent) {
        mainContent.classList.toggle("blurred"); // Aplica desenfoque al contenido
    }
}

// Cerrar el menú al hacer clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".content") || 
                        document.querySelector(".g-container") || 
                        document.querySelector(".container");

    if (sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("active");
            overlay.classList.remove("active"); // Quita el fondo borroso
            if (mainContent) {
                mainContent.classList.remove("blurred");
            }
        }
    }
});


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


