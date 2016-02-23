class PassMonster extends eui.Button {
    public static Boss:Array<PassMonster> = [];

    public bossId:number;
    public bossData:GameScript.Boss.BossBase;
    public bgImg:eui.Image;
    public unlock:eui.Group;
    public unlockBit:eui.BitmapLabel;
    public constructor(id:number){
        super();
        this.bossId = id;
        this.skinName = "PassMonsterSkin";

        this.bossData = new GameScript.Boss["boss_"+id]();
        this.icon = this.bossData.bossImg;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
    }

    private onTouch(){

    }

    public initMonster(){
        if(GameView.self.gameHomeMain.playerDataShow.starMax >= this.bossData.unlockMin){
            this.bgImg.source = "ui_starOneBg_0";
            this.unlock.visible = false;
        }else{
            this.bgImg.source = "ui_starOneBg_1";
            this.unlock.visible = true;
            this.unlockBit.text = this.bossData.unlockMin + "";
        }
    }
}