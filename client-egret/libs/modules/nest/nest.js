//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var nest;
(function (nest) {
})(nest || (nest = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/*
 * @private
 */
var nest;
(function (nest) {
    var utils;
    (function (utils) {
        /*
         * @private
         */
        utils.$DEBUG_LOG = false;
        /*
         * @private
         */
        function $changeMethod(version) {
            //console.log("[Nest]use module : " + version);
            var arr = ["user", "iap", "share", "social", "app"];
            for (var i = 0; i < arr.length; i++) {
                var module = arr[i];
                if (nest[version] && nest[version][module]) {
                    nest[module] = nest[version][module];
                    for (var key in nest[module]) {
                        var fun = nest[module][key];
                        if (typeof fun == "function") {
                            modifyFunction(module, key);
                        }
                    }
                }
            }
        }
        utils.$changeMethod = $changeMethod;
        function modifyFunction(module, key) {
            var fun = nest[module][key];
            var newFun;
            //这里兼容下老版本,老版本isSupport函数传一个参数的
            if (key == "isSupport") {
                newFun = function (info, callback) {
                    $log("[Nest]调用接口nest." + module + "." + key);
                    var rInfo = info;
                    var rCallback = callback;
                    if (typeof info == "function") {
                        rInfo = {};
                        rCallback = info;
                    }
                    var debugCallback = function (data) {
                        $log("[Nest]获得nest." + module + "." + key + "接口返回 : " + JSON.stringify(data));
                        rCallback.call(null, data);
                    };
                    fun.call(null, rInfo, debugCallback);
                };
            }
            else {
                newFun = function (info, callback) {
                    $log("[Nest]调用接口nest." + module + "." + key);
                    var debugCallback = function (data) {
                        $log("[Nest]获得nest." + module + "." + key + "接口返回 : " + JSON.stringify(data));
                        callback.call(null, data);
                    };
                    fun.call(null, info, debugCallback);
                };
            }
            nest[module][key] = newFun;
        }
        /*
         * @private
         */
        function $getSpid() {
            if (utils.$spid == undefined) {
                utils.$spid = parseInt($getOption("egret.runtime.spid"));
            }
            return utils.$spid;
        }
        utils.$getSpid = $getSpid;
        /*
         * @private
         */
        var $channelTag;
        /*
         * @private
         */
        function $getChannelTag() {
            if ($channelTag == undefined) {
                $channelTag = $getOption("channelTag");
            }
            return $channelTag;
        }
        utils.$getChannelTag = $getChannelTag;
        /*
         * @private
         */
        var $QQBrowser;
        /*
         * @private
         */
        function $isQQBrowser() {
            if ($QQBrowser == undefined) {
                $QQBrowser = $isTargetPlatform(9392);
            }
            return $QQBrowser;
        }
        utils.$isQQBrowser = $isQQBrowser;
        /*
         * @private
         */
        function $isTargetPlatform(target) {
            return $getSpid() == target;
        }
        utils.$isTargetPlatform = $isTargetPlatform;
        /*
         * @private
         */
        function $getOption(key) {
            if (utils.$EGRET_SUPPORT) {
                return egret.getOption(key);
            }
            else {
                if (window.location) {
                    var search = location.search;
                    if (search == "") {
                        return "";
                    }
                    search = search.slice(1);
                    var searchArr = search.split("&");
                    var length = searchArr.length;
                    for (var i = 0; i < length; i++) {
                        var str = searchArr[i];
                        var arr = str.split("=");
                        if (arr[0] == key) {
                            return arr[1];
                        }
                    }
                }
                return "";
            }
        }
        utils.$getOption = $getOption;
        /*
         * @private
         */
        function $log(msg) {
            if (utils.$DEBUG_LOG) {
                if (utils.$EGRET_SUPPORT) {
                    egret.log(msg);
                }
                else {
                    console.log(msg);
                }
            }
        }
        utils.$log = $log;
    })(utils = nest.utils || (nest.utils = {}));
})(nest || (nest = {}));
if (this["navigator"]) {
    nest.utils.$isRuntime = false;
}
else {
    nest.utils.$isRuntime = true;
}

if (nest.utils.$isRuntime) {
    if (egret_native.getOption("egret.runtime.spid") == 10044
        || (!egret_native.getOption("egret.runtime.nest"))) {
        var CMPAY_EGRET = (function () {
            function empty() {
            }

            var cmpay = {
                on: empty,
                off: empty,
                ready: empty,
                isReady: false,
                fire: empty,
                purchase: empty,
                getVersion: empty,
                type: 'egret_runtime'
            };
            var readyListeners = [];
            cmpay.ready = function (fn) {
                if (cmpay.isReady) {
                    fn();
                } else {
                    readyListeners.push(fn);
                }
            };
            function callReady() {
                var rLen = readyListeners.length;
                for (var i = 0; i < rLen; ++i) {
                    readyListeners[i]();
                }
                readyListeners.length = 0;
            }

            function initOld() {

                var isDebug = false;

                if (typeof CMPAY_DEBUG === 'boolean') {
                    isDebug = CMPAY_DEBUG;
                } else {
                    CMPAY_DEBUG = false;
                }
                console.log('ssss:initOld:' + isDebug);

                var listeners = {};
                /*
                 FIXME:
                 接收来自webview 的消息
                 */
                egret.ExternalInterface.addCallback('webview_to_runtime_js_data', function (str) {
                    console.log('ssss:runtime-recv:' + str);
                    var msg;
                    try {
                        msg = JSON.parse(str);
                    } catch (e) {
                        return;
                    }
                    if (msg && msg.type) {
                        switch (msg.type) {
                            case 'cmpay_loaded':
                                cmpay.isReady = true;
                                callReady();
                                return;
                            case 'cmpay_invoke':
                                var token = msg.token;
                                var fn;
                                if (token && listeners.hasOwnProperty(token) && listeners[token] && typeof (fn = listeners[token].fn) === 'function') {
                                    if (!listeners[token].isPersist) {
                                        delete listeners[token];
                                    }
                                    fn.apply(null, msg.args);
                                }
                                return;
                        }
                    }
                });

                var url = 'http://game.liebao.cn/game/pay/part/cmpay-runtime-proxy-egret.html?';
                url += '_t=' + Math.floor(Date.now() / 3600 / 24 / 1000);
                if (isDebug) {
                    url += '&debug=1';
                }
                //var webviewId = 'cmpay_proxy_laya';
                /*
                 FIXME:
                 打开一个隐藏的webview
                 */
                //var webview = createWebview(webviewId, url, true);
                //webview.addJSCallback('layaRuntimeOnMessage', layaRuntimeOnMessage);
                egret.ExternalInterface.call('newWebViewInstance', JSON.stringify({
                    action: 'createHiddenWebView',
                    data: {
                        url: url
                    }
                }));
                console.log('ssss:runtime-create:' + url);

                function sendMessage(msg) {
                    var str;
                    try {
                        str = JSON.stringify(msg).replace(/"/g, '`');
                    } catch (e) {
                        return false;
                    }
                    console.log('ssss:runtime-send:' + str);
                    /*
                     FIXME:
                     以字符串参数str 调用webview 中的方法 layaRuntimeOnMessage
                     */
                    egret.ExternalInterface.call('newWebViewInstance', JSON.stringify({
                        action: 'callWebViewMethod',
                        data: {
                            methodName: 'egretRuntimeOnMessage',
                            paramStr: str
                        }
                    }));
                    //webview.callJS('layaRuntimeOnMessage', str);
                    //androidBridge.call('callJS',JSON.stringify({
                    //    name: webviewId,
                    //    method: 'layaRuntimeOnMessage',
                    //    args: str
                    //}));
                    //laya.ExternalInterface.call('newWebViewInstance', JSON.stringify({
                    //    action: 'callWebViewMethod',
                    //    data:{
                    //        methodName: 'layaRuntimeOnMessage',
                    //        paramStr: str
                    //    }
                    //}));
                    return true;
                }

                function cmpay_invoke(method, args) {
                    var len;
                    if (args && typeof args === 'object' && typeof (len = args.length) === 'number') {
                        var isOn = method === 'on';
                        var isOff = method === 'off';
                        for (var i = 0; i < len; ++i) {
                            var item = args[i];
                            if (typeof item === 'function') {
                                var token = String(Math.random());
                                if (!isOff) {
                                    listeners[token] = {
                                        isPersist: isOn,
                                        fn: item
                                    };
                                } else {
                                    delete listeners[token];
                                }
                                args[i] = {
                                    token: token
                                };
                            }
                        }
                    }
                    sendMessage({
                        type: 'cmpay_invoke',
                        args: args,
                        method: method
                    });
                }

                //cmpay.ready = function(fn){
                //    if(cmpay.isReady){
                //        fn();
                //    }else{
                //        readyListeners.push(fn);
                //    }
                //};

                function slice(args) {
                    var arr = [];
                    var len = args.length;
                    for (var i = 0; i < len; ++i) {
                        arr.push(args[i]);
                    }
                    return arr;
                }

                var methods = ['on', 'off', 'fire', 'purchase'];
                for (var i = methods.length - 1; i > -1; --i) {
                    (function (method) {
                        cmpay[method] = function () {
                            cmpay_invoke(method, slice(arguments));
                        };
                    })(methods[i]);
                }
            }

            function initNew() {

                var isDebug = false;

                if (typeof CMPAY_DEBUG === 'boolean') {
                    isDebug = CMPAY_DEBUG;
                } else {
                    CMPAY_DEBUG = false;
                }

                console.log('ssss:initNew:' + isDebug);

                function wsjLaunchPay(request, fn) {
                    var token = String(Math.random());
                    egret.ExternalInterface.addCallback('wsj_pay', function (response) {
                        var data;
                        try {
                            data = JSON.parse(response);
                        } catch (e) {
                        }
                        if (data && data.token === token) {
                            var wsjResponse;
                            try {
                                wsjResponse = JSON.parse(data.response);
                            } catch (e) {
                            }
                            fn(wsjResponse);
                        }
                    });
                    console.log('tttt:wsj_pay:' + JSON.stringify({
                            token: token,
                            request: request
                        }));
                    egret.ExternalInterface.call('wsj_pay', JSON.stringify({
                        token: token,
                        request: JSON.stringify(request)
                    }));
                }

                function param(obj) {
                    var arr = [];
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            var val = obj[i];
                            var type = typeof val;
                            if (type === 'number' || type === 'string' || type === 'boolean') {
                                arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(val));
                            }
                        }
                    }
                    return arr.join('&');
                }

                function ajax(option, fn) {
                    var urlloader = new egret.URLLoader();
                    var urlreq = new egret.URLRequest();
                    if (option.method && option.method.toLowerCase() === 'post') {
                        urlreq.method = egret.URLRequestMethod.POST;
                    }
                    var postData = '';
                    if (option.data) {
                        if (typeof option.data === 'string') {
                            postData = option.data;
                        } else {
                            postData = param(option.data);
                        }
                        urlreq.data = new egret.URLVariables(postData);
                    }
                    urlreq.url = option.url;
                    urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                    urlloader.addEventListener(egret.Event.COMPLETE, function () {
                        console.log('tttt:netreq:complete:' + urlloader.data);
                        fn(urlloader.data);
                    });
                    console.log('tttt:netreq:' + urlreq.url + ':' + postData);
                    urlloader.load(urlreq);
                }

                function placeOrderProxy(option, fn) {
                    console.log('ssss:placeOrderProxy:' + JSON.stringify(option));
                    var token = option.data && option.data.access_token;
                    if (!token) {
                        fn(false, -1, '{"msg":"Token not provided."}');
                    } else {
                        if (token.length === 32 || token.slice(0, 3) === 'sdk') {
                            var p = {
                                token: token,
                                method: option.pay_method,
                                dev: option.debug ? 1 : null
                            };
                            var _d = option.data;
                            for (var i in _d) {
                                if (_d.hasOwnProperty(i) && i !== 'access_token') {
                                    p[i] = _d[i];
                                }
                            }
                            ajax({
                                method: 'POST',
                                url: 'http://gclogin.liebao.cn/api/native/order/pay',
                                data: p
                            }, fn);
                        } else {
                            ajax({
                                method: 'POST',
                                url: 'http://gc.liebao.cn/pay/topay.php',
                                data: {
                                    method: option.pay_method,
                                    args: param(option.data),
                                    dev: option.debug ? 1 : null
                                }
                            }, fn);
                        }
                    }
                }

                function placeOrder(option, fn) {
                    placeOrderProxy(option, function (responseText) {
                        var response;
                        var success = false;
                        var msg = 'Unkown error';
                        if (responseText) {
                            responseText = responseText.replace(/"transaction_id":(\d+)/, '"transaction_id":"$1"');
                            try {
                                response = JSON.parse(responseText);
                                success = true;
                            } catch (e) {
                                msg = 'Empty response';
                            }
                        }
                        var valid = success && response && response.data && response.data.args && response.data.args.goodsTokenUrl && response.ret === 1;
                        if (valid) {
                            var goodsTokenUrl = response.data.args.goodsTokenUrl;
                            if (goodsTokenUrl) {
                                msg = 'ok';
                            } else {
                                msg = 'Empty goods token url';
                            }
                        }
                        fn(valid, valid ? 0 : (response ? response.ret : -1), msg, response);
                    });
                }

                var loginListeners = {};
                cmpay.on = function (type, fn) {
                    var arr;
                    if (loginListeners.hasOwnProperty(type)) {
                        arr = loginListeners[type];
                    } else {
                        arr = loginListeners[type] = [];
                    }
                    arr.push(fn);
                };
                cmpay.off = function (type, fn) {
                    var arr;
                    if (loginListeners.hasOwnProperty(type)) {
                        arr = loginListeners[type];
                    }
                    var len = arr.length;
                    for (var i = 0; i < len; ++i) {
                        if (arr[i] === fn) {
                            arr.splice(i, 1);
                        }
                    }
                };
                cmpay.fire = function (type) {
                    if (loginListeners.hasOwnProperty(type)) {
                        var args = [].slice.call(arguments, 1);
                        var arr = loginListeners[type];
                        var len = arr.length;
                        var _arr = arr.slice();
                        for (var i = 0; i < len; ++i) {
                            var fn = _arr[i];
                            try {
                                fn.apply(null, args);
                            } catch (e) {
                            }
                        }
                    }
                };
                cmpay.isReady = true;
                //cmpay.type = 'egret_runtime';
                //cmpay.ready = function(fn){
                //    fn();
                //};
                cmpay.purchase = function (option) {
                    console.log('ssss:purchase:' + JSON.stringify(option));
                    placeOrder({
                        pay_method: 'wsjpay/sdk',
                        data: option,
                        debug: typeof option.debug !== 'undefined' ? option.debug : isDebug
                    }, function (success, code, msg, response) {
                        cmpay.fire('cmpay_order_placed', {
                            type: 'cmpay_order_placed',
                            transaction_id: response && response.data ? response.data.transaction_id : null,
                            ret: code,
                            msg: msg,
                            success: success,
                            response: response
                        });
                        if (success) {
                            wsjLaunchPay(response.data.args, function (wsjResponse) {
                                var ret = wsjResponse && typeof wsjResponse.resultCode === 'number' ? wsjResponse.resultCode : -99;
                                var paid = wsjResponse && wsjResponse.resultCode === 0;
                                cmpay.fire('cmpay_order_complete', {
                                    type: 'cmpay_order_complete',
                                    transaction_id: response.data.transaction_id,
                                    ret: ret,
                                    success: paid,
                                    payed: paid,
                                    paid: paid,
                                    wsjResponse: wsjResponse
                                });
                            });
                        } else {
                            cmpay.fire('cmpay_order_complete', {
                                type: 'cmpay_order_complete',
                                transaction_id: response && response.data ? response.data.transaction_id : null,
                                ret: -99,
                                success: false,
                                payed: false,
                                paid: false,
                                wsjResponse: null
                            });
                        }
                    });
                };
                callReady();
            }

            var version = false;
            cmpay.getVersion = function () {
                return version;
            };

            var to = egret.setTimeout(function () {
                if (version === false) {
                    initOld();
                } else {
                    initNew();
                }
            }, null, 100);
            egret.ExternalInterface.addCallback("get_game_sdk_version", function (ver) {
                egret.clearTimeout(to);
                console.log('ssss:get_game_sdk_version:' + JSON.stringify(arguments));
                version = ver;
                initNew();
            });
            egret.ExternalInterface.call("get_game_sdk_version", "");
            return cmpay;
        })();
    }
}
if (nest.utils.$isRuntime) {
    if (egret_native.getOption("egret.runtime.spid") == 10044
        || (!egret_native.getOption("egret.runtime.nest"))) {
        var CMGAME_EGRET = (function () {
            var CMGAME = {};

            function empty() {
            }

            function get_game_sdk_version(timeout, fn) {
                var version = false;
                var returned = false;
                var to = egret.setTimeout(function () {
                    if (returned) {
                        return;
                    }
                    returned = true;
                    fn(version);
                }, null, timeout);
                egret.ExternalInterface.addCallback("get_game_sdk_version", function (ver) {
                    console.log('ssss:get_game_sdk_version' + JSON.stringify(arguments));
                    egret.clearTimeout(to);
                    if (returned) {
                        return;
                    }
                    returned = true;
                    version = ver;
                    fn(version);
                });
                egret.ExternalInterface.call("get_game_sdk_version", "");
            }

            CMGAME.checkIsGameSDK = (function () {
                var checked = false;
                var isGameSDK = true;
                var verGameSDK = -1;
                var lock = false;
                var listeners = [];
                return function (fn) {
                    if (checked) {
                        egret.setTimeout(function () {
                            fn(isGameSDK, verGameSDK);
                        }, null, 1);
                    } else {
                        listeners.push(fn);
                        if (!lock) {
                            lock = true;
                            var clean = function () {
                                checked = true;
                                egret.setTimeout(function () {
                                    console.log('sssstttt:CMGAME.checkIsGameSDK call listeners');
                                    lock = false;
                                    for (var i = 0; i < listeners.length; ++i) {
                                        try {
                                            listeners[i](isGameSDK, verGameSDK);
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }
                                    listeners.length = 0;
                                }, null, 1);
                            };
                            console.log('sssstttt:get_game_sdk_version()');
                            get_game_sdk_version(10 * 1000, function (ver) {
                                console.log('sssstttt:get_game_sdk_version():' + JSON.stringify(arguments));
                                if (ver && !isNaN(ver)) {
                                    verGameSDK = ver;
                                }
                                clean();
                            });
                        }
                    }
                };
            })();

            CMGAME.saveShortcutInfo = function (param, fn) {
                egret.ExternalInterface.call("save_shortcut_info", JSON.stringify({
                    token: String(Math.random()),
                    value: JSON.stringify(param)
                }));
            };

            CMGAME.pushIcon = function (param, fn) {
                param.title = param.Title;
                param.detailUrl = param.DetailUrl;
                param.picUrl = param.PicUrl;
                egret.ExternalInterface.call("push_icon", JSON.stringify(param));
            };

            CMGAME.dispatchGameLoginData = (function () {
                var callback;
                egret.ExternalInterface.addCallback("dispatchGameLoginData", function (str) {
                    console.log('sssstttt:dispatchGameLoginData:callback:' + str);
                    if (!callback) {
                        return;
                    }
                    var response = false;
                    if (typeof str === 'string') {
                        try {
                            response = JSON.parse(str);
                        } catch (e) {
                        }
                    } else {
                        response = str;
                    }
                    callback(response);
                    //egret.ExternalInterface.removeCallback("dispatchGameLoginData", o);
                    //fn.apply(null, arguments);
                });
                return function (param, fn) {
                    var _cb = callback;
                    callback = function (response) {
                        callback = _cb;
                        fn(response);
                    };
                    egret.ExternalInterface.call("dispatchGameLoginData",
                        JSON.stringify(param)
                    );
                };
            })();

            CMGAME.getGameSDKDeviceID = function () {
                throw 'Method not exists, use CMGAME_LAYA.getGameSDKDeviceIDAsync() instead.';
            };

            CMGAME.getGameSDKDeviceIDAsync = (function (fn) {
                var callback;
                egret.ExternalInterface.addCallback("get_device_info", function (str) {
                    if (!callback) {
                        return;
                    }
                    var response = false;
                    if (typeof str === 'string') {
                        try {
                            response = JSON.parse(str);
                        } catch (e) {
                        }
                    } else {
                        response = str;
                    }
                    callback(response);
                });
                return function (fn) {
                    var _cb = callback;
                    callback = function (response) {
                        callback = _cb;
                        fn(response);
                    };
                    egret.ExternalInterface.call("get_device_info", '');
                };
            })();

            return CMGAME;
        })();
    }
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var nest;
(function (nest) {
    var runtime;
    (function (runtime) {
        var core;
        (function (core) {
            function callCustomMethod(customInfo, callback) {
                var data = { module: "core", action: "callCustomMethod", param: customInfo };
                callRuntime(data, callback);
            }
            core.callCustomMethod = callCustomMethod;
        })(core = runtime.core || (runtime.core = {}));
        var user;
        (function (user) {
            function isSupport(info, callback) {
                var data = { module: "user", action: "isSupport", param: info };
                callRuntime(data, callback);
            }
            user.isSupport = isSupport;
            function checkLogin(loginInfo, callback) {
                var data = { module: "user", action: "checkLogin", param: loginInfo };
                callRuntime(data, callback);
            }
            user.checkLogin = checkLogin;
            function login(loginInfo, callback) {
                var data = { module: "user", action: "login", param: loginInfo };
                callRuntime(data, callback, true);
            }
            user.login = login;
            function logout(loginInfo, callback) {
                var nestVersion = egret.getOption("egret.runtime.nest");
                if (nestVersion >= 4 || nestVersion == "custom") {
                    var data = { module: "user", action: "logout", param: loginInfo };
                    callRuntime(data, callback);
                }
                else {
                    callback({ "result": 0 });
                }
            }
            user.logout = logout;
            function getInfo(loginInfo, callback) {
                var data = { module: "user", action: "getInfo", param: loginInfo };
                callRuntime(data, callback);
            }
            user.getInfo = getInfo;
        })(user = runtime.user || (runtime.user = {}));
        var iap;
        (function (iap) {
            function pay(orderInfo, callback) {
                var data = { module: "iap", action: "pay", "param": orderInfo };
                callRuntime(data, callback);
            }
            iap.pay = pay;
        })(iap = runtime.iap || (runtime.iap = {}));
        var share;
        (function (share_1) {
            function isSupport(info, callback) {
                var data = { module: "share", action: "isSupport", param: info };
                callRuntime(data, callback);
            }
            share_1.isSupport = isSupport;
            function setDefaultData(shareInfo, callback) {
                callback.call(null, { "result": -2 });
            }
            share_1.setDefaultData = setDefaultData;
            function share(shareInfo, callback) {
                var data = { module: "share", action: "share", param: shareInfo };
                callRuntime(data, callback, true);
            }
            share_1.share = share;
        })(share = runtime.share || (runtime.share = {}));
        var social;
        (function (social) {
            function isSupport(info, callback) {
                var data = { module: "social", action: "isSupport", param: info };
                callRuntime(data, callback);
            }
            social.isSupport = isSupport;
            function getFriends(socialInfo, callback) {
                var data = { module: "social", action: "getFriends", param: socialInfo };
                callRuntime(data, callback);
            }
            social.getFriends = getFriends;
            function openBBS(socialInfo, callback) {
                var data = { module: "social", action: "openBBS", param: socialInfo };
                callRuntime(data, callback);
            }
            social.openBBS = openBBS;
        })(social = runtime.social || (runtime.social = {}));
        var app;
        (function (app) {
            function isSupport(info, callback) {
                var data = { module: "app", action: "isSupport", param: info };
                callRuntime(data, callback);
            }
            app.isSupport = isSupport;
            function attention(appInfo, callback) {
                var data = { module: "app", action: "attention", param: appInfo };
                callRuntime(data, callback);
            }
            app.attention = attention;
            function exitGame(appInfo, callback) {
                var data = { module: "app", action: "exitGame", param: appInfo };
                callRuntime(data, callback);
            }
            app.exitGame = exitGame;
            function sendToDesktop(appInfo, callback) {
                var data = { module: "app", action: "sendToDesktop", param: appInfo };
                callRuntime(data, callback);
            }
            app.sendToDesktop = sendToDesktop;
            function getInfo(appInfo, callback) {
                var url = nest.utils.$API_DOMAIN + "user/getCustomInfo";
                url += "?appId=" + nest.utils.$APP_ID;
                url += "&runtime=1";
                url += "&egretChanId=" + nest.utils.$getSpid();
                var request = new egret.HttpRequest();
                request.open(url);
                request.addEventListener(egret.Event.COMPLETE, function () {
                    var data = JSON.parse(request.response);
                    var callbackData = data.data;
                    callbackData.result = 0;
                    if (data.code == 0) {
                        callback.call(null, callbackData);
                    }
                    else {
                        callback.call(null, { result: -2 });
                    }
                }, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                    callback.call(null, { result: -2 });
                }, this);
                request.send();
            }
            app.getInfo = getInfo;
        })(app = runtime.app || (runtime.app = {}));
        var externalArr = [];
        function callRuntime(data, callback, parallel) {
            if (parallel === void 0) { parallel = false; }
            var tag = "nest";
            if (parallel) {
                egret.ExternalInterface.addCallback(tag, function (data) {
                    var obj = JSON.parse(data);
                    callback(obj.data);
                });
                egret.ExternalInterface.call(tag, JSON.stringify(data));
            }
            else {
                externalArr.push({ "data": data, "callback": callback });
                _getData();
            }
        }
        runtime.callRuntime = callRuntime;
        var isRunning = false;
        function _getData() {
            if (externalArr.length) {
                if (isRunning) {
                    return;
                }
                isRunning = true;
                var info = externalArr.shift();
                var tag = "nest";
                egret.ExternalInterface.addCallback(tag, function (data) {
                    var obj = JSON.parse(data);
                    info["callback"](obj.data);
                    isRunning = false;
                    _getData();
                });
                egret.ExternalInterface.call(tag, JSON.stringify(info["data"]));
            }
        }
        runtime._getData = _getData;
    })(runtime = nest.runtime || (nest.runtime = {}));
})(nest || (nest = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/*
 * cm old solution
 * @private
 */
var nest;
(function (nest) {
    var cm;
    (function (cm) {
        /*
         * @private
         */
        function callRuntime(data, callback) {
            var deviceId;
            if (deviceId = egret.localStorage.getItem("deviceid")) {
                console.log("cm old local deviceid " + deviceId);
                if (deviceId.indexOf("{") >= 0) {
                    var json = JSON.parse(deviceId);
                    data["postData"]["deviceid"] = json["did"];
                }
                else {
                    data["postData"]["deviceid"] = deviceId;
                }
                quickRegister(data["postData"], callback);
            }
            else {
                console.log("cm old CMPAY_EGRET.version " + CMPAY_EGRET.getVersion());
                var tag = (CMPAY_EGRET.getVersion() == 0 || CMPAY_EGRET.getVersion() == false) ? "getUid" : "get_device_info";
                var isFinish = false;
                var sendData = function (id) {
                    if (isFinish) {
                        return;
                    }
                    isFinish = true;
                    console.log(id);
                    data["postData"]["deviceid"] = id || egret.localStorage.getItem("deviceid") || "";
                    quickRegister(data["postData"], callback);
                };
                egret.ExternalInterface.addCallback(tag, function (id) {
                    console.log("cm old CMPAY_EGRET");
                    if (tag == "get_device_info") {
                        console.log("cm old get_device_info " + id);
                        if (id) {
                            var json = JSON.parse(id);
                            sendData(json["did"]);
                        }
                        else {
                            sendData(null);
                        }
                    }
                    else {
                        sendData(id);
                    }
                });
                egret.setTimeout(function () {
                    console.log("cm old timeout");
                    sendData(null);
                }, this, 2000);
                egret.ExternalInterface.call(tag, "");
            }
        }
        cm.callRuntime = callRuntime;
        /*
         * @private
         */
        function loginBefore(callback) {
            var postdata = {};
            var url = nest.utils.$API_DOMAIN + "app/getInfo";
            postdata["egretChanId"] = nest.utils.$getSpid();
            postdata["egretGameId"] = nest.utils.$APP_ID;
            postdata["debug"] = 1;
            setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
                callback(resultData);
            });
        }
        cm.loginBefore = loginBefore;
        /*
         * @private
         */
        function loginAfter(postdata, callback, isNew) {
            var sendData = {};
            sendData["access_token"] = postdata["access_token"];
            sendData["openid"] = postdata["openid"];
            var url = nest.utils.$API_DOMAIN + "game/" + nest.utils.$getSpid() + "/" + nest.utils.$APP_ID + "/";
            sendData["runtime"] = 1;
            sendData["showGame"] = 1;
            if (isNew) {
                sendData["newLiebaoApi"] = 1;
            }
            //需要发送 runtime=1  showGame=1  access_token=  openid=
            setProxy(url, sendData, egret.URLRequestMethod.GET, function (resultData) {
                callback(resultData);
            });
        }
        cm.loginAfter = loginAfter;
        /*
         * @private
         */
        function payBefore(orderInfo, callback) {
            var url = nest.utils.$API_DOMAIN + "user/placeOrder";
            var postdata = {
                "id": cm.user.egretInfo.egretUserId,
                "appId": nest.utils.$APP_ID,
                "time": Date.now(),
                "runtime": 1
            };
            for (var k in orderInfo) {
                postdata[k] = orderInfo[k];
            }
            setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
                callback(resultData);
            });
        }
        cm.payBefore = payBefore;
        /**
         * @private
         * @param postdata
         * @param callback
         */
        function quickRegister(postdata, callback) {
            var url = "http://gclogin.liebao.cn/api/user/quick_register";
            setProxy(url, postdata, egret.URLRequestMethod.POST, callback);
        }
        function setProxy(url, postData, method, callback) {
            var cmpostdata = "";
            for (var key in postData) {
                cmpostdata += key + "=" + postData[key] + "&";
            }
            if (cmpostdata != "") {
                cmpostdata = cmpostdata.substr(0, cmpostdata.length - 1);
            }
            console.log("cm old solution =" + url + "?" + cmpostdata);
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, function () {
                console.log("cm old solution  =" + loader.data);
                var jsonObj = JSON.parse(loader.data);
                callback(jsonObj);
            }, this);
            var request = new egret.URLRequest(url);
            request.method = method;
            request.data = new egret.URLVariables(cmpostdata);
            loader.load(request);
        }
    })(cm = nest.cm || (nest.cm = {}));
})(nest || (nest = {}));
/*
 * @private
 */
var nest;
(function (nest) {
    var cm;
    (function (cm) {
        var user;
        (function (user) {
            /*
             * @private
             */
            function checkLogin(loginInfo, callback) {
                var postData = {};
                function checkAfter(resultData) {
                    user.egretInfo = { egretUserId: resultData["data"]["id"] };
                    resultData["data"]["result"] = resultData["status"];
                    callback(resultData["data"]);
                }
                function loginHandler(resultData) {
                    if (resultData.ret == 1) {
                        resultData["access_token"] = resultData["ssid"];
                        //保存设备id
                        if (!egret.localStorage.getItem("deviceid")) {
                            egret.localStorage.setItem("deviceid", resultData["deviceid"]);
                        }
                        nest.cm.loginAfter(resultData, checkAfter, false);
                    }
                    else {
                        callback({ "result": 1 });
                    }
                }
                function loginHandler1(resultData) {
                    console.log("cm old loginHandler1");
                    console.log(JSON.stringify(resultData, null, 4));
                    var sendData = {};
                    sendData["access_token"] = resultData["cp"]["token"];
                    sendData["openid"] = resultData["user"]["openid"];
                    //保存设备id
                    egret.localStorage.setItem("cm_token", sendData["access_token"]);
                    console.log("cm old loginHandler2");
                    nest.cm.loginAfter(sendData, checkAfter, true);
                }
                function checkBefore(resultData) {
                    if (resultData["code"] == 0) {
                        var tempData = resultData["data"];
                        postData["client_id"] = tempData["client_id"];
                        postData["client_secret"] = tempData["client_secret"];
                        postData["redirect_uri"] = tempData["redirect_uri"];
                        //调用初始化桌面快捷方式
                        nest.cm.app.$initDesktop({
                            "Title": tempData["title"],
                            "DetailUrl": tempData["detailUrl"],
                            "PicUrl": tempData["picUrl"]
                        });
                        CMGAME_EGRET.checkIsGameSDK(function (isGameSDK, verGameSDK) {
                            if (isGameSDK) {
                                console.log("cm old checkIsGameSDK1");
                                var obj = {
                                    clientId: tempData["client_id"],
                                    clientSecret: tempData["client_secret"],
                                    redirectUri: tempData["redirect_uri"]
                                };
                                //保存设备id
                                if (egret.localStorage.getItem("cm_token")) {
                                }
                                console.log(JSON.stringify(obj, null, 4));
                                console.log("cm old checkIsGameSDK2");
                                CMGAME_EGRET.dispatchGameLoginData(obj, loginHandler1);
                            }
                            else {
                                console.log("cm old checkIsGameSDK2");
                                nest.cm.callRuntime({
                                    module: "user",
                                    action: "checkLogin",
                                    param: loginInfo,
                                    postData: postData
                                }, loginHandler);
                            }
                        });
                    }
                    else {
                        callback({ "result": 1 });
                    }
                }
                nest.cm.loginBefore(checkBefore);
            }
            user.checkLogin = checkLogin;
            /**
             * @private
             * 调用渠道登录接口
             * @param loginInfo
             * @param callback
             * @callback-param  @see nest.user.LoginCallbackInfo
             */
            function login(loginInfo, callback) {
                var data = { module: "user", action: "login", param: loginInfo };
                nest.cm.callRuntime(data, callback);
            }
            user.login = login;
        })(user = cm.user || (cm.user = {}));
    })(cm = nest.cm || (nest.cm = {}));
})(nest || (nest = {}));
/*
 * @private
 */
var nest;
(function (nest) {
    var cm;
    (function (cm) {
        var iap;
        (function (iap) {
            var isFirst = true;
            /**
             * 支付
             * @param orderInfo
             * @param callback
             */
            function pay(orderInfo, callback) {
                var succInt = 0;
                var cancInt = -1;
                var failInt = -2;
                cm.payBefore(orderInfo, function (data) {
                    if (data["code"] == 0) {
                        if (isFirst) {
                            CMPAY_EGRET.on('cmpay_order_complete', function (msg) {
                                console.log("cm old solution cmpay_order_complete  " + JSON.stringify(msg, null, 4));
                                if (msg["success"] == true) {
                                    callback({ "result": succInt });
                                }
                                else {
                                    if (msg["ret"] == 2) {
                                        callback({ "result": cancInt });
                                    }
                                    else {
                                        callback({ "result": failInt });
                                    }
                                }
                            });
                            isFirst = false;
                        }
                        var option = {
                            access_token: data["data"]["access_token"],
                            client_id: data["data"]["client_id"],
                            product_id: data["data"]["product_id"],
                            unit: data["data"]["unit"],
                            payload: data["data"]["payload"],
                            notify_url: data["data"]["notify_url"],
                            /* 我是分界线, 上边的参数是下单时必填的, 下面的参数是前端展示用的 */
                            money: data["data"]["money"],
                            order_name: data["data"]["order_name"],
                            game_icon: data["data"]["game_icon"],
                            game_name: data["data"]["game_name"] // 游戏名称, 仅供支付页面显示用
                        };
                        CMPAY_EGRET.purchase(option);
                    }
                    else {
                        callback({ result: failInt });
                    }
                });
            }
            iap.pay = pay;
        })(iap = cm.iap || (cm.iap = {}));
    })(cm = nest.cm || (nest.cm = {}));
})(nest || (nest = {}));
/*
 * @private
 */
var nest;
(function (nest) {
    var cm;
    (function (cm) {
        var share;
        (function (share) {
            /**
             * 是否支持分享
             * @priavte
             * @param callback
             * @callback-param {status:0, share:0}
             */
            function isSupport(info, callback) {
                callback({ result: 0, share: 0 });
            }
            share.isSupport = isSupport;
        })(share = cm.share || (cm.share = {}));
    })(cm = nest.cm || (nest.cm = {}));
})(nest || (nest = {}));
/*
 * @private
 */
var nest;
(function (nest) {
    var cm;
    (function (cm) {
        var app;
        (function (app) {
            var desktopInfo;
            /**
             * @private
             * 初始化浏览器快捷登陆需要的信息（目前只有猎豹可用，其他为空实现）
             * @param param
             */
            function $initDesktop(param) {
                desktopInfo = param;
                egret.ExternalInterface.call("save_shortcut_info", JSON.stringify({
                    token: String(Math.random()),
                    value: JSON.stringify(param)
                }));
            }
            app.$initDesktop = $initDesktop;
            /**
             * @private
             * 是否支持特定功能
             * @param callback
             * @callback-param  { status:"0" , attention :"1" , sendToDesktop : "1"}
             */
            function isSupport(info, callback) {
                if (CMPAY_EGRET.getVersion() != false && !isNaN(CMPAY_EGRET.getVersion()) && CMPAY_EGRET.getVersion() > 301030) {
                    callback({ result: 0, sendToDesktop: 1, attention: 0 });
                }
                else {
                    callback({ result: 0, sendToDesktop: 0, attention: 0 });
                }
            }
            app.isSupport = isSupport;
            /**
             * @private
             * 发送到桌面
             * @param appInfo
             * @param callback
             * @param callback-param result 0表示添加桌面成功，-1表示添加失败
             */
            function sendToDesktop(appInfo, callback) {
                if (desktopInfo) {
                    egret.ExternalInterface.call("push_icon", JSON.stringify({
                        title: desktopInfo.Title,
                        detailUrl: desktopInfo.DetailUrl,
                        picUrl: desktopInfo.PicUrl
                    }));
                    callback({ result: 0 });
                }
                else {
                    callback({ result: -1 });
                }
            }
            app.sendToDesktop = sendToDesktop;
        })(app = cm.app || (cm.app = {}));
    })(cm = nest.cm || (nest.cm = {}));
})(nest || (nest = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var nest;
(function (nest) {
    var qqhall;
    (function (qqhall) {
        qqhall.login_call_type = 102;
        qqhall.login_back_call_type = 100;
        qqhall.pay_call_type = 101;
        qqhall.share_call_type = 104;
        qqhall.login_callback_type = 200;
        qqhall.pay_callback_type = 201;
        qqhall.share_callback_type = 204;
        qqhall.loginCallback = null;
        qqhall.payCallback = null;
        qqhall.shareCallback = null;
        qqhall.version = "V1.0.0";
        qqhall.loginNum = 0;
        function setProxy(url, postData, method, callback) {
            var postdata = "";
            for (var key in postData) {
                postdata += key + "=" + postData[key] + "&";
            }
            if (postdata != "") {
                postdata = postdata.substr(0, postdata.length - 1);
            }
            console.log("[Nest]qq hall send : " + url + "?" + postdata);
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, function () {
                console.log("[Nest]qq hall get data : " + loader.data);
                var jsonObj = JSON.parse(loader.data);
                callback(jsonObj);
            }, this);
            var request = new egret.URLRequest(url);
            request.method = method;
            request.data = new egret.URLVariables(postdata);
            loader.load(request);
        }
        function payBefore(orderInfo, callback) {
            var url = nest.utils.$API_DOMAIN + "user/placeOrder";
            var postdata = {
                "id": qqhall.userId,
                "appId": nest.utils.$APP_ID,
                "time": Date.now(),
                "openid": qqhall.OpenId,
                "openkey": qqhall.OpenKey,
                "paytoken": qqhall.payToken,
                "runtime": 1
            };
            for (var k in orderInfo) {
                postdata[k] = orderInfo[k];
            }
            setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
                callback(resultData);
            });
        }
        qqhall.payBefore = payBefore;
        function callHall(data) {
            var msg = JSON.stringify(data);
            egret.ExternalInterface.call("HALL_EGRET_MSG_FROM", msg);
        }
        qqhall.callHall = callHall;
        function init() {
            egret.ExternalInterface.addCallback("HALL_EGRET_MSG_TO", function (data) {
                var info = JSON.parse(data);
                switch (info.msgType) {
                    case qqhall.login_callback_type:
                        if (info["accessToken"] == null) {
                            qqhall.loginNum++;
                            if (qqhall.loginNum >= 3) {
                                //彻底登陆失败
                                var loginCallbackInfo = {
                                    "result": -1,
                                    "token": undefined
                                };
                                qqhall.loginCallback.call(null, loginCallbackInfo);
                                qqhall.loginCallback = null;
                                return;
                            }
                            //登录失败，尝试重新登陆
                            var loginInfo = "OpenId/OpenKey 为空";
                            callHall({ msgType: qqhall.login_back_call_type, msgVersion: qqhall.version, errorID: 1, loginInfoStr: loginInfo });
                            callHall({ msgType: qqhall.login_call_type, msgVersion: qqhall.version });
                            return;
                        }
                        if (qqhall.loginCallback) {
                            qqhall.gameType = info["msgType"];
                            qqhall.gameVersion = info["msgVersion"];
                            qqhall.OpenId = info["openId"];
                            qqhall.OpenKey = info["accessToken"];
                            qqhall.enterType = info["enterType"];
                            qqhall.enterId = info["enterId"];
                            qqhall.payToken = info["payToken"];
                            var loginInfo = "登录成功";
                            callHall({ msgType: qqhall.login_back_call_type, msgVersion: qqhall.version, errorID: 0, loginInfoStr: loginInfo });
                            var api = nest.utils.$API_DOMAIN + "game/" + nest.utils.$getSpid() + "/" + nest.utils.$APP_ID;
                            var sendData = {};
                            sendData["openkey"] = qqhall.OpenKey;
                            sendData["openid"] = qqhall.OpenId;
                            sendData["paytoken"] = qqhall.payToken;
                            sendData["runtime"] = 1;
                            sendData["showGame"] = 1;
                            //需要发送 runtime=1 showGame=1 openkey= openid= paytoken=
                            setProxy(api, sendData, egret.URLRequestMethod.GET, function (resultData) {
                                var data = resultData.data;
                                qqhall.userId = data.id;
                                qqhall.loginCallback.call(null, data);
                                qqhall.loginCallback = null;
                            });
                        }
                        break;
                    case qqhall.pay_callback_type:
                        if (qqhall.payCallback) {
                            var result = -1;
                            var errorMsg; //todo
                            switch (info.payState) {
                                case -1: //未知问题
                                case 1: //用户取消
                                case 2:
                                    qqhall.payOrderInfo = null;
                                    qqhall.payCallback.call(null, { result: result, status: result });
                                    qqhall.payCallback = null;
                                    break;
                                case 0:
                                    qqhall.iap.repay();
                                    break;
                            }
                        }
                        break;
                    case qqhall.share_callback_type:
                        if (qqhall.shareCallback) {
                            var result = info.errorid;
                            qqhall.shareCallback.call(null, { result: result, status: result });
                            qqhall.shareCallback = null;
                        }
                        break;
                }
            });
        }
        qqhall.init = init;
    })(qqhall = nest.qqhall || (nest.qqhall = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var qqhall;
    (function (qqhall) {
        var user;
        (function (user) {
            function isSupport(info, callback) {
                var status = 0;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status,
                    "checkLogin": 0,
                    "login": 1,
                    "logout": 0,
                    "getInfo": 0
                };
                callback.call(null, loginCallbackInfo);
            }
            user.isSupport = isSupport;
            function checkLogin(loginInfo, callback) {
                var status = -1;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status,
                    "loginType": undefined,
                    "token": undefined
                };
                callback.call(null, loginCallbackInfo);
            }
            user.checkLogin = checkLogin;
            function login(loginInfo, callback) {
                qqhall.loginCallback = callback;
                qqhall.callHall({ msgType: qqhall.login_call_type, msgVersion: qqhall.version });
            }
            user.login = login;
        })(user = qqhall.user || (qqhall.user = {}));
    })(qqhall = nest.qqhall || (nest.qqhall = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var qqhall;
    (function (qqhall) {
        var iap;
        (function (iap) {
            function pay(orderInfo, callback) {
                if (qqhall.payOrderInfo) {
                    return;
                }
                qqhall.payOrderInfo = orderInfo;
                qqhall.payBefore(orderInfo, function (data) {
                    data = data.data;
                    if (data["code"] == 0) {
                        callback.call(null, { result: 0, status: 0 });
                    }
                    else {
                        qqhall.payCallback = callback;
                        qqhall.callHall({
                            msgType: qqhall.pay_call_type,
                            msgVersion: "V1.0.0",
                            acctType: "",
                            zoneId: "",
                            payValue: data["qCoins"],
                            isCanChange: false //目前只支持可改（true）
                        });
                    }
                });
            }
            iap.pay = pay;
            /**
             * 大厅充值成功后，再次调用付费接口
             */
            function repay() {
                if (qqhall.payOrderInfo) {
                    var orderInfo = qqhall.payOrderInfo;
                    var callback = qqhall.payCallback;
                    qqhall.payBefore(orderInfo, function (data) {
                        data = data.data;
                        var result = data["status"];
                        callback.call(null, { result: result, status: result });
                    });
                    qqhall.payOrderInfo = null;
                    qqhall.payCallback = null;
                }
            }
            iap.repay = repay;
        })(iap = qqhall.iap || (qqhall.iap = {}));
    })(qqhall = nest.qqhall || (nest.qqhall = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var qqhall;
    (function (qqhall) {
        var app;
        (function (app) {
            function isSupport(info, callback) {
                var status = 0;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status,
                    "attention": 0,
                    "sendToDesktop": 0,
                    "exitGame": 1
                };
                callback.call(null, loginCallbackInfo);
            }
            app.isSupport = isSupport;
            function exitGame(callback) {
                //todo
                var status = 0;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status
                };
                callback.call(null, loginCallbackInfo);
            }
            app.exitGame = exitGame;
            function attention(appInfo, callback) {
            }
            app.attention = attention;
            function sendToDesktop(appInfo, callback) {
            }
            app.sendToDesktop = sendToDesktop;
        })(app = qqhall.app || (qqhall.app = {}));
    })(qqhall = nest.qqhall || (nest.qqhall = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var qqhall;
    (function (qqhall) {
        var share;
        (function (share_1) {
            function isSupport(info, callback) {
                var status = 0;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status,
                    "share": 1
                };
                callback.call(null, loginCallbackInfo);
            }
            share_1.isSupport = isSupport;
            /**
             * 分享
             * @param shareInfo
             * @param callback
             * @callback-param result 0 表示分享成功，-1表示用户取消
             */
            function share(shareInfo, callback) {
                qqhall.shareCallback = callback;
                qqhall.callHall({
                    msgType: qqhall.share_call_type,
                    msgVersion: "V1.0.0",
                    title: shareInfo.title,
                    summary: shareInfo.description,
                    imageLocalUrl: "",
                    targetUrl: shareInfo.url
                });
            }
            share_1.share = share;
        })(share = qqhall.share || (qqhall.share = {}));
    })(qqhall = nest.qqhall || (nest.qqhall = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var qqhall;
    (function (qqhall) {
        var social;
        (function (social) {
            function isSupport(info, callback) {
                var status = 0;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status,
                    "getFriends": 0,
                    "openBBS": 0
                };
                callback.call(null, loginCallbackInfo);
            }
            social.isSupport = isSupport;
            function getFriends(socialInfo, callback) {
            }
            social.getFriends = getFriends;
            function openBBS(socialInfo, callback) {
            }
            social.openBBS = openBBS;
        })(social = qqhall.social || (qqhall.social = {}));
    })(qqhall = nest.qqhall || (nest.qqhall = {}));
})(nest || (nest = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var nest;
(function (nest) {
    var qqhall2;
    (function (qqhall2) {
        var login_call_type = 100;
        var pay_call_type = 101;
        var share_call_type = 104;
        var friend_call_type = 105;
        var refresh_token_call_type = 106;
        var check_call_type = 107;
        var user_info_call_type = 108;
        var login_type_call_type = 109;
        var login_callback_type = 200;
        var pay_callback_type = 201;
        var share_callback_type = 204;
        var refresh_token_callback_type = 206;
        var check_callback_type = 207;
        var user_info_callback_type = 208;
        var login_type_callback_type = 209;
        var loginCallback = null;
        var payCallback = null;
        var shareCallback = null;
        var refreshTokenCallback = null;
        var checkCallback = null;
        var userInfoCallback = null;
        var loginTypeCallback = null;
        var version = "1.0.0";
        var appid;
        var appsig;
        var appsigData;
        //默认没有余额
        var balance = 0;
        var gen_balance;
        var first_save;
        var save_amt;
        var baseinfo;
        var gameType;
        var gameVersion;
        var openId;
        var accessToken;
        var enterType;
        var enterId;
        var payToken;
        var qbopenid;
        var qbopenkey;
        var nickName;
        var avatarUrl;
        var userId;
        var pf;
        var loginType = [];
        var payOrderInfo;
        var payType;
        var payValue;
        var payItem;
        var payInfo;
        var customMeta;
        function setProxy(url, postData, method, callback) {
            var postdata = "";
            for (var key in postData) {
                postdata += key + "=" + encodeURIComponent(postData[key]) + "&";
            }
            if (postdata != "") {
                postdata = postdata.substr(0, postdata.length - 1);
            }
            var msg = "[Nest]qq hall2 send : " + url + "?" + postdata;
            for (var i = 0; i < Math.ceil(msg.length / 450); i++) {
                nest.utils.$log(msg.slice(i * 450, (i + 1) * 450));
            }
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, function () {
                nest.utils.$log("[Nest]qq hall2 get data : " + loader.data);
                var jsonObj = JSON.parse(loader.data);
                callback(jsonObj);
            }, this);
            var request = new egret.URLRequest(url);
            request.method = method;
            request.data = new egret.URLVariables(postdata);
            loader.load(request);
        }
        function payBefore(orderInfo, callback) {
            var url = nest.utils.$API_DOMAIN + "user/placeOrder";
            var postdata = {
                "id": userId,
                "appId": nest.utils.$APP_ID,
                "time": Date.now(),
                "qbopenkey": qbopenkey,
                "runtime": 1
            };
            for (var k in orderInfo) {
                postdata[k] = orderInfo[k];
            }
            setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
                callback(resultData);
            });
        }
        function payAfter(payInfo, callback) {
            var url = nest.utils.$API_DOMAIN + "pay/" + nest.utils.$getSpid() + "/" + nest.utils.$APP_ID;
            setProxy(url, payInfo, egret.URLRequestMethod.GET, function (resultData) {
                callback(resultData);
            });
        }
        function callHall(data) {
            var msg = JSON.stringify(data);
            nest.utils.$log("call hall : " + msg);
            egret.ExternalInterface.call("HALL_EGRET_MSG_FROM", msg);
        }
        //查询钻石
        function check(callback) {
            checkCallback = callback;
            callHall({
                msgType: check_call_type,
                appid: appid,
                appsig: appsig,
                appsigData: appsigData,
                qbopenid: qbopenid,
                msgVersion: version
            });
        }
        //查询用户信息
        function userInfo(callback) {
            userInfoCallback = callback;
            callHall({
                msgType: user_info_call_type,
                appid: appid,
                appsig: appsig,
                msgVersion: version
            });
        }
        //刷新票据
        function refreshToken(callback) {
            refreshTokenCallback = callback;
            callHall({
                msgType: refresh_token_call_type,
                appid: appid,
                qbopenid: qbopenid,
                refreshToken: "",
                msgVersion: version
            });
        }
        //刷新票据
        function getLoginType(callback) {
            loginTypeCallback = callback;
            callHall({
                msgType: login_type_call_type,
                appid: appid,
                appsig: appsig,
                appsigData: appsigData,
                qbopenid: "",
                qbopenkey: "",
                msgVersion: version
            });
        }
        function init() {
            egret.ExternalInterface.addCallback("HALL_EGRET_MSG_TO", function (data) {
                nest.utils.$log("get hall data : " + data);
                for (var i = 0; i < Math.ceil(data.length / 450); i++) {
                    nest.utils.$log(data.slice(i * 450, (i + 1) * 450));
                }
                var info = JSON.parse(data);
                var result;
                switch (info.msgType) {
                    case login_callback_type:
                        if (loginCallback) {
                            result = info["result"];
                            if (result == 0) {
                                gameType = info["msgType"];
                                gameVersion = info["msgVersion"];
                                openId = info["openId"];
                                accessToken = info["accessToken"];
                                enterType = info["enterType"];
                                enterId = info["enterId"];
                                payToken = info["payToken"];
                                qbopenid = info["qbopenid"];
                                qbopenkey = info["qbopenkey"];
                                nickName = info["nickName"];
                                avatarUrl = info["avatarUrl"];
                                var send = function () {
                                    if (loginCallback) {
                                        var api = nest.utils.$API_DOMAIN + "game/" + nest.utils.$getSpid() + "/" + nest.utils.$APP_ID;
                                        var sendData = {};
                                        sendData.openId = openId;
                                        sendData.accessToken = accessToken;
                                        sendData.payToken = payToken;
                                        sendData.qbopenid = qbopenid;
                                        sendData.qbopenkey = qbopenkey;
                                        sendData.nickName = nickName;
                                        sendData.avatarUrl = avatarUrl;
                                        sendData.balance = balance;
                                        sendData.gen_balance = gen_balance;
                                        sendData.first_save = first_save;
                                        sendData.save_amt = save_amt;
                                        sendData.pf = pf;
                                        sendData.baseinfo = JSON.stringify(baseinfo);
                                        sendData.runtime = 1;
                                        setProxy(api, sendData, egret.URLRequestMethod.GET, function (resultData) {
                                            var data = resultData.data;
                                            userId = data.id;
                                            loginCallback.call(null, data);
                                            loginCallback = null;
                                            //获取好友
                                            //callHall({
                                            //    msgType: friend_call_type,
                                            //    appid: appid,
                                            //    appsig: appsig,
                                            //    qbopenid: qbopenid,
                                            //    qbopenkey: qbopenkey,
                                            //    msgVersion: version
                                            //})
                                        });
                                    }
                                };
                                var checkComplete = false;
                                var userInfoComplete = false;
                                check(function () {
                                    checkComplete = true;
                                    if (checkComplete && userInfoComplete) {
                                        send();
                                    }
                                });
                                userInfo(function () {
                                    userInfoComplete = true;
                                    if (checkComplete && userInfoComplete) {
                                        send();
                                    }
                                });
                            }
                            else {
                                //登录失败
                                loginCallback.call(null, { result: -2 });
                                loginCallback = null;
                            }
                        }
                        break;
                    case pay_callback_type:
                        if (payCallback) {
                            if (payType == 0) {
                                check(function () {
                                    iap.repay();
                                });
                            }
                            else {
                                //后台验证支付
                                var payAfterData = {};
                                payAfterData.realSaveNum = info.realSaveNum;
                                payAfterData.orderno = info.orderno;
                                payAfterData.customMeta = customMeta;
                                payAfter(payAfterData, function (data) {
                                    if (data.code == 0) {
                                        payOrderInfo = null;
                                        payCallback.call(null, { result: 0, status: 0 });
                                        payCallback = null;
                                    }
                                    else {
                                        payOrderInfo = null;
                                        payCallback.call(null, { result: -2, status: -2 });
                                        payCallback = null;
                                    }
                                });
                                break;
                            }
                        }
                        break;
                    case share_callback_type:
                        if (shareCallback) {
                            result = info.errorid;
                            shareCallback.call(null, { result: result, status: result });
                            shareCallback = null;
                        }
                        break;
                    case refresh_token_callback_type:
                        if (info.result == 0) {
                            qbopenkey = info.qbopenkey;
                        }
                        if (refreshTokenCallback) {
                            refreshTokenCallback.call(null);
                            refreshTokenCallback = null;
                        }
                        break;
                    case check_callback_type:
                        //这里有可能报错token过期导致无法获取,用默认balance=0解决.这样充值时呼起米大师
                        if (info.result == 0) {
                            balance = info.balance;
                            gen_balance = info.gen_balance;
                            first_save = info.first_save;
                            save_amt = info.save_amt;
                        }
                        else {
                        }
                        if (checkCallback) {
                            checkCallback.call(null);
                            checkCallback = null;
                        }
                        break;
                    case user_info_callback_type:
                        if (info.result == 0) {
                            baseinfo = info.baseinfo;
                        }
                        if (userInfoCallback) {
                            userInfoCallback.call(null);
                            userInfoCallback = null;
                        }
                        break;
                    case login_type_callback_type:
                        if (info.loginType == 1) {
                            loginType.push("qq");
                        }
                        else if (info.loginType == 2) {
                            loginType.push("wx");
                        }
                        else if (info.loginType == 3) {
                            loginType.push("qq");
                            loginType.push("wx");
                        }
                        if (loginTypeCallback) {
                            loginTypeCallback.call(null);
                            loginTypeCallback = null;
                        }
                        break;
                }
            });
        }
        qqhall2.init = init;
        var user;
        (function (user) {
            function isSupport(info, callback) {
                getLoginType(function () {
                    var result = 0;
                    var loginCallbackInfo = {
                        "status": result,
                        "result": result,
                        "loginType": loginType,
                        "checkLogin": 0,
                        "login": 1,
                        "logout": 0,
                        "getInfo": 0
                    };
                    callback.call(null, loginCallbackInfo);
                });
            }
            user.isSupport = isSupport;
            function checkLogin(loginInfo, callback) {
                //获取appid
                var url = nest.utils.$API_DOMAIN + "app/getSignInfo";
                var postdata = {
                    "egretChanId": nest.utils.$getSpid(),
                    "appId": nest.utils.$APP_ID
                };
                setProxy(url, postdata, egret.URLRequestMethod.GET, function (resultData) {
                    appid = resultData.data.appid;
                    appsig = resultData.data.appsig;
                    appsigData = resultData.data.appsigdata;
                    var result = -2;
                    var loginCallbackInfo = {
                        "status": result,
                        "result": result,
                        "loginType": undefined,
                        "token": undefined
                    };
                    callback.call(null, loginCallbackInfo);
                });
            }
            user.checkLogin = checkLogin;
            function login(loginInfo, callback) {
                loginCallback = callback;
                pf = loginInfo.loginType;
                callHall({
                    msgType: login_call_type,
                    appid: appid,
                    appsig: appsig,
                    appsigData: appsigData,
                    loginType: pf,
                    msgVersion: version
                });
            }
            user.login = login;
        })(user = qqhall2.user || (qqhall2.user = {}));
        var iap;
        (function (iap) {
            function pay(orderInfo, callback) {
                if (payOrderInfo) {
                    return;
                }
                payOrderInfo = orderInfo;
                //刷新票据,之后去开平获取金额,之后决定充值还是购买商品
                refreshToken(function () {
                    payBefore(orderInfo, function (data) {
                        data = data.data;
                        payValue = data.payValue;
                        payInfo = data.payInfo;
                        payItem = data.payItem;
                        customMeta = data.customMeta;
                        payCallback = callback;
                        //余额不足
                        if (payValue > balance) {
                            payType = 0;
                        }
                        else {
                            payType = 1;
                        }
                        payCallHall();
                    });
                });
            }
            iap.pay = pay;
            /**
             * 大厅充值成功后，再次调用付费接口
             */
            function repay() {
                if (payValue > balance) {
                    //充值的钱还是不够
                    if (payCallback) {
                        payOrderInfo = null;
                        payCallback.call(null, { result: -2, status: -2 });
                        payCallback = null;
                    }
                }
                else {
                    payType = 1;
                    payCallHall();
                }
            }
            iap.repay = repay;
            function payCallHall() {
                callHall({
                    msgType: pay_call_type,
                    msgVersion: version,
                    payType: payType,
                    appid: appid,
                    appsig: appsig,
                    appsigData: appsigData,
                    payItem: payItem,
                    payInfo: payInfo,
                    reqTime: Date.now(),
                    customMeta: customMeta,
                    payValue: payValue,
                    qbopenid: qbopenid,
                    qbopenkey: qbopenkey,
                    isCanChange: false //不可更改金额
                });
            }
        })(iap = qqhall2.iap || (qqhall2.iap = {}));
        var app;
        (function (app) {
            function isSupport(info, callback) {
                var result = 0;
                var loginCallbackInfo = {
                    "status": result,
                    "result": result,
                    "attention": 0,
                    "sendToDesktop": 0,
                    "exitGame": 0
                };
                callback.call(null, loginCallbackInfo);
            }
            app.isSupport = isSupport;
            function exitGame(appInfo, callback) {
            }
            app.exitGame = exitGame;
            function attention(appInfo, callback) {
            }
            app.attention = attention;
            function sendToDesktop(appInfo, callback) {
            }
            app.sendToDesktop = sendToDesktop;
        })(app = qqhall2.app || (qqhall2.app = {}));
        var share;
        (function (share_1) {
            function isSupport(info, callback) {
                var result = 0;
                var loginCallbackInfo = {
                    "status": result,
                    "result": result,
                    "share": 1
                };
                callback.call(null, loginCallbackInfo);
            }
            share_1.isSupport = isSupport;
            /**
             * 分享
             * @param shareInfo
             * @param callback
             * @callback-param result 0 表示分享成功，-1表示用户取消
             */
            function share(shareInfo, callback) {
                shareCallback = callback;
                refreshToken(function () {
                    callHall({
                        msgType: share_call_type,
                        msgVersion: version,
                        appid: appid,
                        appsig: appsig,
                        appsigData: appsigData,
                        qbopenid: qbopenid,
                        qbopenkey: qbopenkey,
                        title: shareInfo.title,
                        summary: shareInfo.description,
                        imageLocalUrl: shareInfo.img_url,
                        img_title: shareInfo.title,
                        cus_txt: "",
                        targetUrl: shareInfo.url
                    });
                });
            }
            share_1.share = share;
        })(share = qqhall2.share || (qqhall2.share = {}));
        var social;
        (function (social) {
            function isSupport(info, callback) {
                var status = 0;
                var loginCallbackInfo = {
                    "status": status,
                    "result": status,
                    "getFriends": 0,
                    "openBBS": 0
                };
                callback.call(null, loginCallbackInfo);
            }
            social.isSupport = isSupport;
            function getFriends(socialInfo, callback) {
            }
            social.getFriends = getFriends;
            function openBBS(socialInfo, callback) {
            }
            social.openBBS = openBBS;
        })(social = qqhall2.social || (qqhall2.social = {}));
    })(qqhall2 = nest.qqhall2 || (nest.qqhall2 = {}));
})(nest || (nest = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var nest;
(function (nest) {
    var h5;
    (function (h5) {
        h5.uid = undefined;
        var user;
        (function (user) {
            function isSupport(info, callback) {
                var loginType = [];
                if (nest.utils.$isQQBrowser()) {
                    loginType.push("qq");
                    loginType.push("wx");
                }
                var loginCallbackInfo = {
                    "result": 0,
                    "loginType": loginType,
                    "getInfo": 0
                };
                callback.call(null, loginCallbackInfo);
            }
            user.isSupport = isSupport;
            function checkLogin(loginInfo, callback) {
                var egretH5SdkCallback = function (data) {
                    nest.h5.uid = data.id;
                    var status = data.status;
                    if (nest.h5.uid) {
                        status = 0;
                    }
                    var loginCallbackInfo = {
                        "result": status,
                        "token": data.token
                    };
                    callback.call(null, loginCallbackInfo);
                };
                EgretH5Sdk.checkLogin(egretH5SdkCallback, null);
            }
            user.checkLogin = checkLogin;
            function login(loginInfo, callback) {
                var egretH5SdkCallback = function (data) {
                    nest.h5.uid = data.id;
                    var status = data.status;
                    if (nest.h5.uid) {
                        status = 0;
                    }
                    var loginCallbackInfo = {
                        "result": status,
                        "token": data.token
                    };
                    callback.call(null, loginCallbackInfo);
                };
                EgretH5Sdk.login(egretH5SdkCallback, null, loginInfo.loginType);
            }
            user.login = login;
            function logout(loginInfo, callback) {
                var egretH5SdkCallback = function (data) {
                    var status = data.status;
                    var result = status == 1 ? 0 : 1;
                    callback.call(null, { "result": result });
                };
                EgretH5Sdk.logout(egretH5SdkCallback, null);
            }
            user.logout = logout;
        })(user = h5.user || (h5.user = {}));
        var iap;
        (function (iap) {
            function pay(orderInfo, callback) {
                if (nest.h5.uid) {
                    orderInfo["appId"] = nest.utils.$APP_ID;
                    orderInfo["uId"] = nest.h5.uid;
                    EgretH5Sdk.pay(orderInfo, function (data) {
                        callback(data);
                    }, this);
                }
            }
            iap.pay = pay;
        })(iap = h5.iap || (h5.iap = {}));
        var share;
        (function (share_1) {
            function isSupport(info, callback) {
                var egretH5SdkCallback = function (data) {
                    var status = data.status;
                    var loginCallbackInfo = { "share": status };
                    callback.call(null, loginCallbackInfo);
                };
                EgretH5Sdk.isOpenShare(nest.utils.$APP_ID, nest.h5.uid, egretH5SdkCallback, null);
            }
            share_1.isSupport = isSupport;
            function share(shareInfo, callback) {
                var egretH5SdkCallback = function (data) {
                    var status = data.status;
                    if (status == 0) {
                        status = -1;
                    }
                    else if (status == 1) {
                        status = 0;
                    }
                    var loginCallbackInfo = { "status": status, "result": status };
                    callback.call(null, loginCallbackInfo);
                };
                EgretH5Sdk.share(nest.utils.$APP_ID, nest.h5.uid, shareInfo, egretH5SdkCallback, null);
            }
            share_1.share = share;
        })(share = h5.share || (h5.share = {}));
        var social;
        (function (social) {
            function isSupport(info, callback) {
                callback.call(null, { "result": 0, "getFriends": 0, "openBBS": 0 });
            }
            social.isSupport = isSupport;
            function getFriends(data, callback) {
                //
            }
            social.getFriends = getFriends;
            function openBBS(data, callback) {
                //
            }
            social.openBBS = openBBS;
        })(social = h5.social || (h5.social = {}));
        var app;
        (function (app) {
            function isSupport(info, callback) {
                var egretH5SdkCallback = function (data) {
                    var status = data.status;
                    var loginCallbackInfo = { "attention": status };
                    callback.call(null, loginCallbackInfo);
                };
                EgretH5Sdk.isOpenAttention(nest.utils.$APP_ID, nest.h5.uid, egretH5SdkCallback, null);
            }
            app.isSupport = isSupport;
            function attention(appInfo, callback) {
                EgretH5Sdk.attention(nest.utils.$APP_ID, nest.h5.uid);
                callback.call(null, { "result": 0 });
            }
            app.attention = attention;
            function sendToDesktop(appInfo, callback) {
                callback.call(null, { "result": -1 });
            }
            app.sendToDesktop = sendToDesktop;
            function getInfo(appInfo, callback) {
                var egretH5SdkCallback = function (data) {
                    var callbackInfo = { result: 0, "contact": data.contact };
                    callback.call(null, callbackInfo);
                };
                EgretH5Sdk.getCustomInfo(nest.utils.$APP_ID, nest.h5.uid, egretH5SdkCallback, null);
            }
            app.getInfo = getInfo;
        })(app = h5.app || (h5.app = {}));
    })(h5 = nest.h5 || (nest.h5 = {}));
})(nest || (nest = {}));
//新版
var nest;
(function (nest) {
    var h5_2;
    (function (h5_2) {
        var user;
        (function (user) {
            function isSupport(info, callback) {
                var loginType = [];
                if (nest.utils.$isQQBrowser()) {
                    loginType.push("qq");
                    loginType.push("wx");
                }
                var loginCallbackInfo = {
                    "result": 0,
                    "loginType": loginType,
                    "getInfo": 0
                };
                callback.call(null, loginCallbackInfo);
            }
            user.isSupport = isSupport;
            function checkLogin(loginInfo, callback) {
                EgretH5Sdk.checkLogin(loginInfo, callback);
            }
            user.checkLogin = checkLogin;
            function login(loginInfo, callback) {
                EgretH5Sdk.login(loginInfo, callback);
            }
            user.login = login;
            function logout(loginInfo, callback) {
                EgretH5Sdk.logout(loginInfo, callback);
            }
            user.logout = logout;
            function getInfo(loginInfo, callback) {
                callback.call(null, { "result": -2 });
            }
            user.getInfo = getInfo;
        })(user = h5_2.user || (h5_2.user = {}));
        var iap;
        (function (iap) {
            function pay(orderInfo, callback) {
                EgretH5Sdk.pay(orderInfo, callback);
            }
            iap.pay = pay;
        })(iap = h5_2.iap || (h5_2.iap = {}));
        var share;
        (function (share_2) {
            function isSupport(info, callback) {
                var supportShareCallback = function (data) {
                    var status = data.result;
                    var shareCallbackInfo = { "share": status, "msg": data.msg };
                    callback.call(null, shareCallbackInfo);
                };
                EgretH5Sdk.isSupportShare({}, supportShareCallback);
            }
            share_2.isSupport = isSupport;
            function setDefaultData(shareInfo, callback) {
                shareInfo["imgUrl"] = shareInfo.img_url;
                EgretH5Sdk.setShareDefaultData(shareInfo, callback);
            }
            share_2.setDefaultData = setDefaultData;
            function share(shareInfo, callback) {
                shareInfo["imgUrl"] = shareInfo.img_url;
                EgretH5Sdk.share(shareInfo, callback);
            }
            share_2.share = share;
        })(share = h5_2.share || (h5_2.share = {}));
        var social;
        (function (social) {
            function isSupport(info, callback) {
                callback.call(null, { "result": 0, "getFriends": 0, "openBBS": 0 });
            }
            social.isSupport = isSupport;
            function getFriends(data, callback) {
                callback.call(null, { "result": -2 });
            }
            social.getFriends = getFriends;
            function openBBS(data, callback) {
                callback.call(null, { "result": -2 });
            }
            social.openBBS = openBBS;
        })(social = h5_2.social || (h5_2.social = {}));
        var app;
        (function (app) {
            function isSupport(info, callback) {
                var egretH5SdkCallback = function (data) {
                    var status = data.result;
                    var loginCallbackInfo = { "attention": status, "getInfo": 1, "exitGame": 0, "sendToDesktop": 0 };
                    callback.call(null, loginCallbackInfo);
                };
                EgretH5Sdk.isSupportAttention({}, egretH5SdkCallback);
            }
            app.isSupport = isSupport;
            function attention(appInfo, callback) {
                EgretH5Sdk.attention({}, callback);
            }
            app.attention = attention;
            function sendToDesktop(appInfo, callback) {
                callback.call(null, { "result": -2 });
            }
            app.sendToDesktop = sendToDesktop;
            function exitGame(appInfo, callback) {
                callback.call(null, { "result": -2 });
            }
            app.exitGame = exitGame;
            function getInfo(appInfo, callback) {
                EgretH5Sdk.getCustomInfo({}, callback);
            }
            app.getInfo = getInfo;
        })(app = h5_2.app || (h5_2.app = {}));
    })(h5_2 = nest.h5_2 || (nest.h5_2 = {}));
})(nest || (nest = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
nest.core = nest.core || {};
nest.core.startup = function (info, callback) {
    try {
        new egret.HashObject();
        nest.utils.$EGRET_SUPPORT = true;
    }
    catch (e) {
        nest.utils.$EGRET_SUPPORT = false;
    }
    var api = "http://api.egret-labs.org/v2/";
    nest.utils.$APP_ID = info.egretAppId;
    nest.utils.$DEBUG_LOG = info.debug;
    if (nest.utils.$isRuntime) {
        //qq渠道换为腾讯云
        if (nest.utils.$isQQBrowser() || nest.utils.$isTargetPlatform(10080) || nest.utils.$isTargetPlatform(10835) || nest.utils.$isTargetPlatform(20546)) {
            api = "http://api.gz.1251278653.clb.myqcloud.com/v2/";
        }
        nest.utils.$API_DOMAIN = api;
        nest.core.callCustomMethod = nest.runtime.core.callCustomMethod;
        //猎豹
        if (nest.utils.$isTargetPlatform(10044) || (!nest.utils.$getOption("egret.runtime.nest"))) {
            egret_native["setOption"]("channelTag", "liebao");
            CMPAY_DEBUG = false;
            var spid;
            if (nest.utils.$APP_ID == 85 || nest.utils.$APP_ID == 88) {
                spid = 10044;
            }
            else {
                spid = 18287;
            }
            egret_native["setOption"]("egret.runtime.spid", spid);
            nest.utils.$spid = spid;
            nest.utils.$changeMethod("cm");
        }
        else if (nest.utils.$isTargetPlatform(10835) || nest.utils.$isTargetPlatform(20546)) {
            var spid;
            //古龙和萌战机用旧版API
            if (nest.utils.$APP_ID == 66 || nest.utils.$APP_ID == 86) {
                nest.qqhall.init();
                nest.utils.$changeMethod("qqhall");
            }
            else {
                nest.qqhall2.init();
                nest.utils.$changeMethod("qqhall2");
            }
        }
        else {
            nest.utils.$changeMethod("runtime");
        }
    }
    else {
        var domain = nest.utils.$getOption("egretServerDomain");
        if (domain) {
            api = domain + "/";
        }
        else {
            nest.utils.$API_DOMAIN = api;
        }
        var sdkDomain = nest.utils.$getOption("egretSdkDomain");
        if (!sdkDomain) {
            sdkDomain = nest.utils.$API_DOMAIN;
        }
        if (info.version == 2) {
            //新版api
            nest.utils.$changeMethod("h5_2");
            //加载h5sdk
            var url = sdkDomain + "/misc/scripts/egreth5sdk.js";
            var s = document.createElement('script');
            if (s.hasOwnProperty("async")) {
                s.async = false;
            }
            s.src = url;
            s.id = "egreth5sdk";
            s.addEventListener('load', function () {
                this.removeEventListener('load', arguments.callee, false);
                EgretH5Sdk.init({}, callback);
            }, false);
            s.addEventListener('error', function () {
                s.parentNode.removeChild(s);
                this.removeEventListener('error', arguments.callee, false);
                callback({ "result": -2 });
            }, false);
            document.head.appendChild(s);
            return;
        }
        else {
            //旧版api
            nest.utils.$changeMethod("h5");
        }
    }
    callback({ "result": 0 });
};

