package demo;

import android.app.Activity;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;


public class JSBridge {
    public static Handler m_Handler = new Handler(Looper.getMainLooper());
    public static Activity mMainActivity = null;

    public static void hideSplash() {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if(MainActivity.mSplashDialog!=null) {
                            MainActivity.mSplashDialog.dismissSplash();
                        }
                    }
                });
    }

    public static void setFontColor(final String color) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if(MainActivity.mSplashDialog!=null) {
                            MainActivity.mSplashDialog.setFontColor(Color.parseColor(color));
                        }
                    }
                });
    }

    public static void setTips(final JSONArray tips) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        try {
                            String[] tipsArray = new String[tips.length()];
                            for (int i = 0; i < tips.length(); i++) {
                                tipsArray[i] = tips.getString(i);
                            }
                            if(MainActivity.mSplashDialog!=null) {
                                MainActivity.mSplashDialog.setTips(tipsArray);
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                });
    }

    public static void bgColor(final String color) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if(MainActivity.mSplashDialog!=null) {
                            MainActivity.mSplashDialog.setBackgroundColor(Color.parseColor(color));
                        }
                    }
                });
    }

    public static void loading(final int percent) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if(MainActivity.mSplashDialog!=null) {
                            MainActivity.mSplashDialog.setPercent(percent);
                        }
                    }
                });
    }

    public static void showTextInfo(final boolean show) {
        m_Handler.post(
                new Runnable() {
                    public void run() {
                        if(MainActivity.mSplashDialog!=null) {
                            MainActivity.mSplashDialog.showTextInfo(show);
                        }
                    }
                });
    }
}
