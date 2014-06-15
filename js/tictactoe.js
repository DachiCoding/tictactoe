//Tic Tac Toe JS
//Dachi Xu, dachi.xu@gmail.com

//***********************************************************************
//*****************INITIALIZE GLOBAL VARIABLES***************************
var gameTurn = 0;
var gameOver = false;
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
var tracker = [];
var winSet = [7,56,448,73,146,292,273,84];
var center = "c5";
var edge = ["c2","c4","c6","c8"];
var corner = ["c1","c3","c7","c9"];
var diag = {
	        "c1":["c5","c9"],
		"c3":["c5","c7"],
		"c7":["c5","c3"],
		"c9":["c5","c1"],
		"c5":["c1","c3","c7","c9"]
	       };
var next = {
	      "c1":["c2","c4"],
	      "c3":["c2","c6"],
	      "c7":["c4","c8"],
	      "c9":["c6","c8"],
	      "c5":["c2","c4","c6","c8"],
	      "c2":["c1","c3","c5"],
	      "c4":["c1","c5","c7"],
	      "c6":["c5","c3","c9"],
	      "c8":["c5","c7","c9"],
             }


//**************************************************************
//*********************MOVE FUNCTIONs***************************
function playerMove(){
  while (gameStatus === "on" && gameOver === false){
   this.innerHTML = "X";
   gameTurn++;
   gameStatus = "off";
   HUD.innerHTML = "A.I's Move";
   scores["X"] += cubicVal[this.id];
   $(this).removeClass('clickable');
   $(this).addClass('clicked');
   this.removeEventListener('click',playerMove,false);
   tracker.push($(this).attr("id"));
  }
}

function aiMove(){
   while (gameStatus === "off" && gameOver === false){
   this.innerHTML = "O";
   gameTurn++;
   gameStatus = "on";
   HUD.innerHTML = "Your Move";
   scores["O"] += cubicVal[this.id];
   $(this).removeClass('clickable');
   $(this).addClass('clicked');
   this.removeEventListener('click',playerMove,false);
   tracker.push($(this).attr("id"));
   }
}

//**************************************************************
//*********************NEW GAME FUNCTION**********************
function newGame(){
 //clean all cubics
 $(".chartunit").removeClass("cubicSpin");
 $(".chartunit").removeClass("clicked");
 setTimeout(function(){$(".chartunit").addClass('cubicSpin')},0);
 setTimeout(function(){$(".chartunit").addClass('clickable')},0);
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
 HUD = document.getElementById("HUD");
 HUD.innerHTML = "Your Move";

 //Prepare for player input
 for(var i = 0; i < cubics.length; i++){
  cubics[i].addEventListener('click',playerMove,false);
 }
 gameOver = false;
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
 if (gameOver === false){
 var result;
 var cubics = document.getElementsByClassName("chartunit");
 HUD = document.getElementById("HUD");

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
 }

 if (result === "win"){
   $("#winDiv").fadeIn(500);
   for(var i = 0; i < cubics.length; i++){
     cubics[i].removeEventListener('click',playerMove,false);
   }
   HUD.innerHTML = "Game Over";
   return true;
 } else if (result === "draw"){
   $("#drawDiv").fadeIn(500);
   for(var i = 0; i < cubics.length; i++){
     cubics[i].removeEventListener('click',playerMove,false);
   }
   HUD.innerHTML = "Game Over";
   return true;
 } else if (result === "lose"){
   $("#loseDiv").fadeIn(500);
   for(var i = 0; i < cubics.length; i++){
     cubics[i].removeEventListener('click',playerMove,false);
   }
   HUD.innerHTML = "Game Over";
   return true;
 }
}

//***********************************************************************
//*******************GAME FLOW CONTROLLER********************************
$(document).ready(function(){
 //INITIALIZE ENVIORMENT AND SETUP
 var newgame = document.getElementById("newBtn");
 newgame.addEventListener('click',newGame,false);
 newGame();

 //GET THE CUBIC ELEMENTS
 var cubics = document.getElementsByClassName("chartunit");
 var cubic1 = document.getElementById("c1");
 var cubic2 = document.getElementById("c2");
 var cubic3 = document.getElementById("c3");
 var cubic4 = document.getElementById("c4");
 var cubic5 = document.getElementById("c5");
 var cubic6 = document.getElementById("c6");
 var cubic7 = document.getElementById("c7");
 var cubic8 = document.getElementById("c8");
 var cubic9 = document.getElementById("c9");

 //GAME FLOW
 //Thanks to http://www.wikihow.com/Win-at-Tic-Tac-Toe for the game logic
 $(".chartunit").click(function(){
  if(check() !== true){
    switch (gameTurn){

     //Player makes first move; 
     case 1: 
      if ($(this).attr("id") !== "c5"){ // player does not take the center
       cubic5.moveFunc = aiMove;
       cubic5.moveFunc();
      } else { // player takes the center position
       cubic1.moveFunc = aiMove;
       cubic1.moveFunc();
      }
      check();
      break;

     //Player makes second move; 
     case 3:
      //c5 -> c1
      if (tracker[1] === "c1"){
       //c5 -> c1 -> c7,c9
       if ( tracker[2] === "c9" || tracker[2] === "c7"){ 
        cubic3.moveFunc = aiMove; 
	cubic3.moveFunc();
       } 
       //c5 -> c1 -> c
       else if (){
       }
      } 

      //Not c5 -> c5
      else {
       if ( tracker[2] === "c9"){ //c1->c5->
       }
       else {
        
       }
      }
      check();
      break;

     //Player makes third move; 
     case 5:
      if (
      check();
      break;

     //Player makes fourth move; 
     case 7:
      check();
      break;

     default:
      break;
    }
  } else {
    gameOver = true;
  }
 });
 

});
