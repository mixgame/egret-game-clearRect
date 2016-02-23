var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_2 = (function (_super) {
            __extends(boss_2, _super);
            function boss_2() {
                _super.call(this, 2);
            }
            var d = __define,c=boss_2,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 18;
            };
            return boss_2;
        })(GameScript.Boss.BossBase);
        Boss.boss_2 = boss_2;
        egret.registerClass(boss_2,'GameScript.Boss.boss_2');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
