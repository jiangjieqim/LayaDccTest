package demo;

import android.annotation.TargetApi;
import android.app.Dialog;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import com.towersdk.union.android.TowerUnionSDK;
import com.towersdk.union.android.callback.ITowerUnionListener;
import com.towersdk.union.android.constant.UnionSDKCallbackCode;
import com.towersdk.union.android.entity.ProductInfo;
import com.towersdk.union.android.entity.RoleInfo;
import com.towersdk.union.android.entity.UserInfo;
import com.towersdk.union.android.util.JJJson;

import layaair.game.browser.ConchJNI;

public class J_TrSDK {
    static MainActivity activity;
    public static void fullscreen(Window window){

        window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        // 延伸显示区域到刘海
        WindowManager.LayoutParams lp = window.getAttributes();
        if (Build.VERSION.SDK_INT >= 28) {
            lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
        }
        window.setAttributes(lp);
        J_TrSDK.initFull(window);
    }
    @TargetApi(Build.VERSION_CODES.HONEYCOMB)
    public static void initFull(Window window){
        // 设置页面全屏显示
        final View decorView = window.getDecorView();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }
    public static void PlatformRoleInfo(final String rolejson) {
        Log.e("RoleInfo", rolejson);
        JJJson RoleJson = new JJJson(rolejson);
        RoleInfo roleinfo = new RoleInfo();
        roleinfo.setSendtype(RoleJson.JsonString("sendtype"));
        roleinfo.setRoleId(RoleJson.JsonString("roleid"));
        roleinfo.setRoleName(RoleJson.JsonString("rolename"));
        roleinfo.setRoleLevel(RoleJson.JsonString("rolelevel"));
        roleinfo.setVipLevel(RoleJson.JsonString("viplevel"));
        roleinfo.setClientId(RoleJson.JsonString("serverid"));
        roleinfo.setClientName(RoleJson.JsonString("servername"));
        roleinfo.setLaborunion(RoleJson.JsonString("laborunion"));
        TowerUnionSDK.getInstance().sendRoleInfo(roleinfo);
    }

    public static void PlatformPay(final String payjson) {
        Log.e("productInfo", payjson);
        JJJson PayJson = new JJJson(payjson);
        ProductInfo product = new ProductInfo();
        product.setProductId(PayJson.JsonString("productId"));// 商品id
        product.setProductName(PayJson.JsonString("productName"));// 商品名称
        product.setProductDesc(PayJson.JsonString("productDesc"));// 商品描述
        product.setPrice(PayJson.JsonString("price"));// 商品价格
        product.setCoinNum(PayJson.JsonString("buyNum"));// 购买虚拟币数
        product.setBuyNum(PayJson.JsonString("coinNum"));// 当前账户虚拟币余额数
        product.setCurrency(PayJson.JsonString("currency"));// 虚拟币名称
        product.setRate(PayJson.JsonString("rate"));// 单位人民币兑换比例
        product.setExtension(PayJson.JsonString("extension"));// 扩展字段
        // 例：当前账户有150钻石，需要5元购买50钻石则参数应填写
        // productId="46548" productName="50钻石" productDesc="账户获得50钻石" price="5"
        // buyNum="50" coinNum="150" currency="钻石" rate="10" extension=""
        TowerUnionSDK.getInstance().pay(product);

    }

    public static void PlatformInit(String initextension) {
        // 回调
        TowerUnionSDK.getInstance().setSDKListener(new ITowerUnionListener() {
            @Override
            public void TowerUnionInitCallback(int code, String result) {
                switch (code) {
                    case UnionSDKCallbackCode.CODE_INIT_SUCCESS:

                        //初始化成功。初始化成功后才可调用登陆接口
                        Log.e("TowerUnionInitCallback", "CODE_INIT_SUCCESS");
                        break;
                    default:
                        break;
                }
            }
            private void loginStatus(int code) {

//                mWebView.post(new Runnable() {
//                    @Override
//                    public void run() {
//                        mWebView.loadUrl("javascript: function isExitsFunction(funcName) {try {   if (typeof(eval(funcName)) == \"function\") {  return true; } } catch(e) {} return false;}   "+
//                                "if(isExitsFunction(\"tr_status\")){tr_status("+code+")}"
//                        );
//                    }
//                });

                ConchJNI.RunJS("function isExitsFunction(funcName) {try {   if (typeof(eval(funcName)) == \"function\") {  return true; } } catch(e) {} return false;}   "+
                                "if(isExitsFunction(\"tr_status\")){tr_status("+code+")}");
            }


            @Override
            public void TowerUnionLoginCallback(int code, String result, UserInfo userInfo) {
                switch (code) {
                    case UnionSDKCallbackCode.CODE_LOGIN_SUCCESS:

                        String UID=userInfo.getUserId();
                        String Token=userInfo.getToken();
                        String gameid=userInfo.getGameId();
                        String Channelid=userInfo.getChannelId();

                        Log.e("TowerUnionLoginCallback",
                                "登陆成功 :" + result + " userID:" + UID+" Token:"+Token+" gameid:"+gameid+" Channelid:"+Channelid);

                        ConchJNI.RunJS("tr_loginCallBack(\""+UID+"\",\""+Token+"\","+gameid +","+Channelid+");");
                        break;
                    case UnionSDKCallbackCode.CODE_LOGIN_FAIL:
                        TowerUnionSDK.getInstance().login();
                        Log.e("TowerUnionLoginCallback", "登陆失败:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_LOGIN_CANCEL:
                        TowerUnionSDK.getInstance().login();
                        Log.e("TowerUnionLoginCallback", "登陆取消:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_LOGIN_TIMEOUT:
                        TowerUnionSDK.getInstance().login();
                        Log.e("TowerUnionLoginCallback", "登陆超时:" + result);
                        break;
                    default:
                        break;
                }
                loginStatus(code);
            }

            @Override
            public void TowerUnionPayCallback(int code, String result) {
                switch (code) {
                    case UnionSDKCallbackCode.CODE_PAY_SUCCESS:
                        Log.e("TowerUnionPayCallback", "支付成功:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_PAY_FAIL:
                        Log.e("TowerUnionPayCallback", "支付失败:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_PAY_CANCEL:
                        Log.e("TowerUnionPayCallback", "支付取消:" + result);
                        break;
                    default:
                        break;
                }
            }

            @Override
            public void TowerUnionLogoutCallback(int code, String result) {
                switch (code) {
                    case UnionSDKCallbackCode.CODE_LOGOUT_SUCCESS:
                        Log.e("TowerUnionLogoutCallbac", "退出账户成功:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_LOGOUT_FAIL:
                        Log.e("TowerUnionLogoutCallbac", "退出账户失败:" + result);
                        break;
                    default:
                        break;
                }
                loginStatus(code);
            }

            @Override
            public void TowerUnionExitGameCallback(int code, String result) {
                switch (code) {
                    case UnionSDKCallbackCode.CODE_EXIT_SUCCESS:
                        Log.e("TowerUnionExitGameCallb", "退出游戏成功:" + result);
                        activity.finish();
                        System.exit(0);
                        break;
                    case UnionSDKCallbackCode.CODE_EXIT_FAIL:
                        Log.e("TowerUnionExitGameCallb", "退出游戏失败:" + result);
                        break;
                    default:
                        break;
                }

            }

            @Override
            public void TowerUnionBindPhoneCallback(int code, String result) {
                switch (code){
                    case UnionSDKCallbackCode.CODE_BINDPHONE_SUCCESS:
                        Log.e("TowerUnionBindPhoneCall", "绑定手机成功:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_BINDPHONE_FAIL:
                        Log.e("TowerUnionBindPhoneCall", "绑定手机失败:" + result);
                        break;
                    default:
                        break;
                }
            }

        });
        // 初始化
        TowerUnionSDK.getInstance().init(activity);

    }

}
