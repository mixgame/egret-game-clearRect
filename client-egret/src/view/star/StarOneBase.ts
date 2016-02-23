class StarOneBase extends eui.Button{
    public starId:number = null;
    public posX:number = 0;  //现在的横轴位置
    public posY:number = 0;  //现在的竖轴位置
    public typeId:number;    //星星的类型 -1空 0星星 1道具
    public typeLv:number;    //类型第2参数 级别
    public colorId:number;   //星星的颜色id


    public constructor(){
        super();
    }

    //根据情况 设置为不同的星星
    //空
    private setTypeNull(){

    }

    private setTypeStar(){

    }

    private setTypeStone(){

    }
}