var list;
(function (list) {
    var RowMoveBaseNode = (function () {
        function RowMoveBaseNode() {
            this._jList = [];
            this.check = false;
            /**
             * 对象池的key
             */
            this.clsKey = "";
            /**
             * 是否允许显示渲染
             */
            this.isInRect = false;
            this.showStatus = false;
        }
        /**
         * @param cur_y
         * @param h Panel的高度
         */
        RowMoveBaseNode.prototype.isCanDraw = function (cur_y, h) {
            var _canAdd = false;
            if (this.y + this.height >= cur_y && this.y < cur_y + h) {
                this.isInRect = true;
            }
            else {
                this.isInRect = false;
            }
            if (this.isInRect) {
                if (!this.showStatus) {
                    this.clear();
                    _canAdd = true;
                    this.showStatus = true;
                }
            }
            else {
                this.clear();
                this.showStatus = false;
            }
            return _canAdd;
        };
        RowMoveBaseNode.prototype.free = function () {
            this.showStatus = false;
            this.clear();
        };
        /**
         * 清理接口
         */
        RowMoveBaseNode.prototype.clear = function () {
            while (this._jList.length) {
                var _gridItem = this._jList.pop();
                _gridItem.removeSelf();
                Laya.Pool.recover(this.clsKey, _gridItem);
            }
        };
        /**
         * 绘制接口
         */
        RowMoveBaseNode.prototype.draw = function (_panel) {
            for (var i = 0; i < this.list.length; i++) {
                var itemView = this.createNode(i);
                _panel.addChild(itemView);
                this._jList.push(itemView);
            }
        };
        /**
         * 单节点创建
         */
        RowMoveBaseNode.prototype.createNode = function (index) {
        };
        return RowMoveBaseNode;
    }());
    list.RowMoveBaseNode = RowMoveBaseNode;
    var JListCustom = (function (_super) {
        __extends(JListCustom, _super);
        function JListCustom() {
            var _this = _super.call(this) || this;
            _this.rwlist = [];
            /**
             * 是否已经绘制完成,draw是异步的
             */
            _this.isComplete = false;
            _this._panelBG = new Laya.Sprite();
            return _this;
        }
        /**
         * 最后一行显示对象是否绘制了
         */
        JListCustom.prototype.isLastDraw = function () {
            if (this.rwlist.length > 0) {
                var _rn = this.rwlist[this.rwlist.length - 1];
                if (_rn.isInRect) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        };
        /**
         * 偏移当前高度值,做间隔
         */
        JListCustom.prototype.offsetHeight = function (y) {
            this._allHeight += y;
        };
        JListCustom.prototype.init = function (panel) {
            if (!this.panel) {
                this.panel = panel;
                this.panel.vScrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange);
                // this.panel.vScrollBar.on(Laya.Event.END,this,this.onScrollBarEnd);
            }
        };
        // private onScrollBarEnd():void{
        //     // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>!!!!onScrollBarEnd");
        //     this.refresh();
        // }
        /**
         *
         * @param handler 返回一个itemView节点
         */
        JListCustom.prototype.getItemView = function (handler) {
            if (this.isComplete) {
                for (var i = 0; i < this.rwlist.length; i++) {
                    var item = this.rwlist[i];
                    if (item.list && item.check) {
                        for (var n = 0; n < item.list.length; n++) {
                            var status_1 = handler.runWith(item.list[n]);
                            if (status_1) {
                                this.scrollToNode(item);
                                return item._jList[n];
                            }
                        }
                    }
                }
            }
            return null;
        };
        /**
         *
         * @param row 行
         * @param col 列
         */
        JListCustom.prototype.getRowCol = function (row, col) {
            if (this.isComplete) {
                for (var i = 0; i < this.rwlist.length; i++) {
                    var item = this.rwlist[i];
                    if (i == row && item._jList[col]) {
                        return item._jList[col];
                    }
                }
            }
            return null;
        };
        JListCustom.prototype.onScrollBarChange = function () {
            this.refresh();
        };
        /**
         * 数据填充完开始开始绘制
         * @param y  滚动到的坐标, 为横向的row对象的坐标
         */
        JListCustom.prototype.end = function (y) {
            if (y === void 0) { y = 0; }
            // _allHeight?:number,y:number=0
            // _allHeight = this._allHeight || _allHeight;
            var _allHeight = this._allHeight;
            this._panelBG.graphics.drawRect(0, 0, this.panel.width, _allHeight, "#ff0000");
            this._panelBG.alpha = 0.0;
            this._panelBG.width = this.panel.width;
            this._panelBG.height = _allHeight;
            this.panel.addChild(this._panelBG);
            this.panel.scrollRect = new Laya.Rectangle(0, 0, this.panel.width, _allHeight);
            this.panel.scrollTo(0, y);
            this.refresh(true);
        };
        JListCustom.prototype.getScrollValue = function () {
            return this.panel.vScrollBar.value;
        };
        JListCustom.prototype.scrollToNode = function (node) {
            this.panel.scrollTo(0, node.y);
        };
        JListCustom.prototype.onCallLayer = function (drawlist) {
            var len = drawlist.length;
            while (drawlist.length > 0) {
                var vo = drawlist.shift();
                vo.draw(this.panel);
            }
            if (list.JListCustom.SHOW_LOG) {
                console.log("numChildren:" + this.panel.numChildren, "len:", len, "isLastDraw:", this.isLastDraw());
            }
            this.isComplete = true;
            this.event(JListCustom.EVENT_END);
        };
        /**
         * 开始渲染
         */
        JListCustom.prototype.refresh = function (isLater) {
            if (isLater === void 0) { isLater = false; }
            this.isComplete = false;
            var drawlist = [];
            var y = this.panel.vScrollBar.value;
            for (var i = 0; i < this.rwlist.length; i++) {
                var _rn = this.rwlist[i];
                if (_rn.isCanDraw(y, this.panel.height)) {
                    drawlist.push(_rn);
                }
            }
            if (isLater) {
                Laya.timer.callLater(this, this.onCallLayer, [drawlist]);
            }
            else {
                this.onCallLayer(drawlist);
            }
        };
        /**
         * @param listData 数据列表
         * @param cls 数据类的模板
         * @param itemHeight 渲染对象的高度
         * @param gap 每个横向对象的高度间隔
         * @param maxRow 每行最大的数量 一行需要的的数据节点数 默认是1
         */
        JListCustom.prototype.split = function (listData, cls, itemHeight, gap, maxRow) {
            if (gap === void 0) { gap = 0; }
            if (maxRow === void 0) { maxRow = 1; }
            var cur = 0;
            for (var i = 0; i < listData.length; i++) {
                if (cur == 0) {
                    var row = new cls();
                    row.height = itemHeight + gap; //220
                    row.list = [];
                    row.y = this._allHeight + gap;
                    this._allHeight += row.height;
                    this.add(row);
                }
                var last = this.last;
                last.list.push(listData[i]);
                cur++;
                if (cur >= maxRow) {
                    cur = 0;
                }
            }
        };
        /**
         * 清空数据
         */
        JListCustom.prototype.clear = function () {
            this._allHeight = 0;
            Laya.timer.clear(this, this.onCallLayer);
            if (this._panelBG) {
                this._panelBG.graphics.clear();
                this._panelBG.removeSelf();
            }
            // for(let i = 0;i < this.rwlist.length;i++){
            if (this.rwlist) {
                while (this.rwlist.length) {
                    var _rn = this.rwlist.pop();
                    _rn.free();
                }
            }
        };
        Object.defineProperty(JListCustom.prototype, "last", {
            get: function () {
                if (this.rwlist.length > 0) {
                    return this.rwlist[this.rwlist.length - 1];
                }
            },
            enumerable: true,
            configurable: true
        });
        JListCustom.prototype.add = function (node) {
            this.rwlist.push(node);
        };
        /**
         * 绘制结束
         */
        JListCustom.EVENT_END = "EVENT_END";
        JListCustom.SHOW_LOG = false;
        return JListCustom;
    }(Laya.EventDispatcher));
    list.JListCustom = JListCustom;
})(list || (list = {}));
//# sourceMappingURL=JListCustom.js.map
