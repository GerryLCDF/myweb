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
    `;
    contenedor.appendChild(videoElement);
}

// Añadir el rectángulo "Ver más en YouTube" al final de un carrusel
function agregarVerMas(contenedor, canalId) {
    const verMas = document.createElement("div");
    verMas.classList.add("ver-mas");
    verMas.innerHTML = `
        <a href="https://www.youtube.com/channel/${canalId}/videos" target="_blank">
            Ver más<br>en YouTube
        </a>
    `;
    contenedor.appendChild(verMas);
}

// Obtener una sola lista de videos recientes del canal, ordenada por fecha
// (clasifica cada video como largo [>=60s] o short [<60s] según su duración real)
async function obtenerVideosClasificados() {
    // Pool amplio y ordenado por fecha para luego repartir entre largos y shorts
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}` +
        `&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=50`;
    const response = await fetch(url);
    const data = await response.json();
    const items = data.items || [];

    const ids = items.map(v => v.id.videoId);
    const duraciones = await obtenerDuraciones(ids);

    const largos = [];
    const shorts = [];
    items.forEach(video => {
        const duracion = duraciones[video.id.videoId];
        if (duracion === undefined) return;
        const item = { video, duracion };
        if (duracion < 120) {   // Short: menos de 2 minutos
            shorts.push(item);
        } else {
            largos.push(item);
        }
    });
    return { largos, shorts };
}

// Obtener y mostrar shorts (los últimos 4 subidos)
async function obtenerShorts() {
    const contenedorShorts = document.getElementById("shorts-videos");
    contenedorShorts.innerHTML = "";

    try {
        const { shorts } = await obtenerVideosClasificados();
        const ultimos = shorts.slice(0, 4); // últimos 4
        ultimos.forEach(item => crearElementoVideo(item.video, contenedorShorts));
        agregarVerMas(contenedorShorts, CHANNEL_ID);
    } catch (error) {
        console.error("Error obteniendo los Shorts:", error);
    }
}

// Obtener y mostrar videos largos (los últimos 3 subidos)
async function obtenerVideosLargos() {
    const contenedorLargos = document.getElementById("recent-videos");
    contenedorLargos.innerHTML = "";

    try {
        const { largos } = await obtenerVideosClasificados();
        const ultimos = largos.slice(0, 3); // últimos 3
        ultimos.forEach(item => crearElementoVideo(item.video, contenedorLargos));

        if (ultimos.length === 0) {
            contenedorLargos.insertAdjacentHTML(
                "beforeend",
                "<p class='sin-videos'>Aún no hay videos largos</p>"
            );
        }
        agregarVerMas(contenedorLargos, CHANNEL_ID);
    } catch (error) {
        console.error("Error obteniendo los videos largos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Carga inicial de todo
    obtenerSuscriptores();
    obtenerShorts();
    obtenerVideosLargos();

    // Actualizaciones periódicas (para no agotar la cuota diaria de la API)
    setInterval(obtenerSuscriptores, 3600000);      // suscriptores: cada 1 hora
    setInterval(obtenerShorts, 43200000);           // shorts: cada 12 horas
    setInterval(obtenerVideosLargos, 43200000);     // videos largos: cada 12 horas

    // Aplicar el efecto fade-in a los elementos con esa clase
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 * index);
    });
});
