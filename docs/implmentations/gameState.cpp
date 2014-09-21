static   final   int   INFINITY = 100 ;   // 表示无穷的值
static   final   int   WIN = +INFINITY ;   // MAX的最大利益为正无穷
static   final   int   LOSE = -INFINITY ;   // MAX的最小得益（即MIN的最大得益）为负无穷
static   final   int   DOUBLE_LINK = INFINITY / 2 ;   // 如果同一行、列或对角上连续有两个，赛点
static   final   int   INPROGRESS = 1 ;   // 仍可继续下（没有胜出或和局）
static   final   int   DRAW = 0 ;   // 和局
static   final   int [][] WIN_STATUS =   {
      {   0, 1, 2 },
      { 3, 4, 5 },
      { 6, 7, 8 },
      { 0, 3, 6 },
      { 1, 4, 7 },
      { 2, 5, 8 },
      { 0, 4, 8 },
      { 2, 4, 6   }
};
/**
 * 估值函数，提供一个启发式的值，决定了游戏AI的高低
 */
public   int   gameState( char []   board )   {
       int   result = INPROGRESS;
       boolean   isFull =   true ;
      
       // is game over?
       for   ( int   pos = 0; pos < 9; pos++) {
             char   chess = board[pos];
             if   ( empty   == chess) {
                  isFull =   false ;
                   break ;
            }
      }
       // is Max win/lose?
       for   ( int [] status : WIN_STATUS) {
             char   chess = board[status[0]]; 
             if   (chess ==   empty ) {
                   break ;
            }
             int   i = 1;
             for   (; i < status.length; i++) {
                   if   (board[status[i]] != chess) {
                         break ;
                  }
            }
             if   (i == status.length) {
                  result = chess ==   x   ? WIN : LOSE;
                   break ;
            }
      }
       if   (result != WIN & result != LOSE) {
             if   (isFull) {
                   // is draw
                  result = DRAW;
            }   else   {
                   // check double link
                   // finds[0]->'x', finds[1]->'o'
                   int [] finds =   new   int [2];
                   for   ( int [] status : WIN_STATUS) {
                         char   chess =   empty ;
                         boolean   hasEmpty =   false ;
                         int   count = 0;
                         for   ( int   i = 0; i < status.length; i++) {
                               if   (board[status[i]] ==   empty ) {
                                    hasEmpty =   true ;
                              }   else   {
                                     if   (chess ==   empty ) {
                                          chess = board[status[i]];
                                    }
                                     if   (board[status[i]] == chess) {
                                          count++;
                                    }
                              }
                        }
                         if   (hasEmpty && count > 1) {
                               if   (chess ==   x ) {
                                    finds[0]++;
                              }   else   {
                                    finds[1]++;
                              }
                        }
                  }
                   // check if two in one line
                   if   (finds[1] > 0) {
                        result = -DOUBLE_LINK;
                  }   else   if   (finds[0] > 0) {
                        result = DOUBLE_LINK;
                  }
            }
      }
       return   result;
} 
