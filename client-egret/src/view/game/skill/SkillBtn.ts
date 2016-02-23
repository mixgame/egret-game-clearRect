class SkillBtn extends eui.Button{
    public constructor(){
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickSkillBtn,this);
    }

    private clickSkillBtn(){
        this.skillData.skillFunc();
    }

    public skillId:number;
    public skillData:SkillDataObj = <SkillDataObj>{};

    public initPlaySkillBtn(id:number){
        this.skillId = id;
        var obj:SkillDataObj = SkillDataGather.self["skill_"+id+"_data"];
        for(var i in obj){
            this.skillData[i] = obj[i];
        }

        this.label = this.skillData.skillName;
    }
}