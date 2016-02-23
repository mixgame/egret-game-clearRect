var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_1 = (function (_super) {
            __extends(boss_1, _super);
            function boss_1() {
                _super.call(this, 1);
            }
            var d = __define,c=boss_1,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 3;
            };
            return boss_1;
        })(GameScript.Boss.BossBase);
        Boss.boss_1 = boss_1;
        egret.registerClass(boss_1,'GameScript.Boss.boss_1');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
