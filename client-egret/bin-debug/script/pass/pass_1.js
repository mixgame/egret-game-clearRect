var GameScript;
(function (GameScript) {
    var Pass;
    (function (Pass) {
        var pass_1 = (function (_super) {
            __extends(pass_1, _super);
            function pass_1() {
                _super.call(this, 1);
            }
            var d = __define,c=pass_1,p=c.prototype;
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
                    colorId: -1
                };
                this.starArr = [
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo3, starInfo, starInfo, starInfo],
                    [starInfo3, starInfo, starInfo1, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo1, starInfo, starInfo, starInfo3, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo1, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                    [starInfo, starInfo, starInfo, starInfo3, starInfo, starInfo, starInfo, starInfo, starInfo, starInfo],
                ];
                //任务
                this.taskArr = [];
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":3,"task_star":{"typeId":0,"colorId":1}}'));
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":3,"task_star":{"typeId":0,"colorId":2}}'));
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":3,"task_star":{"typeId":0,"colorId":3}}'));
                this.taskArr.push(JSON.parse('{"task_type":0,"task_number":4,"task_star":{"typeId":0,"colorId":4}}'));
                //过关分数
                this.pointArr = [200, 300, 800, 5000];
                //过关步数
                this.taskStep = 25;
            };
            return pass_1;
        })(GameScript.Pass.PassBase);
        Pass.pass_1 = pass_1;
        egret.registerClass(pass_1,'GameScript.Pass.pass_1');
    })(Pass = GameScript.Pass || (GameScript.Pass = {}));
})(GameScript || (GameScript = {}));
