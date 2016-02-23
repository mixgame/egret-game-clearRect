class BalanceMain extends eui.Component {
    public constructor(){
        super();
        this.skinName = "BalanceMainSkin";
        this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rePlayTheGame,this);
        this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.exitTheGame,this);
        this.nextPassBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.nextPassTheGame,this);
    }

    public rePlayBtn:eui.Button;
    public nextPassBtn:eui.Button;
    public exitBtn:eui.Button;
    public pointBit:eui.BitmapLabel;
    public goldBit:eui.BitmapLabel;
    public passIsSuc:eui.Label;
    public star_1:eui.Image;
    public star_2:eui.Image;
    public star_3:eui.Image;

    private rePlayTheGame(){
        this.visible = false;
        GameView.self.showPassStarMain();
    }

    private exitTheGame(){
        this.visible = false;
        GameView.self.gotoHome();
    }

    private nextPassTheGame(){
        this.visible = false;
        var id:number = StarView.ThePassId+1;
        var data:PlayerPassInfo = GameView.self.gameHomeMain.passSelectShow.getPassData(id);
        //console.log(data);
        GameView.self.showPassStarMain(data);
    }

    public loadGameOver(isSuc:boolean){
        if(isSuc){
            console.log("过关");
            this.passIsSuc.text = "过关";
            if(StarView.ThePassId < GameConfig.Pass.PASS_MAX_INDEX){
                this.nextPassBtn.visible = true;
            }else{
                this.nextPassBtn.visible = false;
            }
            this.rePlayBtn.visible = false;
        }else{
            console.log("失败");
            this.passIsSuc.text = "失败";
            this.nextPassBtn.visible = false;
            this.rePlayBtn.visible = true;
        }

        this.pointBit.text = GameView.self.gamePlayMain.pointPlayShow.pointData.point + "";
        this.goldBit.text = 30 + "";

        var starNum:number = GameView.self.gamePlayMain.pointPlayShow.pointData.star;
        if(starNum < 1){
            this.star_1.source = GameConfig.Pass.UN_STAR_IMG;
            this.star_2.source = GameConfig.Pass.UN_STAR_IMG;
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }else if(starNum === 1){
            this.star_1.source = GameConfig.Pass.STAR_IMG;
            this.star_2.source = GameConfig.Pass.UN_STAR_IMG;
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }else if(starNum === 2){
            this.star_1.source = GameConfig.Pass.STAR_IMG;
            this.star_2.source = GameConfig.Pass.STAR_IMG;
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }else if(starNum === 3){
            this.star_1.source = GameConfig.Pass.STAR_IMG;
            this.star_2.source = GameConfig.Pass.STAR_IMG;
            this.star_3.source = GameConfig.Pass.STAR_IMG;
        }
    }
}