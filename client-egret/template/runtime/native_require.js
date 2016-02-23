
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/Tween/Tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/dcagent/dcagent.js",
	"libs/modules/leanCloud/leanCloud.js",
	"libs/modules/nest/nest.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/class/MixGame.js",
	"bin-debug/class/MixGameSound.js",
	"bin-debug/class/MixGameUser.js",
	"bin-debug/class/MixPlayerData.js",
	"bin-debug/Main.js",
	"bin-debug/script/boss/BossBase.js",
	"bin-debug/script/boss/boss_1.js",
	"bin-debug/script/boss/boss_10.js",
	"bin-debug/script/boss/boss_11.js",
	"bin-debug/script/boss/boss_12.js",
	"bin-debug/script/boss/boss_2.js",
	"bin-debug/script/boss/boss_3.js",
	"bin-debug/script/boss/boss_4.js",
	"bin-debug/script/boss/boss_5.js",
	"bin-debug/script/boss/boss_6.js",
	"bin-debug/script/boss/boss_7.js",
	"bin-debug/script/boss/boss_8.js",
	"bin-debug/script/boss/boss_9.js",
	"bin-debug/script/game_skill_1.js",
	"bin-debug/script/pass/PassBase.js",
	"bin-debug/script/pass/pass_1.js",
	"bin-debug/script/pass/pass_2.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/view/config/GameConfig.js",
	"bin-debug/view/game/fight/MonsterFightShow.js",
	"bin-debug/view/game/gameData/SkillDataGather.js",
	"bin-debug/view/game/GameEff.js",
	"bin-debug/view/game/GameLoading.js",
	"bin-debug/view/game/GameView.js",
	"bin-debug/view/game/home/GameHome.js",
	"bin-debug/view/game/home/PassClickBtn.js",
	"bin-debug/view/game/home/PassItemRenderer.js",
	"bin-debug/view/game/home/PassMonster.js",
	"bin-debug/view/game/home/PassSelectShow.js",
	"bin-debug/view/game/home/PassStarMain.js",
	"bin-debug/view/game/home/PlayerDataShow.js",
	"bin-debug/view/game/LeadView.js",
	"bin-debug/view/game/play/BalanceMain.js",
	"bin-debug/view/game/play/GamePlay.js",
	"bin-debug/view/game/play/PointPlayShow.js",
	"bin-debug/view/game/play/TaskOne.js",
	"bin-debug/view/game/play/TaskPlayShow.js",
	"bin-debug/view/game/shop/ShopGoods.js",
	"bin-debug/view/game/shop/ShopMain.js",
	"bin-debug/view/game/skill/SkillBtn.js",
	"bin-debug/view/game/skill/SkillChangeColorShow.js",
	"bin-debug/view/game/skill/SkillPlayShow.js",
	"bin-debug/view/star/PosOne.js",
	"bin-debug/view/star/StarOneBase.js",
	"bin-debug/view/star/StarOne.js",
	"bin-debug/view/star/StarView.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedWidth",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};