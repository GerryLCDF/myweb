document.addEventListener("DOMContentLoaded", () => {
    // Efecto fade-in al cargar la página
    setTimeout(() => {
        document.body.classList.add("visible");
    }, 100);
});

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const content = document.querySelector(".bio-container");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    content.classList.toggle("blurred");
}

// Cerrar menú si se hace clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuBar = document.querySelector(".menu-bar");
    const content = document.querySelector(".bio-container");

    if (sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            content.classList.remove("blurred");
        }
    }
});
