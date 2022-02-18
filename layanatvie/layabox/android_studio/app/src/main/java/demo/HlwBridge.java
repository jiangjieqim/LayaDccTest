package demo;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

import com.towersdk.union.android.TowerUnionSDK;

public class HlwBridge {
    static int isCodeInit = 0;

    //    public static Handler m_Handler = new Handler(Looper.getMainLooper());
    public static Activity mMainActivity = null;

    public static void login() {
        TowerUnionSDK.getInstance().login();
    }

    public static void logout() {
        TowerUnionSDK.getInstance().logout();
    }

    public static void sendinfo(String s) {
        J_TrSDK.PlatformRoleInfo(s);
    }

    public static void pay(String s) {
        J_TrSDK.PlatformPay(s);
    }

    public static void resetInit(){
        isCodeInit = 0;
    }

    public static void codeEnd(){
        isCodeInit = 1;
    }

    public static int isCodeInit() {
        return isCodeInit;
    }

    public void reload() {
//        mWebView.post(new Runnable() {
//            @Override
//            public void run () {
//                mWebView.loadUrl(mURL);
//            }
//        });
    }
    public static void openurl(String urlValuel){
        if(mMainActivity!=null) {
            Uri uri = Uri.parse(urlValuel);
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            mMainActivity.startActivity(intent);
        }
    }
}