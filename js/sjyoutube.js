const API_KEY = "AIzaSyBgLep6dKOxdE7FX-GRvcBK2ku49MQq9HQ";
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

// Convertir duración ISO8601 a segundos
function parseISO8601Duration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
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

// Obtener videos del canal filtrando por tipo de duración
// duracionTipo: "short", "medium" o "long" (valores admitidos por la API)
async function obtenerVideosPorTipo(duracionTipo, maxResultados) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}` +
        `&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video` +
        `&videoDuration=${duracionTipo}&maxResults=${maxResultados}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items || [];
}

// Crear el elemento HTML de un video y lo agrega a su contenedor
function crearElementoVideo(video, contenedor) {
    const id = video.id.videoId;
    const titulo = video.snippet.title;
    const miniatura = video.snippet.thumbnails.high.url;
    const urlVideo = `https://www.youtube.com/watch?v=${id}`;

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
}

// Obtener y mostrar shorts (videoDuration=short)
async function obtenerShorts() {
    const contenedorShorts = document.getElementById("shorts-videos");
    contenedorShorts.innerHTML = "";

    try {
        const items = await obtenerVideosPorTipo("short", 8);

        // Filtrar solo los Shorts reales (menos de 60 segundos) por si la API mezcla
        const ids = items.map(v => v.id.videoId);
        const duraciones = await obtenerDuraciones(ids);

        let contador = 0;
        items.forEach(video => {
            const duracion = duraciones[video.id.videoId];
            if (duracion !== undefined && duracion < 60 && contador < 6) {
                crearElementoVideo(video, contenedorShorts);
                contador++;
            }
        });
    } catch (error) {
        console.error("Error obteniendo los Shorts:", error);
    }
}

// Obtener y mostrar videos largos (videoDuration=medium + long)
async function obtenerVideosLargos() {
    const contenedorLargos = document.getElementById("recent-videos");
    contenedorLargos.innerHTML = "";

    try {
        // Combina videos medianos y largos para incluir todos los que no son Shorts
        const [medios, largos] = await Promise.all([
            obtenerVideosPorTipo("medium", 3),
            obtenerVideosPorTipo("long", 3)
        ]);

        // Mezcla y ordena por fecha de publicación (más recientes primero)
        const todos = [...medios, ...largos].sort((a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );

        const ids = todos.map(v => v.id.videoId);
        const duraciones = await obtenerDuraciones(ids);

        let contador = 0;
        todos.forEach(video => {
            const duracion = duraciones[video.id.videoId];
            // Excluye shorts por si acaso (>= 60 segundos)
            if (duracion !== undefined && duracion >= 60 && contador < 6) {
                crearElementoVideo(video, contenedorLargos);
                contador++;
            }
        });

        // Si no hay videos largos, muestra un mensaje informativo
        if (contador === 0) {
            contenedorLargos.innerHTML = "<p class='sin-videos'>Aún no hay videos largos</p>";
        }
    } catch (error) {
        console.error("Error obteniendo los videos largos:", error);
    }
}

function actualizarEnTiempoReal() {
    obtenerSuscriptores();
    obtenerShorts();
    obtenerVideosLargos();
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarEnTiempoReal();
    setInterval(actualizarEnTiempoReal, 1200000); // 20 minutos

    // Aplicar el efecto fade-in a los elementos con esa clase
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 * index);
    });
});
