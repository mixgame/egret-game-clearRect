/*
 位置的表现类
 用于记录各位置不可变动的信息
 */
var PosOne = (function (_super) {
    __extends(PosOne, _super);
    function PosOne() {
        _super.call(this);
        this.posId = 0;
        this.scaleX = this.scaleY = 0.5;
    }
    var d = __define,c=PosOne,p=c.prototype;
    p.initPosForType = function (typeId, lv) {
    };
    return PosOne;
})(eui.Button);
egret.registerClass(PosOne,'PosOne');
