const API_KEY = "AIzaSyBIrrWHf27lVInIyhz9S49x9LF8lDJ1j98";
const CHANNEL_ID = "UCBvP4UeN3p7a6OevNVdZ3AQ";

// Menú hamburguesa
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

// Obtener suscriptores
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

// Obtener duraciones de videos
async function obtenerDuraciones(videoIds) {
    const ids = videoIds.join(",");
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const duraciones = {};
    data.items.forEach(item => {
        const id = item.id;
        const duration = parseISO8601Duration(item.contentDetails.duration);
        duraciones[id] = duration;
    });
    return duraciones;
}

// Convertir duración ISO8601 a segundos
function parseISO8601Duration(duration) {
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const minutes = parseInt(match[1]) || 0;
    const seconds = parseInt(match[2]) || 0;
    return minutes * 60 + seconds;
}

// Obtener y mostrar videos largos
async function obtenerVideosRecientes() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=8`; // Cambié a 8 para obtener más videos
    try {
        const response = await fetch(url);
        const data = await response.json();

        const videoItems = data.items.filter(item => item.id.videoId); // Filtrar solo los videos
        const videoIds = videoItems.map(video => video.id.videoId);
        const duraciones = await obtenerDuraciones(videoIds);

        const contenedorLargos = document.getElementById("recent-videos");
        const contenedorShorts = document.getElementById("shorts-videos");

        contenedorLargos.innerHTML = "";
        contenedorShorts.innerHTML = "";

        let contadorLargos = 0; // Para asegurar que solo se muestren 3 videos largos
        let contadorShorts = 0; // Para asegurar que solo se muestren 5 shorts

        videoItems.forEach(video => {
            const id = video.id.videoId;
            const duracion = duraciones[id];
            const esShort = duracion < 60;

            const titulo = video.snippet.title;
            const miniatura = video.snippet.thumbnails.high.url;
            const urlVideo = `https://www.youtube.com/watch?v=${id}`;

            const contenedor = esShort ? contenedorShorts : contenedorLargos;

            if (esShort && contadorShorts < 5) { // Mostrar solo 5 Shorts
                const videoElement = document.createElement("div");
                videoElement.classList.add("video-item");
                videoElement.innerHTML = `
                    <a href="${urlVideo}" target="_blank">
                        <img src="${miniatura}" alt="${titulo}">
                    </a>
                    <p>${titulo}</p>
                    <a href="${urlVideo}" target="_blank">Ver en YouTube</a>
                `;
                contenedor.appendChild(videoElement);
                contadorShorts++;
            }

            if (!esShort && contadorLargos < 3) { // Mostrar solo 3 videos largos
                const videoElement = document.createElement("div");
                videoElement.classList.add("video-item");
                videoElement.innerHTML = `
                    <a href="${urlVideo}" target="_blank">
                        <img src="${miniatura}" alt="${titulo}">
                    </a>
                    <p>${titulo}</p>
                    <a href="${urlVideo}" target="_blank">Ver en YouTube</a>
                `;
                contenedor.appendChild(videoElement);
                contadorLargos++;
            }
        });
    } catch (error) {
        console.error("Error obteniendo videos recientes:", error);
    }
}


function actualizarEnTiempoReal() {
    obtenerSuscriptores();
    obtenerVideosRecientes();
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarEnTiempoReal();
    setInterval(actualizarEnTiempoReal, 1200000); // 20 minutos

});
