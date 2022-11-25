//----------------------------------------------------------------
//------------------------------ PÁGINA 2 ------------------------
//----------------------------------------------------------------

// --------------------------------------------------
// ---------------------  Atributos -----------------
// --------------------------------------------------
var players = [];
// --------------------------------------------------
// ------- Se ejecuta al cargar la página web -------
// --------------------------------------------------
window.addEventListener("load", function(){
    // --------------------------------------------------------
    // Add Player
        addPlayer();
    // Button Play
        btnPlay();    


});

function addPlayer() {
    var playerAdd =  document.getElementById("player_add");
    playerAdd.addEventListener('click', () => {
        var player = document.getElementById("name");
        var validation = document.querySelector(".invalid-feedback");
        if (player.value.trim() == 0) {
            validation.style.display = 'block';
        } else {
            players.push(player.value);
            player.value = "";
            showPlayers();
            validation.style.display = 'none';
        }

    });
};


function deletePlayer() {
    var playerDelete = document.querySelectorAll(".player_delete");
    playerDelete.forEach((e) => {
        e.addEventListener('click',(e) => {
            players = players.filter(player => player != e.target.id)
            showPlayers();
        });
    });
};


function showPlayers() {
    //Players HTML 
    var html = "";
    players.forEach( player => {
        html += '<li class="list-group-item">' + player + '<i class="bi bi-trash-fill player_delete" id="' + player + '"></i></li>'; 
    }
    );
    document.getElementById("list-group").innerHTML = html;
    deletePlayer(); 
};


//--------------------------------------------------
function btnPlay() {
    var btn = document.querySelector('#btn_play');
    btn.addEventListener('click', () => {
        if(players.length == 0){
            document.querySelector(".invalid-feedback").style.display = 'block';
        } else {
            window.location.replace("pagina3.html");
        }
    });
}
//--------------------CODE YERAY------------------
/* window.onload = function(){
    var position = 0;
    //bunny
    var cont= document.getElementById('cont');
    var time = setInterval(move,10);

    function move(){
        if(position>= 200){
            clearInterval(time);
        }
        else{
            position += 1;
             cont.style.left = position+ 'px'; 
        }
    }
} */
