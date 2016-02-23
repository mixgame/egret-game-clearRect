module GameScript.Boss {
    export class boss_1 extends GameScript.Boss.BossBase {
        public constructor(){
            super(1);
        }

        public initBoss(){
            this.bossImg = "pass_monster_img_"+this.bossId;
            this.bossName = "剑刺虎";
            this.bossInfo = "草原萌虎";
            this.unlockMin = 3;
        }
    }
}