var GameHome = (function (_super) {
    __extends(GameHome, _super);
    function GameHome() {
        _super.call(this);
        this.skinName = "GameHomeSkin";
        this.initGameHome();
    }
    var d = __define,c=GameHome,p=c.prototype;
    p.initGameHome = function () {
        this.playerDataShow.initPlayerDataShow();
        this.passSelectShow.loadAllPassInfo();
    };
    return GameHome;
})(eui.Component);
egret.registerClass(GameHome,'GameHome');
