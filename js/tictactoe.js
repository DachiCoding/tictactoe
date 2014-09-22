//Unbeatable Tic Tac Toe Implemented with MiniMax Algorithm
//author:  Dachi Xu
//email:   dachi.xu@gmail.com
//github:  https://github.com/DachiCoding/tictactoe.git
//website: http://dachicj.com

//***********************************************************************
//WORKFLOW
/*
1.gameRest1()
2.wait for player move -> gameRun()
3.gameCheck() -> if not end call AI() -> step 2
              -> if end, call gameEnd() -> if new game button is clicked -> step 1
*/

//AI LOGIC
/*
 if Win
 else if Lose
 else if Draw
 else None
*/

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
cubics.available = ["c1","c2","c3",
   		    "c4","c5","c6",
		    "c7","c8","c9"];

cubics.playerMove = function(id){
 document.getElementById(id).innerHTML="X";
 document.getElementById(id).removeEventListener('click',gameFlow.gameRun,false);
 document.getElementById(id).classList.add("clicked");
 cubics.cubicStatus[id] = "X";
 cubics.available.splice(cubics.available.indexOf(id),1);
};

cubics.aiMove = function(id){
 document.getElementById(id).innerHTML="O";
 document.getElementById(id).removeEventListener('click',gameFlow.gameRun,false);
 document.getElementById(id).classList.add("clicked");
 cubics.cubicStatus[id] = "O";
 cubics.available.splice(cubics.available.indexOf(id),1);
}

//Button elements
var buttons = new Object();
buttons.newGame = document.getElementById("newBtn");

//***********************************************************************
//****************************GAME MODEL*********************************
//Algorithm constants
var aiEngine = new Object();
aiEngine = {
 "winScore":+100,
 "losScore":-100,
 "drwScore":0,
 
 "evaluate":function(result){
   if (result == "win"){
    return aiEngine.winScore;
   }
   else if (result == "lose"){
    return aiEngine.losScore;
   }
   else {
    return aiEngine.drwScore;
   }
 },
 
 "miniMax":function(){
  //miniMax Implementation
  /*
  1.Try every step
  2.Store all results/scores
  */
 },

 "bestMove":function(){
  //Call miniMax to figure out the best move
 },

 "makeMove":function(){
  //Make the best move for A.I.
  
  //Test gameCheck functionality
  cubics.aiMove(cubics.available[Math.floor((Math.random() * cubics.available.length))]);
 }
}

//***********************************************************************
//****************************GAME CONTROLLER****************************
//game flow object
var gameFlow = new Object();
gameFlow = {
 "gameStatus":"on", // on or off
 "gameResult":"none", // none or win or lose or draw (player perspective)
 
 //Initialize the game enviorment
 "gameReset":function(){
   //Reset game status
   gameFlow.gameStatus = "on";
   gameFlow.gameResult = "none";
  
   //Enable Buttons
   buttons.newGame.addEventListener("click",gameFlow.gameReset,false);

   //Reset HUD
   HUD.update("Your Move");

  //Reset Cubics
  cubics.cubicStatus = { 
		"c1":"","c2":"","c3":"", 
		"c4":"","c5":"","c6":"", 
		"c7":"","c8":"","c9":"" 
  };
  cubics.available = ["c1","c2","c3",
   		      "c4","c5","c6",
		      "c7","c8","c9"];

  for(var i = 0; i < cubics.elements.length; i++){
   cubics.elements[i].innerHTML = "";
   cubics.elements[i].classList.remove("clicked");
   cubics.elements[i].addEventListener("click",gameFlow.gameRun,false);
  }
 },
 
 //Game is over
 "gameEnd":function(){
  //Update game status
  gameFlow.gameStatus = "off";

  //Update HUD
  switch(gameFlow.gameResult){
   case "win":
    HUD.update("You win...");
    break;
   
   case "lose":
    HUD.update("You lose...");
    break;

   case "draw":
    HUD.update("Draw...");
    break;

   default:
    HUD.update("Game Over...");
    break;
  }

  //Update Cubics
  for(var i = 0; i < cubics.elements.length; i++){
   cubics.elements[i].removeEventListener("click",gameFlow.gameRun,false);
  }

 },

 //Check Game 
 "gameCheckH":function(){
  for (var i = 0; i < 7; i += 3){
   if ((cubics.elements[i].innerHTML == cubics.elements[i+1].innerHTML) && 
       (cubics.elements[i].innerHTML == cubics.elements[i+2].innerHTML) &&
        cubics.elements[i].innerHTML != ""
      )
   {
    return cubics.elements[i].innerHTML;
   }
  }
 },

 "gameCheckV":function(){
  for (var i = 0; i < 3; i++){
   if ((cubics.elements[i].innerHTML == cubics.elements[i+3].innerHTML) && 
       (cubics.elements[i].innerHTML == cubics.elements[i+6].innerHTML) &&
        cubics.elements[i].innerHTML != ""
      )
   {
    return cubics.elements[i].innerHTML;
   }
  } 
 },

 "gameCheckD":function(){
   if ((cubics.elements[0].innerHTML == cubics.elements[4].innerHTML) && 
       (cubics.elements[0].innerHTML == cubics.elements[8].innerHTML) &&
        cubics.elements[4].innerHTML != ""
      )
   { return cubics.elements[4].innerHTML;}
   else if ((cubics.elements[2].innerHTML == cubics.elements[4].innerHTML) && 
            (cubics.elements[2].innerHTML == cubics.elements[6].innerHTML) &&
            cubics.elements[4].innerHTML != ""
	   )
   { return cubics.elements[4].innerHTML;}
 },

 //Check if the game reachs an end
 "gameCheck":function(){
  //check if game ends, if yes call gameEnd() or continue
  //update gameStatus
   if (gameFlow.gameCheckH() == 'X' || gameFlow.gameCheckV() == 'X' || gameFlow.gameCheckD() == 'X'){
    gameFlow.gameResult = "win"; //player wins
    gameFlow.gameEnd();
   }
   else if (gameFlow.gameCheckH() == 'O' || gameFlow.gameCheckV() == 'O' || gameFlow.gameCheckD() == 'O'){
    gameFlow.gameResult = "lose"; //player lose
    gameFlow.gameEnd();
   } 
   else if ( cubics.available.length == 0){
    gameFlow.gameResult = "draw";
    gameFlow.gameEnd();
   }
   else {
    gameFlow.gameResult = "none";
  }
 },

 //Go through the game flow
 "gameRun": function(){
  //Handle player move
  if (gameFlow.gameStatus === "on"){
  gameFlow.gameStatus = "off";
  var id = $(this).attr("id");
  cubics.playerMove(id);
  gameFlow.gameCheck();
  
  //if game is not over, then A.I move
  if (gameFlow.gameResult === "none"){
    HUD.update("A.I's thinking...");
    aiEngine.makeMove();
    gameFlow.gameCheck();
    if (gameFlow.gameResult === "none"){
     gameFlow.gameStatus = "on";
     HUD.update("Your move");
    }
   }
  }
 }
}

//***********************************************************************
//***************************GAME FLOW***********************************
$(document).ready(function(){
 //Run the gameEngine
 gameFlow.gameReset();

});
