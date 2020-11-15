package com.whitehaxbackup;

import com.facebook.react.ReactActivity;

import android.app.Activity;
import android.os.Bundle;
import com.whitehax.aujas.security.securityhandlers.GeneralCheckHandler;
import com.whitehax.aujas.security.securityhandlers.WifiManagerHandler;


public class MainActivity extends ReactActivity {
	static String s = "tetetet";
  static String t = "test";
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "whitehaxBackup";
  }


  @Override
  public void onCreate(Bundle savedInstanceState){

    super.onCreate(savedInstanceState);
    //mCurrentActivity = this;
    s = new GeneralCheckHandler(this).getResult();
    t = new WifiManagerHandler(this).getResult();

    

  }


  /*public static Activity getActivity(){
    Activity activity = new Activity();
    activity = mCurrentActivity;
    return activity;
  }*/
  public static String setVal() {

    return s;
  }

  public static String setWifiVal(){
    return t;
  }
}
