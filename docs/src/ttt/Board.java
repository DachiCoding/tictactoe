package ttt;
public class Board {
	//This is Board calss.
	private int l=3;
	private int[][] t=new int[l][l];
	public Board(){
		this(2);
	}
	public Board(int l){
		this.l=l;
	}
	public int[][] getBoard(){
		return t;
	}
	public int check(){
		int i=0;int j=0;
		for(i=0;i<=t.length-1;i++){
			if(t[i][0]==t[i][1]&&t[i][0]==t[i][2]&&t[i][0]!=0){
				if(t[i][0]==1){
					return 1;
				}else{
					return -1;
				}
			}
		}
		for (i=1;i<=t[0].length-1;i++){
			if(t[0][i]==t[1][i]&&t[0][i]==t[2][i]&&t[0][i]!=0){
				if(t[0][i]==1){
					return 1;
				}else{
					return -1;
				}
			}
		}
		if(((t[0][0]==t[1][1]&&t[0][0]==t[2][2])||(t[0][2]==t[1][1]&&t[0][2]==t[2][0]))&&t[1][1]!=0){
			if(t[1][1]==1){
				return 1;
			}else {
				return -1;
			}
		}
		for(i=0;i<=t.length-1;i++){
			for(j=0;j<=t[i].length-1;j++){
				if (t[i][j]==0){
					return 3;
				}
			}
		}
		return 0;
	}
	public void dropPiece(PieceLocation l){
		
			t[l.getX()][l.getY()]=l.getPlayer();
		
	}
}
