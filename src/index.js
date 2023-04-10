let maximoJugadores = 10;
let jugadoresSeleccionados = 0;

function manejarSeleccionJugador(jugador){
  if(!jugador.classList.contains("active") && jugadoresSeleccionados < 10){
    jugador.classList.add("active");
    agregarCartaJugador(jugador);
    jugadoresSeleccionados ++;
  }
  else{
    if(jugador.classList.contains("active")){
      jugador.classList.remove("active");
      eliminarCartaJugador(jugador);
      jugadoresSeleccionados --;
    }
  }
  actualizarTextoJugadores();
  manejarBotonConfirmacionJugadores();
};

function actualizarTextoJugadores(){
  const $textoJugadoresElegidos = document.querySelector("#jugadores-elegidos");
  if(jugadoresSeleccionados < maximoJugadores){
    $textoJugadoresElegidos.textContent = `Elige ${ maximoJugadores - jugadoresSeleccionados} jugadores más`;
  }
  else{
    $textoJugadoresElegidos.textContent = `¿Este es tu equipo final?`;
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

async function crearListaJugadores(){
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
      manejarSeleccionJugador($jugador);
    });
  });
}

crearListaJugadores();

function agregarCartaJugador(jugador){
  const $LISTA_TITULARES = document.querySelector("#titulares");
  const $LISTA_SUPLENTES = document.querySelector("#suplentes");
  const nombreJugador = jugador.dataset.nombre;
  const nombre = nombreJugador.split(" ")[0];
  const apellido = nombreJugador.split(" ")[1];

  let $carta = document.createElement("div");
  $carta.id = `${nombre}-${apellido}`;
  $carta.style.width = "9rem";
  
  let $cartaCuerpo = document.createElement("div");
  $cartaCuerpo.classList.add("card-body","text-center");

  let $cartaTitulo = document.createElement("h5");
  $cartaTitulo.classList.add("card-title");
  $cartaTitulo.textContent = jugador.dataset.nombre;
  $cartaCuerpo.appendChild($cartaTitulo);

  let $cartaPrecio = document.createElement("p");
  $cartaPrecio.classList.add("card-text");
  $cartaPrecio.textContent = `${jugador.dataset.precio} $`;
  $cartaCuerpo.appendChild($cartaPrecio);

  let $cartaEquipo = document.createElement("p");
  $cartaEquipo.classList.add("card-text");
  $cartaEquipo.textContent = jugador.dataset.equipo;
  $cartaCuerpo.appendChild($cartaEquipo);

  $carta.appendChild($cartaCuerpo);

  if( document.querySelectorAll("#titulares .card").length < 5){
    $carta.classList.add("card","text-bg-success");
    $LISTA_TITULARES.appendChild($carta);
  }else{
    $carta.classList.add("card","text-bg-primary");
    $LISTA_SUPLENTES.appendChild($carta);
  }
};

function eliminarCartaJugador(jugador){
  let nombreJugador = jugador.dataset.nombre;
  let nombre = nombreJugador.split(" ")[0];
  let apellido = nombreJugador.split(" ")[1];
  let cartaJugador = document.querySelector(`#${nombre}-${apellido}`);
  cartaJugador.remove();
};
