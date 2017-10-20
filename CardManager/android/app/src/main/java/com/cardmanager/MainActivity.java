package com.cardmanager;

import android.os.Bundle;
import android.os.Handler;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    public Handler handler=null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //创建属于主线程的handler
        handler=new Handler();

        LoadingDialog.getInstance(MainActivity.this).activity = this;

    }

    public void showDialog(){
        handler.post(new Runnable() {
            @Override
            public void run() {
                LoadingDialog.getInstance(MainActivity.this).show();
            }
        });

    }

    public void dimiss(){
        handler.post(new Runnable() {
            @Override
            public void run() {
                LoadingDialog.getInstance(MainActivity.this).dismiss();
            }
        });

    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {

        return "CardManager";
    }
}
