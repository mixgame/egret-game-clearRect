var GameConfig;
(function (GameConfig) {
    var StarOneImg = (function () {
        function StarOneImg() {
        }
        var d = __define,c=StarOneImg,p=c.prototype;
        StarOneImg.getImgForLoadInfo = function (info) {
            var colorStr = "";
            switch (info.typeId) {
                case GameConfig.StarType.NULL:
                    colorStr = "";
                    break;
                case GameConfig.StarType.STAR:
                    colorStr = "star_monster_" + info.colorId;
                    break;
                case GameConfig.StarType.STONE:
                    colorStr = "star_rect_" + info.colorId;
                    break;
            }
            return colorStr;
        };
        StarOneImg.getImg = function (arr) {
            var obj = {
                typeId: arr[0],
                colorId: arr[1]
            };
            return GameConfig.StarOneImg.getImgForLoadInfo(obj);
        };
        return StarOneImg;
    })();
    GameConfig.StarOneImg = StarOneImg;
    egret.registerClass(StarOneImg,'GameConfig.StarOneImg');
    var StarViewState = (function () {
        function StarViewState() {
        }
        var d = __define,c=StarViewState,p=c.prototype;
        StarViewState.START = -1; //游戏刚开始 检查阶段
        StarViewState.PLAY = 0;
        StarViewState.CHANGE_POS = 1;
        StarViewState.CHANGE_COLOR = 2;
        StarViewState.AGAIN_ARRAY = 3;
        return StarViewState;
    })();
    GameConfig.StarViewState = StarViewState;
    egret.registerClass(StarViewState,'GameConfig.StarViewState');
    var StarType = (function () {
        function StarType() {
        }
        var d = __define,c=StarType,p=c.prototype;
        StarType.NULL = -1;
        StarType.STAR = 0;
        StarType.STONE = 3;
        return StarType;
    })();
    GameConfig.StarType = StarType;
    egret.registerClass(StarType,'GameConfig.StarType');
    var Pass = (function () {
        function Pass() {
        }
        var d = __define,c=Pass,p=c.prototype;
        Pass.PASS_MAX_INDEX = 61;
        Pass.STAR_IMG = "ui_pass_starIcon";
        Pass.UN_STAR_IMG = "ui_pass_unstarIcon";
        return Pass;
    })();
    GameConfig.Pass = Pass;
    egret.registerClass(Pass,'GameConfig.Pass');
    var EffName = (function () {
        function EffName() {
        }
        var d = __define,c=EffName,p=c.prototype;
        EffName.CLEAR_STAR_ON_TASK = 0;
        EffName.CLEAR_STAR_NOT_TASK = 1;
        return EffName;
    })();
    GameConfig.EffName = EffName;
    egret.registerClass(EffName,'GameConfig.EffName');
})(GameConfig || (GameConfig = {}));
