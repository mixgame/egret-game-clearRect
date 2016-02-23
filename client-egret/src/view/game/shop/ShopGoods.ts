class ShopGoods extends eui.Component{
    public constructor(){
        super();
        this.skinName = "ShopGoodsSkin";
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchShopGoods,this);
    }

    public buyBtn:eui.Button;
    private touchShopGoods(){
        console.log("点击了我");
    }
}