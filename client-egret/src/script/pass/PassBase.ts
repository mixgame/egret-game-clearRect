module GameScript.Pass {
    export class PassBase {
        public passId:number;
        public starArr:Array<Array<StarOneLoadInfo>>;
        public taskArr:Array<TaskOneLoadInfo>; //必须4个 没有任务设置task_type为-1
        public pointArr:Array<number>; // [1星分值，2星分值，3星分值，满格分值]
        public taskStep:number;

        public static data:GameScript.Pass.PassBase;
        public constructor(id:number){
            this.passId = id;
            GameScript.Pass["pass_"+id].data = this;
            this.initPass();
        }

        public initPass(){

        }
    }
}