
export function guardarPalabras() {

    // INCORPORANDO LAS PALABRAS NUEVAS 
    let palabras = [];

    let palabrasNuevasString = sessionStorage.getItem("palabrasNuevas");
    if (palabrasNuevasString != null) {
        let palabrasNuevas = palabrasNuevasString.split(",");
        palabrasNuevas.forEach((palabra) => {
            palabras.push(palabra);
        });
    }

    return palabras;

}

