/**
 * Created by MixGame on 2015/10/13 0013.
 */
var MixGame;
(function (MixGame) {
    /*
        todo 配置文件设置 每次更新必填！！
     */
    var GAME_INFO = (function () {
        function GAME_INFO() {
        }
        var d = __define,c=GAME_INFO,p=c.prototype;
        GAME_INFO.VERSION = "1.0.0-技术测试";
        GAME_INFO.NAME = "消消萌货";
        return GAME_INFO;
    })();
    MixGame.GAME_INFO = GAME_INFO;
    egret.registerClass(GAME_INFO,'MixGame.GAME_INFO');
    /*
        DataEye类
     */
    var DataEye = (function () {
        function DataEye() {
        }
        var d = __define,c=DataEye,p=c.prototype;
        /*
         *  初始化
         */
        DataEye.init = function () {
            MixGame.DataEye.initWeb();
        };
        DataEye.initWeb = function () {
            var appId = "";
            //判断是否为内网
            if (window.location.href.indexOf("192.168") > -1) {
                //内网 test
                console.log("内网统计 启动");
                appId = "C6D463C754827CFD69FBF6F5C6860E9C4";
            }
            else {
                appId = MixGame.DataEye.APPID;
            }
            //统计初始化
            var agentConfig = {
                appId: appId,
                channel: window.location.host,
                appVersion: MixGame.GAME_INFO.VERSION,
                osVersion: egret.Capabilities.os //操作系统
            };
            DCAgent.init(agentConfig);
            //获取当前地址
            var index1 = window.location.href.indexOf("?");
            var index2 = window.location.href.indexOf("#");
            var index = 0;
            if (index1 < index2) {
                index = index1;
            }
            else {
                index = index2;
            }
            var hrefStr = window.location.href.slice(0, index);
            DCAgent.onEvent("完整游戏地址", { href: hrefStr });
        };
        DataEye.initNav = function () {
            //统计初始化
            var agentConfig = {
                appId: MixGame.DataEye.APPID,
                channel: "NavApp",
                appVersion: MixGame.GAME_INFO.VERSION,
                osVersion: egret.Capabilities.os //操作系统
            };
            DCAgent.init(agentConfig);
            DCAgent.onEvent("游戏地址", { href: "I am App" });
        };
        DataEye.APPID = "C099BCFB47EF216F854EC2BD495CEB4BA";
        return DataEye;
    })();
    MixGame.DataEye = DataEye;
    egret.registerClass(DataEye,'MixGame.DataEye');
    var Pay = (function () {
        function Pay() {
        }
        var d = __define,c=Pay,p=c.prototype;
        //弹出支付
        Pay.PaySend = function (id, str) {
            var info = {};
            //购买物品id，在开放平台配置的物品id
            info.goodsId = id;
            //购买数量，当前默认传1，暂不支持其他值
            info.goodsNumber = "1";
            //所在服
            info.serverId = "1";
            //透传参数
            info.ext = str;
            nest.iap.pay(info, function (data) {
                if (data.result == 0) {
                }
                else if (data.result == -1) {
                }
                else {
                }
            });
        };
        return Pay;
    })();
    MixGame.Pay = Pay;
    egret.registerClass(Pay,'MixGame.Pay');
    var EgretOpenLogin = (function () {
        function EgretOpenLogin() {
        }
        var d = __define,c=EgretOpenLogin,p=c.prototype;
        EgretOpenLogin.init = function () {
            var info = {};
            //设置游戏id，这里是在准备工作步骤4中获取的游戏appId
            info.egretAppId = 90026;
            //设置使用 Nest 版本。默认为1，新版请传递2
            info.version = 2;
            //在debug模式下，请求nest接口会有日志输出。建议调试时开启
            info.debug = true;
            nest.core.startup(info, function (data) {
                if (data.result == 0) {
                    //初始化成功，进入游戏
                    //MixGame.EgretOpenLogin.login();
                    MixGame.EgretOpenLogin.isSupport();
                }
                else {
                    //初始化失败，可能是url地址有问题，请联系官方解决
                    Main.UserLoginFail("打开游戏egret登陆失败");
                }
            });
        };
        EgretOpenLogin.isSupport = function () {
            //nest.user.isSupport({}, function (data) {
            //    //获取登录方式数组，如["qq","wx"]
            //    var loginType = data.loginType;
            //    //获取是否支持nest.user.getInfo接口，有该字段并且该字段值为1表示支持
            //    var getInfo = data.getInfo;
            //    //已经登录过的信息，该字段目前只有新版qq浏览器runtime有
            //    //如果有该字段，请放弃使用loginType字段，并用该字段获取可用的登录方式以及登录信息
            //    var loginTypes:any = data.loginTypes;
            //    if(loginTypes && loginTypes.length) {
            //        for(var i:number = 0 ; i < loginTypes.length ; i++) {
            //            var info:any = loginTypes[i];
            //            //登录类型
            //            var infoLoginType:string = info.loginType;
            //            //如果不为空，标识本地已有该类型的身份信息
            //            var accInfo:any = info.accInfo;
            //            if(accInfo) {
            //                //昵称
            //                var nickName = accInfo.nickName;
            //                //头像
            //                var avatarUrl = accInfo.avatarUrl;
            //            }
            //        }
            //    }
            //});
            MixGame.EgretOpenLogin.checkLogin();
        };
        EgretOpenLogin.checkLogin = function () {
            nest.user.checkLogin({}, function (data) {
                console.log("c data", data);
                if (data.token) {
                    //用户已经登录过，获取用户token和用户id
                    //这时候就不需要显示登陆界面，直接进入游戏即可
                    MixGame.User.init(data, true);
                }
                else {
                    //用户没有登录，根据loginType显示登陆按钮
                    MixGame.EgretOpenLogin.login();
                }
            });
        };
        EgretOpenLogin.login = function () {
            nest.user.login({}, function (data) {
                if (data.token) {
                    //登录成功，获取用户token，并根据token获取用户id，之后进入游戏
                    MixGame.User.init(data, false);
                    console.log("Login");
                }
                else {
                    //登录失败，需要重新登陆
                    Main.UserLoginFail("授权时登陆失败");
                }
            });
        };
        EgretOpenLogin.loginOut = function () {
            nest.user.logout({}, function (data) {
                if (data.result == 0) {
                    //登出成功
                    //登出之后直到下次成功登录之前都不需要调用checkLogin接口，直接调用login进行登录即可
                    console.log("用户 退出");
                }
                else {
                }
            });
            egret.localStorage.removeItem("EgretH5SdkPlayerId");
            egret.localStorage.removeItem("EgretH5SdkUserInfo");
        };
        return EgretOpenLogin;
    })();
    MixGame.EgretOpenLogin = EgretOpenLogin;
    egret.registerClass(EgretOpenLogin,'MixGame.EgretOpenLogin');
    var User = (function () {
        function User() {
        }
        var d = __define,c=User,p=c.prototype;
        User.init = function (data, isLogin) {
            AV.initialize("MOPqaLCgc3KpzR955JNK31us-gzGzoHsz", "qNtFIDT9rJSELVOkY4qBfMxN");
            MixGame.User.CheckUser(data, isLogin);
        };
        //初次注册用户时 设置初始值
        User.RegisterUserInit = function (user) {
            user.set('passInfo', []);
            user.set('power', 30);
            var date = new Date();
            user.set('powerTime', date);
            user.set('gold', 0);
            user.set('dim', 0);
            user.save();
        };
        //注册用户
        User.RegisterUser = function (userData) {
            var loginUser = AV.Object.new("LoginUser");
            loginUser.set('mixToken', userData.token);
            loginUser.set('mixId', userData.id);
            var str = ['m', 'i', 'x', 'g', 'a', 'm', 'e'];
            var pw = "";
            for (var i = 0; i < 16; i++) {
                pw += str[MixGame.getRandom(0, str.length - 1)];
                pw += MixGame.getRandom(0, 9) + "";
            }
            loginUser.set('mixWord', pw);
            loginUser.save().then(function (post) {
                var user = new AV.User();
                user.set('username', post.id);
                user.set('password', post.get('mixWord'));
                user.signUp().then(function (user) {
                    //console.log("注册用户和密码 成功");
                    MixGame.User.RegisterUserInit(user);
                    Main.UserLoginSuccess();
                }, function (err) {
                    egret.error("注册用户和密码 失败", err);
                    Main.UserLoginFail("用token和id注册失败");
                });
            }, function (err) {
                egret.error(err);
            });
        };
        //检查有没有 注册用户信息
        User.CheckUser = function (data, isLogin) {
            var login = AV.Object.extend("LoginUser");
            var query = new AV.Query(login);
            if (!isLogin) {
                query.equalTo('mixToken', data.token);
            }
            query.equalTo('mixId', data.id);
            query.find().then(function (results) {
                if (results.length === 0) {
                    console.log("========新注册用户========");
                    MixGame.User.RegisterUser(data);
                }
                else {
                    //console.log("有了 进行登陆操作");
                    AV.User.logIn(results[0].id, results[0].get('mixWord')).then(function () {
                        //console.log("登陆user成功");
                        //todo 如果登陆次数loginBits为0 需要获取 开放信息 设置用户名和头像
                        Main.UserLoginSuccess();
                    }, function (err) {
                        egret.error("登陆user失败", err);
                        Main.UserLoginFail("用获得的user名和密码登陆失败");
                    });
                }
            }, function () {
                Main.UserLoginFail("查询login user失败");
            });
        };
        return User;
    })();
    MixGame.User = User;
    egret.registerClass(User,'MixGame.User');
    function getRandom(minNum, maxNum) {
        var n = minNum, x = maxNum + 1;
        if (n >= x) {
            return n;
        }
        else if (n < 0) {
            return 0;
        }
        else {
            var int = Math.floor(Math.random() * (x - n) + n);
            if (int > x) {
                int = x;
            }
            else if (int < n) {
                int = n;
            }
            return int;
        }
    }
    MixGame.getRandom = getRandom;
    function unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
    MixGame.unique = unique;
    function getRandomArr(arr, num) {
        if (num > arr.length) {
            num = arr.length;
        }
        var ranArr = [];
        var xArr = arr.slice(0);
        for (var i = 0; i < num; i++) {
            var ran = MixGame.getRandom(0, xArr.length - 1);
            ranArr.push(xArr[ran]);
            xArr.splice(ran, 1);
        }
        return ranArr;
    }
    MixGame.getRandomArr = getRandomArr;
})(MixGame || (MixGame = {}));
