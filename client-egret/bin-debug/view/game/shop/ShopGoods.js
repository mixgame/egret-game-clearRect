var ShopGoods = (function (_super) {
    __extends(ShopGoods, _super);
    function ShopGoods() {
        _super.call(this);
        this.skinName = "ShopGoodsSkin";
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShopGoods, this);
    }
    var d = __define,c=ShopGoods,p=c.prototype;
    p.touchShopGoods = function () {
        console.log("点击了我");
    };
    return ShopGoods;
})(eui.Component);
egret.registerClass(ShopGoods,'ShopGoods');
