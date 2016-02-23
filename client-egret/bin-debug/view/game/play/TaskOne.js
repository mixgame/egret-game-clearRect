var TaskOne = (function (_super) {
    __extends(TaskOne, _super);
    function TaskOne() {
        _super.call(this);
        this.taskPosPoint = new egret.Point();
        this.task = {};
        this.task.task_type = -1;
    }
    var d = __define,c=TaskOne,p=c.prototype;
    p.loadTaskInfo = function (task) {
        this.task = task;
        this.isComplete = false;
        //this.taskNumber.text = task.task_number + "";
        //console.log(task);
        if (task.task_type < 0) {
            //没有任务
            //console.log("没有任务");
            this.visible = false;
            this.isComplete = true;
        }
        else if (task.task_type === 0) {
            //todo 任务条件是StarOne
            this.taskNumber.text = task.task_number + "";
            this.iconDisplay.source = GameConfig.StarOneImg.getImgForLoadInfo(task.task_star);
        }
        else if (task.task_type === 1) {
            //todo 任务条件是PosOne
            this.taskNumber.text = task.task_number + "";
        }
        this.taskPosPoint = this.localToGlobal(this.taskNumber.x, this.taskNumber.y, this.taskPosPoint);
        this.taskPosPoint.y = 140;
    };
    p.taskForClearStar = function (clearStar) {
        if (this.task.task_type !== 0) {
            return false;
        }
        if (clearStar.typeId === this.task.task_star.typeId) {
            if (this.task.task_star.colorId < 1) {
                //任务达到
                return true;
            }
            else {
                if (clearStar.colorId === this.task.task_star.colorId) {
                    //任务达到
                    return true;
                }
            }
        }
        //非目标
        return false;
    };
    p.taskForClearPos = function (clearPos) {
    };
    p.reduceTaskOnce = function () {
        this.task.task_number--;
        if (this.task.task_number <= 0) {
            //已经完成
            this.isComplete = true;
            this.taskNumber.text = "0";
        }
        else {
            this.taskNumber.text = this.task.task_number + "";
        }
    };
    return TaskOne;
})(eui.Button);
egret.registerClass(TaskOne,'TaskOne');
