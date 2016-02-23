var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_10 = (function (_super) {
            __extends(boss_10, _super);
            function boss_10() {
                _super.call(this, 10);
            }
            var d = __define,c=boss_10,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 98;
            };
            return boss_10;
        })(GameScript.Boss.BossBase);
        Boss.boss_10 = boss_10;
        egret.registerClass(boss_10,'GameScript.Boss.boss_10');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
