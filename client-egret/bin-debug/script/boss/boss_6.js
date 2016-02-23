var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_6 = (function (_super) {
            __extends(boss_6, _super);
            function boss_6() {
                _super.call(this, 6);
            }
            var d = __define,c=boss_6,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 58;
            };
            return boss_6;
        })(GameScript.Boss.BossBase);
        Boss.boss_6 = boss_6;
        egret.registerClass(boss_6,'GameScript.Boss.boss_6');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
