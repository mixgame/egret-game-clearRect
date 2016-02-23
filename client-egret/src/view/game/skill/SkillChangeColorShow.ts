class SkillChangeColorShow extends eui.Component {
    public constructor(){
        super();
        this.skinName = "SkillChangeColorShowSkin";
        this.changeColor_1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickImg,this);
        this.changeColor_2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickImg,this);
        this.changeColor_3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickImg,this);
        this.changeColor_4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickImg,this);
    }

    public changeColor_1:eui.Image;
    public changeColor_2:eui.Image;
    public changeColor_3:eui.Image;
    public changeColor_4:eui.Image;

    private clickImg(event:egret.TouchEvent){
        var colorId:number = 0;
        if(event.target.source === "star_monster_1"){
            colorId = 1;
        }else if(event.target.source === "star_monster_2"){
            colorId = 2;
        }else if(event.target.source === "star_monster_3"){
            colorId = 3;
        }else if(event.target.source === "star_monster_4"){
            colorId = 4;
        }else if(event.target.source === "star_monster_5"){
            colorId = 5;
        }
        StarView.self.changeColor(2,-1,colorId);
    }

    public setImgColor(notId:number){
        var arr:Array<number> = [];
        for(var i=1;i<6;i++){
            if(i !== notId){
                arr.push(i)
            }
        }

        this.changeColor_1.source = "star_monster_"+arr[0];
        this.changeColor_2.source = "star_monster_"+arr[1];
        this.changeColor_3.source = "star_monster_"+arr[2];
        this.changeColor_4.source = "star_monster_"+arr[3];
    }
}