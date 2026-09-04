/*********************************************
   MENÚ HAMBURGUESA: lo gestiona js/menu.js (común)
*********************************************/


    
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


