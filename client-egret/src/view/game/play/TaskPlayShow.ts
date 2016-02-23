interface TaskPlayData {
    step:number; //当前剩余步数
    task1CompleteCostStep:number; //达到1星时消耗的步数
    task2CompleteCostStep:number; //达到2星时消耗的步数
    task3CompleteCostStep:number; //达到3星时消耗的步数
    taskMaxCompleteCostStep:number; //达到满分时消耗的步数
}

class TaskPlayShow extends eui.Component {
    public constructor(){
        super();
    }

    public taskPlayData:TaskPlayData = <TaskPlayData>{};
    public task_1:TaskOne;
    public task_2:TaskOne;
    public task_3:TaskOne;
    public task_4:TaskOne;
    public stepLeave:eui.Label;

    public loadTaskInfo(taskList:Array<TaskOneLoadInfo>){
        if(taskList.length > 0){
            this.task_1.loadTaskInfo(taskList[0]);
        }
        if(taskList.length > 1){
            this.task_2.loadTaskInfo(taskList[1]);
        }
        if(taskList.length > 2){
            this.task_3.loadTaskInfo(taskList[2]);
        }
        if(taskList.length > 3){
            this.task_4.loadTaskInfo(taskList[3]);
        }

        this.taskPlayData.step = StarView.ThePassTaskStep;
        this.stepLeave.text = this.taskPlayData.step + "";
    }


    public taskForClearStar(star:StarOne){
        if(!this.task_1.isComplete && this.task_1.taskForClearStar(star)){
            this.task_1.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK,this.task_1.taskPosPoint);
        }
        if(!this.task_2.isComplete && this.task_2.taskForClearStar(star)){
            this.task_2.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK,this.task_2.taskPosPoint);

        }
        if(!this.task_3.isComplete && this.task_3.taskForClearStar(star)){
            this.task_3.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK,this.task_3.taskPosPoint);

        }
        if(!this.task_4.isComplete && this.task_4.taskForClearStar(star)){
            this.task_4.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK,this.task_4.taskPosPoint);
        }
    }

    public costPlayStep(){
        this.taskPlayData.step --;
        if(this.taskPlayData.step < 0){
            this.stepLeave.text = "0";
            return
        }
        this.stepLeave.text = this.taskPlayData.step + "";
    }
}