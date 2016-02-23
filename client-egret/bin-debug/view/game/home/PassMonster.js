var PassMonster = (function (_super) {
    __extends(PassMonster, _super);
    function PassMonster(id) {
        _super.call(this);
        this.bossId = id;
        this.skinName = "PassMonsterSkin";
        this.bossData = new GameScript.Boss["boss_" + id]();
        this.icon = this.bossData.bossImg;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    var d = __define,c=PassMonster,p=c.prototype;
    p.onTouch = function () {
    };
    p.initMonster = function () {
        if (GameView.self.gameHomeMain.playerDataShow.starMax >= this.bossData.unlockMin) {
            this.bgImg.source = "ui_starOneBg_0";
            this.unlock.visible = false;
        }
        else {
            this.bgImg.source = "ui_starOneBg_1";
            this.unlock.visible = true;
            this.unlockBit.text = this.bossData.unlockMin + "";
        }
    };
    PassMonster.Boss = [];
    return PassMonster;
})(eui.Button);
egret.registerClass(PassMonster,'PassMonster');
