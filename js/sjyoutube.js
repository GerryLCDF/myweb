const API_KEY = "AIzaSyBIrrWHf27lVInIyhz9S49x9LF8lDJ1j98"; // 🔴 Reemplaza con tu API Key de YouTube
const CHANNEL_ID = "UCBvP4UeN3p7a6OevNVdZ3AQ"; // 🔴 Reemplaza con tu ID de canal

/*********************************************
   MENÚ HAMBURGUESA CON EFECTO BORROSO
*********************************************/
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

// Obtener el número de suscriptores en tiempo real
async function obtenerSuscriptores() {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const subs = data.items[0].statistics.subscriberCount;
        document.getElementById("subscriber-count").innerText = `${subs} suscriptores`;
    } catch (error) {
        console.error("Error obteniendo el número de suscriptores:", error);
    }
}

// Obtener los videos más recientes
async function obtenerVideosRecientes() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const videoContainer = document.getElementById("recent-videos");
        videoContainer.innerHTML = ""; // Limpiar contenido anterior

        data.items.forEach((video) => {
            if (video.id.videoId) {
                const videoID = video.id.videoId;
                const titulo = video.snippet.title;
                const miniatura = video.snippet.thumbnails.high.url;
                const urlVideo = `https://www.youtube.com/watch?v=${videoID}`;

                const videoElement = document.createElement("div");
                videoElement.classList.add("video-item");

                videoElement.innerHTML = `
                    <a href="${urlVideo}" target="_blank">
                        <img src="${miniatura}" alt="${titulo}">
                    </a>
                    <p>${titulo}</p>
                    <a href="${urlVideo}" target="_blank">Ver en YouTube</a>
                `;

                videoContainer.appendChild(videoElement);
            }
        });
    } catch (error) {
        console.error("Error obteniendo videos recientes:", error);
    }
}

// Función para actualizar cada 30 segundos
function actualizarEnTiempoReal() {
    obtenerSuscriptores();
    obtenerVideosRecientes();
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarEnTiempoReal();
    setInterval(actualizarEnTiempoReal, 30000);
});
