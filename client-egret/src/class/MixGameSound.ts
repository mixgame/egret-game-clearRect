/**
 *
 * @author 
 *
 */
class MixGameSound {
	static self:MixGameSound;
	public Bgm:egret.Sound = new egret.Sound();
	public BgmChannel:egret.SoundChannel;
	public StarEff_click:egret.Sound = new egret.Sound();
	public StarEff_clear:egret.Sound = new egret.Sound();
	public StarEff_drop:egret.Sound = new egret.Sound();
	public StarEff_step:egret.Sound = new egret.Sound();
	public constructor() {
		MixGameSound.self = this;
		this.initSound();
	}

	private initSound(){
		this.Bgm.load("resource/sound/fever_bgm.mp3");
		this.Bgm.type = egret.Sound.MUSIC;
		this.Bgm.addEventListener(egret.Event.COMPLETE,function(){
			this.BgmChannel = this.Bgm.play(0,-1);
		},this);


		this.StarEff_click.load("resource/sound/button_click.mp3");
		this.StarEff_clear.load("resource/sound/booster_equip.mp3");
		this.StarEff_drop.load("resource/sound/block_down.mp3");
		this.StarEff_step.load("resource/sound/heart_send.mp3");
	}

	public playEffSound(type:string){
		if(!this._allSoundSwitch){
			return;
		}

		this["StarEff_"+type].play(0,1);
	}

	private _allSoundSwitch:boolean;
	public set allSoundSwitch(isOn:boolean){
		this._allSoundSwitch = isOn;
		if(isOn){
			this.BgmChannel.volume = 1;
		}else{
			this.BgmChannel.volume = 0;
		}
	}

	public get allSoundSwitch():boolean{
		return this._allSoundSwitch;
	}
}
