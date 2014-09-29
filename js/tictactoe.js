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
 "winScore":+10,
 "losScore":-10,
 "drwScore":0,
 "moveIndex":"",
 
 "evaluate":function(scenario,depth){
   if
   (
     gameFlow.gameCheckH(scenario) == 'X' || 
     gameFlow.gameCheckV(scenario) == 'X' || 
     gameFlow.gameCheckD(scenario) == 'X' 
   )
   { return aiEngine.winScore-depth;}

   else if 
   (
     gameFlow.gameCheckH(scenario) == 'O' || 
     gameFlow.gameCheckV(scenario) == 'O' || 
     gameFlow.gameCheckD(scenario) == 'O' 
   )
   { return aiEngine.losScore+depth;}

   else if ( depth == 9)
   { return aiEngine.drwScore;}
   
   else {
     return "notover";
   }
 },
 
 "miniMax":function(scenario,side,alpha,beta){
  //miniMax Implementation
  var depth = 0;
  var possible_moves = [];
  for(var cubic in scenario){
   if (scenario[cubic] != ""){
    depth++;
   } else {
    possible_moves.push(cubic);
   }
  }

  if (aiEngine.evaluate(scenario,depth) != "notover"){
   return aiEngine.evaluate(scenario,depth);
  }

  depth += 1;
  var scores = [];

  for(var i = 0; i < possible_moves.length; i++){
   var move = possible_moves[i];
   scenario[move] = side;
   scores.push(aiEngine.miniMax(scenario,(side == "X")? "O":"X"));
  }
  
  if (side == 'O'){
   var moveIdx = scores.indexOf(Math.max.apply(Math,scores));
  } else {
   var moveIdx = scores.indexOf(Math.min.apply(Math,scores));
  }
  
  aiEngine.moveIndex = moveIdx;
  return scores[moveIdx];

 },

 "makeMove":function(){
  //Make the best move for A.I.
  
  //Test gameCheck functionality
  cubics.aiMove(cubics.available[Math.floor((Math.random() * cubics.available.length))]);
 // var hypoScenario = {};
 // hypoScenario = jQuery.extend(true, {}, cubics.cubicStatus); // current status of the cubics
 // aiEngine.miniMax(hypoScenario,"O",aiEngine.winScore,aiEngine.losScore);
 // var move = cubics.available[aiEngine.moveIndex];
 // cubics.aiMove(move);
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
 "gameCheckH":function(cubicInfo){
  for (var i = 1; i < 8; i += 3){
   if (
       (cubicInfo["c"+i] == cubicInfo["c"+(i+1)]) && 
       (cubicInfo["c"+i] == cubicInfo["c"+(i+2)]) &&
       (cubicInfo["c"+i] != "")
      )
   {
    return cubics.cubicStatus["c"+i];
   }
  }
 },

 "gameCheckV":function(cubicInfo){
  for (var i = 1; i < 4; i++){
   if (
       (cubicInfo["c"+i] == cubicInfo["c"+(i+3)]) && 
       (cubicInfo["c"+i] == cubicInfo["c"+(i+6)]) &&
       (cubicInfo["c"+i] != "")
      )
   {
    return cubicInfo["c"+i];
   }
  } 
 },

 "gameCheckD":function(cubicInfo){
   if (
      (cubicInfo["c1"] == cubicInfo["c5"]) && 
      (cubicInfo["c5"] == cubicInfo["c9"]) &&
      (cubicInfo["c5"] != "")
      )
   { return cubicInfo["c5"];}
   else if 
      (
      (cubicInfo["c3"] == cubicInfo["c5"]) && 
      (cubicInfo["c5"] == cubicInfo["c7"]) &&
      (cubicInfo["c5"] != "")
      )
   { return cubicInfo["c5"];}
 },

 //Check if the game reachs an end
 "gameCheck":function(){
  //check if game ends, if yes call gameEnd() or continue
  //update gameStatus
   if (gameFlow.gameCheckH(cubics.cubicStatus) == 'X' || gameFlow.gameCheckV(cubics.cubicStatus) == 'X' || gameFlow.gameCheckD(cubics.cubicStatus) == 'X'){
    gameFlow.gameResult = "win"; //player wins
    gameFlow.gameEnd();
   }
   else if (gameFlow.gameCheckH(cubics.cubicStatus) == 'O' || gameFlow.gameCheckV(cubics.cubicStatus) == 'O' || gameFlow.gameCheckD(cubics.cubicStatus) == 'O'){
    gameFlow.gameResult = "lose"; //player lose
    gameFlow.gameEnd();
   } 
   else if (cubics.available.length == 0){
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
