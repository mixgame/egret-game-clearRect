var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_11 = (function (_super) {
            __extends(boss_11, _super);
            function boss_11() {
                _super.call(this, 11);
            }
            var d = __define,c=boss_11,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 108;
            };
            return boss_11;
        })(GameScript.Boss.BossBase);
        Boss.boss_11 = boss_11;
        egret.registerClass(boss_11,'GameScript.Boss.boss_11');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
