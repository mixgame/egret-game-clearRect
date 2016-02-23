module GameScript.Boss {
    /*
    boss的通用类
     */
    export class BossBase {
        public bossId:number;
        public bossImg:string;
        public bossName:string;
        public bossInfo:string;
        public unlockMin:number;

        public static data:GameScript.Boss.BossBase;
        public constructor(id:number){
            this.bossId = id;
            GameScript.Boss["boss_"+id].data = this;
            this.initBoss();
        }

        public initBoss(){
        }
    }
}