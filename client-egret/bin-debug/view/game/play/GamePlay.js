var GamePlay = (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        _super.call(this);
        this.skinName = "GamePlaySkin";
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCanCelBtn, this);
    }
    var d = __define,c=GamePlay,p=c.prototype;
    p.clickCanCelBtn = function () {
        switch (StarView.state) {
            case GameConfig.StarViewState.CHANGE_POS:
                this.starView.changePos(-1);
                break;
            case GameConfig.StarViewState.CHANGE_COLOR:
                this.starView.changeColor(-1);
                break;
        }
        this.useSkillBg.visible = false;
        this.cancelBtn.visible = false;
    };
    p.gamePlayStar = function (passId) {
        this.useSkillBg.visible = false;
        this.cancelBtn.visible = false;
        this.balanceMain.visible = false;
        this.starView.visible = false;
        this.taskPlayShow.visible = false;
        this.skillPlayShow.visible = false;
        this.pointPlayShow.visible = false;
        this.starView.gameStart(passId);
    };
    //游戏关卡信息存储
    p.gamePassInfoSave = function () {
        var newPassInfo = {
            id: 0,
            point: 0,
            star: 0
        };
        newPassInfo.id = StarView.ThePassId;
        newPassInfo.point = this.pointPlayShow.pointData.point;
        newPassInfo.star = this.pointPlayShow.pointData.star;
        var isUpdate = false;
        var updateInfo = {};
        updateInfo.id = newPassInfo.id;
        var thePassOldInfo = MixGameUser.Pass.getOnePassInfoForId(newPassInfo.id);
        if (thePassOldInfo) {
            if (thePassOldInfo.point >= newPassInfo.point) {
                updateInfo.point = thePassOldInfo.point;
            }
            else {
                updateInfo.point = newPassInfo.point;
                isUpdate = true;
            }
            if (thePassOldInfo.star >= newPassInfo.star) {
                updateInfo.star = thePassOldInfo.star;
            }
            else {
                updateInfo.star = newPassInfo.star;
                isUpdate = true;
            }
        }
        else {
            MixGameUser.Pass.setOnePassInfo(newPassInfo);
        }
        if (isUpdate) {
            MixGameUser.Pass.setOnePassInfo(updateInfo);
        }
    };
    p.gameOverShow = function (isSuccess) {
        StarView.self.StarBox.removeChildren();
        this.balanceMain.visible = true;
        this.starView.visible = false;
        this.useSkillBg.visible = true;
        this.balanceMain.loadGameOver(isSuccess);
        if (isSuccess) {
            this.gamePassInfoSave();
        }
    };
    p.showTaskMain = function () {
        this.taskPlayShow.top = 320;
        this.pointPlayShow.horizontalCenter = -this.pointPlayShow.width;
        //任务 重置
        this.taskPlayShow.loadTaskInfo(StarView.ThePassTaskInfoArr);
        this.pointPlayShow.initPointPlayShow(StarView.ThePassPointInfoArr);
        this.taskPlayShow.visible = true;
        egret.Tween.get(this.taskPlayShow).wait(500).to({ top: 0 }, 500).call(this.starViewPlay, this);
    };
    p.starViewPlay = function () {
        GameView.self.touchChildren = true;
        this.skillPlayShow.visible = true;
        this.starView.visible = true;
        this.pointPlayShow.visible = true;
        egret.Tween.get(this.pointPlayShow).to({ horizontalCenter: 0 }, 1500, egret.Ease.backInOut);
    };
    p.useSkill = function (type) {
        this.useSkillBg.visible = true;
        this.cancelBtn.visible = true;
        switch (type) {
            case GameConfig.StarViewState.CHANGE_POS:
                this.starView.changePos(0);
                break;
            case GameConfig.StarViewState.CHANGE_COLOR:
                this.starView.changeColor(0);
                break;
            case GameConfig.StarViewState.AGAIN_ARRAY:
                this.starView.allStarAgainArray();
                this.clickCanCelBtn();
                break;
        }
    };
    p.allTaskComplete = function () {
        if (this.taskPlayShow.task_1.isComplete && this.taskPlayShow.task_2.isComplete && this.taskPlayShow.task_3.isComplete && this.taskPlayShow.task_4.isComplete) {
            this.gameOverShow(true);
            //完成任务 停止游戏
            return false;
        }
        //没有完成任务 继续游戏
        return true;
    };
    return GamePlay;
})(eui.Component);
egret.registerClass(GamePlay,'GamePlay');
