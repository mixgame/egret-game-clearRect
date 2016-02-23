/**
 *
 * @author 
 * 游戏视图
 *
 */
class GameView extends eui.Component{
	static self:GameView;
	public EffList:Array<eui.Image> = [];

	public gameHomeMain:GameHome;
	public gamePlayMain:GamePlay;
	public EffBox:GameEff;
	public passStartMain:PassStartMain;
	public dimShopMain:ShopMain;

	public constructor() {
    	super();
		GameView.self = this;
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
	}

	private nowSkinState:string = "";
	public getCurrentState():string{
		return this.nowSkinState;
	}

	private addToStage(){
		this.initLoadGameData();
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
	}

	/*
	 初始化游戏各项数据
	 */
	private initLoadGameData(){
		this.height = Main.self.stage.stageHeight;
		var skillData:SkillDataGather = new SkillDataGather();
		this.gameHomeMain = new GameHome();
		this.gamePlayMain = new GamePlay();

		this.gameHomeMain.height = this.height;
		this.gamePlayMain.height = this.height;

		this.EffBox = new GameEff();

		this.passStartMain = new PassStartMain();

		this.dimShopMain = new ShopMain();
		this.dimShopMain.skinName = "DimShopMainSkin";
		this.dimShopMain.horizontalCenter = 0;
		this.dimShopMain.verticalCenter = 0;
	}


	public gotoHome(){
		this.passStartMain.visible = false;
		this.closeDimShop();

		if(this.getChildIndex(this.EffBox) >= 0){
			this.removeChild(this.EffBox);
		}

		if(this.getChildIndex(this.gameHomeMain) < 0){
			this.addChildAt(this.gameHomeMain,0);
			this.gameHomeMain.initGameHome();
		}
		if(this.getChildIndex(this.gamePlayMain) >= 0){
			this.removeChild(this.gamePlayMain);
		}
	}

	public gotoPlay(passId:number){
		this.passStartMain.visible = false;
		this.closeDimShop();

		if(this.getChildIndex(this.gamePlayMain) < 0){
			this.addChildAt(this.gamePlayMain,0);
		}
		if(this.getChildIndex(this.gameHomeMain) >= 0){
			this.removeChild(this.gameHomeMain);
		}

		if(this.getChildIndex(this.EffBox) < 0){
			this.addChild(this.EffBox);
		}

		this.gamePlayMain.gamePlayStar(passId);
	}

	public showPassStarMain(passData?:PlayerPassInfo){
		if(this.getChildIndex(this.passStartMain) < 0){
			this.addChild(this.passStartMain);
		}

		if(passData){
			this.passStartMain.loadPassInfoAndShow(passData);
		}
		this.passStartMain.visible = true;
		this.passStartMain.touchEnabled = true;
		this.passStartMain.touchChildren = true;
	}

	public openDimShop(){
		if(this.getChildIndex(this.dimShopMain) < 0){
			this.addChild(this.dimShopMain);
		}
	}

	public closeDimShop(){
		if(this.getChildIndex(this.dimShopMain) >= 0){
			this.removeChild(this.dimShopMain);
		}
	}
}


