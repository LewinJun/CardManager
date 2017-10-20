package com.cardmanager;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.NonNull;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

/**
 * Created by zhiyuli on 2017/10/20.
 */

public class LoadingDialog extends Dialog {

    /* 持有私有静态实例，防止被引用，此处赋值为null，目的是实现延迟加载 */
    private static LoadingDialog instance = null;

    public Context context;

    public MainActivity activity = null;



    public LoadingDialog(@NonNull Context context) {
        super(context);
        if(this.context == null){
            this.context = context;

            this.setCanceledOnTouchOutside(false);
        }

    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.loading);
    }

    @Override
    public void show() {
        super.show();
    }

    @Override
    public void dismiss() {
        super.dismiss();
    }

    /*加上synchronized，但是每次调用实例时都会加载**/
    public static LoadingDialog getInstance(Context context) {
        synchronized (LoadingDialog.class) {
            if (instance == null) {
                instance = new LoadingDialog(context);
            }
        }
        return instance;
    }
}
