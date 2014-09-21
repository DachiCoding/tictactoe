# tic tac toe A.I implemented with miniMax algorithm
# By Dachi Xu
# Contact via dachi.xu@gmail.com

from Tkinter import Tk, Button
from tkFont import Font
from copy import deepcopy

############################
# Define the tic tac toe A.I
class GameAI:

  # Constructor
  def __init__(self,other=None):
   self.player = 'X' #player's mark
   self.ai = 'O' # A.I's mark
   self.empty = '.' 
   self.dim = 3 # The dimension of tic tac toe 

   # Setup the field of tic tac toe
   self.fields = {}
   for y in range(self.dim):
     for x in range(self.dim):
       self.fields[x,y] = self.empty

   if other:
     self.__dict__ = deepcopy(other.__dict__)
  
  # Place 'X' or 'O' on the board
  def move(self,x,y):
   board = GameAI(self)
   board.fields[x,y] = board.player
   # Exchange the marks so there will be x - o - x ....
   (board.player,board.ai) = (board.ai,board.player)
   return board

  def __minimax(self,player):
   # if Win
   if self.won():
     if player:
      return (-1, None)
     else:
      return (+1, None)

   # if Draw
   elif self.tied():
      return (0,None)

   # if Lose
   elif player:
    best = (-2, None)
    for x,y in self.fields:
     if self.fields[x,y] == self.empty:
       value = self.move(x,y).__minimax(not player)[0]
       if value > best[0]:
        best = (value,(x,y))
    return best
   else:
    best = (+2,None)
    for x,y in self.fields:
      if self.fields[x,y] == self.empty:
        value = self.move(x,y).__minimax(not player)[0]
	if value < best[0]:
	  best = (value,(x,y))
    return best

  def best(self):
   return self.__minimax(True)[1]

  def tied(self): 
   for(x,y) in self.fields:
     if self.fields[x,y] == self.empty:
       return False
   return True

  def won(self):
    for y in range(self.dim):
      winning = []
      for x in range(self.dim):
        if self.fields[x,y] == self.ai:
          winning.append((x,y))
      if len(winning) == self.dim:
	return winning

    for x in range(self.dim):
      winning = []
      for y in range(self.dim):
        if self.fields[x,y] == self.ai:
          winning.append((x,y))
      if len(winning) == self.dim:
	return winning

    winning = []
    for y in range(self.dim):
      x = y
      if self.fields[x,y] == self.ai:
        winning.append((x,y))
    if len(winning) == self.dim:
      return winning
         
    winning = []
    for y in range(self.dim):
      x = self.dim - 1 - y
      if self.fields[x,y] == self.ai:
        winning.append((x,y))
    if len(winning) == self.dim:
      return winning

    return None

  def __str__(self):
    string = ''
    for y in range(self.dim):
      for x in range(self.dim):
        string += self.fields[x,y]
      string+='\n'
    return string

############################
# Setup the game GUI
class GameGUI:

  def __init__(self):
    self.app = Tk()
    self.app.title('Tic Tac Toe A.I')
    self.app.resizable(width=False, height=False)
    self.board = GameAI()
    self.font = Font(family = "Arial", size = 28)
    self.buttons = {}
    for x,y in self.board.fields:
     handler = lambda x = x, y = y: self.move(x,y)
     button = Button(self.app, command = handler, font = self.font, width = 2,height = 1)
     button.grid(row = y, column = x)
     self.buttons[x,y] = button
    handler = lambda: self.reset()
    button = Button(self.app,text = 'reset',command = handler)
    button.grid(row = self.board.dim+1, column = 0, columnspan = self.board.dim,sticky="WE")
    self.quit = Button(self.app,text = 'quit', command = self.app.quit)
    self.quit.grid(row = self.board.dim+2, column = 0, columnspan = self.board.dim,sticky="WE")
    print "Dear Player, to mave a move click on any button and wait for A.I..."

  def reset(self):
    self.board = GameAI()
    self.update()

  def move(self,x,y):
    self.app.config(cursor = "watch")
    self.app.update()
    self.board = self.board.move(x,y)
    self.update()
    move = self.board.best()
    if move:
     self.board = self.board.move(*move)
     self.update()
    self.app.config(cursor = "")

  def update(self):
   for (x,y) in self.board.fields:
     text = self.board.fields[x,y]
     self.buttons[x,y]['text'] = text
     self.buttons[x,y]['disabledforeground'] = 'black'
     if text == self.board.empty:
       self.buttons[x,y]['state'] = 'normal'
     else:
       self.buttons[x,y]['state'] = 'disabled'
     winning = self.board.won()
     if winning:
      for x,y in winning:
       self.buttons[x,y]['disabledforeground'] = 'red'
      for x,y in self.buttons:
       self.buttons[x,y]['state']= 'disabled'
      for (x,y) in self.board.fields:
       self.buttons[x,y].update()

  def mainloop(self):
    self.app.mainloop()

############################
# Start the game flow
if __name__ == '__main__':
  GameGUI().mainloop()
