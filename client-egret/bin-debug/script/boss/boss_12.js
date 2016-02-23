var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_12 = (function (_super) {
            __extends(boss_12, _super);
            function boss_12() {
                _super.call(this, 12);
            }
            var d = __define,c=boss_12,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 118;
            };
            return boss_12;
        })(GameScript.Boss.BossBase);
        Boss.boss_12 = boss_12;
        egret.registerClass(boss_12,'GameScript.Boss.boss_12');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
