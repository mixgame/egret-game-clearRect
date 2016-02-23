/**
 *
 * @author
 *
 */
var PassClickBtn = (function (_super) {
    __extends(PassClickBtn, _super);
    function PassClickBtn() {
        _super.call(this);
        this.isCanClick = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }
    var d = __define,c=PassClickBtn,p=c.prototype;
    p.initBtn = function (data) {
        this.data = data;
        this.passIndex.text = this.data.id + "";
        if (this.data.id - 1 > MixGameUser.Pass.nowPassMax) {
            this.clickBg.source = "ui_starOneBg_1";
            this.star_1.visible = false;
            this.star_2.visible = false;
            this.star_3.visible = false;
            this.isCanClick = false;
        }
        else {
            this.clickBg.source = "ui_starOneBg_0";
            this.star_1.visible = true;
            this.star_2.visible = true;
            this.star_3.visible = true;
            this.isCanClick = true;
            this.setStarNumber();
        }
    };
    p.onClick = function () {
        if (this.isCanClick) {
            GameView.self.showPassStarMain(this.data);
        }
        else {
            console.log("还不可以进行此关卡");
        }
    };
    p.setStarNumber = function () {
        var starImg = GameConfig.Pass.STAR_IMG;
        var unStarImg = GameConfig.Pass.UN_STAR_IMG;
        if (this.data.star > 0) {
            this.star_1.source = starImg;
        }
        else {
            this.star_1.source = unStarImg;
        }
        if (this.data.star > 1) {
            this.star_2.source = starImg;
        }
        else {
            this.star_2.source = unStarImg;
        }
        if (this.data.star > 2) {
            this.star_3.source = starImg;
        }
        else {
            this.star_3.source = unStarImg;
        }
    };
    return PassClickBtn;
})(eui.Button);
egret.registerClass(PassClickBtn,'PassClickBtn');
