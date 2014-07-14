//Tic Tac Toe JS Implemented with MiniMax Algorithm
//Dachi Xu, dachi.xu@gmail.com

//***********************************************************************
//*****************INITIALIZE GLOBAL VARIABLES***************************

//Game constants
var infinity = 100;
var winScore = infinity; //score if win
var losScore = -infinity; //score if lose
var dblScore = infinity*0.5; //score if double linked condition
var inprogress = 1;
var draw = 0;

//Game flow variables;
var gameStatus = "on"; // on,off and over


//Game info

var boardStatus = { 
		"c1":"","c2":"","c3":"", 
		"c4":"","c5":"","c6":"", 
		"c7":"","c8":"","c9":"" 
};

var winStatus = {

//Elements
var HUD;

//Function List
/*
Flow: newGame(), gameFlow Function
Move: playerMove(), aiMove(), aiSearch(), miniMaxSearch()
Chck: ifWin(), check()
*/

//**************************************************************
//*********************NEW GAME FUNCTION************************
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
