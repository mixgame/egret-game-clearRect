var ShopMain = (function (_super) {
    __extends(ShopMain, _super);
    function ShopMain() {
        _super.call(this);
        this.skinName = "DimShopMainSkin";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchCloseBtn, this);
    }
    var d = __define,c=ShopMain,p=c.prototype;
    p.touchCloseBtn = function () {
        GameView.self.closeDimShop();
    };
    return ShopMain;
})(eui.Component);
egret.registerClass(ShopMain,'ShopMain');
