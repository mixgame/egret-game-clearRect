var GameEff = (function (_super) {
    __extends(GameEff, _super);
    function GameEff() {
        _super.call(this);
        this.effArr = [];
        this.starLayer = new eui.Group();
        this.pointLayer = new eui.Group();
        this.top = 0;
        this.left = 0;
        this.right = 0;
        this.bottom = 0;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.starLayer.width = this.width;
        this.starLayer.height = this.height;
        this.pointLayer.width = this.width;
        this.pointLayer.height = this.height;
        this.addChild(this.starLayer);
        this.addChild(this.pointLayer);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=GameEff,p=c.prototype;
    p.addToStage = function () {
        console.log("特效播放层 被添加到舞台");
        this.starLayer.removeChildren();
        this.pointLayer.removeChildren();
    };
    p.getEff = function (star) {
        if (this.effArr.length < 1) {
            var img = new eui.Image();
        }
        else {
            var img = this.effArr.shift();
        }
        egret.Tween.removeTweens(img);
        img.rotation = 0;
        img.source = GameConfig.StarOneImg.getImg([star.typeId, star.colorId]);
        img.x = star.clearPosPoint.x;
        img.y = star.clearPosPoint.y;
        img.width = star.starImg.width;
        img.height = star.starImg.height;
        img.scaleX = star.starImg.scaleX;
        img.scaleY = star.starImg.scaleY;
        img.anchorOffsetX = 0;
        img.anchorOffsetY = 0;
        //console.log("get eff len",this.effArr.length);
        return img;
    };
    p.reEff = function (img) {
        //img.source = "";
        //img.scaleX = img.scaleY = 1;
        this.effArr.push(img);
        this.starLayer.removeChild(img);
        //console.log("re eff len",this.effArr.length);
    };
    /*
        特效名 舞台x坐标 舞台y坐标
     */
    p.playEffForName = function (effName, star, toPoint) {
        switch (effName) {
            case GameConfig.EffName.CLEAR_STAR_ON_TASK:
                var img = this.getEff(star);
                this.starLayer.addChild(img);
                //var line:number = ((img.x-toPoint.x)^2+(img.y-toPoint.y)^2)^0.5;
                var time = star.posY * 50 + 300;
                egret.Tween.get(img).to({ x: toPoint.x, y: toPoint.y }, time).call(function () {
                    this.reEff(img);
                }, this);
                break;
            case GameConfig.EffName.CLEAR_STAR_NOT_TASK:
                for (var i = 0; i < 3; i++) {
                    var img = this.getEff(star);
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    img.x += img.width / 2 * img.scaleX;
                    img.y += img.height / 2 * img.scaleY;
                    img.scaleX *= 0.5;
                    img.scaleY *= 0.5;
                    this.starLayer.addChild(img);
                    this.playStarToBorder(img, true);
                }
                break;
        }
    };
    p.playStarToBorder = function (img, isFir) {
        if (isFir) {
            egret.Tween.get(img, { loop: true })
                .to({ rotation: 180 }, 100)
                .to({ rotation: 360 }, 100)
                .call(function () {
                img.rotation = 0;
            }, this);
        }
        var toX;
        var toY;
        var toBor = MixGame.getRandom(1, 4);
        if (toBor === 1) {
            toX = MixGame.getRandom(0, this.width);
            toY = -40;
        }
        else if (toBor === 2) {
            toX = MixGame.getRandom(0, this.width);
            toY = this.height + 40;
        }
        else if (toBor === 3) {
            toX = -40;
            toY = MixGame.getRandom(0, this.height);
        }
        else if (toBor === 4) {
            toX = this.width + 40;
            toY = MixGame.getRandom(0, this.height);
        }
        var time = MixGame.getRandom(3, 5) * 200 + 200;
        egret.Tween.get(img).to({ x: toX, y: toY }, time).call(function () {
            var rePlay = MixGame.getRandom(1, 6);
            if (isFir && rePlay < 2) {
                this.playStarToBorder(img, false);
            }
            else {
                this.reEff(img);
            }
        }, this);
    };
    return GameEff;
})(eui.Component);
egret.registerClass(GameEff,'GameEff');
