var GameScript;
(function (GameScript) {
    var Boss;
    (function (Boss) {
        /*
        boss的通用类
         */
        var BossBase = (function () {
            function BossBase(id) {
                this.bossId = id;
                GameScript.Boss["boss_" + id].data = this;
                this.initBoss();
            }
            var d = __define,c=BossBase,p=c.prototype;
            p.initBoss = function () {
            };
            return BossBase;
        })();
        Boss.BossBase = BossBase;
        egret.registerClass(BossBase,'GameScript.Boss.BossBase');
    })(Boss = GameScript.Boss || (GameScript.Boss = {}));
})(GameScript || (GameScript = {}));
