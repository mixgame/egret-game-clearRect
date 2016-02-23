var PassStartMain = (function (_super) {
    __extends(PassStartMain, _super);
    function PassStartMain() {
        _super.call(this);
        this.skinName = "PassStartMainSkin";
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startPlay, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCancel, this);
        this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitPassMain, this);
        this.visible = false;
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    var d = __define,c=PassStartMain,p=c.prototype;
    p.onTouchBegin = function (e) {
        e.target.scaleX = e.target.scaleY = 0.8;
    };
    p.onTouchCancel = function (e) {
        e.target.scaleX = e.target.scaleY = 1;
    };
    p.startPlay = function () {
        this.startBtn.scaleX = this.startBtn.scaleY = 1;
        egret.Tween.get(this.startBtn).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
            GameView.self.gotoPlay(this.passData.id);
        }, this);
    };
    p.exitPassMain = function () {
        this.exitBtn.scaleX = this.startBtn.scaleY = 1;
        egret.Tween.get(this.startBtn).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
            GameView.self.passStartMain.visible = false;
            GameView.self.passStartMain.touchEnabled = false;
            GameView.self.passStartMain.touchChildren = false;
            GameView.self.gotoHome();
        }, this);
    };
    p.loadPassInfoAndShow = function (passInfo) {
        console.log("展示关卡数据", passInfo);
        this.passData = passInfo;
        this.initPassStartMain();
    };
    p.initPassStartMain = function () {
        this.idLabel.text = "第" + this.passData.id + "关";
        this.pointMaxBit.text = "" + this.passData.point;
        if (this.passData.star > 0) {
            this.star_1.source = GameConfig.Pass.STAR_IMG;
        }
        else {
            this.star_1.source = GameConfig.Pass.UN_STAR_IMG;
        }
        if (this.passData.star > 1) {
            this.star_2.source = GameConfig.Pass.STAR_IMG;
        }
        else {
            this.star_2.source = GameConfig.Pass.UN_STAR_IMG;
        }
        if (this.passData.star > 2) {
            this.star_3.source = GameConfig.Pass.STAR_IMG;
        }
        else {
            this.star_3.source = GameConfig.Pass.UN_STAR_IMG;
        }
    };
    return PassStartMain;
})(eui.Component);
egret.registerClass(PassStartMain,'PassStartMain');
