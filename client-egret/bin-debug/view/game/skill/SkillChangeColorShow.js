var SkillChangeColorShow = (function (_super) {
    __extends(SkillChangeColorShow, _super);
    function SkillChangeColorShow() {
        _super.call(this);
        this.skinName = "SkillChangeColorShowSkin";
        this.changeColor_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImg, this);
        this.changeColor_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImg, this);
        this.changeColor_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImg, this);
        this.changeColor_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImg, this);
    }
    var d = __define,c=SkillChangeColorShow,p=c.prototype;
    p.clickImg = function (event) {
        var colorId = 0;
        if (event.target.source === "star_monster_1") {
            colorId = 1;
        }
        else if (event.target.source === "star_monster_2") {
            colorId = 2;
        }
        else if (event.target.source === "star_monster_3") {
            colorId = 3;
        }
        else if (event.target.source === "star_monster_4") {
            colorId = 4;
        }
        else if (event.target.source === "star_monster_5") {
            colorId = 5;
        }
        StarView.self.changeColor(2, -1, colorId);
    };
    p.setImgColor = function (notId) {
        var arr = [];
        for (var i = 1; i < 6; i++) {
            if (i !== notId) {
                arr.push(i);
            }
        }
        this.changeColor_1.source = "star_monster_" + arr[0];
        this.changeColor_2.source = "star_monster_" + arr[1];
        this.changeColor_3.source = "star_monster_" + arr[2];
        this.changeColor_4.source = "star_monster_" + arr[3];
    };
    return SkillChangeColorShow;
})(eui.Component);
egret.registerClass(SkillChangeColorShow,'SkillChangeColorShow');
