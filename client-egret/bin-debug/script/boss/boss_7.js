var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_7 = (function (_super) {
            __extends(boss_7, _super);
            function boss_7() {
                _super.call(this, 7);
            }
            var d = __define,c=boss_7,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 68;
            };
            return boss_7;
        })(GameScript.Boss.BossBase);
        Boss.boss_7 = boss_7;
        egret.registerClass(boss_7,'GameScript.Boss.boss_7');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
