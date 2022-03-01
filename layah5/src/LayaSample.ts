// 程序入口
class GameMain{
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html

    // private imgURL:string="http://192.168.2.107:8001/LayaDccTest/res/ic_launcher.png";
    private imgURL:string="http://192.168.4.194:8002/resource/ic_launcher.png";
    
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html
    constructor()
    {
        Laya.init(window.innerWidth,window.innerHeight);

        // Laya.stage.hitArea = new Laya.Rectangle(0,0,Laya.stage.width,Laya.stage.height);
        // Laya.stage.on(Laya.Event.CLICK,this,()=>{
        //     Laya.loader.load(this.imgURL, new Laya.Handler(this, this.onComplete));
        // });



        Laya.stage.addChild(new TestIcon());
        
        Laya.stage.graphics.drawRect(2,2,Laya.stage.width-2,Laya.stage.height-2,"#ff0000","#00ff00",2);
    }
    private onComplete(e): void {
        let img: Laya.Image = new Laya.Image();
        img.skin = this.imgURL;
        Laya.stage.addChild(img);
        console.log(e);
    }
}
new GameMain();