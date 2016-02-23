var StarOneBase = (function (_super) {
    __extends(StarOneBase, _super);
    function StarOneBase() {
        _super.call(this);
        this.starId = null;
        this.posX = 0; //现在的横轴位置
        this.posY = 0; //现在的竖轴位置
    }
    var d = __define,c=StarOneBase,p=c.prototype;
    //根据情况 设置为不同的星星
    //空
    p.setTypeNull = function () {
    };
    p.setTypeStar = function () {
    };
    p.setTypeStone = function () {
    };
    return StarOneBase;
})(eui.Button);
egret.registerClass(StarOneBase,'StarOneBase');
