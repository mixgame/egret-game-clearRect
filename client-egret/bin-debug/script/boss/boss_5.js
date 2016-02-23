var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_5 = (function (_super) {
            __extends(boss_5, _super);
            function boss_5() {
                _super.call(this, 5);
            }
            var d = __define,c=boss_5,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 48;
            };
            return boss_5;
        })(GameScript.Boss.BossBase);
        Boss.boss_5 = boss_5;
        egret.registerClass(boss_5,'GameScript.Boss.boss_5');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
