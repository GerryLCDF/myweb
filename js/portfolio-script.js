// Función para abrir/cerrar el menú y ajustar el overlay
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".portfolio-container");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");

    if (mainContent) {
        mainContent.classList.toggle("blurred");
    }

    // Evitar el scroll cuando el menú está abierto
    document.body.style.overflow = sidebar.classList.contains("open") ? "hidden" : "auto";
}

// Cerrar el menú al hacer clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".portfolio-container");

    if (sidebar.classList.contains("open")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("open");
            overlay.classList.remove("active");

            if (mainContent) {
                mainContent.classList.remove("blurred");
            }

            document.body.style.overflow = "auto"; // Reactivar el scroll
        }
    }
});

// Redirigir al hacer clic en imágenes con data-link
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.grid-gallery img').forEach(img => {
        img.addEventListener('click', () => {
            const link = img.getAttribute('data-link');
            if (link) {
                window.open(link, "_blank"); // Abrir en nueva pestaña
            }
        });
    });
});
