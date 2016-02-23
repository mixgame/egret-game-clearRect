var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_8 = (function (_super) {
            __extends(boss_8, _super);
            function boss_8() {
                _super.call(this, 8);
            }
            var d = __define,c=boss_8,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 78;
            };
            return boss_8;
        })(GameScript.Boss.BossBase);
        Boss.boss_8 = boss_8;
        egret.registerClass(boss_8,'GameScript.Boss.boss_8');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
