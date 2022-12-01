/*-----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------  PAGINA 2 --------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/
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
        let player = document.getElementById("name");
        let validation = document.querySelector(".invalid-feedback");

        if (player.value.trim() == 0) {
            validation.style.display = "block";
        } else {
            players.push({
                playerName: player.value,
                isDead: false,
            });
            player.value = "";
            showPlayers();
            validation.style.display = "none";
            savePlayers(players);
        }
    });
}

function deletePlayer() {
    var playerDelete = document.querySelectorAll(".player_delete");
    playerDelete.forEach((e) => {
        e.addEventListener("click", (e) => {
            players = players.filter((player) => player.playerName != e.target.id);
            showPlayers();
            savePlayers(players);
        });
    });
}
function showPlayers() {
    //Players HTML
    var html = "";
    players.forEach((player) => {
        html +=
            '<li class="list-group-item">' +
            player.playerName +
            '<i class="bi bi-trash-fill player_delete" id="' +
            player.playerName +
            '"></i></li>';
    });
    document.getElementById("list-group").innerHTML = html;
    deletePlayer();
}
//--------------------------------------------------
function btnPlay() {
    var btn = document.querySelector("#btn_play");
    btn.addEventListener("click", () => {
        if (players.length == 0) {
            document.querySelector(".invalid-feedback").style.display = "block";
        } else {
            window.location.replace("pagina3.html");
        }
    });
}
//------------Guardar la información en el local storage
function savePlayers(object){
    let localPlayers=object;
    localStorage.setItem("playersKey", JSON.stringify(localPlayers));
}

/*-----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------  PAGINA 3 --------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------*/
var sizeWidthWindow = window.innerWidth / 2.3;

window.onload = function moveBunny() {
    var pos = 0;
    var box = document.getElementById("box");
    var t = setInterval(move, 5);
    //Función de movimiento del conejo
    function move() {
        if (pos >= sizeWidthWindow) {
            clearInterval(t);          
            box.innerHTML = '<img src="../IMG/bunny-normal.gif" alt="conejo saltando" class="bunny-start">';
            cancelKill();
        }else {
            pos += 1;
            box.style.left = pos + "px";
        }
    }
};

/*--------- Kill'nt bunny------------*/
function cancelKill (){
    const killButton = document.getElementById("kill");
    killButton.addEventListener("click", () => {
        const gunContainer = document.getElementById("gunContainer");
        gunContainer.innerHTML = '<img src="../IMG/gun-shoot-reload.gif" alt="StaticGun" />';
        box.innerHTML = '<img src="../IMG/blood-explotion.gif" alt="explotion" class="blood"/>';
        killPlayer();
        //Sonido de arma disparando
        let soundGun = new Audio ("../SOUNDS/GunShot.mp3");
        soundGun.play ();
    }); 

}
/*--------- Kill players ------------ */

function killPlayer() {
    let playersStorage = JSON.parse(localStorage.getItem("playersKey"));
    let randomIndex = 0 + Math.floor(Math.random() * playersStorage.length); 
    let selectedPlayer= playersStorage[randomIndex].playerName;
    
    playersStorage = playersStorage.filter((player) => player.playerName != selectedPlayer)
    savePlayers(playersStorage);
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
