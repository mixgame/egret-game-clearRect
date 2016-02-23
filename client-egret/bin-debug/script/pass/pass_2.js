var GameScript;
(function (GameScript) {
    var Pass;
    (function (Pass) {
        var pass_2 = (function (_super) {
            __extends(pass_2, _super);
            function pass_2() {
                _super.call(this, 2);
            }
            var d = __define,c=pass_2,p=c.prototype;
            p.initPass = function () {
                var starInfo = {
                    typeId: 0,
                    colorId: -1
                };
                var starInfo1 = {
                    typeId: -1,
                    colorId: -1
                };
                var starInfo3 = {
                    typeId: 3,
                    colorId: 2
                };
                var starInfo4 = {
                    typeId: 3,
                    colorId: 3
                };
                this.starArr = [
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo3, starInfo3, starInfo4, starInfo4, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo3, starInfo1, starInfo1, starInfo4, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo4, starInfo1, starInfo1, starInfo3, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo4, starInfo4, starInfo3, starInfo3, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                ];
                //任务
                this.taskArr = [];
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":99,"task_star":{"typeId":0,"colorId":1}}'));
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":88,"task_star":{"typeId":0,"colorId":2}}'));
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":77,"task_star":{"typeId":0,"colorId":3}}'));
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":66,"task_star":{"typeId":0,"colorId":4}}'));
                //过关分数
                this.pointArr = [580, 880, 1580, 5000];
                //过关步数
                this.taskStep = 42;
            };
            return pass_2;
        })(GameScript.Pass.PassBase);
        Pass.pass_2 = pass_2;
        egret.registerClass(pass_2,'GameScript.Pass.pass_2');
    })(Pass = GameScript.Pass || (GameScript.Pass = {}));
})(GameScript || (GameScript = {}));
