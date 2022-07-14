// IMÁGENES 
var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];
var img1 = document.getElementById("imagen1");
var img2 = document.getElementById("imagen2");
var img3 = document.getElementById("imagen3");

// GESTIÓN MONEDAS
var entradaMonedas = document.getElementById("entradaMonedas"); // input
var introducirMonedas = document.getElementById("introducirMonedas"); // button
var monedasActuales = document.getElementById("monedasActuales"); 

// NUEVA TIRADA 
function nuevaTirada () {
    // Generar 3 números aleatorios
    var random1 = Math.round(Math.random()*9);
    var random2 = Math.round(Math.random()*9);
    var random3 = Math.round(Math.random()*9); 

    // Construir src de la img
    img1.src = "img/" + listaImagenes[random1] + ".png";
    img2.src = "img/" + listaImagenes[random2] + ".png";
    img3.src = "img/" + listaImagenes[random3] + ".png";
   
    // Crear un array con los valores generados por random como posición del array listaImágenes
    var tirada = [listaImagenes[random1], listaImagenes[random2], listaImagenes[random3]];
    
    // Funcion restar moneda por tirada
    gastaUnaMoneda();
    // Pasar a la funcion "premios" el valor del array 
    premios(tirada);
}

// PREMIOS
function premios(tiradax){
    console.log(tiradax);

    var img1 = tiradax[0];
    var img2 = tiradax[1];
    var img3 = tiradax[2];

    // Combinaciones que incluyen "dollar"
    if(img1 == "dollar" && img2 == "dollar" && img3 == "dollar" ) {
         historial("Tres monedas DOLLAR! Ganas 10 monedas.");
         sumaMonedas(10);
        }else if ((img1 == "dollar" && img2 == "dollar") || 
                (img1 == "dollar" && img3 == "dollar") || 
                (img2 == "dollar" && img3 == "dollar")){
                historial("¡Dos monedas DOLLAR! Ganas 4 monedas.");
                sumaMonedas(4); 
        }else if (tiradax.includes("dollar") && (img1 == img2 || img1 == img3 || img3 == img2)){
            historial("¡Dos IGUALES y una moneda DOLLAR! Ganas 3 monedas."); 
            sumaMonedas(3);
        }else if (tiradax.includes("dollar")){
            historial("¡Una moneda DOLLAR! Ganas 1 moneda."); 
            sumaMonedas(1);
        }

    // Combinaciones que no incluyen "dollar"
    if(tiradax.indexOf("dollar")==-1){
        if(img1 == img2 && img1 == img3 && img2 == img3){
            historial("¡Tres IGUALES! Ganas 5 monedas."); 
            sumaMonedas(5);
        }else if (img1 == img2 || img1 == img3 || img2 == img3){
            historial("¡Dos IGUALES! Ganas 2 monedas."); 
            sumaMonedas(2);
        }
    }   
}

// INTRODUCIR MONEDAS
function introduceMonedas(){
    var cantidadMonedas = entradaMonedas.value;
    monedasActuales.innerHTML = cantidadMonedas;

    // Agregar a historial tantas monedas como value del input
    historial("Has introducido " + cantidadMonedas + " monedas.");

    // Reestablecer a 0 y deshabilitar entrada de monedas
    entradaMonedas.value = 0;
    entradaMonedas.disabled = true;
    introducirMonedas.disabled = true;
};

// PULSAR PALANCA
function pulsarPalanca(){
    if (monedasActuales.innerHTML < 1)
    {
        alert("Por favor, introduce monedas.");
    } else{
        document.getElementById("palanca").src = "img/palancaDOWN.png";
        
        // Funcion tirada
        nuevaTirada();
    }
}

// SOLTAR PALANCA
function soltarPalanca(){
    document.getElementById("palanca").src = "img/palancaUP.png";
}

// RESTA 1 MONEDA 
function gastaUnaMoneda(){
    // Restar 1 moneda a monedasActuales
    --monedasActuales.innerHTML 
    // Añadir gasto a historial
    historial("Gastas una moneda.");
}

// SUMA MONEDAS
function sumaMonedas(valor){
    monedasActuales.innerHTML = Number(monedasActuales.innerHTML) + valor;
}
 
// HISTORIAL
function historial(texto){
    var newOl = document.createElement("LI");
    var textNode = document.createTextNode(texto);
    newOl.appendChild(textNode);
    var list = document.getElementById("historial");
    list.insertBefore(newOl, list.childNodes[0]);
}

// SACAR MONEDAS
function salir(){
    // Pasar monedas actuales a entrada de monedas
    entradaMonedas.value = monedasActuales.innerHTML;

    alert("Has conseguido un total de " + entradaMonedas.value + " monedas.");
    historial("Has sacado " + entradaMonedas.value + " monedas.");
    // Vaciar contador monedasActuales
    monedasActuales.innerHTML = 0;
    // Habilitar input y button
    entradaMonedas.disabled = false;
    introducirMonedas.disabled = false;
}

document.getElementById("introducirMonedas").addEventListener("click", introduceMonedas);
document.getElementsByClassName("palanca")[0].addEventListener("mousedown", pulsarPalanca);
document.getElementsByClassName("palanca")[0].addEventListener("mouseup", soltarPalanca);
document.getElementById("salir").addEventListener("click", salir);