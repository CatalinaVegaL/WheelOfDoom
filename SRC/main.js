//pagina2------------------

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


});

function addPlayer() {
    var playerAdd =  document.getElementById("player_add");
    playerAdd.addEventListener('click', () => {
        var player = document.getElementById("name");
        if (player.value.trim() == 0) {
            console.log("vacío");
        } else {
            players.push(player.value);
            player.value = "";
            showPlayers();
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


//--------------------CODE YERAY------------------
window.onload = function(){
    var position = 0;
    //bunny
    var bunny = document.getElementById('conejo');
    var time = setInterval(move,10);

    function move(){
        if(position>= 200){
            clearInterval(time);
        }
        else{
            position += 1;
            bunny.style.left = position+ 'px';
        }
    }
}
