var MixGameUser;
(function (MixGameUser) {
    //关卡信息
    var Pass = (function () {
        function Pass() {
        }
        var d = __define,c=Pass,p=c.prototype;
        Pass.getAllPassInfo = function () {
            return MixGame.User.data.get('passInfo');
        };
        Pass.getOnePassInfoForId = function (id) {
            var arr = MixGame.User.data.get('passInfo');
            return arr[id - 1];
        };
        Pass.setOnePassInfo = function (obj) {
            var arr = MixGame.User.data.get('passInfo');
            if (arr[obj.id - 1]) {
                arr[obj.id - 1].star = obj.star;
                arr[obj.id - 1].point = obj.point;
            }
            else {
                arr[obj.id - 1] = {
                    id: obj.id,
                    star: obj.star,
                    point: obj.point
                };
            }
            MixGame.User.data.set('passInfo', arr);
            MixGame.User.data.save();
            console.log("save关卡", obj);
        };
        Pass.nowPassMax = 0;
        return Pass;
    })();
    MixGameUser.Pass = Pass;
    egret.registerClass(Pass,'MixGameUser.Pass');
    //玩家信息
    var Info = (function () {
        function Info() {
        }
        var d = __define,c=Info,p=c.prototype;
        Info.getGold = function () {
            return MixGame.User.data.get('gold');
        };
        Info.getDim = function () {
            return MixGame.User.data.get('dim');
        };
        Info.addGold = function (add) {
            MixGame.User.data.increment('gold', add);
            MixGame.User.data.save();
        };
        Info.addDim = function (add) {
            MixGame.User.data.increment('dim', add);
            MixGame.User.data.save();
        };
        return Info;
    })();
    MixGameUser.Info = Info;
    egret.registerClass(Info,'MixGameUser.Info');
})(MixGameUser || (MixGameUser = {}));
