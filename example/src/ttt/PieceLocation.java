/**
 * 
 */
package ttt;

/**
 * @author Baham
 *
 */
public class PieceLocation {
	private int player;
	private int x;
	private int y;

	public PieceLocation(int p,int x,int y){
		this.player=p;
		this.x=x;
		this.y=y;
	}
	public int getX(){
		return x;
	}
	public int getY(){
		return y;
	}
	public int getPlayer(){
		return player;
	}
}
