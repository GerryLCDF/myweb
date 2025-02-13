/*********************************************
   MENÚ HAMBURGUESA
*********************************************/
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const mainContainer = document.querySelector(".g-container") 
                       || document.querySelector(".container");
  
    sidebar.classList.toggle("active");
    if(mainContainer) {
      mainContainer.classList.toggle("blurred");
    }
  }
  
  // Cerrar el menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("sidebar");
    const menuBar = document.querySelector(".menu-bar");
    const mainContainer = document.querySelector(".g-container") 
                       || document.querySelector(".container");
  
    if(sidebar.classList.contains("active")) {
      // Si el click no fue ni en sidebar ni en menuBar
      if(!sidebar.contains(e.target) && !menuBar.contains(e.target)) {
        // Cerrar
        sidebar.classList.remove("active");
        if(mainContainer) {
          mainContainer.classList.remove("blurred");
        }
      }
    }
  });
  
  
    
        /*********************************************
           EFECTO FADE-IN (aparición secuencial)
        *********************************************/
        function initFadeInEffects() {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach((el, index) => {
                const delay = 300 * index;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
            });
        }
    
        // Iniciar efectos de aparición
        initFadeInEffects();
 

  /*******************************************
   Efecto fade-in al cargar la página
*******************************************/
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los .fade-in
  const fadeEls = document.querySelectorAll('.fade-in');

  fadeEls.forEach((el, index) => {
    // Retraso de 200ms * index, ajusta si quieres
    const delay = 200 * index;
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });
});


