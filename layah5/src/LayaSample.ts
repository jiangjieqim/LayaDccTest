// 程序入口
class GameMain{
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html

    private imgURL:string="http://192.168.2.107:8001/LayaDccTest/res/ic_launcher.png";
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html
    constructor()
    {
        Laya.init(window.innerWidth,window.innerHeight);
        Laya.loader.load(this.imgURL, new Laya.Handler(this, this.onComplete));
    }
    private onComplete(e): void {
        let img: Laya.Image = new Laya.Image();
        img.skin = this.imgURL;
        Laya.stage.addChild(img);
        console.log(e);
    }
}
new GameMain();