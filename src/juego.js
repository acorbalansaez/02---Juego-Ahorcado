import { guardarPalabras } from "./palabras.js";

// BOTONES
const btnHome = document.querySelector("[data-home]");
const btnRestart = document.querySelector("[data-restart]");

// CARTEL
const cartel = document.querySelector("[data-cartel]");
const cartelPalabra = document.querySelector("[data-cartel-palabra]");
const ojosCartel = document.querySelectorAll("[data-ojos-cartel]");

//DIBUJO
const cabeza = document.querySelector("[data-cabeza]");
const torso = document.querySelector("[data-torso]");
const brazoIzquierdo = document.querySelector("[data-brazo-izquierdo]");
const brazoDerecho = document.querySelector("[data-brazo-derecho]");
const piernaIzquierda = document.querySelector("[data-pierna-izquierda]");
const piernaDerecha = document.querySelector("[data-pierna-derecha]");
const ojoIzquierdo = document.querySelector("[data-ojo-izquierdo]");
const ojoDerecho = document.querySelector("[data-ojo-derecho]");

const dibujoPersonaje = [];
dibujoPersonaje.push(cabeza);
dibujoPersonaje.push(torso);
dibujoPersonaje.push(brazoIzquierdo);
dibujoPersonaje.push(brazoDerecho);
dibujoPersonaje.push(piernaIzquierda);
dibujoPersonaje.push(piernaDerecha);
dibujoPersonaje.push(ojoIzquierdo);
dibujoPersonaje.push(ojoDerecho);

//CAPTURA PALABRA
const contenedorPalabra = document.querySelector("[data-contenedor-palabra");
const letrasErradas = document.querySelector("[data-letras-erradas]");

// SONIDOS
const punto = document.querySelector("[data-punto]");
const error = document.querySelector("[data-error]");

// VARIABLES
let palabras = ["alura", "caramelo", "nueces", "glucosa", "arbusto", "cangrejo", "coral", "azulejo", "tienda", "caracol", "dulces", "proteína", "recuerdo", "código", "mutación", "captura", "bandera", "mundial", "argentina"];
let palabraElegida;
let errores = 0;
let aciertos = 0;
const erroresPermitidos = 8;
let letrasAgregadasErradas = [];
let letrasAgregadasAcertadas = [];


//IR AL HOME Y RESTART
btnHome.addEventListener('click', () => {
    window.location.href = "index.html";
})

btnRestart.addEventListener('click', () => {

    cartel.classList.remove("animacionDesparecer");
    cartel.classList.remove("invisible");
    cartel.classList.add("animacionAparecerLento");
    animarOjos(ojosCartel);

    //console.log(palabraElegida);
    //console.log(cartelPalabra);
    cartelPalabra.innerHTML = palabraElegida.toUpperCase();

    setTimeout(() => {
        cartel.classList.replace("animacionAparecerLento", "animacionDesparecer");
        setTimeout(() => {
            cartel.classList.replace("animacionDesparecer", "invisible");
        }, 1500);
        location.reload();
    }, 1800);

})

function animarOjos(ojos) {
    setTimeout(() => {
        ojos[0].classList.add("animacionRotarIzquierda");
        ojos[1].classList.add("animacionRotarDerecha");
    }, 500);
}

// PROHIBIR SCROLL
window.addEventListener('scroll', () => {
    window.scrollTo(0, 0);
});

//INICIAR JUEGO
iniciarJuego();

function iniciarJuego() {

    // Agregar palabras nuevas
    let palabrasNuevasString = sessionStorage.getItem("palabrasNuevas");
    if (palabrasNuevasString != null) {
        let palabrasNuevas = guardarPalabras();
        añadirPalabrasNuevas(palabrasNuevas);
    }


    // Elegir palabra al azar
    let palabraElegida = elegirPalabra();

}

function añadirPalabrasNuevas(palabrasNuevas) {

    palabrasNuevas.forEach(palabra => {
        if (!palabras.includes(palabra)) {
            palabras.push(palabra);
        }
    });

    sessionStorage.setItem("todasLasPalabras", palabras);

}

function elegirPalabra() {

    let valorRandom = Math.floor(Math.random() * palabras.length);



    palabraElegida = palabras[valorRandom];

    dibujarPalabra(palabraElegida);
    //console.log(palabraElegida);
    return palabraElegida;

}

function dibujarPalabra(palabraElegida) {

    let letras = palabraElegida.split('');

    let cadaLetra = [];

    letras.forEach((l) => {

        let letraGrupo = document.createElement("div");
        letraGrupo.classList.add("letraGrupo");

        let letra = document.createElement("span");
        letra.classList.add("letra", "invisible");
        letra.innerHTML = l.toUpperCase();
        cadaLetra.push(letra);

        let linea = document.createElement("div");
        linea.classList.add("linea");

        letraGrupo.appendChild(letra);
        letraGrupo.appendChild(linea);
        contenedorPalabra.appendChild(letraGrupo);

    })

    coleccionLetras(cadaLetra);

}

function coleccionLetras(cadaLetra) {

    let arregloLetras = [];

    cadaLetra.forEach((l) => {
        let letra = l.textContent;
        arregloLetras.push(letra);

    });

    verificarLetraIngresada(cadaLetra, arregloLetras);

}

function verificarLetraIngresada(cadaLetra, arregloLetras) {

    window.addEventListener('keydown', (e) => {

        if (e.keyCode >= 65 && e.keyCode <= 90) {

            let letraIngresada = e.key.toUpperCase();

            if (arregloLetras.includes(letraIngresada) && !letrasAgregadasAcertadas.includes(e.key)) {

                letrasAgregadasAcertadas.push(e.key);
                punto.play();

                let posiciones = obtenerIndex(arregloLetras, letraIngresada);

                posiciones.forEach((posicion) => {
                    cadaLetra[posicion].classList.replace("invisible", "visible");
                });

                if (!letrasAgregadasErradas.includes(letraIngresada)) {
                    letrasAgregadasErradas.push(letraIngresada);

                    if (posiciones.length == 1) {
                        aciertos = aciertos + 1;
                    } else if (posiciones.length > 1) {
                        aciertos = aciertos + (1 * posiciones.length);
                    }

                }


            } else if (!arregloLetras.includes(letraIngresada)) {
                agregarError(letraIngresada);
            }

        }

        verificarEstadoJuego(arregloLetras);

    })


}

function obtenerIndex(arregloLetras, letraIngresada) {
    return arregloLetras.map((l, indice) => l == letraIngresada ? indice : '').filter(String);
}

function agregarError(letra) {

    let letrasYaEscritas = letrasErradas.textContent;

    if (!letrasYaEscritas.includes(letra)) {
        letrasErradas.innerText += letra;
        errores++;
        error.play();
        mostrarDibujo(errores);
    }

    //console.log(letrasYaEscritas);

}

function mostrarDibujo(errores) {

    for (let i = 1; i <= errores; i++) {
        dibujoPersonaje[i - 1].classList.replace("invisible", "visible");
    }

}

function verificarEstadoJuego(arregloLetras) {

    //console.log("letras totales: ", arregloLetras.length);
    //console.log("aciertos: ", aciertos);
    //console.log("errores: ", errores);

    if (aciertos == arregloLetras.length) {
        window.location.href = "ganaste.html";
    }

    if (errores == erroresPermitidos) {
        sessionStorage.setItem("palabraElegida", palabraElegida);
        window.location.href = "perdiste.html";
    }

}