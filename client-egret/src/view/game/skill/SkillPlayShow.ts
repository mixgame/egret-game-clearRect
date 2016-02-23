class SkillPlayShow extends eui.Component{
    public constructor(){
        super();
    }

    public skillBtn_1:SkillBtn;
    public skillBtn_2:SkillBtn;
    public skillBtn_3:SkillBtn;
    public skillBtn_4:SkillBtn;
    public skillBtn_5:SkillBtn;

    public initSkillPlayShow(){
        this.skillBtn_1.initPlaySkillBtn(1);
        this.skillBtn_2.initPlaySkillBtn(2);
        this.skillBtn_3.initPlaySkillBtn(3);
        this.skillBtn_4.initPlaySkillBtn(4);
        this.skillBtn_5.initPlaySkillBtn(5);
    }
}