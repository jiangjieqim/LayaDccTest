// 程序入口
var GameMain = /** @class */ (function () {
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html
    function GameMain() {
        //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html
        this.imgURL = "http://192.168.2.107:8001/LayaDccTest/res/ic_launcher.png";
        Laya.init(window.innerWidth, window.innerHeight);
        Laya.loader.load(this.imgURL, new Laya.Handler(this, this.onComplete));
    }
    GameMain.prototype.onComplete = function (e) {
        var img = new Laya.Image();
        img.skin = this.imgURL;
        Laya.stage.addChild(img);
        console.log(e);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map