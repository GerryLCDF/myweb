// El menú hamburguesa (toggle, overlay y blur) lo gestiona js/menu.js en común.

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
