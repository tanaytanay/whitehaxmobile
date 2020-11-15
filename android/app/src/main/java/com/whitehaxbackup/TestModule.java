package com.whitehaxbackup;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;


public class TestModule extends ReactContextBaseJavaModule {

    public TestModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }
    //String s = "test string";
    int x = 10;
    String s = "test";
    String str;
    String t;

    @Override
    //getName is required to define the name of the module represented in JavaScript

    public String getName() {
        return "TestModule";
    }



    @ReactMethod
    public void testString( Callback success) {
        success.invoke(s);
    }
    @ReactMethod
    public void testInt(Callback success) {
        success.invoke(x);
    }
    
    @ReactMethod
    public void setString() {
        //EnterpriseHandler obj = new EnterpriseHandler(MainActivity.getActivity());
        //MainActivity M = new MainActivity();
        //setString();
        str = MainActivity.setVal();


    }
    @ReactMethod
    public void getString(Callback success) {
        //EnterpriseHandler obj = new EnterpriseHandler(MainActivity.getActivity());
        //MainActivity M = new MainActivity();
        //setString();


        //success.invoke(str);
        success.invoke(MainActivity.setVal());
    }

    @ReactMethod
    public void setWifi() {
        //EnterpriseHandler obj = new EnterpriseHandler(MainActivity.getActivity());
        //MainActivity M = new MainActivity();
        //setString();
        t = MainActivity.setWifiVal();


    }


    @ReactMethod
    public void getWifi(Callback success) {
        //EnterpriseHandler obj = new EnterpriseHandler(MainActivity.getActivity());
        //MainActivity M = new MainActivity();
        //setString();


        //success.invoke(t);
        success.invoke(MainActivity.setWifiVal());
    }

}