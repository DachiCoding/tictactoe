//Tic Tac Toe JS
//Dachi Xu, dachi.xu@gmail.com
//Thanks to http://jsfiddle.net/rtoal/5wKfF/ for the game logic

//***********************************************************************
//*****************INITIALIZE GLOBAL VARIABLES***************************
var gameTurn = 0;
var ifRest = false;
var scores = {"X":0,"O":0};
var gameStatus = "on"; //Player can move only gameStatus is "on", and the cubic should be blinking.

/*
var ifTaken = { 
		"c1":0,"c2":0,"c3":0, //if the single cubic is available
		"c4":0,"c5":0,"c6":0,
		"c7":0,"c8":0,"c9":0 
	      };
*/

var HUD;
var cubicVal = {
		"c1":1,"c2":2,"c3":4,
		"c4":8,"c5":16,"c6":32,
		"c7":64,"c8":128,"c9":256
	       };
var winSet = [7,56,448,73,146,292,273,84];

//**************************************************************
//*********************MOVE FUNCTIONs***************************
function playerMove(){
  while (gameStatus === "on"){
   this.innerHTML = "X";
   gameTurn++;
   gameStatus = "off";
   HUD.innerHTML = "A.I's Move";
   scores["X"] += cubicVal[this.id];
  }
}

function aiMove(){
   this.innerHTML = "O";
   gameTurn++;
   gameStatus = "on";
   HUD.innerHTML = "Your Move";
   scores["O"] += cubicVal[this.id];
}

//**************************************************************
//*********************NEW GAME FUNCTION**********************
function newGame(){

 //clean all cubics
 $(".chartunit").removeClass("cubicSpin");
 setTimeout(function(){$(".chartunit").addClass('cubicSpin')},0);
 var cubics = document.getElementsByClassName("chartunit");
 for(var i = 0; i < cubics.length; i++){
   cubics[i].innerHTML = "";
 }

 //clean all notification
 $("#winDiv").fadeOut(500);
 $("#drawDiv").fadeOut(500);
 $("#loseDiv").fadeOut(500);

 //reset the gameflow
 gameTurn = 0;
 scores["X"] = 0;
 scores["O"] = 0;
 gameStatus = "on";

 //reset newGame
 HUD.innerHTML = "Your Move";
}

//**************************************************************
//*********************IF WIN FUNCTION**************************
function ifWin(role){
 for (var i = 0; i <= winSet.length; i++){
  if ((winSet[i] & scores[role]) === winSet[i]){
   return true;
  }
 }
}

//**************************************************************
//*********************CHECK FUNCTION***************************
function check(){
 var result;
 if (ifWin("X")){
  result = "win";
  gameStatus = "off";
  scores["X"] = 0;
  scores["O"] = 0;
 }
 else if (ifWin("O")) {
  result = "lose";
  gameStatus = "off";
  scores["X"] = 0;
  scores["O"] = 0;
 }
 else if ( !ifWin("X") && !ifWin("O") && gameTurn === 9){
  result = "draw";
  gameStatus = "off";
  scores["X"] = 0;
  scores["O"] = 0;
 }

 if (result === "win"){
   $("#winDiv").fadeIn(500);
 } else if (result === "draw"){
   $("#drawDiv").fadeIn(500);
 } else if (result === "lose"){
   $("#loseDiv").fadeIn(500);
 }
}

//***********************************************************************
//*******************GAME FLOW CONTROLLER********************************
window.onload = function() {
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

 //START GAME FLOW
 //Make all cubic available for the first turn
 cubic1.addEventListener('click',playerMove,false);
 cubic2.addEventListener('click',playerMove,false);
 cubic3.addEventListener('click',playerMove,false);
 cubic4.addEventListener('click',playerMove,false);
 cubic5.addEventListener('click',playerMove,false);
 cubic6.addEventListener('click',playerMove,false);
 cubic7.addEventListener('click',playerMove,false);
 cubic8.addEventListener('click',playerMove,false);
 cubic9.addEventListener('click',playerMove,false);

 // -> If an empty cubic is clicked 
 // -> Remove event listener from the cubic clicked
 // -> Judge situation 
 // -> A.I move
 // -> Remove event listener from the cubic A.I occupied
 // -> Wait for next input or reach a game result

 cubic2.moveFunc = aiMove; 
 cubic2.moveFunc();
 cubic2.removeEventListener('click',playerMove,false);
}
