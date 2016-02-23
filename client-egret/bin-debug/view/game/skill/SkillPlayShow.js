var SkillPlayShow = (function (_super) {
    __extends(SkillPlayShow, _super);
    function SkillPlayShow() {
        _super.call(this);
    }
    var d = __define,c=SkillPlayShow,p=c.prototype;
    p.initSkillPlayShow = function () {
        this.skillBtn_1.initPlaySkillBtn(1);
        this.skillBtn_2.initPlaySkillBtn(2);
        this.skillBtn_3.initPlaySkillBtn(3);
        this.skillBtn_4.initPlaySkillBtn(4);
        this.skillBtn_5.initPlaySkillBtn(5);
    };
    return SkillPlayShow;
})(eui.Component);
egret.registerClass(SkillPlayShow,'SkillPlayShow');
