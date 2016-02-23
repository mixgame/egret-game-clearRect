/*
 星星读取的类型
 */
interface PosOneLoadInfo {
    typeId:number;
    typeLv:number;
}
/*
 位置的表现类
 用于记录各位置不可变动的信息
 */
class PosOne extends eui.Button{
    public constructor(){
        super();
        this.scaleX = this.scaleY = 0.5;
    }

    public posId:number = 0;
    public initPosForType(typeId:number,lv?:number){

    }
}