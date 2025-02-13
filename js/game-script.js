function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".game-container");

    sidebar.classList.toggle("active");
    mainContent.classList.toggle("blurred");
}

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const mainContent = document.querySelector(".game-container");

    if (sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("active");
            mainContent.classList.remove("blurred");
        }
    }
});

