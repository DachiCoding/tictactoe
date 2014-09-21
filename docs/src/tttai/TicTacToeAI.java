/**
 * 
 */
package tttai;
import ttt.PieceLocation;
import ttt.Board;
import java.util.Scanner;
/**
 * @author Baham
 *
 */
public class TicTacToeAI {
	public static void main(String[] args){
			    Board b=new Board(3);
			    AI a=new AI(b);
				int flag=1;
				Scanner s=new Scanner (System.in);
				int x ,y ;
				int[][] t=b.getBoard();
				
				//Some code different from ttt no ai.
				System.out.println("Who first? ----Player(1)/AI(-1)");
				flag=s.nextInt();
				if(flag==1){
					System.out.println("Player First.");
				}else{
					System.out.println("AI First.");
					a.start();flag=-flag;
				}
				showBoard(t);
				while (flag!=2){
					System.out.println("Please drop your piece (Input two 1~3 numbersby space seprated.)");
					x=s.nextInt()-1;y=s.nextInt()-1;
					while (x<0 ||x>2||y<0||y>2||t[x][y]!=0){
						System.out.println("Wrong Location,try again");
						x=s.nextInt()-1;y=s.nextInt()-1;
					}
					b.dropPiece(new PieceLocation(flag,x,y));
					showBoard(t);
					flag=-flag;
					
					a.start();
					showBoard(t);
					flag=-flag;
					if(b.check()==1){
						System.out.println("Player1 Win!");flag=2;
					}else if(b.check()==-1){
						System.out.println("AI Win!");flag=2;
						
					}else if(b.check()==3){
						System.out.println("Nect Turn!");
					}else {
						System.out.println("It is a draw!");
						flag=2;
					}
				}
		}
		private static void showBoard(int[][] t) {
			// TODO Auto-generated method stub
			int i,j;
			
			for(i=0;i<=t.length-1;i++){
				System.out.print("Row"+(i+1)+"  ");
				for (j=0;j<=t[0].length-1;j++){
					System.out.printf("%2d  ",t[i][j]);
				}
				System.out.println();
			}
			
		}
	
}
