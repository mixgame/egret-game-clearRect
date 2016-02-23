class PlayerDataShow extends eui.Component {
    public constructor(){
        super();
        this.skinName = "PlayerDataShowSkin";
        //this.userIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickUserIcon,this);
        this.dimIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickDimIcon,this);
    }

    public starMax:number = 0;
    public goldBit:eui.BitmapLabel;
    public dimBit:eui.BitmapLabel;
    public starBit:eui.BitmapLabel;

    public userIcon:eui.Image;
    public dimIcon:eui.Image;

    public initPlayerDataShow(){
        this.goldBit.text = MixGameUser.Info.getGold() + "";
        this.dimBit.text = MixGameUser.Info.getDim() + "";

        var passArr:Array<PlayerPassInfo> = MixGameUser.Pass.getAllPassInfo();
        for(var i=0;i<passArr.length;i++){
            this.starMax += passArr[i].star;
        }

        this.starBit.text = this.starMax + "";
    }

    private onClickUserIcon(){
        Main.self.UserLoginOut();
    }

    private onClickDimIcon(){
        GameView.self.openDimShop();
    }
}