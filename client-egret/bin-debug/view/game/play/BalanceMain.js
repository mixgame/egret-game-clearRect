var BalanceMain = (function (_super) {
    __extends(BalanceMain, _super);
    function BalanceMain() {
        _super.call(this);
        this.skinName = "BalanceMainSkin";
        this.rePlayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rePlayTheGame, this);
        this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitTheGame, this);
        this.nextPassBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPassTheGame, this);
    }
    var d = __define,c=BalanceMain,p=c.prototype;
    p.rePlayTheGame = function () {
        this.visible = false;
        GameView.self.showPassStarMain();
    };
    p.exitTheGame = function () {
        this.visible = false;
        GameView.self.gotoHome();
    };
    p.nextPassTheGame = function () {
        this.visible = false;
        var id = StarView.ThePassId + 1;
        var data = GameView.self.gameHomeMain.passSelectShow.getPassData(id);
        //console.log(data);
        GameView.self.showPassStarMain(data);
    };
    p.loadGameOver = function (isSuc) {
        if (isSuc) {
            console.log("过关");
            this.passIsSuc.text = "过关";
            if (StarView.ThePassId < GameConfig.Pass.PASS_MAX_INDEX) {
                this.nextPassBtn.visible = true;
            }
            else {
                this.nextPassBtn.visible = false;
            }
            this.rePlayBtn.visible = false;
        }
        else {
            console.log("失败");
            this.passIsSuc.text = "失败";
            this.nextPassBtn.visible = false;
            this.rePlayBtn.visible = true;
        }
        this.pointBit.text = GameView.self.gamePlayMain.pointPlayShow.pointData.point + "";
        this.goldBit.text = 30 + "";
        var starNum = GameView.self.gamePlayMain.pointPlayShow.pointData.star;
        if (starNum < 1) {
            this.star_1.source = GameConfig.Pass.UN_STAR_IMG;
            this.star_2.source = GameConfig.Pass.UN_STAR_IMG;
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }
        else if (starNum === 1) {
            this.star_1.source = GameConfig.Pass.STAR_IMG;
            this.star_2.source = GameConfig.Pass.UN_STAR_IMG;
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }
        else if (starNum === 2) {
            this.star_1.source = GameConfig.Pass.STAR_IMG;
            this.star_2.source = GameConfig.Pass.STAR_IMG;
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }
        else if (starNum === 3) {
            this.star_1.source = GameConfig.Pass.STAR_IMG;
            this.star_2.source = GameConfig.Pass.STAR_IMG;
            this.star_3.source = GameConfig.Pass.STAR_IMG;
        }
    };
    return BalanceMain;
})(eui.Component);
egret.registerClass(BalanceMain,'BalanceMain');
