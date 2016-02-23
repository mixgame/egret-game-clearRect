var PlayerDataShow = (function (_super) {
    __extends(PlayerDataShow, _super);
    function PlayerDataShow() {
        _super.call(this);
        this.starMax = 0;
        this.skinName = "PlayerDataShowSkin";
        //this.userIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickUserIcon,this);
        this.dimIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickDimIcon, this);
    }
    var d = __define,c=PlayerDataShow,p=c.prototype;
    p.initPlayerDataShow = function () {
        this.goldBit.text = MixGameUser.Info.getGold() + "";
        this.dimBit.text = MixGameUser.Info.getDim() + "";
        var passArr = MixGameUser.Pass.getAllPassInfo();
        for (var i = 0; i < passArr.length; i++) {
            this.starMax += passArr[i].star;
        }
        this.starBit.text = this.starMax + "";
    };
    p.onClickUserIcon = function () {
        Main.self.UserLoginOut();
    };
    p.onClickDimIcon = function () {
        GameView.self.openDimShop();
    };
    return PlayerDataShow;
})(eui.Component);
egret.registerClass(PlayerDataShow,'PlayerDataShow');
