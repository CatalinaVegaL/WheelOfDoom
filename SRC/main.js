
/* Declaración de array vacio,donde van a llegar el listado de jugadores puesto es el add players */
var players = [];
/*Se activa un EventListener que funciona cuando se ha cargado toda la página ejecuta las funciones addPlayer() y btnPlay()*/
window.addEventListener("load", function () {
    addPlayer();
    btnPlay();
   
});

/*Función encargada de añadir jugador mediante un evento click, se crea condicional para validar que el usuario ingrese al menos un jugador, cuando se agrega un jugador la información se almacena con un push*/
function addPlayer() {
    let playerAdd = document.getElementById("player_add");
    playerAdd.addEventListener("click", () => {
        /* se crea un evento click para manejar el input con el id "name" y tambien se trae la clase "invalid-feedback" que es lo que contiene el mensaje de validadcion */
        let player = document.getElementById("name");
        let validation = document.querySelector(".invalid-feedback");
        /* Se valida si el input esta vacio para soltar el mensaje que debe poner algo en el input */
        if (player.value.trim() == 0) {
            validation.style.display = "block";
        } else {
        /* Si el input contiene algun nombre se le agregara el valor a player */
            players.push({
                playerName: player.value,
            });
            /* Luego de que se agrega el jugador al array player, se borra el nombre que esta en el input y se deja en blanco */
            player.value = "";
            /* con esta funcion los nombre que se agreguen a la lista seran modificados para que tengan los estilos correspondintes */
            showPlayers();
            /* una vez el input contenga algo el mensaje de validacion tendra un display "none" haciendo que desaparezca */
            validation.style.display = "none";
            /* guarda los datos de los jugadores en el Local Storage */
            savePlayers(players);
        }
    });
}
/* Función encargada de eliminar los jugadores de la lista (players) */
function deletePlayer() {
    /* se seleciona todos los jugadores de la lista y se les añade un evento click*/
    var playerDelete = document.querySelectorAll(".player_delete");
    playerDelete.forEach((e) => {
        e.addEventListener("click", (e) => {
            /* Se elimina el jugador de la lista*/
            players = players.filter((player) => player.playerName != e.target.id);
            /* Se muestra la lista actualizada de jugadores en el HTML*/
            showPlayers();
            /* Se guarda la lista en el Local Storage*/
            savePlayers(players);
        });
    });
}
/*Función que muestra la lista de jugadores en el HTML*/
function showPlayers() {
    //Players HTML
    var html = "";
    players.forEach((player) => {
        html +=
        /* todos los nombres que sea puestos en la lista seran metidos en etiquetas de HTML las cuales ya tienen unos estilos definidos en el CSS */
            '<li class="list-group-item">' +
            player.playerName +
            '<i class="bi bi-trash-fill player_delete" id="' +
            player.playerName +
            '"></i></li>';
    });
    document.getElementById("list-group").innerHTML = html;
    deletePlayer();
}
/* Función que redirige al jugador a la página de asesinar al añadir un evento click al botón*/
function btnPlay() {
    /* selecciona el botón y añade el evento click */
    var btn = document.querySelector("#btn_play");
    btn.addEventListener("click", () => {
        /*verifica si la lista de jugadores está vacía*/
        if (players.length == 0) {
            /* Si el nombre está vacío lo indica en la pantalla*/
            document.querySelector(".invalid-feedback").style.display = "block";
        } else {
            /* Redirige el jugador a la página de asesinar */
            window.location.replace("pagina3.html");
        }
    });
}
//------------Guardar la información en el local storage
function savePlayers(object){
    let localPlayers=object;
    localStorage.setItem("playersKey", JSON.stringify(localPlayers));
}
/* ----------------MOVIMIENTO HACIA EL CENTRO---------------- */
//-------------Variables de función moveBunny
//Calcula menos de la mitad del tamaño en la ventana del dispositivo
var sizeWidthWindow = window.innerWidth / 2.3;
var pos = 0;
//Variable que trae el ID 'box'
var box = document.getElementById("box");
//Intervalo de tiempo para la función move
var t = setInterval(move, 5);
//Función de movimiento del conejo al cargar la página
window.onload = function moveBunny() {
    //Moving action
    function move() {
        //Si la posición en mayor o igual a sizeWidthWindow
        if (pos >= sizeWidthWindow) {
            //Detiene el intervalo de tiempo
            clearInterval(t);
            //Reemplaza la etiqueta
            box.innerHTML = '<img src="../IMG/bunny-normal.gif" alt="conejo saltando" class="bunny-start">';
            //Llamamos a la función que permite matar al conejo
            activateKill();
        }else {
            //Agrega un pixel en la posición del elemento
            pos += 1;
            box.style.left = pos + "px";
        }
    }
};
/*--------- Kill'nt bunny------------*/
//Función para activar la muerte del conejo cuando llega al centro de la ventana
function activateKill (){
    //Se llama el ID de 'kill' en una variable constante
    const killButton = document.getElementById("kill");
    
    killButton.addEventListener("click", () => {
        /* se crea un evento click que lo que hace es traer el elemneto del DOM que tiene como id "gunContainer"*/
        const gunContainer = document.getElementById("gunContainer");
        /* al hijo del "gunContainer" se le agrega el efecto de disparo mediante la etiqueta img que llama el archivo conrrespondinte de dicho efecto */
        gunContainer.innerHTML = '<img src="../IMG/gun-shoot-reload.gif" alt="StaticGun" />';
        /* cuando se le de click al boton de kill tambien activara la expocion del conejo */
        box.innerHTML = '<img src="../IMG/blood-explotion.gif" alt="explotion" class="blood"/>';
        killPlayer();
        //Sonido de arma disparando
        let soundGun = new Audio ("../SOUNDS/GunShot.mp3");
        soundGun.play ();
    }); 
}
/*--------- Kill players ------------ */
/* Función que determina el jugador para asesinar e informa cuando ocurre el asesinato*/
function killPlayer() {
    /* Se extre la lista de jugadores guardada en el Local Storage */
    let playersStorage = JSON.parse(localStorage.getItem("playersKey"));
    /* De la lista se selcciona un jugador al azar */
    let randomIndex = 0 + Math.floor(Math.random() * playersStorage.length); 
    let selectedPlayer= playersStorage[randomIndex].playerName;
    /* actualizamos la lista de jugadores con los que están vivos*/
    playersStorage = playersStorage.filter((player) => player.playerName != selectedPlayer)
    savePlayers(playersStorage);
    /*Dterminamos si la lista de jugadores está vacía*/
    if(playersStorage.length == 0) {
        //muestra la modal de Game Over
        function mostrarModal() {
            document.querySelector(".capa2").style.display = "flex";
        }
        //Ejecuta la función en x segundos
        setTimeout(mostrarModal, 800);        
    } else {
        //Mensaje de la modal para jugador muerto
        let mensaje = `<p>${selectedPlayer} has been deleted <br> ${playersStorage.length} players left</p>`
        let modalFondo = document.querySelector(".modal-fondo");
        modalFondo.innerHTML = mensaje;
        //Muestra la modal de jugador muerto
        function mostrarModal() {
            document.querySelector(".capa").style.display = "flex";
        }
        setTimeout(mostrarModal, 800);
    }
}
