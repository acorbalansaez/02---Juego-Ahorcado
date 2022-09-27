
// CAPTURA DE ELEMENTOS - Animación
const presentacion = document.querySelector("[data-presentacion]");
const logo = document.querySelector("[data-logo]");
const ojos = document.querySelectorAll("[data-ojos]");
const dibujo = document.querySelector("[data-dibujo]");
const menu = document.querySelector("[data-menu]");


export function animar() {

    presentacion.classList.add("animacionSubida1");

    // GIRAR OJOS
    setTimeout(() => {
        ojos[0].classList.add("animacionRotarIzquierda");
        ojos[1].classList.add("animacionRotarDerecha");
    }, 1000);

    // APARECER LOGO + BOTONES
    setTimeout(() => {
        logo.classList.replace("invisible", "animacionAparecerLento");
        aparecerInicio();
    }, 1300);

}

function aparecerInicio() {

    setTimeout(() => {
        dibujo.classList.add("animacionSubidaDibujo");
        logo.classList.replace("animacionAparecerLento", "animacionSubidaLogo");
        eliminarDibujo();
    }, 1200)

    setTimeout(() => {
        menu.classList.replace("invisible", "animacionAparecerRapido");
    }, 2400)

}

function eliminarDibujo() {
    setTimeout(() => {
        dibujo.classList.add("invisible");
    }, 900);
}

