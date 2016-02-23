var GameScript;
(function (GameScript) {
    var Pass;
    (function (Pass) {
        var PassBase = (function () {
            function PassBase(id) {
                this.passId = id;
                GameScript.Pass["pass_" + id].data = this;
                this.initPass();
            }
            var d = __define,c=PassBase,p=c.prototype;
            p.initPass = function () {
            };
            return PassBase;
        })();
        Pass.PassBase = PassBase;
        egret.registerClass(PassBase,'GameScript.Pass.PassBase');
    })(Pass = GameScript.Pass || (GameScript.Pass = {}));
})(GameScript || (GameScript = {}));
