


class TestIcon extends Laya.Image{
    constructor(){
        super();
        // this.skin="http://"+Laya.Browser.window.location.hostname+":8002/resource/ic_launcher.png";
        this.skin = "http://192.168.1.5:8001/github/LayaDccTest/layah5/bin/resource/ic_launcher.png";
    }
}

// 程序入口
class GameMain{
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html

    // private imgURL:string="http://192.168.2.107:8001/LayaDccTest/res/ic_launcher.png";
    // private imgURL:string="http://192.168.4.194:8002/resource/ic_launcher.png";
    
    //http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html
    constructor()
    {
        Laya.init(window.innerWidth,window.innerHeight);

        // Laya.stage.hitArea = new Laya.Rectangle(0,0,Laya.stage.width,Laya.stage.height);
        // Laya.stage.on(Laya.Event.CLICK,this,()=>{
        //     Laya.loader.load(this.imgURL, new Laya.Handler(this, this.onComplete));
        // });

        // setTimeout(3000,()=>{
        //     window.loadingView.hideLoadingView();
        // })

        // Laya.timer.once(3000,this,()=>{
            if(window['loadingView']){
                window['loadingView'].hideLoadingView();
            }
        // });

        
        let byte:Laya.Byte = new Laya.Byte();
        byte.writeInt32(220);
        byte.writeByte(0);
        // let ab = new ArrayBuffer(6);
        
        // ab.byteLength
        let b1 = new Laya.Byte();
        b1.writeByte(64);
        // byte.pos = 0;
        byte.writeArrayBuffer(b1.buffer);
        byte.pos = 0;
        // byte.length;
        console.log(byte.length);
        
        // for(let i = 0;){
        // }
        console.log(">>>>>>>>>>>>>>>");
        console.log(byte.getInt32());
        console.log(byte.readByte());
        console.log(byte.readByte());
        byte.clear();
        console.log(">>>>>:::",byte.pos,byte.length);




        Laya.stage.addChild(new TestIcon());
        
        Laya.stage.graphics.drawRect(2,2,Laya.stage.width-2,Laya.stage.height-2,"#ff0000","#00ff00",2);
    }
    private onComplete(e): void {
        // let img: Laya.Image = new Laya.Image();
        // img.skin = this.imgURL;
        // Laya.stage.addChild(img);
        // console.log(e);
    }
}
new GameMain();