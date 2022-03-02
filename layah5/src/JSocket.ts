namespace app{
    
    export class MJSocketParse{
        private callBack:Function;
        protected stickyLen:number = 0;//粘包总包长
        protected buffer:Laya.Byte = new Laya.Byte();

        // private bufferList:Laya.Byte[] = [];
        // protected lock:boolean = false;
        
        constructor(func){
            this.callBack = func;
        }
        private tb:Laya.Byte;
        private index:number = 0;
        
        /**
         * 获取协议包的长度
         * @param byte 
         */
        private getRealLen(byte:Laya.Byte):number{
            if(!this.tb){
                this.tb = new Laya.Byte();
                this.tb.endian = Laya.Byte.BIG_ENDIAN;
            }
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
            let rl = 0;
            // rl = this.getRealLen(byte);
            byte.pos = 0;
            let cmd: number = byte.getUint16();
            console.log(Laya.timer.currFrame+"===========>协议号:0x" + cmd.toString(16) + ",协议包长:" + byte.length /*+ "真实长度:" + rl*/);
            this.index = 0;
            this.callBack(cmd, byte);
        }

        public run(cmd:number,byte:Laya.Byte):void{
            // this.doCallBack(byte);

            
            if(this.index > 0){
                //存储bytes
                this.buffer.writeArrayBuffer(byte.buffer);

                // this.stickyLen = //this.getRealLen(this.buffer);//协议包真实长度;

                if(this.stickyLen <= this.buffer.length){
                    //ok
                    this.buffer.pos = 0;
                    this.doCallBack(this.buffer);
                }else{
                    this.index++;
                    this.buffer.endian = Laya.Byte.LITTLE_ENDIAN;
                    this.buffer.writeArrayBuffer(byte.buffer);
                }

            }else{
                this.stickyLen = this.getRealLen(byte);//协议包真实长度;
                if(this.stickyLen <= byte.length){
                    //ok
                    this.doCallBack(byte);
                }else{
                    if(this.index<=0){
                        this.buffer.clear();
                    }
                    this.index++;
                    this.buffer.endian = Laya.Byte.LITTLE_ENDIAN;
                    this.buffer.writeArrayBuffer(byte.buffer);
                }
            }
            
        }
       
    }
}