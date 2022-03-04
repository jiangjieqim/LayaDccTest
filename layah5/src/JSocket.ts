namespace app{
    
    export class MJSocketParse{
        private callBack:Function;
        private stickyLen:number = 0;//粘包总包长
        private buffer:Laya.Byte;
        private curcmd:number;
        // private bufferList:Laya.Byte[] = [];
        // protected lock:boolean = false;
        
        constructor(func){
            this.callBack = func;
            this.tb = new Laya.Byte();
            this.tb.endian = Laya.Byte.BIG_ENDIAN;
            this.buffer = new Laya.Byte();
            this.buffer.endian = Laya.Byte.LITTLE_ENDIAN;
        }
        private tb:Laya.Byte;
        private index:number = 0;
        
        /**
         * 获取协议包的长度
         * @param byte 
         */
        private getRealLen(byte:Laya.Byte):number{
            this.tb.clear();
            let old:number = byte.pos;
            this.tb.writeArrayBuffer(byte.buffer,byte.pos,4);
            this.tb.pos = 0;
            let len= this.tb.getUint32();
            byte.pos = old;
            // console.log("length="+len);
            return len;
        }

        protected doCallBack(byte: Laya.Byte): void {
            // let rl = 0;
            // rl = this.getRealLen(byte);
            byte.pos = 0;
            let cmd: number = byte.getUint16();
            // console.log(Laya.timer.currFrame+"===========>协议号:0x" + cmd.toString(16) + ",协议包长:" + byte.length /*+ "真实长度:" + rl*/);
            // this.index = 0;
            this.callBack(cmd, byte);
        }

        private save(byte:Laya.Byte):void{

            if(this.stickyLen <= this.buffer.length + byte.length){
                this.index=0;
                let b;
                if(this.buffer.length <= 0){
                    b = byte;
                }else{
                    this.buffer.writeArrayBuffer(byte.buffer);
                    console.log("0x"+this.curcmd.toString(16)+"END包不完整,总大小:"+this.stickyLen+"bytes,已经获取了"+this.buffer.length+"bytes");
                    b = this.buffer;
                }
                this.doCallBack(b);
            }else{
                // console.log("生成粘包:"+this.curcmd.toString(16)+" all:"+this.stickyLen+ " index:" +this.index+ " byte:"+byte.length);
                this.index++;
                this.buffer.writeArrayBuffer(byte.buffer);
                console.log("0x"+this.curcmd.toString(16)+"包不完整,总大小:"+this.stickyLen+"bytes,已经获取了"+this.buffer.length+"bytes");
            }
        }

        public run(byte:Laya.Byte):void{
 //         this.doCallBack(byte);
            if(this.index > 0){
                //存储bytes
                this.save(byte);
            }else{
                let cmd = byte.getUint16();//cmd or other
                // if(cmd == 0x511e || cmd == 0x4601){
                //     return;
                // }
                this.curcmd = cmd;
                // byte.pos+=2;//
                this.stickyLen = this.getRealLen(byte);//协议包真实长度;
                this.buffer.clear();
                this.save(byte);
            }
            
        }
       
    }
}