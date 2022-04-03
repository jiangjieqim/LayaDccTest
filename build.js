/**
 * 使用方法
    1.将需要layadcc的文件放在\\layah5\\ddcfold目录下
    
    2.node build.js "https://test1.webgame.zhaouc.com/fq4_hulu/index_native.html"
    apk生成在build.js同级目录
 */
let fs=  require("fs");
var child = require('child_process');

function delFile(path, reservePath) {
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let currentPath = path + "/" + file;
                if (fs.statSync(currentPath).isDirectory()) {
                    delFile(currentPath, reservePath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
            if (path != reservePath) {
                fs.rmdirSync(path);
            }
        } else {
            fs.unlinkSync(path);
        }
    }
}

function replaceConfig(curPath,url) {
    let mypath = `${curPath}\\layanatvie\\layabox\\android_studio\\app\\src\\main\\assets\\config.ini`;
    let configini = fs.readFileSync(mypath, "utf-8");
    let arr = configini.split("\n");
    let newstr = "";
    for (let i = 0; i < arr.length; i++) {
        let s = arr[i];
        if (s.indexOf("GameUrl=") != -1) {
            // console.log(s);
        }else{
            newstr+=s+"\n";
        }
    }
    newstr+="GameUrl="+url;
    // console.log(newstr);
    fs.writeFileSync(mypath,newstr,"utf-8");
}

if(process.argv.length >= 3){
    let url = process.argv[2];
    // 返回运行文件所在的目录
    // console.log('__dirname : ' + __dirname);//D:\github\LayaDccTest
    let curPath = __dirname;
    let assetsPath = `${curPath}\\layanatvie\\layabox\\android_studio\\app\\src\\main\\assets\\`;
    let s = `${assetsPath}cache`;

    delFile(s);//删除cache文件

    // layadcc d:/github/LayaDccTest/layah5/ddcfold -cache -url https://test1.webgame.zhaouc.com/tr2_hulu/index_native.html -cout d:/github/LayaDccTest/layah5/ddcOut
    let c1 = `layadcc ${curPath}\\layah5\\ddcfold -cache -url ${url} -cout ${assetsPath}`;
    console.log(c1);

    let buf = child.execSync(c1);
    console.log(buf.toString());
    // console.log(__dirname);
    
    //修改config.ini
    replaceConfig(curPath,url);

    //生成apk文件
    console.log(child.execSync("生成apk.bat").toString());

    let sub =  fs.readFileSync(`${curPath}\\layanatvie\\layabox\\android_studio\\app\\build\\outputs\\apk\\release\\app-release.apk`);
    // console.log(sub.byteLength);
    let f = "release_"+(new Date().getTime().toString()) + ".apk";
    fs.writeFileSync(`${curPath}\\${f}`,sub);
}