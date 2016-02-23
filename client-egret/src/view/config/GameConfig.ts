module GameConfig{
    export class StarOneImg {
        static getImgForLoadInfo(info:StarOneLoadInfo):string{
            var colorStr:string = "";
            switch (info.typeId){
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
        }

        static getImg(arr:Array<number>){
            var obj:StarOneLoadInfo = {
                typeId:arr[0],
                colorId:arr[1]
            };
            return GameConfig.StarOneImg.getImgForLoadInfo(obj);
        }
    }

    export class StarViewState {
        static START:number         = -1;  //游戏刚开始 检查阶段
        static PLAY:number          = 0;
        static CHANGE_POS:number    = 1;
        static CHANGE_COLOR:number  = 2;
        static AGAIN_ARRAY:number   = 3;
    }

    export class StarType {
        static NULL:number      = -1;
        static STAR:number      = 0;
        static STONE:number     = 3;
    }

    export class Pass{
        static PASS_MAX_INDEX:number = 61;
        static STAR_IMG:string    = "ui_pass_starIcon";
        static UN_STAR_IMG:string = "ui_pass_unstarIcon";
    }

    export class EffName {
        static CLEAR_STAR_ON_TASK:number    = 0;
        static CLEAR_STAR_NOT_TASK:number   = 1;
    }
}
