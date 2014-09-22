//Unbeatable Tic Tac Toe Implemented with MiniMax Algorithm
//author:  Dachi Xu
//email:   dachi.xu@gmail.com
//github:  https://github.com/DachiCoding/tictactoe.git
//website: http://dachicj.com

//***********************************************************************
//***************************GAME VIEW***********************************
//HUD element
var HUD = new Object();
HUD.element = document.getElementById("HUD");
HUD.update = function(msg){
 HUD.element.innerHTML = msg;
};

//Cubics element
var cubics = new Object();
cubics.elements = document.getElementsByClassName("chartunit");
cubics.cubicStatus = { 
		"c1":"","c2":"","c3":"", 
		"c4":"","c5":"","c6":"", 
		"c7":"","c8":"","c9":"" 
};

cubics.playerMove = function(id){
 document.getElementById(id).innerHTML="X";
 document.getElementById(id).removeEventListener('click',gameFlow.gameRun,false);
 document.getElementById(id).classList.add("clicked");
 cubics.cubicStatus[id] = "X";
};

cubics.aiMove = function(id){
 document.getElementById(id).innerHTML="O";
 document.getElementById(id).removeEventListener('click',gameFlow.gameRun,false);
 document.getElementById(id).classList.add("clicked");
 cubics.cubicStatus[id] = "O";
}

//Button elements
var buttons = new Object();
buttons.newGame = document.getElementById("newBtn");

//***********************************************************************
//****************************GAME CONTROLLER****************************
//game flow object
var gameFlow = new Object();
gameFlow = {
 "gameStatus":"on", // on or off
 "gameResult":"none", // none or win or lose or draw (player perspective)
 
 //Initialize the game enviorment
 "gameReset":function(){
   //Initialize game status
   gameFlow.gameStatus = "on";
  
   //Enable New Game Button
   buttons.newGame.addEventListener("click",gameFlow.gameReset,false);

   //Initialize HUD
   HUD.update("Your Move");

  //Initialize Cubics
  for(var i = 0; i < cubics.elements.length; i++){
   cubics.elements[i].addEventListener("click",gameFlow.gameRun,false);
  }
 },
 
 //Game is over
 "gameEnd":function(){
  //Update game status
  gameFlow.gameStatus = "off";

  //Update HUD

  //Update Cubics

 },
 
 //Check if the game reachs an end
 "gameCheck":function(){
  //check if game ends, if yes call gameEnd() or continue
  
 },

 //Go through the game flow
 "gameRun": function(){
  //Handle player move
  if (gameFlow.gameStatus === "on"){
  var id = $(this).attr("id");
  cubics.playerMove(id);
  gameFlow.gameCheck();
  
  //if game is not over, then A.I move
  gameFlow.gameStatus = "off";
  HUD.update("A.I's thinking...");
  aiEngine.makeMove();
  gameFlow.gameCheck();
  gameFlow.gameStatus = "on";
  HUD.update("Your move");
  }
 }
}

//***********************************************************************
//****************************GAME MODEL*********************************
//Algorithm constants
var aiEngine = new Object();
aiEngine = {
 "winScore":+100,
 "losScore":-100,
 "draScore":0,
 
 "miniMax":function(){
  //miniMax Implementation
 },

 "bestMove":function(){
  //Call miniMax to figure out the best move
 },

 "makeMove":function(){
  //Make the best move for A.I.
 }
}


//***********************************************************************
//***************************GAME FLOW***********************************
$(document).ready(function(){
 //Run the gameEngine
 gameFlow.gameReset();

});
