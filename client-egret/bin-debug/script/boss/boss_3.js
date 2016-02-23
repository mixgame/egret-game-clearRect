var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_3 = (function (_super) {
            __extends(boss_3, _super);
            function boss_3() {
                _super.call(this, 3);
            }
            var d = __define,c=boss_3,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 28;
            };
            return boss_3;
        })(GameScript.Boss.BossBase);
        Boss.boss_3 = boss_3;
        egret.registerClass(boss_3,'GameScript.Boss.boss_3');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
