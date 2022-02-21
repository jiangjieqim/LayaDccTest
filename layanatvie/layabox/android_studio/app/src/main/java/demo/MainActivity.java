package demo;
import java.io.InputStream;

import layaair.autoupdateversion.AutoUpdateAPK;
import layaair.game.IMarket.IPlugin;
import layaair.game.IMarket.IPluginRuntimeProxy;
import layaair.game.Market.GameEngine;
import layaair.game.config.config;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Point;
import android.net.ConnectivityManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.widget.Button;

import com.layabox.game.R;
import com.towersdk.union.android.TowerUnionSDK;


public class MainActivity extends Activity{
    public static final int AR_CHECK_UPDATE = 1;
    private IPlugin mPlugin = null;
    private IPluginRuntimeProxy mProxy = null;
    boolean isLoad=false;
    boolean isExit=false;
    public static SplashDialog mSplashDialog;
    @Override    
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.splash_dialog);
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        J_TrSDK.fullscreen(getWindow());

//        Log.e("notch","has:"+Boolean.toString(JScreenTools.hasNotchInScreen(this)) );

        ///////////////////////////////////////////////////////////////////////
//        Display defaultDisplay = getWindowManager().getDefaultDisplay();
//        Point point = new Point();
//        defaultDisplay.getSize(point);
//        int x = point.x;
//        int y = point.y;
//        Log.e("notch", "w = " + x + ",h = " + y+"h:"+getStatusBarHeight());
        J_TrSDK.activity = this;
        HlwBridge.mMainActivity = this;
        JSBridge.mMainActivity = this;


        mSplashDialog = new SplashDialog(this);
        mSplashDialog.showSplash();
        J_TrSDK.fullscreen(mSplashDialog.getWindow());


        /*
         * 如果不想使用更新流程，可以屏蔽checkApkUpdate函数，直接打开initEngine函数
         */
//        checkApkUpdate(this);
        initEngine();
        J_TrSDK.PlatformInit("");
//        hideBottomUIMenu();
    }

    protected void hideBottomUIMenu() {
        //隐藏虚拟按键，并且全屏
        if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) { // lower api
            View v = this.getWindow().getDecorView();
            v.setSystemUiVisibility(View.GONE);
        } else if (Build.VERSION.SDK_INT >= 19) {
            //for new api versions.
            View decorView = getWindow().getDecorView();
            int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;
            decorView.setSystemUiVisibility(uiOptions);

        }
    }
    /**
     * 获取状态栏高度
     * @return
     */
    public int getStatusBarHeight() {
        int result = 0;
        //获取状态栏高度的资源id
        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }
    public void initEngine()
    {
        mProxy = new RuntimeProxy(this);
        mPlugin = new GameEngine(this);
        mPlugin.game_plugin_set_runtime_proxy(mProxy);
        mPlugin.game_plugin_set_option("localize","false");
        mPlugin.game_plugin_set_option("gameUrl", "https://test1.webgame.zhaouc.com/fq4_hulu/index_native.html");
//        "http://192.168.4.198:8002/index.html"
        //      "http://192.168.5.20:8002/index.html"
        //index_native
//        "https://test1.webgame.zhaouc.com/fq4_hulu/index_h5.html"
        // "http://192.168.5.29:8002/index_native.html"
        //  http://192.168.2.107:8001/LayaDccTest/layah5/bin/index.html
        mPlugin.game_plugin_init(3);
        View gameView = mPlugin.game_plugin_get_view();
        this.setContentView(gameView);
        isLoad=true;
    }
    public  boolean isOpenNetwork(Context context)
    {
        if (!config.GetInstance().m_bCheckNetwork)
            return true;
        ConnectivityManager connManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        return connManager.getActiveNetworkInfo() != null && (connManager.getActiveNetworkInfo().isAvailable() && connManager.getActiveNetworkInfo().isConnected());
    }
    public void settingNetwork(final Context context, final int p_nType)
    {
        AlertDialog.Builder pBuilder = new AlertDialog.Builder(context);
        pBuilder.setTitle("连接失败，请检查网络或与开发商联系").setMessage("是否对网络进行设置?");
        // 退出按钮
        pBuilder.setPositiveButton("是", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface p_pDialog, int arg1) {
                Intent intent;
                try {
                    String sdkVersion = android.os.Build.VERSION.SDK;
                    if (Integer.valueOf(sdkVersion) > 10) {
                        intent = new Intent(
                                android.provider.Settings.ACTION_WIRELESS_SETTINGS);
                    } else {
                        intent = new Intent();
                        ComponentName comp = new ComponentName(
                                "com.android.settings",
                                "com.android.settings.WirelessSettings");
                        intent.setComponent(comp);
                        intent.setAction("android.intent.action.VIEW");
                    }
                    ((Activity)context).startActivityForResult(intent, p_nType);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        pBuilder.setNegativeButton("否", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
                ((Activity)context).finish();
            }
        });
        AlertDialog alertdlg = pBuilder.create();
        alertdlg.setCanceledOnTouchOutside(false);
        alertdlg.show();
    }
    public  void checkApkUpdate( Context context,final ValueCallback<Integer> callback)
    {
        if (isOpenNetwork(context)) {
            // 自动版本更新
            if ( "0".equals(config.GetInstance().getProperty("IsHandleUpdateAPK","0")) == false ) {
                Log.e("0", "==============Java流程 checkApkUpdate");
                new AutoUpdateAPK(context, new ValueCallback<Integer>() {
                    @Override
                    public void onReceiveValue(Integer integer) {
                        Log.e("",">>>>>>>>>>>>>>>>>>");
                        callback.onReceiveValue(integer);
                    }
                });
            } else {
                Log.e("0", "==============Java流程 checkApkUpdate 不许要自己管理update");
                callback.onReceiveValue(1);
            }
        } else {
            settingNetwork(context,AR_CHECK_UPDATE);
        }
    }
    public void checkApkUpdate(Context context) {
        InputStream inputStream = getClass().getResourceAsStream("/assets/config.ini");
        config.GetInstance().init(inputStream);
        checkApkUpdate(context,new ValueCallback<Integer>() {
            @Override
            public void onReceiveValue(Integer integer) {
                if (integer.intValue() == 1) {
                    initEngine();
                } else {
                    finish();
                }
            }
        });
    }
    public void onActivityResult(int requestCode, int resultCode,Intent intent)
    {
        TowerUnionSDK.getInstance().onActivityResult(requestCode, resultCode, intent);
        if (requestCode == AR_CHECK_UPDATE) {
            checkApkUpdate(this);
        }
    }
    protected void onPause()
    {
        TowerUnionSDK.getInstance().onPause();
        super.onPause();
        if(isLoad)mPlugin.game_plugin_onPause();
    }
    //------------------------------------------------------------------------------
    protected void onResume()
    {
        TowerUnionSDK.getInstance().onResume();
        super.onResume();
        if(isLoad)mPlugin.game_plugin_onResume();
    }
    public void onNewIntent(Intent newIntent) {
        TowerUnionSDK.getInstance().onNewIntent(newIntent);
        super.onNewIntent(newIntent);
    }
    protected void onStart() {
        TowerUnionSDK.getInstance().onStart();
        super.onStart();
    }
    public void onStop() {
        TowerUnionSDK.getInstance().onStop();
        super.onStop();
    }
    protected void onDestroy()
    {
        TowerUnionSDK.getInstance().onDestroy();
        super.onDestroy();
        if(isLoad)mPlugin.game_plugin_onDestory();
    }
    public void onRestart() {
        TowerUnionSDK.getInstance().onRestart();
        super.onRestart();
    }
    public void onBackPressed() {
        TowerUnionSDK.getInstance().onBackPressed();
        super.onBackPressed();
    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event)
    {
        return super.onKeyDown(keyCode, event);
    }
}
