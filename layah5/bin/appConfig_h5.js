
/** 平台信息，对应不同的SDK：
XINMA:"easyfun"， TAIWAN:"mlbb"，TAIGUO:"ictitan"，JUNHAI:"junhai" 
native_debug=true时生效 host port参数
bug_report_url:"" //错误打点地址
*/

appConfig = {
    // pf:"test",
    native_debug:true, //false时为debug模式，不选择服务器

   	pf:"test",
    native_debug:false, //false时为debug模式，不选择服务器
	


    use_zip:true, //是否使用das压缩包
    use_xbin:true,

	host:"s1hulu.tarenwang.net",
	port:"40101",
	
	port:"30101",
	
	basePath:"http://192.168.1.10:8002/myres/",  //assets路径、cdn路径
	//basePath:"https://test1.webgame.zhaouc.com/tr2_hulu/assets/",  //assets路径、cdn路径

	//http://s1hulu.tarenwang.net:30101/
	
	login_check:"https://hlw-api.tarenwang.net/index/index2/login/",  //登录检查地址
	gs_url:"https://hlw-api.tarenwang.net/index/index2/server/",  //服务器列表地址
	notice_url:"https://hlw-api.tarenwang.net/index/index0/placard_list",  //公告地址

	
	pay_call_back:"https://hlw-api.tarenwang.net/index/index2/recharge",//充值
	verfied_url:"https://hlw-api.tarenwang.net/index/index2/check_18",  //实名认证地址
	create_order:"https://hlw-api.tarenwang.net/index/index2/create_order",//生成订单请求
	report_url:"https://hlw-report.tarenwang.net/index/index2",//埋点
	rzurl:"bg_Loading_fangchenmi02",//软著显示
	yxmzurl:"bg_huluwa",//游戏logo
	hlw_mobile:"https://api.xianyuyouxi.com/service/hlw/hlw_mobile/",//手机绑定url
	wcfg_url:"https://hlw-api.tarenwang.net/index/index2/map",//webconfig，问卷、Q群等设置
	jubaourl:"report_complaint",  //举报
	//closelog:3,
	//hide_sid:"1",    //显示服务器id
	//review:60000,//提审服id，必配	
	//limtcz:1, //1表示ios正式服屏蔽充值等，0表示ios正式服打开充值等
	gm_cz:1,   //不加或者0就是不开启GM充值界面，1开启
	ver:0,
	ver_url:"https://hlw-api.tarenwang.net/index/index2/version",//切换提审服

}
window.appConfig = appConfig;