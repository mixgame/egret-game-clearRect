interface PointPlayData {
    point:number; //当前分数
    pointTask_1:number;
    pointTask_2:number;
    pointTask_3:number;
    pointTask_Max:number; //分数条 最大分数
    combo:number;    //当前连击数
    comboMax:number; //最大连击数
    clear:number;
    clearOnce:number;
    star:number;
}

class PointPlayShow extends eui.Component{
    public constructor(){
        super();
    }

    public point:eui.Label;
    public img_1:eui.Image;
    public img_2:eui.Image;
    public img_3:eui.Image;
    public pointBar:eui.Rect;

    private initPointData(){
        if(!this.pointData){
            this.pointData = <PointPlayData>{};
        }
        this.pointData.clear = 0;
        this.pointData.clearOnce = 0;
        this.pointData.combo = 0;
        this.pointData.comboMax = 0;
        this.pointData.point = 0;
        this.pointData.pointTask_Max = 0;
        this.pointData.pointTask_1 = 0;
        this.pointData.pointTask_2 = 0;
        this.pointData.pointTask_3 = 0;
    }
    public initPointPlayShow(point:Array<number>){
        this.initPointData();
        this.pointData.pointTask_1 = point[0];
        this.pointData.pointTask_2 = point[1];
        this.pointData.pointTask_3 = point[2];
        this.pointData.pointTask_Max = point[3];

        this.pointBar.width = 0;
        this.point.text = 0 + "";

        this.img_1.x = (point[0]/point[2])*300;
        this.img_2.x = (point[1]/point[2])*300;
        this.img_3.x = 300;

        this.img_1.source = "ui_pass_unstarIcon";
        this.img_2.source = "ui_pass_unstarIcon";
        this.img_3.source = "ui_pass_unstarIcon";
    }

    public pointData:PointPlayData = <PointPlayData>{};
    public addPointForClearStar(star:StarOne){
        if(star.typeId === 0){
            this.pointData.point += 10;
        }

        this.updatePointBar();
        this.updatePointTaskImg();
    }

    private updatePointBar(){
        //分数条计算
        if(this.pointData.point > this.pointData.pointTask_Max){
            //超过当前最高限制分
            this.pointBar.width = 465;
        }else if(this.pointData.point > this.pointData.pointTask_3){
            //超过3星分数
            var num:number = this.pointData.point - this.pointData.pointTask_3;
            this.pointBar.width = 300 + Math.floor(num/(this.pointData.pointTask_Max-this.pointData.pointTask_3) * (465-300));
        }else{
            //3星分数以下
            this.pointBar.width = Math.floor(this.pointData.point/this.pointData.pointTask_3 * 300);
        }
        this.point.text = this.pointData.point + "";
    }

    private updatePointTaskImg(){
        if(this.pointData.point >= this.pointData.pointTask_1){
            this.img_1.source = "ui_pass_starIcon";
            this.pointData.star = 1;
        }

        if(this.pointData.point >= this.pointData.pointTask_2){
            this.img_2.source = "ui_pass_starIcon";
            this.pointData.star = 2;
        }

        if(this.pointData.point >= this.pointData.pointTask_3){
            this.img_3.source = "ui_pass_starIcon";
            this.pointData.star = 3;
        }
    }

    public updatePointCombo(clearNum:number){
        this.pointData.combo ++;
        if(this.pointData.combo > this.pointData.comboMax){
            this.pointData.comboMax = this.pointData.combo;
        }

        this.pointData.clear += clearNum;
        this.pointData.clearOnce += clearNum;
    }

    public comboToZero(){
        //根据本轮 消除的数量和连击展示
        var index:number = (this.pointData.combo-1)*5 + this.pointData.clearOnce;
        console.log("本轮消除评分："+index);
        if(index >= 10 && index < 20){

        }else if(index >= 20 && index < 50){

        }else if(index >= 50){

        }

        //连击结束 清零
        this.pointData.combo = 0;
        this.pointData.clearOnce = 0;
    }
}