module GameScript.Pass {
    export class pass_2 extends GameScript.Pass.PassBase {
        public constructor(){
            super(2);
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
                colorId:2
            };

            var starInfo4:StarOneLoadInfo = {
                typeId:3,
                colorId:3
            };

            this.starArr = [
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo3,starInfo3,starInfo4,starInfo4,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo3,starInfo1,starInfo1,starInfo4,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo4,starInfo1,starInfo1,starInfo3,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo4,starInfo4,starInfo3,starInfo3,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
                [starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo,starInfo],
            ];

            //任务
            this.taskArr = <Array<TaskOneLoadInfo>> [];
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":99,"task_star":{"typeId":0,"colorId":1}}'));
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":88,"task_star":{"typeId":0,"colorId":2}}'));
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":77,"task_star":{"typeId":0,"colorId":3}}'));
            this.taskArr.push(JSON.parse('{"task_type":0,"task_number":66,"task_star":{"typeId":0,"colorId":4}}'));

            //过关分数
            this.pointArr = [580,880,1580,5000];

            //过关步数
            this.taskStep = 42;
        }
    }
}