/*********************************************
   MENÚ HAMBURGUESA Y EFECTO BLUR
*********************************************/
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const mainContainer = document.querySelector(".g-container");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    mainContainer.classList.toggle("blurred");
}

// Cerrar el menú si se hace clic fuera
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const overlay = document.getElementById("overlay");
    const mainContainer = document.querySelector(".g-container");

    if (sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            mainContainer.classList.remove("blurred");
        }
    }
});
