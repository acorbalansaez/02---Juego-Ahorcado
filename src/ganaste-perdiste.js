
const cabeza = document.querySelector("[data-cabeza]");
const titulo = document.querySelector("[data-titulo]");
const menu = document.querySelector("[data-menu]");
const jugar = document.querySelector("[data-iniciar]");
const agregar = document.querySelector("[data-agregar]");
const ventana = document.querySelector("[data-ventana]");


iniciarAnimacion();

function iniciarAnimacion() {

    cabeza.classList.add("animacionMoverCabeza");

    setTimeout(() => {

        setTimeout(() => {
            titulo.classList.replace("invisible", "animacionSubir");

            setTimeout(() => {
                menu.classList.replace("invisible", "animacionAparecerRapido");
            },600);

        }, 800);
        
    },500);
    

}

// PROHIBIR SCROLL
// window.addEventListener('scroll', () => {
//     window.scrollTo(0, 0);
// });

// BOTÓN JUGAR
jugar.addEventListener('click', () => {
    window.location.href = "juego.html";
});

// BOTÓN AGREGAR PALABRA
agregar.addEventListener('click', () => {
    ventana.classList.replace("invisible", "animacionAparecerRapido");
});

