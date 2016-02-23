module MixGameUser {
    //关卡信息
    export class Pass {
        public static nowPassMax:number = 0;
        public static getAllPassInfo():Array<PlayerPassInfo>{
            return MixGame.User.data.get('passInfo');
        }

        public static getOnePassInfoForId(id:number):PlayerPassInfo{
            var arr:Array<PlayerPassInfo> = MixGame.User.data.get('passInfo');
            return arr[id-1];
        }

        public static setOnePassInfo(obj:PlayerPassInfo){
            var arr:Array<PlayerPassInfo> = MixGame.User.data.get('passInfo');
            if(arr[obj.id-1]){
                arr[obj.id-1].star = obj.star;
                arr[obj.id-1].point = obj.point;
            }else{
                arr[obj.id-1] = {
                    id:obj.id,
                    star:obj.star,
                    point:obj.point
                };
            }
            MixGame.User.data.set('passInfo',arr);
            MixGame.User.data.save();
            console.log("save关卡",obj);
        }
    }

    //玩家信息
    export class Info {
        public static getGold():number{
            return MixGame.User.data.get('gold');
        }

        public static getDim():number{
            return MixGame.User.data.get('dim');
        }

        public static addGold(add:number){
            MixGame.User.data.increment('gold',add);
            MixGame.User.data.save();
        }

        public static addDim(add:number){
            MixGame.User.data.increment('dim',add);
            MixGame.User.data.save();
        }
    }
}