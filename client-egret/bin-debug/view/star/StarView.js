/**
 *
 * @author
 *
 */
var StarView = (function (_super) {
    __extends(StarView, _super);
    function StarView() {
        _super.call(this);
        this.changeStarId = [];
        this.changeRateIndex = -1;
        StarView.self = this;
        this.skinName = "StarViewSkin";
    }
    var d = __define,c=StarView,p=c.prototype;
    p.gameStart = function (passId, bossId) {
        GameView.self.touchChildren = false;
        //读取地图数据
        this.loadPassData(passId);
        //读取boss数据 如果有
        bossId = 1;
        if (bossId) {
            this.loadBossData(bossId);
        }
        else {
            this.bossData = null;
        }
        console.log("passData:::", this.passData);
        console.log("bossData:::", this.bossData);
        this.visible = false;
        StarView.state = GameConfig.StarViewState.START;
        this.initStarView();
    };
    p.loadPassData = function (passId) {
        //新建或获取 地图数据
        if (!GameScript.Pass["pass_" + passId].data) {
            this.passData = new GameScript.Pass["pass_" + passId]();
        }
        else {
            this.passData = GameScript.Pass["pass_" + passId].data;
            this.passData.initPass();
        }
        //设置数据
        StarView.ThePassId = passId;
        StarView.ThePassStarInfoArr = this.passData.starArr;
        StarView.ThePassTaskInfoArr = this.passData.taskArr;
        StarView.ThePassPointInfoArr = this.passData.pointArr;
        StarView.ThePassTaskStep = this.passData.taskStep;
    };
    p.loadBossData = function (bossId) {
        if (!GameScript.Boss["boss_" + bossId].data) {
            this.bossData = new GameScript.Boss["boss_" + bossId]();
        }
        else {
            this.bossData = GameScript.Boss["boss_" + bossId].data;
            this.bossData.initBoss();
        }
    };
    p.theStarViewStart = function () {
        GameView.self.gamePlayMain.skillPlayShow.initSkillPlayShow();
        GameView.self.gamePlayMain.showTaskMain();
    };
    p.initStarAndPosList = function () {
        StarView.StarAndPosList = [];
        for (var i = 0; i < 10; i++) {
            StarView.StarAndPosList[i] = [];
            for (var y = 0; y < 10; y++) {
                StarView.StarAndPosList[i][y] = { starId: -1, posId: -1 };
            }
        }
    };
    p.initStarView = function () {
        //创建星星
        var starH = StarView.ThePassStarInfoArr.length;
        var starV = StarView.ThePassStarInfoArr[0].length;
        this.initStarAndPosList();
        if (StarView.StarOneList.length < 1) {
            //创建所有星星
            for (var i = 0; i < starH * starV; i++) {
                var posX = i % starH;
                var posY = Math.floor(i / starV);
                //新建星星
                var starOne = new StarOne();
                starOne.starId = i;
                starOne.posX = posX;
                starOne.posY = -(starV - posY);
                starOne.initStarForTypeId(StarView.ThePassStarInfoArr[posY][posX]);
                StarView.StarAndPosList[posX][posY].starId = i;
                StarView.StarOneList.push(starOne);
                this.StarBox.addChild(starOne);
            }
        }
        else {
            for (var i = 0; i < starH * starV; i++) {
                var posX = i % starH;
                var posY = Math.floor(i / starV);
                var star = StarView.StarOneList[i];
                star.posX = posX;
                star.posY = -(starV - posY);
                star.initStarForTypeId(StarView.ThePassStarInfoArr[posY][posX]);
                StarView.StarAndPosList[posX][posY].starId = i;
                this.StarBox.addChild(star);
            }
        }
        //数据初始化
        StarView.ClearList = [];
        this.dropStar();
    };
    //根据id 检查星星
    p.checkStar = function (starId) {
        if (!StarView.StarOneList[starId].isCheckTheStar) {
            //todo 不可点击的音效
            return;
        }
        //音效播放
        //关闭游戏触发
        //GameView.self.touchChildren = false;
        //设置为空
        StarView.ClearList = [];
        //检查四周
        this.checkClearList(starId);
    };
    p.checkClearList = function (starId, isSameIndex) {
        if (isSameIndex === void 0) { isSameIndex = false; }
        //放入待消除列表
        if (StarView.ClearList.length < 1) {
            StarView.ClearList.push(starId);
        }
        //临时消除列表
        var checkStar = StarView.StarOneList[starId];
        var clear = [];
        var top, bot, lef, rig;
        for (var i = 0; i < StarView.ClearList.length; i++) {
            //取出星星
            var that = StarView.StarOneList[StarView.ClearList[i]];
            //判断是否检查过 已检查跳过
            if (that.isCheckForTheRound) {
                continue;
            }
            if (that.posY > 0) {
                top = StarView.StarAndPosList[that.posX][that.posY - 1].starId;
            }
            if (that.posY < StarView.ThePassStarInfoArr.length - 1) {
                bot = StarView.StarAndPosList[that.posX][that.posY + 1].starId;
            }
            if (that.posX > 0) {
                lef = StarView.StarAndPosList[that.posX - 1][that.posY].starId;
            }
            if (that.posX < StarView.ThePassStarInfoArr[0].length - 1) {
                rig = StarView.StarAndPosList[that.posX + 1][that.posY].starId;
            }
            if ((top || top === 0) && StarView.StarOneList[top].canPushClearList(checkStar)) {
                clear.push(top);
            }
            if ((bot || bot === 0) && StarView.StarOneList[bot].canPushClearList(checkStar)) {
                clear.push(bot);
            }
            if ((lef || lef === 0) && StarView.StarOneList[lef].canPushClearList(checkStar)) {
                clear.push(lef);
            }
            if ((rig || rig === 0) && StarView.StarOneList[rig].canPushClearList(checkStar)) {
                clear.push(rig);
            }
            that.isCheckForTheRound = true;
        }
        //去掉重复项
        StarView.ClearList = MixGame.unique(StarView.ClearList);
        //判断临时是否有新加入的id
        if (clear.length > 0) {
            for (var c = 0; c < clear.length; c++) {
                StarView.ClearList.push(clear[c]);
            }
            this.checkClearList(starId, isSameIndex);
        }
        else {
            if (isSameIndex) {
                for (var sIndex = 0; sIndex < StarView.ClearList.length; sIndex++) {
                    var sStar = StarView.StarOneList[StarView.ClearList[sIndex]];
                    sStar.isCheckForTheRound = false;
                }
                return;
            }
            //所有带消除都检查过 四周没有可消除部分
            if (StarView.ClearList.length <= 1) {
            }
            else {
                //多个可消除单位
                //console.log("点击多个");
                //console.log(StarView.ClearList);
                GameView.self.gamePlayMain.taskPlayShow.costPlayStep();
                this.clearStar();
            }
        }
    };
    p.getStarSameIndex = function (starId) {
        StarView.ClearList = [];
        this.checkClearList(starId, true);
        return StarView.ClearList.length;
    };
    p.clearReward = function (num) {
    };
    //开始消除星星
    p.clearStar = function () {
        GameView.self.touchChildren = false;
        //判断消除的数量 并给予变化
        //this.clearReward(StarView.ClearList.length);
        //判断消除列表中是否有道具炸弹
        //this.clearListIsHaveProp();
        //console.log("clear list ",StarView.ClearList);
        //清除星星
        var clearArr = [
            [], [], [], [], [], [], [], [], [], []
        ];
        for (var i = 0; i < StarView.ClearList.length; i++) {
            var star = StarView.StarOneList[StarView.ClearList[i]];
            if (star.isCanClear) {
                StarView.StarAndPosList[star.posX][star.posY].starId = -1;
                clearArr[star.posX].push(star.starId);
            }
            star.startClearTheStar(clearArr[star.posX].length);
        }
        //重新排序
        this.starNewOrder(clearArr);
        if (StarView.state === GameConfig.StarViewState.START) {
            this.dropStar();
        }
        else {
            //通知combo
            GameView.self.gamePlayMain.pointPlayShow.updatePointCombo(StarView.ClearList.length);
            egret.setTimeout(function () {
                this.dropStar();
            }, this, 500);
        }
    };
    p.starNewOrder = function (clearArr) {
        for (var x = 0; x < StarView.ThePassStarInfoArr[0].length; x++) {
            for (var y = StarView.ThePassStarInfoArr.length - 1; y >= 0; y--) {
                var id = StarView.StarAndPosList[x][y].starId;
                if (id < 0) {
                    var upId;
                    var isDrop = true;
                    if (y < 1) {
                        upId = clearArr[x].shift();
                        isDrop = false;
                    }
                    else {
                        var upY = y - 1;
                        upId = StarView.StarAndPosList[x][upY].starId;
                        while (upId < 0 || !StarView.StarOneList[upId].isCanMove) {
                            upY--;
                            if (upY < 0) {
                                upId = clearArr[x].shift();
                                isDrop = false;
                            }
                            else {
                                upId = StarView.StarAndPosList[x][upY].starId;
                            }
                        }
                    }
                    StarView.StarAndPosList[x][y].starId = upId;
                    if (isDrop) {
                        StarView.StarAndPosList[x][upY].starId = -1;
                    }
                }
            }
        }
    };
    p.dropStar = function (isSkill) {
        if (isSkill === void 0) { isSkill = false; }
        var time = 0;
        //掉落 重新计算位置
        for (var x = 0; x < StarView.ThePassStarInfoArr[0].length; x++) {
            for (var y = 0; y < StarView.ThePassStarInfoArr.length; y++) {
                var star = StarView.StarOneList[StarView.StarAndPosList[x][y].starId];
                star.isCheckForTheRound = false;
                var moveTime = star.starMovePos(x, y, isSkill);
                if (moveTime > time) {
                    time = moveTime;
                }
            }
        }
        if (StarView.state === GameConfig.StarViewState.START) {
            this.initCheck(); //重置棋盘
        }
        else {
            time = time * 50 + 200;
            egret.setTimeout(function () {
                this.initCheck(); //重置棋盘
            }, this, time);
        }
    };
    p.clearStepStar = function () {
    };
    //每步后常规检查
    p.initCheck = function () {
        GameView.self.touchChildren = false;
        //检查每个星星的sameIndex
        for (var i = 0; i < StarView.StarOneList.length; i++) {
            var star = StarView.StarOneList[i];
            star.sameIndex = this.getStarSameIndex(star.starId);
            star.idText.text = star.starId + "";
        }
        var isEnd = true;
        //消除多星星
        if (isEnd) {
            isEnd = this.checkAllStarForEachTurn();
        }
        //todo 各星星执行各自特殊方法
        //重置每局数据
        if (isEnd) {
            GameView.self.gamePlayMain.pointPlayShow.comboToZero();
        }
        //每局游戏开始时
        if (StarView.state === GameConfig.StarViewState.START && isEnd) {
            StarView.state = GameConfig.StarViewState.PLAY;
            this.theStarViewStart();
            return;
        }
        //判断是否过关
        if (isEnd) {
            GameView.self.touchChildren = true;
            isEnd = GameView.self.gamePlayMain.allTaskComplete();
        }
        //判断是否失败 检查步数剩余
        if (isEnd) {
            if (GameView.self.gamePlayMain.taskPlayShow.taskPlayData.step < 1) {
                GameView.self.gamePlayMain.gameOverShow(false);
            }
        }
    };
    //将多个星星消除 暂定数量：5
    p.checkAllStarForEachTurn = function () {
        var isCanClear = false;
        StarView.ClearList = [];
        for (var i = 0; i < StarView.StarOneList.length; i++) {
            var star = StarView.StarOneList[i];
            if (star.sameIndex >= 2 && !isCanClear) {
                isCanClear = true;
            }
            if (star.sameIndex >= 5) {
                StarView.ClearList.push(star.starId);
            }
        }
        if (!isCanClear) {
            //todo  全棋盘随机
            this.allStarAgainArray();
            return false;
        }
        if (StarView.ClearList.length > 0) {
            this.clearStar();
            return false;
        }
        else {
            return true;
        }
    };
    //要消除的星星id, 使用的特效id
    p.clearStarForIdArr = function (idArr, effId) {
    };
    p.clearListIsHaveProp = function () {
    };
    p.getStarIdForVer = function (x, y) {
    };
    p.getStarIdForHor = function (x, y) {
    };
    p.gameOver = function () {
    };
    p.changePos = function (rate, starId_1, starId_2) {
        this.changeRateIndex = rate;
        switch (rate) {
            case -1:
                StarView.state = GameConfig.StarViewState.PLAY;
                this.changeStarId = [];
                this.setAllStarCanUseSkill(true);
                break;
            case 0:
                StarView.state = GameConfig.StarViewState.CHANGE_POS;
                //提示选择
                for (var i = 0; i < StarView.StarOneList.length; i++) {
                    var thatStar = StarView.StarOneList[i];
                    if (thatStar.canUsePropOrSkill(StarView.state)) {
                        thatStar.setCanClickForSkill(true);
                    }
                    else {
                        thatStar.setCanClickForSkill(false);
                    }
                }
                break;
            case 1:
                this.changeStarId[0] = starId_1;
                this.setAllStarCanUseSkill(false);
                var star = StarView.StarOneList[starId_1];
                //四周星星开启判断
                if (star.posY > 0) {
                    StarView.StarOneList[StarView.StarAndPosList[star.posX][star.posY - 1].starId].canUsePropOrSkill(StarView.state);
                }
                if (star.posY < StarView.ThePassStarInfoArr.length - 1) {
                    StarView.StarOneList[StarView.StarAndPosList[star.posX][star.posY + 1].starId].canUsePropOrSkill(StarView.state);
                }
                if (star.posX > 0) {
                    StarView.StarOneList[StarView.StarAndPosList[star.posX - 1][star.posY].starId].canUsePropOrSkill(StarView.state);
                }
                if (star.posX < StarView.ThePassStarInfoArr[star.posX].length - 1) {
                    StarView.StarOneList[StarView.StarAndPosList[star.posX + 1][star.posY].starId].canUsePropOrSkill(StarView.state);
                }
                //todo 待交换的星星设置表现形式
                break;
            case 2:
                this.changeStarId[1] = starId_2;
                this.setAllStarCanUseSkill(true);
                //开始执行交换
                this.changeStarPos(this.changeStarId[0], this.changeStarId[1]);
                GameView.self.gamePlayMain.clickCanCelBtn();
                break;
        }
    };
    p.changeStarPos = function (starId_1, starId_2) {
        var star_1 = StarView.StarOneList[starId_1];
        var star_2 = StarView.StarOneList[starId_2];
        var pos_1 = { x: 0, y: 0 };
        var pos_2 = { x: 0, y: 0 };
        StarView.StarAndPosList[star_1.posX][star_1.posY].starId = starId_2;
        StarView.StarAndPosList[star_2.posX][star_2.posY].starId = starId_1;
        pos_1.x = star_1.posX;
        pos_1.y = star_1.posY;
        pos_2.x = star_2.posX;
        pos_2.y = star_2.posY;
        star_1.starMovePos(pos_2.x, pos_2.y);
        star_2.starMovePos(pos_1.x, pos_1.y);
        egret.setTimeout(this.initCheck, this, 500);
    };
    p.changeColor = function (rate, starId, colorId) {
        if (!this.changeStarColorShowMain) {
            this.changeStarColorShowMain = new SkillChangeColorShow();
            this.addChild(this.changeStarColorShowMain);
            this.changeStarColorShowMain.x = 100;
            this.changeStarColorShowMain.y = 100;
        }
        this.changeRateIndex = rate;
        this.changeStarColorShowMain.visible = false;
        switch (rate) {
            case -1:
                StarView.state = GameConfig.StarViewState.PLAY;
                this.changeStarId = [];
                this.setAllStarCanUseSkill(true);
                break;
            case 0:
                StarView.state = GameConfig.StarViewState.CHANGE_COLOR;
                //所有星星 判断是否可用改变颜色
                for (var i = 0; i < StarView.StarOneList.length; i++) {
                    var thatStar = StarView.StarOneList[i];
                    if (thatStar.canUsePropOrSkill(StarView.state)) {
                        thatStar.setCanClickForSkill(true);
                    }
                    else {
                        thatStar.setCanClickForSkill(false);
                    }
                }
                break;
            case 1:
                this.setAllStarCanUseSkill(false);
                //展示变化的其他颜色 让其选择
                this.changeStarId[0] = starId;
                this.changeStarColorShowMain.visible = true;
                var star = StarView.StarOneList[starId];
                this.changeStarColorShowMain.setImgColor(star.colorId);
                //todo 待交换的星星设置表现形式
                break;
            case 2:
                this.changeStarColor(this.changeStarId[0], colorId);
                GameView.self.gamePlayMain.clickCanCelBtn();
                break;
        }
    };
    p.changeStarColor = function (starId, colorId) {
        var star = StarView.StarOneList[starId];
        star.setTheStarColor(colorId);
        egret.setTimeout(this.initCheck, this, 500);
    };
    p.setAllStarCanUseSkill = function (can) {
        for (var i = 0; i < StarView.StarOneList.length; i++) {
            var thatStar = StarView.StarOneList[i];
            thatStar.setCanClickForSkill(can);
        }
    };
    //棋盘重新排序
    p.allStarAgainArray = function () {
        GameView.self.touchChildren = false;
        var newStarList = [];
        for (var i = 0; i < StarView.StarOneList.length; i++) {
            var star = StarView.StarOneList[i];
            if (star.canUsePropOrSkill(GameConfig.StarViewState.AGAIN_ARRAY)) {
                newStarList.push(star.starId);
                StarView.StarAndPosList[star.posX][star.posY].starId = -2;
            }
        }
        newStarList.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
        newStarList.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
        newStarList.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
        var index = 0;
        for (var x = 0; x < StarView.ThePassStarInfoArr[0].length; x++) {
            for (var y = 0; y < StarView.ThePassStarInfoArr.length; y++) {
                if (StarView.StarAndPosList[x][y].starId === -2) {
                    StarView.StarAndPosList[x][y].starId = newStarList[index];
                    index++;
                }
            }
        }
        this.dropStar(true);
    };
    StarView.state = GameConfig.StarViewState.START;
    StarView.StarOneList = []; //星星的实例数组
    StarView.PosOneList = []; //位置的实例数组
    StarView.ClearList = []; //本轮需要消除的星星id列表
    StarView.ThePassType = -1; //关卡类型
    StarView.ThePassId = 0; //关卡Id
    StarView.ThePassPointInfoArr = [];
    StarView.ThePassStarInfoArr = [[]]; //本关的配置信息
    StarView.ThePassPosInfoArr = [[]]; //本关的配置信息
    StarView.ThePassTaskInfoArr = []; //本关任务信息
    StarView.ThePassTaskStep = 0;
    return StarView;
})(eui.Component);
egret.registerClass(StarView,'StarView');
