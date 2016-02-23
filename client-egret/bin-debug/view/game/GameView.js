/**
 *
 * @author
 * 游戏视图
 *
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.EffList = [];
        this.nowSkinState = "";
        GameView.self = this;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=GameView,p=c.prototype;
    p.getCurrentState = function () {
        return this.nowSkinState;
    };
    p.addToStage = function () {
        this.initLoadGameData();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    };
    /*
     初始化游戏各项数据
     */
    p.initLoadGameData = function () {
        this.height = Main.self.stage.stageHeight;
        var skillData = new SkillDataGather();
        this.gameHomeMain = new GameHome();
        this.gamePlayMain = new GamePlay();
        this.gameHomeMain.height = this.height;
        this.gamePlayMain.height = this.height;
        this.EffBox = new GameEff();
        this.passStartMain = new PassStartMain();
        this.dimShopMain = new ShopMain();
        this.dimShopMain.skinName = "DimShopMainSkin";
        this.dimShopMain.horizontalCenter = 0;
        this.dimShopMain.verticalCenter = 0;
    };
    p.gotoHome = function () {
        this.passStartMain.visible = false;
        this.closeDimShop();
        if (this.getChildIndex(this.EffBox) >= 0) {
            this.removeChild(this.EffBox);
        }
        if (this.getChildIndex(this.gameHomeMain) < 0) {
            this.addChildAt(this.gameHomeMain, 0);
            this.gameHomeMain.initGameHome();
        }
        if (this.getChildIndex(this.gamePlayMain) >= 0) {
            this.removeChild(this.gamePlayMain);
        }
    };
    p.gotoPlay = function (passId) {
        this.passStartMain.visible = false;
        this.closeDimShop();
        if (this.getChildIndex(this.gamePlayMain) < 0) {
            this.addChildAt(this.gamePlayMain, 0);
        }
        if (this.getChildIndex(this.gameHomeMain) >= 0) {
            this.removeChild(this.gameHomeMain);
        }
        if (this.getChildIndex(this.EffBox) < 0) {
            this.addChild(this.EffBox);
        }
        this.gamePlayMain.gamePlayStar(passId);
    };
    p.showPassStarMain = function (passData) {
        if (this.getChildIndex(this.passStartMain) < 0) {
            this.addChild(this.passStartMain);
        }
        if (passData) {
            this.passStartMain.loadPassInfoAndShow(passData);
        }
        this.passStartMain.visible = true;
        this.passStartMain.touchEnabled = true;
        this.passStartMain.touchChildren = true;
    };
    p.openDimShop = function () {
        if (this.getChildIndex(this.dimShopMain) < 0) {
            this.addChild(this.dimShopMain);
        }
    };
    p.closeDimShop = function () {
        if (this.getChildIndex(this.dimShopMain) >= 0) {
            this.removeChild(this.dimShopMain);
        }
    };
    return GameView;
})(eui.Component);
egret.registerClass(GameView,'GameView');
