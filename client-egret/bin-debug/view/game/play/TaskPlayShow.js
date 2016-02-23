var TaskPlayShow = (function (_super) {
    __extends(TaskPlayShow, _super);
    function TaskPlayShow() {
        _super.call(this);
        this.taskPlayData = {};
    }
    var d = __define,c=TaskPlayShow,p=c.prototype;
    p.loadTaskInfo = function (taskList) {
        if (taskList.length > 0) {
            this.task_1.loadTaskInfo(taskList[0]);
        }
        if (taskList.length > 1) {
            this.task_2.loadTaskInfo(taskList[1]);
        }
        if (taskList.length > 2) {
            this.task_3.loadTaskInfo(taskList[2]);
        }
        if (taskList.length > 3) {
            this.task_4.loadTaskInfo(taskList[3]);
        }
        this.taskPlayData.step = StarView.ThePassTaskStep;
        this.stepLeave.text = this.taskPlayData.step + "";
    };
    p.taskForClearStar = function (star) {
        if (!this.task_1.isComplete && this.task_1.taskForClearStar(star)) {
            this.task_1.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK, this.task_1.taskPosPoint);
        }
        if (!this.task_2.isComplete && this.task_2.taskForClearStar(star)) {
            this.task_2.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK, this.task_2.taskPosPoint);
        }
        if (!this.task_3.isComplete && this.task_3.taskForClearStar(star)) {
            this.task_3.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK, this.task_3.taskPosPoint);
        }
        if (!this.task_4.isComplete && this.task_4.taskForClearStar(star)) {
            this.task_4.reduceTaskOnce();
            star.isTaskTargetStar = true;
            star.starPlayEff(GameConfig.EffName.CLEAR_STAR_ON_TASK, this.task_4.taskPosPoint);
        }
    };
    p.costPlayStep = function () {
        this.taskPlayData.step--;
        if (this.taskPlayData.step < 0) {
            this.stepLeave.text = "0";
            return;
        }
        this.stepLeave.text = this.taskPlayData.step + "";
    };
    return TaskPlayShow;
})(eui.Component);
egret.registerClass(TaskPlayShow,'TaskPlayShow');
