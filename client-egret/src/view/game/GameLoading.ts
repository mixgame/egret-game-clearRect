/**
 *
 * @author 
 *
 */
class GameLoading extends eui.Component{
	public constructor() {
    	super();
		this.skinName = "GameLoadingSkin";
		this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickLoginBtn,this);
	}

	public initLoading(str:string){
		switch (str){
			case "login":
				RES.loadGroup("login");
				break
		}
	}

	public loadingBar:eui.ProgressBar;
	public loginBtn:eui.Button;

	public setProgress(current, total){
		this.loadingBar.maximum = total;
		this.loadingBar.value = current;
	}

	private onClickLoginBtn(){
		MixGame.EgretOpenLogin.login();
	}
}
