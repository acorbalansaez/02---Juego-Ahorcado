import { animar } from "./animaciones.js";

// CAPTURA DE DIBUJO
const presentacion = document.querySelector("[data-presentacion]");
const dibujo = document.querySelector("[data-dibujo]");
const logo = document.querySelector("[data-logo]");
const menu = document.querySelector("[data-menu]");
// CAPTURA DE ELEMENTOS - Inicio
const btnIniciarJuego = document.querySelector("[data-iniciar]");
const btnAgregarPalabras = document.querySelector("[data-agregar-inicio]");
// CAPTURA DE ELEMENTOS - Ventana
const ventana = document.querySelector("[data-ventana]");
const input = document.querySelector("[data-input]");

const musica = document.querySelector("[data-musica]");

// Configurando una variable nula
let seAnimo = sessionStorage.getItem("seAnimo");


window.addEventListener('load', () => {

    // Animar el inicio solo la primera vez
    if (seAnimo == null){
        presentacion.classList.replace("invisible", "visible");
        animar();
        musica.play();
        sessionStorage.setItem("seAnimo", "true");
    } else {
        posicionarElementos();
    }

})

function posicionarElementos(){
    dibujo.classList.add("inhabilitado");
    logo.classList.replace("invisible", "visible");
    logo.classList.add("reacomodarLogo");
    menu.classList.replace("invisible", "visible");
}


// INICIAR JUEGO
btnIniciarJuego.addEventListener('click', () => {
    window.location.href = "juego.html";
});


// VENTANA AGREGAR PALABRAS
btnAgregarPalabras.addEventListener('click', () => {
    ventana.classList.replace("invisible", "animacionAparecerRapido");
});


