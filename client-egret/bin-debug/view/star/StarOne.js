/*
 * 星星的表现类
 */
var StarOne = (function (_super) {
    __extends(StarOne, _super);
    function StarOne() {
        _super.call(this);
        this.isCheckForTheRound = false; //本轮是否检查过
        this.isCheckForSkill = false; //
        this.isCheckTheStar = true; //是否能被点击
        this.isCanClear = true; //是否可清除
        this.isCanMove = true; //是否可移动
        this.isTaskTargetStar = false;
        this.skinName = "StarOneSkin";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
    }
    var d = __define,c=StarOne,p=c.prototype;
    p.clickStar = function () {
        switch (StarView.state) {
            case GameConfig.StarViewState.PLAY:
                //可点击的星星才触发检索
                //console.log(this.starId, this.isCheckTheStar);
                if (this.isCheckTheStar) {
                    StarView.self.checkStar(this.starId);
                }
                break;
            //交换位置时 点击了星星
            case GameConfig.StarViewState.CHANGE_POS:
                if (!this.isCheckForSkill) {
                    return;
                }
                if (StarView.self.changeRateIndex === 0) {
                    StarView.self.changePos(1, this.starId);
                }
                else if (StarView.self.changeRateIndex === 1) {
                    StarView.self.changePos(2, -1, this.starId);
                }
                break;
            //变换颜色时 点击了星星
            case GameConfig.StarViewState.CHANGE_COLOR:
                if (!this.isCheckForSkill) {
                    return;
                }
                StarView.self.changeColor(1, this.starId);
                break;
        }
    };
    /*
     根据点击的星星 判断此星星是否可被计入 清除列表
     star:点击的星星实例  isBoom:是否为炸弹
     */
    p.canPushClearList = function (star) {
        if (this.isCheckForTheRound) {
            //console.log("已经检查过", this.starId);
            return false;
        }
        if (star.typeId === GameConfig.StarType.STAR && this.typeId === GameConfig.StarType.STAR && star.colorId === this.colorId) {
            return true;
        }
        if (star.typeId === GameConfig.StarType.STAR && this.typeId === GameConfig.StarType.STONE && star.colorId === this.colorId) {
            return true;
        }
        if (star.typeId === GameConfig.StarType.STONE && this.typeId === GameConfig.StarType.STONE && star.colorId === this.colorId) {
            return true;
        }
        return false;
    };
    /*
     根据类型id设置星星
     */
    p.initStarForTypeId = function (starLoad) {
        this.width = Math.floor(StarView.self.StarBox.width / StarView.ThePassStarInfoArr[0].length);
        this.height = Math.floor(StarView.self.StarBox.height / StarView.ThePassStarInfoArr.length);
        this.starImg.scaleX = this.starImg.scaleY = this.width / 90;
        this.x = this.posX * this.width;
        this.y = this.posY * this.height;
        switch (starLoad.typeId) {
            case GameConfig.StarType.NULL:
                this.typeId = -1;
                this.colorId = -1;
                this.starImg.source = "";
                this.isCanClear = false;
                this.isCanMove = false;
                this.isCheckTheStar = false;
                break;
            case GameConfig.StarType.STAR:
                this.typeId = 0;
                this.randomStar(starLoad.colorId);
                this.isCanClear = true;
                this.isCanMove = true;
                this.isCheckTheStar = true;
                break;
            case GameConfig.StarType.STONE:
                this.typeId = 3;
                this.randomStar(starLoad.colorId);
                this.isCanClear = false;
                this.isCanMove = false;
                this.isCheckTheStar = false;
                break;
        }
    };
    /*
     新 星星
     每个星星被消灭后 重新随机算法
     */
    p.randomStar = function (colorId) {
        if (colorId > 0 && colorId < 6) {
            this.setTheStarColor(colorId);
        }
        else {
            var num = MixGame.getRandom(1, 5);
            this.setTheStarColor(num);
        }
    };
    //开始消除星星时
    p.startClearTheStar = function (toIndex) {
        //消除动画 播放特效
        if (this.isCanClear) {
            this.clearPosPoint = this.localToGlobal(this.starImg.x, this.starImg.y, this.clearPosPoint);
            //传给任务系统
            GameView.self.gamePlayMain.taskPlayShow.taskForClearStar(this);
            //传给分数系统
            GameView.self.gamePlayMain.pointPlayShow.addPointForClearStar(this);
            //播放 非目标特效
            if (!this.isTaskTargetStar) {
                this.starPlayEff(GameConfig.EffName.CLEAR_STAR_NOT_TASK);
            }
            this.isTaskTargetStar = false;
            this.y = 0 - this.height * toIndex;
            this.posY = -toIndex;
            this.randomStar();
        }
    };
    //星星消除结束时
    p.endClearTheStar = function () {
    };
    p.clearStarFunc = function () {
    };
    p.starPlayEff = function (name, toPoint) {
        if (StarView.state === GameConfig.StarViewState.START) {
            return;
        }
        GameView.self.EffBox.playEffForName(name, this, toPoint);
    };
    //星星移动算法
    p.starMovePos = function (x, y, isSkill) {
        if (isSkill === void 0) { isSkill = false; }
        if (this.posX === x && this.posY === y) {
            return;
        }
        var time = Math.abs(x - this.posX) + Math.abs(y - this.posY);
        if (!isSkill) {
            //掉落
            if (StarView.state === GameConfig.StarViewState.START) {
                this.x = x * this.width;
                this.y = y * this.height;
            }
            else {
                egret.Tween.get(this).to({ x: x * this.width, y: y * this.height }, time * 50)
                    .to({ y: y * this.height - 10 }, 100)
                    .to({ y: y * this.height }, 100);
            }
        }
        else {
            //随机变换位置
            egret.Tween.get(this).to({ x: x * this.width, y: y * this.height }, time * 50);
        }
        this.posX = x;
        this.posY = y;
        return time;
    };
    //使用道具/技能时的星星的状态
    p.canUsePropOrSkill = function (state) {
        switch (state) {
            case GameConfig.StarViewState.CHANGE_POS:
                if (this.isCanMove) {
                    this.setCanClickForSkill(true);
                    return true;
                }
                else {
                    this.setCanClickForSkill(false);
                    return false;
                }
                break;
            case GameConfig.StarViewState.CHANGE_COLOR:
                if (this.typeId === GameConfig.StarType.STAR) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case GameConfig.StarViewState.AGAIN_ARRAY:
                if (!this.isCanMove) {
                    return false;
                }
                if (this.typeId === GameConfig.StarType.STAR) {
                    return true;
                }
                break;
        }
        return false;
    };
    p.setCanClickForSkill = function (isCan) {
        if (isCan) {
            this.isCheckForSkill = true;
            this.notClickImg.visible = false;
        }
        else {
            this.isCheckForSkill = false;
            this.notClickImg.visible = true;
        }
    };
    p.setTheStarColor = function (colorId) {
        this.colorId = colorId;
        this.starImg.source = GameConfig.StarOneImg.getImgForLoadInfo({ typeId: this.typeId, colorId: this.colorId });
    };
    return StarOne;
})(StarOneBase);
egret.registerClass(StarOne,'StarOne');
