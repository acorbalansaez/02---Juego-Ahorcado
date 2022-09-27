// CAPTURA DE ELEMENTOS 
const ventana = document.querySelector("[data-ventana]");
const btnCerrarVentana = document.querySelector("[data-cerrar]");
const input = document.querySelector("[data-input]");
const btnAgregar = document.querySelector("[data-agregar-ventana]");
const btnJugar = document.querySelector("[data-jugar]");
const contadorInput = document.querySelector("[data-contador-input]");
const mensaje = document.querySelector("[data-input-mensaje]");
const cartel = document.querySelector("[data-cartel");


cerrarVentana();
iniciarJuego();
escucharInput();
escucharBotonAgregar();



// ----------------------- AGREGAR PALABRAS ---------------------

function cerrarVentana() {

    btnCerrarVentana.addEventListener('click', () => {
        reiniciarValoresVentana();
        ventana.classList.replace("animacionAparecerRapido", "invisible");
    });

}

function iniciarJuego() {
    btnJugar.addEventListener('click', () => {
        window.location.href = "juego.html";
    });
}

function reiniciarValoresVentana() {

    desactivarBoton();
    input.value = "";
    input.classList.replace("agregarPalabras__input--error", "agregarPalabras__input");
    contadorInput.innerHTML = `0/8`;
    contadorInput.classList.replace("contador--error", "contador--normal");
    mensaje.classList.replace("visible", "invisible");

}

function activarBoton() {

    btnAgregar.classList.replace("botonAgregarInactivo", "botonAgregarActivo");
    btnAgregar.style.cursor = "pointer";

    btnAgregar.addEventListener('mouseenter', () => {
        btnAgregar.classList.replace("botonAgregarActivo", "botonAgregarActivo--hover");
    });

    btnAgregar.addEventListener('mouseleave', () => {
        btnAgregar.classList.replace("botonAgregarActivo--hover", "botonAgregarActivo");
    });
}

function desactivarBoton() {
    btnAgregar.classList.remove("botonAgregarActivo", "botonAgregarActivo--hover");
    btnAgregar.classList.add("botonAgregarInactivo");
    btnAgregar.style.cursor = "auto";
}

function escucharInput() {


    input.addEventListener('input', (caracterIngresado) => {

        let palabra = caracterIngresado.target.value;
        let [esMenor, esValida, esMayor, hayMayus, hayCaractInvalidos, palabraRepetida] = validarPalabra(palabra);
        let cantidadCaracteres = palabra.length;

        contadorInput.innerHTML = `${cantidadCaracteres}/8`;

        cambiarEstadoBoton(esValida);
        cambiarEstadoInput(esValida, esMenor, esMayor, hayMayus, hayCaractInvalidos, palabraRepetida);

    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btnAgregar.click();
        }
    });


}

function cambiarEstadoBoton(esValida) {
    if (esValida == true) {
        activarBoton();
    } else {
        desactivarBoton()
    }
}

function cambiarEstadoInput(esValida, esMenor, esMayor, hayMayus, hayCaractInvalidos, palabraRepetida) {

    if (hayMayus) {
        // mensaje
        mensaje.classList.replace("invisible", "visible");
        mensaje.classList.add("mensaje--error");
        mensaje.innerHTML = "¡No utilices mayúsculas!";
        // input
        input.classList.add("agregarPalabras__input--error");

    } else if (hayCaractInvalidos) {

        // mensaje
        mensaje.classList.replace("invisible", "visible");
        mensaje.classList.add("mensaje--error");
        mensaje.innerHTML = "No ingreses números o caracteres especiales";
        // input
        input.classList.add("agregarPalabras__input--error");

    } else if (esMenor) {
        // mensaje
        mensaje.classList.replace("invisible", "visible");
        mensaje.classList.replace("mensaje--error", "mensaje--normal");
        mensaje.innerHTML = "Escribí al menos 3 letras y máximo 8";
        // input
        input.classList.replace("agregarPalabras__input--error", "agregarPalabras__input");

    } else if (esMayor) {
        // mensaje
        mensaje.classList.replace("invisible", "visible");
        mensaje.classList.add("mensaje--error");
        mensaje.innerHTML = "¡No superes el límite de letras!";
        // input
        input.classList.add("agregarPalabras__input--error");
        contadorInput.classList.replace("contador--normal", "contador--error");

    } else if (palabraRepetida) {
        // mensaje
        mensaje.classList.replace("invisible", "visible");
        mensaje.classList.add("mensaje--error");
        mensaje.innerHTML = "¡Palabra repetida!";
        // input
        input.classList.add("agregarPalabras__input--error");
        contadorInput.classList.replace("contador--normal", "contador--error");


    } else if (esValida) {
        // mensaje
        mensaje.classList.replace("visible", "invisible");
        mensaje.classList.replace("mensaje-error", "mensaje--normal");
        mensaje.innerHTML = "";
        // input
        input.classList.replace("agregarPalabras__input--error", "agregarPalabras__input");
        contadorInput.classList.replace("contador--error", "contador--normal");

    }

}

function escucharBotonAgregar() {

    btnAgregar.addEventListener('click', () => {

        let palabraIngresada = input.value;
        let [esMenor, esValida, esMayor, hayMayus, hayCaractInvalidos, palabraRepetida] = validarPalabra(palabraIngresada);

        if (esValida == true) {
            agregarPalabra(palabraIngresada);
            reiniciarValoresVentana();
        }

    });

}

function validarPalabra(palabra) {

    let nroCaracteres = palabra.length;
    let caracteresSuficientes;
    let esMenor;
    let esMayor;
    let contieneMayus = /[A-Z]/;
    let hayMayus;
    let caracteresInvalidos = /[0-9\s+¿?/()&%$#"¡!'=|<>-_;:.,\u00f1\u00d1]/;
    let hayCaractInvalidos;
    let esValida;
    let palabraRepetida;

    if (nroCaracteres < 3) {
        esMenor = true;
        caracteresSuficientes = false;
    } else if (nroCaracteres >= 3 && nroCaracteres <= 8) {
        caracteresSuficientes = true;
    } else if (nroCaracteres > 8) {
        esMayor = true;
        caracteresSuficientes = false;
    }

    if (contieneMayus.test(palabra) == true) {
        hayMayus = true;
        esValida = false;
    } else if (caracteresInvalidos.test(palabra) == true) {
        hayCaractInvalidos = true;
        esValida = false;
    } else if (caracteresSuficientes == false) {
        esValida = false;
    } else if (caracteresSuficientes == true && caracteresInvalidos.test(palabra) == false) {
        esValida = true;
    }
    return [esMenor, esValida, esMayor, hayMayus, hayCaractInvalidos, palabraRepetida];
}

// --------------------------------------------

let palabrasNuevasString = sessionStorage.getItem("palabrasNuevas");
let palabrasNuevas = [];

if (palabrasNuevasString != null) {
    palabrasNuevas = palabrasNuevasString.split(",");
}

function agregarPalabra(palabra) {

    palabrasNuevas.push(palabra);
    sessionStorage.setItem("palabrasNuevas", palabrasNuevas);
    mostrarCartel();

}

function mostrarCartel() {

    cartel.classList.remove("invisible");
    cartel.classList.remove("animacionDesparecer");
    cartel.classList.add("animacionAparecerLento");

    setTimeout(() => {

        cartel.classList.replace("animacionAparecerLento", "animacionDesparecer");

        input.addEventListener('click', () => {
            cartel.classList.remove("animacionDesparecer");
            cartel.classList.add("invisible");
        });

    }, 500);


}








