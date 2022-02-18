var loadingView = (function () {
    function loadingView() {
        this.sOS = conchConfig.getOS();
        if (this.sOS == "Conch-ios") {
            this.bridge = PlatformClass.createClass("JSBridge");
        }
        else if (this.sOS == "Conch-android") {
            this.bridge = PlatformClass.createClass("demo.JSBridge");
        }
    }
    Object.defineProperty(loadingView.prototype, "loadingAutoClose", {
        get: function () {
            return this._loadingAutoClose;
        },
        set: function (value) {
            this._loadingAutoClose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(loadingView.prototype, "showTextInfo", {
        get: function () {
            return this._showTextInfo;
        },
        set: function (value) {
            this._showTextInfo = value;
            if (this.bridge) {
                if (this.sOS == "Conch-ios") {
                    this.bridge.call("showTextInfo:", value);
                }
                else if (this.sOS == "Conch-android") {
                    this.bridge.call("showTextInfo", value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    loadingView.prototype.bgColor = function (value) {
        if (this.bridge) {
            if (this.sOS == "Conch-ios") {
                this.bridge.call("bgColor:", value);
            }
            else if (this.sOS == "Conch-android") {
                this.bridge.call("bgColor", value);
            }
        }
    };
    loadingView.prototype.setFontColor = function (value) {
        if (this.bridge) {
            if (this.sOS == "Conch-ios") {
                this.bridge.call("setFontColor:", value);
            }
            else if (this.sOS == "Conch-android") {
                this.bridge.call("setFontColor", value);
            }
        }
    };
    loadingView.prototype.setPercent = function (value) {
        if (this.bridge) {
            if (this.sOS == "Conch-android") {
                this.bridge.call("setPercent", value);
            }
        }
    };
    loadingView.prototype.setTips = function (value) {
        if (this.bridge) {
            if (this.sOS == "Conch-ios") {
                this.bridge.call("setTips:", value);
            }
            else if (this.sOS == "Conch-android") {
                this.bridge.call("setTips", value);
            }
        }
    };
    loadingView.prototype.loading = function (value) {
        if (this.bridge) {
            if (this.sOS == "Conch-ios") {
                this.bridge.call("loading:", value);
            }
            else if (this.sOS == "Conch-android") {
                this.bridge.call("loading", value);
            }
        }
    };
    loadingView.prototype.hideLoadingView = function () {
        this.bridge.call("hideSplash");
    };
    return loadingView;
}());

window.loadingView = new loadingView();
if(window.loadingView)
{
    window.loadingView.loadingAutoClose=false;//true代表当动画播放完毕，自动进入游戏。false为开发者手动控制
    window.loadingView.bgColor("#FFFFFF");//设置背景颜色
    window.loadingView.setFontColor("#000000");//设置字体颜色
//    window.loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
     window.loadingView.setTips(["加载中..."]);
}
window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}

//setTimeout(3000,()=>{
//    window.loadingView.hideLoadingView();
//})

//注册葫芦娃接口
window.tr = {};
tr.bridge = PlatformClass.createClass("demo.HlwBridge");
tr.platform = "android";//设置平台信息
tr["c_login"] = function()
{
    tr.bridge.call("login");
}
tr["c_logout"] = function()
{
    tr.bridge.call("logout");
}
tr["c_sendinfo"]=function(value)
{
    tr.bridge.call("sendinfo",value);
}
tr["c_pay"]=function(value){
    tr.bridge.call("pay",value);
}
tr["c_reload"]=function(value){
    tr.bridge.call("reload",value);
}
tr["c_codeEnd"]=function(){
    tr.bridge.call("codeEnd");
}
tr["c_isCodeInit"]=function(){
    return tr.bridge.call("isCodeInit");
}
tr["c_openurl"]=function(url){
    tr.bridge.call("openurl",url);
}
tr.bridge.call("resetInit");
function isExitsFunction(funcName) { try { if (typeof (eval(funcName)) == "function") { return true; } } catch (e) { } return false; }
var i = 0;
function tr_check() {
    i++;
    console.log(i+">start check!!! "+tr["c_isCodeInit"]()); if (isExitsFunction("tr_init")) { window["tr_init"]() } else { setTimeout(() => { tr_check(); }, 1000); }
}
tr_check();