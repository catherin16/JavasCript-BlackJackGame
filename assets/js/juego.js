
(() => {

   
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];


let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector('#btnPedir'),
 btnDetener = document.querySelector('#btnDetener'),
btnNuevo = document.querySelector('#btnNuevo');


const divCartasJugador   = document.querySelector('#jugador-cartas'),
divCartasComputadora   = document.querySelector('#computadora-cartas'),
 puntosHtml = document.querySelectorAll('small');


const crearDeck = () =>{
for(let i = 2; i <= 10; i++ ){
    for(let tipo of tipos){
        deck.push(i + tipo);
    }

}


for(let tipo of tipos){
    for(let esp of especiales){
        deck.push(esp + tipo);
    }
}

console.log(deck);
deck = _.shuffle(deck);
return deck;
}

crearDeck();

// Esta funcion me permite pedir una carta

const pedirCarta = () => {

      if(deck.length === 0){
        throw 'No hay cartas en el deck'
      }

    const carta = deck.pop();
    return carta;

}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
     return (isNaN(valor)) ? (valor === 'A') ? 11 : 10
     : valor * 1;
}
const valor = valorCarta(pedirCarta());
//console.log(valor);

//Turno de la computadora

const turnoComputadora =(puntosMinimos) => {

    do{

   const carta = pedirCarta();
   puntosComputadora = puntosComputadora + valorCarta(carta);
   puntosHtml[1].innerText = puntosComputadora;
   
   const imgCarta = document.createElement('img');
   imgCarta.src = `assets/cartas/${ carta }.png`;
   imgCarta.classList.add('cartas');
   
   divCartasComputadora.append(imgCarta);

   if(puntosMinimos > 21){
    break;
   }

    }while((puntosComputadora < puntosMinimos) && ([puntosMinimos <= 21]) );

     setTimeout( ()=> {

       if(puntosComputadora === puntosMinimos){
        alert('Nadie Gana');
       }else if(puntosMinimos > 21){
        alert('Computadora Gana');
       }else if( puntosComputadora > 21){
        alert('Jugador Gana');
       }else{
        alert('Computadora Gana')
       }

     },10);

}

//Eventos

btnPedir.addEventListener('click', ()=> {
const carta = pedirCarta();
puntosJugador = puntosJugador + valorCarta(carta);
puntosHtml[0].innerText = puntosJugador;

const imgCarta = document.createElement('img');
imgCarta.src = `assets/cartas/${ carta }.png`;
imgCarta.classList.add('cartas');

divCartasJugador.append(imgCarta);
if(puntosJugador > 21){
    console.warn('Lo siento mucho,perdiste');
    btnPedir.disabled = true;
    btnDetener.disabled;
    turnoComputadora(puntosJugador);
}else if(puntosJugador === 21){
    console.warn('21, genial!');
    btnPedir.disabled = true;
    btnDetener.disabled;
    turnoComputadora(puntosJugador);
}

});

btnDetener.addEventListener('click',  ()=>{
btnPedir.disabled = true;
btnDetener.disabled = true;

turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener('click', ()=> {
  
    deck = crearDeck();


    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

      btnPedir.disabled = false;
    btnDetener.disabled = false;

});



})();

