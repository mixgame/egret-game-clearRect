class ShopMain extends eui.Component{
    public constructor(){
        super();
        this.skinName = "DimShopMainSkin";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchCloseBtn,this);
    }

    public closeBtn:eui.Button;

    private touchCloseBtn(){
        GameView.self.closeDimShop();
    }
}