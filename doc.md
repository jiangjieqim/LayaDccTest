文档地址  
httpldc2.layabox.comdoclanguage=zh&nav=zh-ts-6-2-0  

1.node 版本不要低于下面版本
```
$ node -v
v4.2.0
```

2.安装layadcc  
```
npm install -g layadcc
```

```
layadcc 资源目录 [options]
options:
    -cache 生成资源包.
    -lwr 文件路径全部转为小写。（一般不需要）
    -url url 如果要打包资源的话，对应的url.
    -cout outpath 打包资源的输出目录，如果不设置的话，就是在资源目录下。
例如:
   layadcc d:/game/wow -cache -url www.game.com
```


```
http://192.168.2.107/LayaDccTest/res/

layadcc d:/LayaDccTest/res -cache -url http://192.168.2.107:8001/LayaDccTest/res/

```

https://www.233tw.com/laya/54553

在Laya构建app时，URL不要用默认的，默认的网址就是显示上面这个扫码界面。 改成自己的地址(http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html)  
![](docimg/1.png)  