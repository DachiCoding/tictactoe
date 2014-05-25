//Tic Tac Toe JS
//Dachi Xu, dachi.xu@gmail.com

//INITIALIZE GLOBAL VARIABLES
var gameTurn = 0;
var ifRest = false;
var scores = {"X":0,"O":0};
var gameStatus = "on"; //Player can move only gameStatus is "on", and the cubic should be blinking.
var ifTaken = [0,0,0,0,0,0,0,0,0]; //if the single cubic is available
var HUD;

window.onload = function(){
 //***********************************************************************
 //INITIALIZE ENVIORMENT AND SETUP
 //Get the elements
 var cubic1 = document.getElementById("c1");
 var cubic2 = document.getElementById("c2");
 var cubic3 = document.getElementById("c3");
 var cubic4 = document.getElementById("c4");
 var cubic5 = document.getElementById("c5");
 var cubic6 = document.getElementById("c6");
 var cubic7 = document.getElementById("c7");
 var cubic8 = document.getElementById("c8");
 var cubic9 = document.getElementById("c9");
 //Reset Game if new game is clicked.
 var newgame = document.getElementById("newBtn");
 newgame.addEventListener('click',newGame,false);

 //Initialize HUD
 HUD = document.getElementById("HUD");
 HUD.innerHTML = "Your Move";

 //***********************************************************************
 //START GAME FLOW

 //Else
 cubic1.addEventListener('click',Move,false);
 cubic2.addEventListener('click',Move,false);
 cubic3.addEventListener('click',Move,false);
 cubic4.addEventListener('click',Move,false);
 cubic5.addEventListener('click',Move,false);
 cubic6.addEventListener('click',Move,false);
 cubic7.addEventListener('click',Move,false);
 cubic8.addEventListener('click',Move,false);
 cubic9.addEventListener('click',Move,false);
}

function Move(){

  if (gameTurn % 2 === 0){
   this.innerHTML = "X";
   gameTurn++;
   gameStatus = "off";
   HUD.innerHTML = "A.I's Move";
  } else {
   this.innerHTML = "O";
   gameTurn++;
   gameStatus = "on";
   HUD.innerHTML = "Your Move";
  }
}

//Start A New Game
function newGame(){

 //clean all cubics
 var cubics = document.getElementsByClassName("chartunit");
 $(".chartunit").addClass('cubicSpin');
 for(var i = 0; i < cubics.length; i++){
   cubics[i].innerHTML = "";
 }

 //clean all notification
 $("#winDiv").fadeOut(500);
 $("#drawDiv").fadeOut(500);
 $("#loseDiv").fadeOut(500);

 //reset the gameflow
 gameTurn = 0;

 //reset newGame
}

function check(){
 var result;
 result = "draw";
 if (result === "win"){
   $("#winDiv").fadeIn(500);
 } else if (result === "draw"){
   $("#drawDiv").fadeIn(500);
 } else if (result === "lose"){
   $("#loseDiv").fadeIn(500);
 }
}
