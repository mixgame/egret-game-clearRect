/**
 *
 * @author
 *
 */
var GameLoading = (function (_super) {
    __extends(GameLoading, _super);
    function GameLoading() {
        _super.call(this);
        this.skinName = "GameLoadingSkin";
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickLoginBtn, this);
    }
    var d = __define,c=GameLoading,p=c.prototype;
    p.initLoading = function (str) {
        switch (str) {
            case "login":
                RES.loadGroup("login");
                break;
        }
    };
    p.setProgress = function (current, total) {
        this.loadingBar.maximum = total;
        this.loadingBar.value = current;
    };
    p.onClickLoginBtn = function () {
        MixGame.EgretOpenLogin.login();
    };
    return GameLoading;
})(eui.Component);
egret.registerClass(GameLoading,'GameLoading');
