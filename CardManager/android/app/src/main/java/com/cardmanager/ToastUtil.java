package com.cardmanager;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.TimerTask;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

/**
 * Created by zhiyuli on 2017/10/20.
 */


public class ToastUtil extends ReactContextBaseJavaModule {

    private Context context;

    private LoadingDialog loadingDialog;

    public ToastUtil(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;

    }

    @ReactMethod
    public void showLoading(){

        loadingDialog = LoadingDialog.getInstance(this.context);
        if(loadingDialog.activity != null){
            loadingDialog.activity.showDialog();
        }
    }
    @ReactMethod
    public void dismiss(){

        if(loadingDialog != null && loadingDialog.activity != null){
            loadingDialog.activity.dimiss();
        }

    }


    @Override
    public String getName() {
        return "ToastUtil";
    }
}
