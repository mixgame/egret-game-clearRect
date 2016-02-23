class GameHome extends eui.Component {
    public constructor(){
        super();
        this.skinName = "GameHomeSkin";
        this.initGameHome();
    }

    public passSelectShow:PassSelectShow;
    public playerDataShow:PlayerDataShow;

    public initGameHome(){
        this.playerDataShow.initPlayerDataShow();
        this.passSelectShow.loadAllPassInfo();
    }
}