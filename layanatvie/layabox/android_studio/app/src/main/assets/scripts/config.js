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
    window.loadingView.loadingAutoClose=false;//true???????????????????????????????????????????????????false????????????????????????
    window.loadingView.bgColor("#FFFFFF");//??????????????????
    window.loadingView.setFontColor("#000000");//??????????????????
//    window.loadingView.setTips(["??????????????????????????????","????????????30???????????????","????????????????????????????????????"]);//??????tips????????????????????????
     window.loadingView.setTips(["?????????..."]);
}
window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("????????????????????????????????????????????????????????????????????????");
}

//setTimeout(3000,()=>{
//    window.loadingView.hideLoadingView();
//})

//?????????????????????
window.tr = {};
if(window.innerWidth!=undefined && window.innerHeight!=undefined && window.innerHeight / window.innerWidth > 2){
    window["OFFSET_Y"] = 78;
    window["OFFSET_BOTTOM"] = 20;
}
//console.log("wh>>>"+ window.innerWidth + ","+window.innerHeight );
tr.bridge = PlatformClass.createClass("demo.HlwBridge");
tr.platform = "android";//??????????????????
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
tr["c_sendDevicePointCp"]=function(type){
    tr.bridge.call("sendDevicePointCp",type);
}
tr.bridge.call("resetInit");
function isExitsFunction(funcName) { try { if (typeof (eval(funcName)) == "function") { return true; } } catch (e) { } return false; }
var i = 0;
function tr_check() {
    i++;
    console.log(i+">start check!!! "+tr["c_isCodeInit"]());
    if (isExitsFunction("tr_init")) {
//        console.log("this is tr_init!");
        window["tr_init"]()
    } else {
            setTimeout(() => { tr_check(); }, 1000);
    }
}
tr_check();