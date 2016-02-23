/**
 *
 * @author 
 *
 */
class PassClickBtn extends eui.Button{
    public constructor(){
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }

    private data:any;
    public passIndex:eui.BitmapLabel;
    public rankIcon:eui.Image;
    public star_1:eui.Image;
    public star_2:eui.Image;
    public star_3:eui.Image;
    public clickBg:eui.Image;

    public initBtn(data:any){
        this.data = data;
        this.passIndex.text = this.data.id + "";

        if(this.data.id - 1 > MixGameUser.Pass.nowPassMax){
            this.clickBg.source = "ui_starOneBg_1";
            this.star_1.visible = false;
            this.star_2.visible = false;
            this.star_3.visible = false;
            this.isCanClick = false;
        }else{
            this.clickBg.source = "ui_starOneBg_0";
            this.star_1.visible = true;
            this.star_2.visible = true;
            this.star_3.visible = true;
            this.isCanClick = true;
            this.setStarNumber();
        }
    }

    private isCanClick:boolean = false;
    private onClick(){
        if(this.isCanClick){
            GameView.self.showPassStarMain(this.data);
        }else{
            console.log("还不可以进行此关卡");
        }
    }

    private setStarNumber(){
        var starImg = GameConfig.Pass.STAR_IMG;
        var unStarImg = GameConfig.Pass.UN_STAR_IMG;
        if(this.data.star > 0){
            this.star_1.source = starImg;
        }else{
            this.star_1.source = unStarImg;
        }

        if(this.data.star > 1){
            this.star_2.source = starImg;
        }else{
            this.star_2.source = unStarImg;
        }

        if(this.data.star > 2){
            this.star_3.source = starImg;
        }else{
            this.star_3.source = unStarImg;
        }
    }
}
