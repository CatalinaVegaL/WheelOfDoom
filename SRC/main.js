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