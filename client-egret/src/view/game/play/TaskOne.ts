interface TaskOneLoadInfo{
    task_type:number;
    task_star?:StarOneLoadInfo;
    task_pos?:PosOneLoadInfo;
    task_number:number;
}
class TaskOne extends eui.Button {
    public constructor(){
        super();
        this.task = <TaskOneLoadInfo>{};
        this.task.task_type = -1;
    }

    public task:TaskOneLoadInfo;
    public taskNumber:eui.BitmapLabel;
    public isComplete:boolean;

    public taskPosPoint:egret.Point = new egret.Point();
    public loadTaskInfo(task:TaskOneLoadInfo){
        this.task = task;
        this.isComplete = false;
        //this.taskNumber.text = task.task_number + "";
        //console.log(task);

        if(task.task_type < 0){
            //没有任务
            //console.log("没有任务");
            this.visible = false;
            this.isComplete = true;

        }else if(task.task_type === 0){
            //todo 任务条件是StarOne
            this.taskNumber.text = task.task_number + "";
            this.iconDisplay.source = GameConfig.StarOneImg.getImgForLoadInfo(task.task_star);

        }else if(task.task_type === 1){
            //todo 任务条件是PosOne
            this.taskNumber.text = task.task_number + "";

        }

        this.taskPosPoint = this.localToGlobal(this.taskNumber.x,this.taskNumber.y,this.taskPosPoint);
        this.taskPosPoint.y = 140;
    }

    public taskForClearStar(clearStar:StarOne):boolean{
        if(this.task.task_type !== 0){
            return false
        }

        if(clearStar.typeId === this.task.task_star.typeId){
            if(this.task.task_star.colorId < 1){//任务没有指定颜色
                //任务达到
                return true
            }else{//任务指定了颜色
                if(clearStar.colorId === this.task.task_star.colorId){
                    //任务达到
                    return true
                }
            }
        }

        //非目标
        return false
    }

    public taskForClearPos(clearPos:PosOne){

    }


    public reduceTaskOnce(){
        this.task.task_number --;
        if(this.task.task_number <= 0){
            //已经完成
            this.isComplete = true;
            this.taskNumber.text = "0";
        }else{
            this.taskNumber.text = this.task.task_number + "";
        }
    }
}