const frasePalabra = document.querySelector("[data-palabra-contenedor]");
const palabra = document.querySelector("[data-palabra]");
const audio = document.querySelector("[data-audio]");

let palabraElegida = sessionStorage.getItem("palabraElegida");
palabra.innerHTML = palabraElegida;

setTimeout(() => {
    frasePalabra.classList.replace("invisible", "animacionAparecerRapido");
}, 2200);


window.addEventListener('load', () => {
    audio.play();
});