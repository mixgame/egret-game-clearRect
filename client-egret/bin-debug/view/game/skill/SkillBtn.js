var SkillBtn = (function (_super) {
    __extends(SkillBtn, _super);
    function SkillBtn() {
        _super.call(this);
        this.skillData = {};
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkillBtn, this);
    }
    var d = __define,c=SkillBtn,p=c.prototype;
    p.clickSkillBtn = function () {
        this.skillData.skillFunc();
    };
    p.initPlaySkillBtn = function (id) {
        this.skillId = id;
        var obj = SkillDataGather.self["skill_" + id + "_data"];
        for (var i in obj) {
            this.skillData[i] = obj[i];
        }
        this.label = this.skillData.skillName;
    };
    return SkillBtn;
})(eui.Button);
egret.registerClass(SkillBtn,'SkillBtn');
