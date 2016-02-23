/**
 *
 * @author 
 *
 */

interface PlayerPassInfo{
	id:number;          //关卡编号
	star:number;		//过关的星星数
	point:number;		//最高分数
}
class PassSelectShow extends eui.Component{
	public constructor() {
    	super();
	}

	public passList:eui.List;
	public passListScroll:eui.Scroller;
	public passData:eui.ArrayCollection;

	public loadAllPassInfo(){
		MixGameUser.Pass.nowPassMax = MixGameUser.Pass.getAllPassInfo().length;

		//创建boss关卡
		if(PassMonster.Boss.length < 1){
            var index: number = Math.floor(GameConfig.Pass.PASS_MAX_INDEX/5);
			for(var i=0;i<index;i++){
				var boss:PassMonster = new PassMonster(i+1);
				PassMonster.Boss.push(boss);
			}
		}
		//[得到的星星数，最高得分];
		this.initPassInfoData();
		this.passList.dataProvider = this.passData;
		this.passListScroll.viewport.scrollV = (this.passData.length-MixGameUser.Pass.nowPassMax)*40 - Main.self.stage.stageHeight + 240;
	}
	private initPassInfoData(){

		//todo 读取玩家关卡数据
		var playPassInfo:Array<PlayerPassInfo> = MixGameUser.Pass.getAllPassInfo();

		var infoArr:Array<any> = [];
        for(var i = GameConfig.Pass.PASS_MAX_INDEX-1;i >= 0;i--){
			var info:PlayerPassInfo = {
				id:0,star:0,point:0
			};

			if(i <= playPassInfo.length-1){
				infoArr.push(playPassInfo[i]);
			}else{
				info.id = i+1;
				info.star = 0;
				info.point = 0;
				infoArr.push(info);
			}
		}

		this.passData = new eui.ArrayCollection(infoArr);
	}

	public getPassData(passId:number):PlayerPassInfo{
		var data:PlayerPassInfo;
        if(passId > GameConfig.Pass.PASS_MAX_INDEX){
			egret.error("传入关卡id错误，超过最大关卡数");
			return
		}

		var id:number = this.passData.length - passId;
		data = this.passData.getItemAt(id);

		return data
	}
}
