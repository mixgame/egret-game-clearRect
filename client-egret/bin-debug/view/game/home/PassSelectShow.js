/**
 *
 * @author
 *
 */
var PassSelectShow = (function (_super) {
    __extends(PassSelectShow, _super);
    function PassSelectShow() {
        _super.call(this);
    }
    var d = __define,c=PassSelectShow,p=c.prototype;
    p.loadAllPassInfo = function () {
        MixGameUser.Pass.nowPassMax = MixGameUser.Pass.getAllPassInfo().length;
        //创建boss关卡
        if (PassMonster.Boss.length < 1) {
            var index = Math.floor(GameConfig.Pass.PASS_MAX_INDEX / 5);
            for (var i = 0; i < index; i++) {
                var boss = new PassMonster(i + 1);
                PassMonster.Boss.push(boss);
            }
        }
        //[得到的星星数，最高得分];
        this.initPassInfoData();
        this.passList.dataProvider = this.passData;
        this.passListScroll.viewport.scrollV = (this.passData.length - MixGameUser.Pass.nowPassMax) * 40 - Main.self.stage.stageHeight + 240;
    };
    p.initPassInfoData = function () {
        //todo 读取玩家关卡数据
        var playPassInfo = MixGameUser.Pass.getAllPassInfo();
        var infoArr = [];
        for (var i = GameConfig.Pass.PASS_MAX_INDEX - 1; i >= 0; i--) {
            var info = {
                id: 0, star: 0, point: 0
            };
            if (i <= playPassInfo.length - 1) {
                infoArr.push(playPassInfo[i]);
            }
            else {
                info.id = i + 1;
                info.star = 0;
                info.point = 0;
                infoArr.push(info);
            }
        }
        this.passData = new eui.ArrayCollection(infoArr);
    };
    p.getPassData = function (passId) {
        var data;
        if (passId > GameConfig.Pass.PASS_MAX_INDEX) {
            egret.error("传入关卡id错误，超过最大关卡数");
            return;
        }
        var id = this.passData.length - passId;
        data = this.passData.getItemAt(id);
        return data;
    };
    return PassSelectShow;
})(eui.Component);
egret.registerClass(PassSelectShow,'PassSelectShow');
