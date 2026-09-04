/*********************************************
   MENÚ HAMBURGUESA (común a todas las páginas)
   Al abrir el menú: activa el overlay (fondo
   borroso y oscurecido) y desenfoca el contenido.
*********************************************/

function findContentEls() {
    const selectors = [
        ".g-container",
        ".container",
        ".content",
        ".contact-container",
        ".bio-container",
        ".portfolio-container",
        ".youtube-container",
        ".game-container",
        ".g-inner"
    ];
    const els = [];
    for (const sel of selectors) {
        document.querySelectorAll(sel).forEach(el => els.push(el));
    }
    return els;
}

function setContentBlur(on) {
    if (on) {
        findContentEls().forEach(el => el.classList.add("blurred"));
    } else {
        findContentEls().forEach(el => el.classList.remove("blurred"));
    }
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (!sidebar) return;

    sidebar.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
    setContentBlur(sidebar.classList.contains("active"));
}

// Cerrar el menú si se hace clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const overlay = document.getElementById("overlay");
    if (sidebar && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
            setContentBlur(false);
        }
    }
});
