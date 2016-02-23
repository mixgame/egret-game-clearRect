var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_9 = (function (_super) {
            __extends(boss_9, _super);
            function boss_9() {
                _super.call(this, 9);
            }
            var d = __define,c=boss_9,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 88;
            };
            return boss_9;
        })(GameScript.Boss.BossBase);
        Boss.boss_9 = boss_9;
        egret.registerClass(boss_9,'GameScript.Boss.boss_9');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
