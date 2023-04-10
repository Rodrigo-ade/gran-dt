let maximoJugadores = 10;
let jugadoresSeleccionados = 0;

function manejarSeleccionJugador(jugador){
  if(!jugador.classList.contains("active") && jugadoresSeleccionados < 10){
    jugador.classList.add("active");
    jugadoresSeleccionados ++;
  }
  else{
    if(jugador.classList.contains("active")){
      jugador.classList.remove("active");
      jugadoresSeleccionados --;
    }
  }
  actualizarTextoJugadores();
  manejarBotonConfirmacionJugadores();
};

function actualizarTextoJugadores(){
  if(jugadoresSeleccionados < maximoJugadores){
    document.querySelector("#jugadores-elegidos").textContent = `Debes elegir ${maximoJugadores - jugadoresSeleccionados} jugadores más`;
  }
  else{
    document.querySelector("#jugadores-elegidos").textContent = `¿Este es tu equipo final?`;
  }
};

function manejarBotonConfirmacionJugadores(){
  const $BOTON_CONFIRMAR = document.querySelector("#confirmar");
  if(jugadoresSeleccionados === maximoJugadores){
    $BOTON_CONFIRMAR.classList.remove("oculto");
  }
  else{
    $BOTON_CONFIRMAR.classList.add("oculto");
  }
};

async function cargarJugadores(){
  return (await fetch ("src/jugadores.json")).json();
};

async function crearJugadores(){
  const $LISTA_JUGADORES = document.querySelector("#jugadores");

  let jugadoresData = await cargarJugadores();
  jugadoresData.results.forEach(jugador => {
    let nombreJugador = jugador.nombre;
    let equipoJugador = jugador.equipo;
    let precioJugador = Number(jugador.precio);
    
    let $jugador = document.createElement("a");
    $jugador.classList.add("list-group-item", "list-group-item-action", "list-group-item-dark");
    $jugador.href = ("#");
    $jugador.dataset.nombre = nombreJugador;
    $jugador.dataset.equipo = equipoJugador;
    $jugador.dataset.precio = precioJugador;
    $jugador.textContent = nombreJugador;

    $LISTA_JUGADORES.appendChild($jugador);

    $jugador.addEventListener("click", () => {
      manejarSeleccionJugador($jugador)
    });
  });
}

crearJugadores();
