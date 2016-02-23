var PointPlayShow = (function (_super) {
    __extends(PointPlayShow, _super);
    function PointPlayShow() {
        _super.call(this);
        this.pointData = {};
    }
    var d = __define,c=PointPlayShow,p=c.prototype;
    p.initPointData = function () {
        if (!this.pointData) {
            this.pointData = {};
        }
        this.pointData.clear = 0;
        this.pointData.clearOnce = 0;
        this.pointData.combo = 0;
        this.pointData.comboMax = 0;
        this.pointData.point = 0;
        this.pointData.pointTask_Max = 0;
        this.pointData.pointTask_1 = 0;
        this.pointData.pointTask_2 = 0;
        this.pointData.pointTask_3 = 0;
    };
    p.initPointPlayShow = function (point) {
        this.initPointData();
        this.pointData.pointTask_1 = point[0];
        this.pointData.pointTask_2 = point[1];
        this.pointData.pointTask_3 = point[2];
        this.pointData.pointTask_Max = point[3];
        this.pointBar.width = 0;
        this.point.text = 0 + "";
        this.img_1.x = (point[0] / point[2]) * 300;
        this.img_2.x = (point[1] / point[2]) * 300;
        this.img_3.x = 300;
        this.img_1.source = "ui_pass_unstarIcon";
        this.img_2.source = "ui_pass_unstarIcon";
        this.img_3.source = "ui_pass_unstarIcon";
    };
    p.addPointForClearStar = function (star) {
        if (star.typeId === 0) {
            this.pointData.point += 10;
        }
        this.updatePointBar();
        this.updatePointTaskImg();
    };
    p.updatePointBar = function () {
        //分数条计算
        if (this.pointData.point > this.pointData.pointTask_Max) {
            //超过当前最高限制分
            this.pointBar.width = 465;
        }
        else if (this.pointData.point > this.pointData.pointTask_3) {
            //超过3星分数
            var num = this.pointData.point - this.pointData.pointTask_3;
            this.pointBar.width = 300 + Math.floor(num / (this.pointData.pointTask_Max - this.pointData.pointTask_3) * (465 - 300));
        }
        else {
            //3星分数以下
            this.pointBar.width = Math.floor(this.pointData.point / this.pointData.pointTask_3 * 300);
        }
        this.point.text = this.pointData.point + "";
    };
    p.updatePointTaskImg = function () {
        if (this.pointData.point >= this.pointData.pointTask_1) {
            this.img_1.source = "ui_pass_starIcon";
            this.pointData.star = 1;
        }
        if (this.pointData.point >= this.pointData.pointTask_2) {
            this.img_2.source = "ui_pass_starIcon";
            this.pointData.star = 2;
        }
        if (this.pointData.point >= this.pointData.pointTask_3) {
            this.img_3.source = "ui_pass_starIcon";
            this.pointData.star = 3;
        }
    };
    p.updatePointCombo = function (clearNum) {
        this.pointData.combo++;
        if (this.pointData.combo > this.pointData.comboMax) {
            this.pointData.comboMax = this.pointData.combo;
        }
        this.pointData.clear += clearNum;
        this.pointData.clearOnce += clearNum;
    };
    p.comboToZero = function () {
        //根据本轮 消除的数量和连击展示
        var index = (this.pointData.combo - 1) * 5 + this.pointData.clearOnce;
        console.log("本轮消除评分：" + index);
        if (index >= 10 && index < 20) {
        }
        else if (index >= 20 && index < 50) {
        }
        else if (index >= 50) {
        }
        //连击结束 清零
        this.pointData.combo = 0;
        this.pointData.clearOnce = 0;
    };
    return PointPlayShow;
})(eui.Component);
egret.registerClass(PointPlayShow,'PointPlayShow');
