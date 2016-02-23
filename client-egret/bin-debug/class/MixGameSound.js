/**
 *
 * @author
 *
 */
var MixGameSound = (function () {
    function MixGameSound() {
        this.Bgm = new egret.Sound();
        this.StarEff_click = new egret.Sound();
        this.StarEff_clear = new egret.Sound();
        this.StarEff_drop = new egret.Sound();
        this.StarEff_step = new egret.Sound();
        MixGameSound.self = this;
        this.initSound();
    }
    var d = __define,c=MixGameSound,p=c.prototype;
    p.initSound = function () {
        this.Bgm.load("resource/sound/fever_bgm.mp3");
        this.Bgm.type = egret.Sound.MUSIC;
        this.Bgm.addEventListener(egret.Event.COMPLETE, function () {
            this.BgmChannel = this.Bgm.play(0, -1);
        }, this);
        this.StarEff_click.load("resource/sound/button_click.mp3");
        this.StarEff_clear.load("resource/sound/booster_equip.mp3");
        this.StarEff_drop.load("resource/sound/block_down.mp3");
        this.StarEff_step.load("resource/sound/heart_send.mp3");
    };
    p.playEffSound = function (type) {
        if (!this._allSoundSwitch) {
            return;
        }
        this["StarEff_" + type].play(0, 1);
    };
    d(p, "allSoundSwitch"
        ,function () {
            return this._allSoundSwitch;
        }
        ,function (isOn) {
            this._allSoundSwitch = isOn;
            if (isOn) {
                this.BgmChannel.volume = 1;
            }
            else {
                this.BgmChannel.volume = 0;
            }
        }
    );
    return MixGameSound;
})();
egret.registerClass(MixGameSound,'MixGameSound');
