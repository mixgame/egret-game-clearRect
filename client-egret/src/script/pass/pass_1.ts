module GameScript.Pass {
    export class pass_1 extends GameScript.Pass.PassBase {
        public constructor(){
            super(1);
        }

        public initPass(){
            var starInfo:StarOneLoadInfo = {
                typeId:0,
                colorId:-1
            };

            var starInfo1:StarOneLoadInfo = {
                typeId:-1,
                colorId:-1
            };

            var starInfo3:StarOneLoadInfo = {
                typeId:3,
                colorId:-1
            };

            this.starArr = [
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo3,starInfo,starInfo,starInfo],
                [starInfo3,starInfo,starInfo1,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo1,starInfo,starInfo,starInfo3,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo1,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo3,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
            ];

            //任务
            this.taskArr = <Array<TaskOneLoadInfo>> [];
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":3,"task_star":{"typeId":0,"colorId":1}}'));
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":3,"task_star":{"typeId":0,"colorId":2}}'));
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":3,"task_star":{"typeId":0,"colorId":3}}'));
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":4,"task_star":{"typeId":0,"colorId":4}}'));

            //过关分数
            this.pointArr = [200,300,800,5000];

            //过关步数
            this.taskStep = 25;
        }
    }
}