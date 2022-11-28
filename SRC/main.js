//----------------------------------------------------------------
//------------------------------ PÁGINA 2 ------------------------
//----------------------------------------------------------------

let deadPlayers = [];
let sacrificedPlayer = document.getElementById("list-group");
// --------------------------------------------------
// ---------------------  Atributos -----------------
// --------------------------------------------------
var players = [];
// --------------------------------------------------
// ------- Se ejecuta al cargar la página web -------
// --------------------------------------------------
window.addEventListener("load", function () {
    // --------------------------------------------------------
    // Add Player
    addPlayer();
    // Button Play
    btnPlay();
});
function addPlayer() {
    var playerAdd = document.getElementById("player_add");
    playerAdd.addEventListener("click", () => {
        var player = document.getElementById("name");
        var validation = document.querySelector(".invalid-feedback");
        if (player.value.trim() == 0) {
            validation.style.display = "block";
        } else {
            players.push(player.value);
            player.value = "";
            showPlayers();
            validation.style.display = "none";
        }
    });
}
function deletePlayer() {
    var playerDelete = document.querySelectorAll(".player_delete");
    playerDelete.forEach((e) => {
        e.addEventListener("click", (e) => {
            players = players.filter((player) => player != e.target.id);
            showPlayers();
        });
    });
}
function showPlayers() {
    //Players HTML
    var html = "";
    players.forEach((player) => {
        html +=
            '<li class="list-group-item">' +
            player +
            '<i class="bi bi-trash-fill player_delete" id="' +
            player +
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
//-------------------Page 3---------------------
//---------------Variables page 3-----------------
var sizeWidthWindow = window.innerWidth / 2;

//-----------------Moving bunny-------------------
window.onload = function moveBunny() {
    var pos = 0;
    //bunny
    var box = document.getElementById("box");
    var t = setInterval(move, 5);

    function move() {
        if (pos >= sizeWidthWindow) {
            clearInterval(t);
        } else {
            pos += 1;
            box.style.left = pos + "px";
        }
    }
};
/*--------- Kill players ------------ */
const gunContainer = document.getElementById("gunContainer");
const killButton = document.getElementById("kill");
killButton.addEventListener("click", () => {
    gunContainer.innerHTML = '<img src="../IMG/gun-shoot-reload.gif"';
});

function killPlayer() {
    let randomIndex = 0 + Math.floor(Math.random() * players.length);
    // let selectedPlayer= players[randomIndex]
    // deadPlayers.push(players[]);
    if (sacrificedPlayer.length > 0) {
    }
}
