//Put an "X" in the cubic clicked.
window.onload = function(){
 var cubic1 = document.getElementById("c1");
 var cubic2 = document.getElementById("c2");
 var cubic3 = document.getElementById("c3");
 var cubic4 = document.getElementById("c4");
 var cubic5 = document.getElementById("c5");
 var cubic6 = document.getElementById("c6");
 var cubic7 = document.getElementById("c7");
 var cubic8 = document.getElementById("c8");
 var cubic9 = document.getElementById("c9");
 cubic1.addEventListener('click',putX,false);
 cubic2.addEventListener('click',putX,false);
 cubic3.addEventListener('click',putX,false);
 cubic4.addEventListener('click',putX,false);
 cubic5.addEventListener('click',putX,false);
 cubic6.addEventListener('click',putX,false);
 cubic7.addEventListener('click',putX,false);
 cubic8.addEventListener('click',putX,false);
 cubic9.addEventListener('click',putX,false);
}

function putX(){
 //document.getElementById("c1").innerHTML = "X";
 this.innerHTML = "X";
}

function newGame(){
}

function playerMove(){
}

function aiMove(){
}

function check(){
}
