#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define x 'x'
#define o 'o'
#define empty '\0'

#define INFINITY 100

#define INPROGRESS 1
#define DRAW 0
#define WIN  (-INFINITY)
#define LOSE (+INFINITY)
#define DOUBLE_CONNECTED 50


int maxSearch( char _board[9] );
void PrintBoard(char _board[9]);


int gameState(char _board[9])
{
	int state;
	static int table[][3] = 
	{
		{0, 1, 2},
		{3, 4, 5},
		{6, 7, 8},
		{0, 3, 6},
		{1, 4, 7},
		{2, 5, 8},
		{0, 4, 8},
		{2, 4, 6},
	};
	char chess = _board[0];
	for (char i = 1; i < 9; ++i)
	{
		chess &= _board[i];
	}
	bool isFull = 0 != chess;
	bool isFind = false;
	for (int i = 0; i < sizeof(table) / sizeof(int[3]); ++i)
	{
		chess = _board[table[i][0]];
		int j;
		for (j = 1; j < 3; ++j)
			if (_board[table[i][j]] != chess)
				break;
		if (chess != empty && j == 3)
		{
			isFind = true;		
			break;
		}
	}
	if (isFind)
		//got win or lose
		state = chess == o ? WIN : LOSE;
	else
	{
		if (isFull)
			//all position has been set without win or lose
			return DRAW;
		else
		{
			//finds[0] -> 'o', finds[1] -> 'x'
			int finds[2] = {0, };
			for (int i = 0; i < sizeof(table) / sizeof(int[3]); ++i)
			{
				bool findEmpty = false;
				chess = 0xff;
				int j;
				for (j = 0; j < 3; ++j)
					if (_board[table[i][j]] == empty && !findEmpty)
						findEmpty = true;
					else
						chess &= _board[table[i][j]];
				if ((chess == o || chess == x) && findEmpty)
				{
					isFind = true;		
					if (o == chess)
						++finds[0];
					else
						++finds[1];
				}
			}
			if (finds[0] > 1 && finds[1] < 1)
				//2 'o' has been founded twice in row, column or diagonal direction
				state = -DOUBLE_CONNECTED;
			else if (finds[1] > 1 && finds[0] < 1)
				//2 'x' has been founded twice in row, column or diagonal direction
				state = DOUBLE_CONNECTED;
			else
				//need to search more.
				state = INPROGRESS;
		}
	}
	return state;
}

int minSearch( char _board[9] )
{
	short int i;
	int positionValue = gameState(_board);
	if( positionValue == DRAW ) return 0;
	if( positionValue != INPROGRESS ) return positionValue;
	int bestValue = +INFINITY;
	for( i = 0; i < 9; i++ )
	{
		if( _board[i] == empty )
		{
			_board[i] = o;
			int value = maxSearch( _board );
			if( value < bestValue )
				bestValue = value;
			_board[i] = empty;
		}
	}
	return bestValue;
}
int maxSearch( char _board[9] )
{
	short int i;
	int positionValue = gameState(_board);
	if( positionValue == DRAW ) return 0;
	if( positionValue != INPROGRESS ) return positionValue;
	int bestValue = -INFINITY;
	for( i = 0; i < 9; i++ )
	{
		if( _board[i] == empty )
		{
			_board[i] = x;
			int value = minSearch( _board );
			if( value > bestValue )
				bestValue = value;
			_board[i] = empty;
		}
	}
	return bestValue;
}

int minimax( char _board[9] )
{
	short int i;
	int bestValue = +INFINITY, index = 0;
	char bestMoves[9] = {0};
	for( i = 0; i < 9; i++ )
	{
		if( _board[i] == empty )
		{
			_board[i] = o;
			int value = maxSearch( _board );
			if( value < bestValue )
			{
				bestValue = value;
				index = 0;
				bestMoves[index] = i;
			}
			else if( value == bestValue )
			{
				bestMoves[index++] = i;
			}
			_board[i] = empty;
		}
	}
	if( index > 0 )
		index = rand() % index;
	return bestMoves[index];
}

void PrintBoard(char _board[9])
{
	for (int i = 0; i < 3; ++i)
	{
		for (int j = 0; j < 3; ++j)
		{
			if (char chess = _board[i * 3 + j])
				printf("%c ", chess);
			else
				printf("- ");
		}
		printf("\n");
	}
		
}

int main (int argc, char* arg[])
{
	srand((int)time(0));
	//char _board[9] = {
	//'\0','\0','\0',
	//'x','o','\0',
	//'o','x','o'};
	char _board[9];
	memset(_board, 0, 9);
	int v;
	int state = INPROGRESS;
	while (state != WIN && state != LOSE && state != DRAW)
	{
		v = minimax(_board);
		_board[v] = o;
		state = gameState(_board);
		printf("\ncompute play is:%d\n", v);
		PrintBoard(_board);
		if (state == WIN || state == LOSE || state == DRAW)
			break;
		
		printf("\nIt's your turn[0-8]:");
		scanf("%d", &v);
		_board[v] = x;
		state = gameState(_board);
		PrintBoard(_board);
	}
	switch (state)
	{
	case WIN:
		printf("Win!!\n");
		break;
	case LOSE:
		printf("Lose!!\n");
		break;
	case DRAW:
		printf("Draw!!\n");
		break;
	default:
		break;
	}
	
}