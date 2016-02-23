var SkillDataGather = (function () {
    function SkillDataGather() {
        SkillDataGather.self = this;
        SkillDataGather.loadPlayerSkillData();
    }
    var d = __define,c=SkillDataGather,p=c.prototype;
    //读取玩家的技能数据
    SkillDataGather.loadPlayerSkillData = function () {
        SkillDataGather.self.skill_1_data = {};
        SkillDataGather.self.skill_2_data = {};
        SkillDataGather.self.skill_3_data = {};
        SkillDataGather.self.skill_4_data = {};
        SkillDataGather.self.skill_5_data = {};
        SkillDataGather.self.skill_1_data.skillLv = 1;
        SkillDataGather.self.skill_2_data.skillLv = 1;
        SkillDataGather.self.skill_3_data.skillLv = 1;
        SkillDataGather.self.skill_4_data.skillLv = 1;
        SkillDataGather.self.skill_5_data.skillLv = 1;
        SkillDataGather.self.skill_1_config();
        SkillDataGather.self.skill_2_config();
        SkillDataGather.self.skill_3_config();
        SkillDataGather.self.skill_4_config();
        SkillDataGather.self.skill_5_config();
    };
    //存储到玩家数据
    SkillDataGather.setPlayerSkillData = function (obj) {
    };
    p.skill_1_config = function () {
        this.skill_1_data.skillName = "相邻交换";
        this.skill_1_data.skillId = 1;
        this.skill_1_data.skillMp = 10;
        this.skill_1_data.skillCd = 5;
        this.skill_1_data.skillAddStep = 0;
        this.skill_1_data.skillFunc = function () {
            GameView.self.gamePlayMain.useSkill(GameConfig.StarViewState.CHANGE_POS);
        };
    };
    p.skill_2_config = function () {
        this.skill_2_data.skillName = "变色";
        this.skill_2_data.skillId = 2;
        this.skill_2_data.skillMp = 10;
        this.skill_2_data.skillCd = 5;
        this.skill_2_data.skillAddStep = 0;
        this.skill_2_data.skillFunc = function () {
            GameView.self.gamePlayMain.useSkill(GameConfig.StarViewState.CHANGE_COLOR);
        };
    };
    p.skill_3_config = function () {
        this.skill_3_data.skillName = "重新排列";
        this.skill_3_data.skillId = 3;
        this.skill_3_data.skillMp = 10;
        this.skill_3_data.skillCd = 5;
        this.skill_3_data.skillAddStep = 0;
        this.skill_3_data.skillFunc = function () {
            GameView.self.gamePlayMain.useSkill(GameConfig.StarViewState.AGAIN_ARRAY);
        };
    };
    p.skill_4_config = function () {
        this.skill_4_data.skillName = "增加步数";
        this.skill_4_data.skillId = 4;
        this.skill_4_data.skillMp = 20;
        this.skill_4_data.skillCd = 5;
        this.skill_4_data.skillAddStep = 5;
        this.skill_4_data.skillFunc = function () {
            console.log("点击了我", this);
        };
    };
    p.skill_5_config = function () {
        this.skill_5_data.skillName = "重置冷却";
        this.skill_5_data.skillId = 5;
        this.skill_5_data.skillMp = 10;
        this.skill_5_data.skillCd = 5;
        this.skill_5_data.skillAddStep = 0;
        this.skill_5_data.skillFunc = function () {
            GameView.self.showPassStarMain();
        };
    };
    return SkillDataGather;
})();
egret.registerClass(SkillDataGather,'SkillDataGather');
