package demo;

import android.util.Log;

import com.towersdk.union.android.TowerUnionSDK;
import com.towersdk.union.android.callback.ITowerUnionListener;
import com.towersdk.union.android.constant.UnionSDKCallbackCode;
import com.towersdk.union.android.entity.UserInfo;

import layaair.game.browser.ConchJNI;

public class J_TrSDK {
    static MainActivity activity;
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
                        Log.e("TowerUnionLoginCallback", "登陆失败:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_LOGIN_CANCEL:
                        Log.e("TowerUnionLoginCallback", "登陆取消:" + result);
                        break;
                    case UnionSDKCallbackCode.CODE_LOGIN_TIMEOUT:
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
