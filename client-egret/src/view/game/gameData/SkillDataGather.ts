interface SkillDataObj {
    skillId:number;
    skillName:string; //技能名字
    skillLv:number;   //技能等级
    skillMp:number;   //技能消耗
    skillCd:number;   //冷却回合
    skillAddStep:number;  //增加的步数
    skillFunc:Function; //技能的调用方法
}
class SkillDataGather {
    //读取玩家的技能数据
    public static loadPlayerSkillData(){
        SkillDataGather.self.skill_1_data = <SkillDataObj>{};
        SkillDataGather.self.skill_2_data = <SkillDataObj>{};
        SkillDataGather.self.skill_3_data = <SkillDataObj>{};
        SkillDataGather.self.skill_4_data = <SkillDataObj>{};
        SkillDataGather.self.skill_5_data = <SkillDataObj>{};

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
    }

    //存储到玩家数据
    public static setPlayerSkillData(obj:SkillDataObj){

    }

    public static self:SkillDataGather;
    public constructor(){
        SkillDataGather.self = this;
        SkillDataGather.loadPlayerSkillData();
    }
    /*
        技能数据
     */
    //交换
    public skill_1_data:SkillDataObj;
    public skill_1_config(){
        this.skill_1_data.skillName = "相邻交换";
        this.skill_1_data.skillId = 1;
        this.skill_1_data.skillMp = 10;
        this.skill_1_data.skillCd = 5;
        this.skill_1_data.skillAddStep = 0;
        this.skill_1_data.skillFunc = function(){
            GameView.self.gamePlayMain.useSkill(GameConfig.StarViewState.CHANGE_POS);
        }
    }

    //变色
    public skill_2_data:SkillDataObj;
    public skill_2_config(){
        this.skill_2_data.skillName = "变色";
        this.skill_2_data.skillId = 2;
        this.skill_2_data.skillMp = 10;
        this.skill_2_data.skillCd = 5;
        this.skill_2_data.skillAddStep = 0;
        this.skill_2_data.skillFunc = function(){
            GameView.self.gamePlayMain.useSkill(GameConfig.StarViewState.CHANGE_COLOR);
        }
    }

    //重新排列
    public skill_3_data:SkillDataObj;
    public skill_3_config(){
        this.skill_3_data.skillName = "重新排列";
        this.skill_3_data.skillId = 3;
        this.skill_3_data.skillMp = 10;
        this.skill_3_data.skillCd = 5;
        this.skill_3_data.skillAddStep = 0;
        this.skill_3_data.skillFunc = function(){
            GameView.self.gamePlayMain.useSkill(GameConfig.StarViewState.AGAIN_ARRAY);
        }
    }

    //增加步数
    public skill_4_data:SkillDataObj;
    public skill_4_config(){
        this.skill_4_data.skillName = "增加步数";
        this.skill_4_data.skillId = 4;
        this.skill_4_data.skillMp = 20;
        this.skill_4_data.skillCd = 5;
        this.skill_4_data.skillAddStep = 5;
        this.skill_4_data.skillFunc = function(){
            console.log("点击了我", this);

        }
    }

    //重置冷却
    public skill_5_data:SkillDataObj;
    public skill_5_config(){
        this.skill_5_data.skillName = "重置冷却";
        this.skill_5_data.skillId = 5;
        this.skill_5_data.skillMp = 10;
        this.skill_5_data.skillCd = 5;
        this.skill_5_data.skillAddStep = 0;
        this.skill_5_data.skillFunc = function(){
           GameView.self.showPassStarMain();
        }
    }
}