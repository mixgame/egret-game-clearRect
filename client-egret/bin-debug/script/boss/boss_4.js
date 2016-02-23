var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        var boss_4 = (function (_super) {
            __extends(boss_4, _super);
            function boss_4() {
                _super.call(this, 4);
            }
            var d = __define,c=boss_4,p=c.prototype;
            p.initBoss = function () {
                this.bossImg = "pass_monster_img_" + this.bossId;
                this.bossName = "剑刺虎";
                this.bossInfo = "草原萌虎";
                this.unlockMin = 38;
            };
            return boss_4;
        })(GameScript.Boss.BossBase);
        Boss.boss_4 = boss_4;
        egret.registerClass(boss_4,'GameScript.Boss.boss_4');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
