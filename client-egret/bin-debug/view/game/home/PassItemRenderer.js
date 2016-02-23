var PassItemRenderer = (function (_super) {
    __extends(PassItemRenderer, _super);
    function PassItemRenderer() {
        _super.call(this);
        this.skinName = "PassItemRendererSkin";
    }
    var d = __define,c=PassItemRenderer,p=c.prototype;
    p.dataChanged = function () {
        var index = (this.data.id + 4) % 10;
        this.clickBtn.x = Math.abs(index - 5) * 60;
        this.clickBtn.initBtn(this.data);
        //新建boss关
        if (this.data.id % 5 === 1 && this.data.id !== 1) {
            var bossId = (this.data.id - 1) / 5;
            var boss = PassMonster.Boss[bossId - 1];
            this.addChild(boss);
            boss.verticalCenter = 0;
            if (bossId % 2 === 0) {
                boss.horizontalCenter = 80;
            }
            else {
                boss.horizontalCenter = -110;
            }
            boss.initMonster();
        }
    };
    return PassItemRenderer;
})(eui.ItemRenderer);
egret.registerClass(PassItemRenderer,'PassItemRenderer');
