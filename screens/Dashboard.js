import React, { useRef, useState, useEffect, Component, useContext } from "react";
import { Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { VictoryLegend, VictoryPie, VictoryLabel, VictoryContainer } from "victory-native";
//import Constants from 'expo-constants';
//import {} from 'react';
//import { useFonts } from '@use-expo/font';
//import * as Progress from 'react-native-progress';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppContext from "../components/AppContext";
//import {styles} from '../styles/DashboardStyle';
import { Dimensions } from 'react-native';
//import ModalTest from '../components/modals.js';

import RunModal from '../components/RunModal.js';
import SyncModal from '../components/SyncModal.js';
import WifiModal from '../components/WifiModal.js';

import globalFunc from '../components/global.js';

import {NativeModules} from 'react-native';



var TestModule = NativeModules.TestModule;


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();




const colorOne = "#b0ceff";
const colorTwo = "#c6dbff";
const colorThree = "#d7e6ff";
const colorFive = "#e7f0ff";
const colorFour = "white";
const colorSix = "#add8e6";
const colorSeven = "#add8e6";

const readiness = 50;
const spreadData = [{ x: "35%", y: 35 }, { x: "20%", y: 20 }, { x: "5%", y: 5 }, { x: "25%", y: 25 }, { x: "15%", y: 15 }, { x: "30%", y: 30 },];
const spreadColor = [colorOne, colorTwo, colorThree, colorFour, colorFive, colorSix, colorSeven];
const readinessData = [{ y: readiness }, { y: 100 - readiness }, ];
const readinessColorInner = ["#db3913", "transparent"];
const readinessColorMiddle = ["black", "black"];
const readinessColorOuter = ["white", "white"];
const labelData = [''];




//import { Icon } from 'react-native-elements'
//import Speedometer from 'react-native-speedometer-chart';
//import Pie from 'react-native-pie';



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}



export default function DashboardScreen({navigation}) {

  const myContext = useContext(AppContext);


  


  const [buttonOnePressed, setButtonOnePressed] = useState(true);
  const [buttonTwoPressed, setButtonTwoPressed] = useState(false);
  const [buttonThreePressed, setButtonThreePressed] = useState(false);
  const [buttonFourPressed, setButtonFourPressed] = useState(false);
  const [buttonFivePressed, setButtonFivePressed] = useState(false);
  const [buttonSixPressed, setButtonSixPressed] = useState(false);
  const [buttonSevenPressed, setButtonSevenPressed] = useState(false);

  // const [myContext.DeviceReadinessPercentValue, setmyContext.DeviceReadinessPercentValue] = useState(35);
  // const [myContext.EmailReadinessPercentValue, setmyContext.EmailReadinessPercentValue] = useState(20);
  // const [myContext.WifiReadinessPercentValue, setmyContext.WifiReadinessPercentValue] = useState(5);
  // const [myContext.DataReadinessPercentValue, setmyContext.DataReadinessPercentValue] = useState(25);
  // const [myContext.FirewallReadinessPercentValue, setmyContext.FirewallReadinessPercentValue] = useState(15);
  // const [myContext.WebReadinessPercentValue, setmyContext.WebReadinessPercentValue] = useState(30);

  // const [myContext.DeviceReadinessPercentValue, setmyContext.DeviceReadinessPercentValue] = useState(myContext.DeviceReadinessPercentValue);
  // const [myContext.EmailReadinessPercentValue, setmyContext.EmailReadinessPercentValue] = useState(myContext.EmailReadinessPercentValue);
  // const [myContext.WifiReadinessPercentValue, setmyContext.WifiReadinessPercentValue] = useState(myContext.WifiReadinessPercentValue);
  // const [myContext.DataReadinessPercentValue, setmyContext.DataReadinessPercentValue] = useState(myContext.DataReadinessPercentValue);
  // const [myContext.FirewallReadinessPercentValue, setmyContext.FirewallReadinessPercentValue] = useState(myContext.FirewallReadinessPercentValue);
  // const [myContext.WebReadinessPercentValue, setmyContext.WebReadinessPercentValue] = useState(myContext.WebReadinessPercentValue);

  const [activeButtonValue, setActiveButtonValue] = useState(myContext.DeviceReadinessPercentValue);
  const [activeButtonLabel, setActiveButtonLabel] = useState('Device');
  const [activeButtonRiskValue, setActiveButtonRiskValue] = useState('High');
  const [activeButtonRiskValueColor, setActiveButtonRiskValueColor] = useState('#B71C1C')

  const [buttonOneStyle, setButtonOneStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#7BB7FF', borderRadius: 15, backgroundColor: '#7BB7FF'});
  const [buttonOneTextStyle, setButtonOneTextStyle] = useState({color: '#000000', height: hp(3), color: 'black'});

  const [buttonTwoStyle, setButtonTwoStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#bee0ff', borderRadius: 15,});
  const [buttonTwoTextStyle, setButtonTwoTextStyle] = useState({color: '#bee0ff', height: hp(3), color: 'white'});

  const [buttonThreeStyle, setButtonThreeStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#d6ebff', borderRadius: 15,});
  const [buttonThreeTextStyle, setButtonThreeTextStyle] = useState({color: '#d6ebff', height: hp(3), color: 'white'});

  const [buttonFourStyle, setButtonFourStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#f2f9ff', borderRadius: 15,});
  const [buttonFourTextStyle, setButtonFourTextStyle] = useState({color: '#f2f9ff', height: hp(3), color: 'white'});

  const [buttonFiveStyle, setButtonFiveStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#fffffF', borderRadius: 15,});
  const [buttonFiveTextStyle, setButtonFiveTextStyle] = useState({color: '#fffffF', height: hp(3), color: 'white'});

  const [buttonSixStyle, setButtonSixStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#fffffF', borderRadius: 15,});
  const [buttonSixTextStyle, setButtonSixTextStyle] = useState({color: 'white', height: hp(3), color: 'white'});

  const [buttonSevenStyle, setButtonSevenStyle] = useState({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#fffffF', borderRadius: 15,});
  const [buttonSevenTextStyle, setButtonSevenTextStyle] = useState({color: 'white', height: hp(3), color: 'white'});

  let spreadData = [
    { x: "", y: myContext.DeviceReadinessPercentValue }, 
    { x: "", y: myContext.EmailReadinessPercentValue }, 
    { x: "", y: myContext.WifiReadinessPercentValue }, 
    { x: "", y: myContext.DataReadinessPercentValue }, 
    { x: "", y: myContext.FirewallReadinessPercentValue }, 
    { x: "", y: myContext.WebReadinessPercentValue },
    { x: "", y: myContext.PrivacyReadinessPercentValue },
  ];

//Modal stuff -->

  // const [modalVisible, setModalVisible] = useState(false);
  // const [modal2Visible, setModal2Visible] = useState(false);
  // const [modal3Visible, setModal3Visible] = useState(false);

  // const [runValue, setRunValue] = useState(0);
  // const [syncValue, setSyncValue] = useState(0);
  // const [wifiValue, setWifiValue] = useState(0);

  // const [runStatus, setRunStatus] = useState("Running Security Checks...");
  // const [syncStatus, setSyncStatus] = useState("Syncing Devices...");
  // const [wifiStatus, setWifiStatus] = useState("Running Wifi Checks...");

  //const [runButton, setRunButton] = useState(true);
  //const [syncButton, setSyncButton] = useState(true);
  //const [wifiButton, setWifiButton] = useState(true);

  // let runValueShow = Math.round(runValue * 100);
  // let syncValueShow = Math.round(syncValue * 100);
  // let wifiValueShow = Math.round(wifiValue * 100);

  //weights -->

  // let [myContext.TotalGeneralTestsValue, myContext.setTotalGeneralTests] = useState(0);
  // let [passedGeneralTests, setPassedGeneralTests] = useState(0);
  // let [myContext.FailedGeneralTestsValue, myContext.setFailedGeneralTests] = useState(0);
  // let [generalTestInfo, setGeneralTestInfo] = useState('');

  // let [myContext.CritGeneralTestsValue, myContext.setCritGeneralTests] = useState(0);
  // let [myContext.HighGeneralTestsValue, myContext.setHighGeneralTests] = useState(0);
  // let [myContext.MedGeneralTestsValue, myContext.setMedGeneralTests] = useState(0);
  // let [myContext.LowGeneralTestsValue, myContext.setLowGeneralTests] = useState(0);

  // let [myContext.TotalWifiTestsValue, myContext.setTotalWifiTests] = useState(0);
  // let [myContext.PassedWifiTestsValue, myContext.setPassedWifiTests] = useState(0);
  // let [myContext.FailedWifiTestsValue, myContext.setFailedWifiTests] = useState(0);
  // let [myContext.WifiTestInfoValue, myContext.setWifiTestInfo] = useState('');

  // let [totalWeight, setTotalWeight] = useState(0);
  // let [failedWeight, setFailedWeight] = useState(0);
  // let [readinessPercent, setReadinessPercent] = useState(0);


  

  

  function getTestValue() {

    
    TestModule.getString((info) => {
      console.log(info)
      myContext.setGeneralTestInfo(JSON.parse(info));
      
      myContext.setTotalGeneralTests(JSON.parse(info).generalChecks.length)
      
      let passVal = 0;
      let failVal = 0;
      let locationPermFound = false;
      
      let i, j;
      for (i = 0; i < JSON.parse(info).generalChecks.length; i++) {
        if (JSON.parse(info).generalChecks[i].status == "true") {
          passVal++;
        }
        else {
          failVal++;
        }
      }
      for ( i = 0; i < JSON.parse(info).appDetails.length; i++) {
        for ( j = 0 ; j < JSON.parse(info).appDetails[i].permissions.length; j++) {
          if (JSON.parse(info).appDetails[i].permissions[j] == 'android.permission.ACCESS_COARSE_LOCATION' || JSON.parse(info).appDetails[i].permissions[j] == 'android.permission.ACCESS_FINE_LOCATION') {
            locationPermFound = true;
            break;
          }
        }
      }
      if (locationPermFound == true) {
        failVal ++;
      }
      else {
        passVal++;
      }
      //console.log(passVal)
      myContext.setPassedGeneralTests(passVal)
      myContext.setFailedGeneralTests(failVal)

    });

    //findGeneralScore();
  }

  
  function getWifiValue() {
    
    //console.log('wifi called')
    TestModule.getWifi((info) => {
      //console.log(info)
      //console.log("x" == "x" ? 'tru' : 'fal')
      myContext.setWifiTestInfo(JSON.parse(info));
      myContext.setTotalWifiTests(JSON.parse(info).wifiCheck.length)
      myContext.setSSID(JSON.parse(info).ssid)

      
      //console.log(Object.values(JSON.parse(info))[1])
      
      let i;
      let passVal = 0;
      let failVal = 0;

      for (i = 0; i < JSON.parse(info).wifiCheck.length; i++) {
        if (JSON.parse(info).wifiCheck[i].value == "true") {
          passVal++;
        }
        else {
          failVal++;
        }
      }
      myContext.setPassedWifiTests(passVal);
      myContext.setFailedWifiTests(failVal);



      //was findWifiScore() in wifimodal.js -->

      let totalWifiWeight = 0;
    let passedWifiWeight = 0;
    let failedWifiWeight = 0;

    let NumCritWifiTests = 0;
    let NumHighWifiTests = 0;
    let NumMedWifiTests = 0;
    let NumLowWifiTests = 0;

    let PasswordWifiPassWeight = 0;
    let EncryptionWifiPassWeight = 0;
    let FirewallWifiPassWeight = 0;
    let DnsWifiPassWeight = 0;
    let EavesdroppingWifiPassWeight = 0;

    let PasswordWifiWeight = 0;
    let EncryptionWifiWeight = 0;
    let FirewallWifiWeight = 0;
    let DnsWifiWeight = 0;
    let EavesdroppingWifiWeight = 0;

    //console.log(tempJSON);
    
    
    
    for (i = 0; i <JSON.parse(info).wifiCheck.length; i++) {
      totalWifiWeight += JSON.parse(info).wifiCheck[i].weight;
      if (JSON.parse(info).wifiCheck[i].value == "true") {
        passedWifiWeight += JSON.parse(info).wifiCheck[i].weight;
      }
      else{
        failedWifiWeight += JSON.parse(info).wifiCheck[i].weight;

        if (JSON.parse(info).wifiCheck[i].weight >= 9)
          NumCritWifiTests++;
        else if (JSON.parse(info).wifiCheck[i].weight >= 6)
          NumHighWifiTests++;
        else if (JSON.parse(info).wifiCheck[i].weight >= 4)
          NumMedWifiTests++;
        else
          NumLowWifiTests++;
      }
    }



    //wifi table ->>

    for ( i = 0; i < JSON.parse(info).wifiCheck.length ; i++) {
      let tempName = JSON.parse(info).wifiCheck[i].name;
      let tempStatus = JSON.parse(info).wifiCheck[i].value;
      let tempWeight = JSON.parse(info).wifiCheck[i].weight;

      if ( tempStatus == 'true') {
        
        if ( tempName == 'isHiddenSSID') {
          PasswordWifiWeight += tempWeight;
          PasswordWifiPassWeight += tempWeight;
        }

        if ( tempName == 'isWifiEncrypted') {
          EncryptionWifiWeight += tempWeight;
          EncryptionWifiPassWeight += tempWeight;
        }

        if ( tempName == 'isport1Available' || tempName == 'isport2Available' || tempName == 'isport3Available' || tempName == 'isport4Available' ) {
          FirewallWifiWeight += tempWeight;
          FirewallWifiPassWeight += tempWeight;
        }

        if ( tempName == 'dnsPos') {
          DnsWifiWeight += tempWeight;
          DnsWifiPassWeight += tempWeight;
        }

        if ( tempName == 'isIpDefaultRouter' || tempName == 'isRouterAdminAccess' || tempName == 'isVpnNat') {
          EavesdroppingWifiWeight += tempWeight;
          EavesdroppingWifiPassWeight += tempWeight;
        }

      }
      else{
        if ( tempName == 'isHiddenSSID') {
          PasswordWifiWeight += tempWeight;
        }

        if ( tempName == 'isWifiEncrypted') {
          EncryptionWifiWeight += tempWeight;
        }

        if ( tempName == 'isport1Available' || tempName == 'isport2Available' || tempName == 'isport3Available' || tempName == 'isport4Available' ) {
          FirewallWifiWeight += tempWeight;
        }

        if ( tempName == 'dnsPos') {
          DnsWifiWeight += tempWeight;
        }

        if ( tempName == 'isIpDefaultRouter' || tempName == 'isRouterAdminAccess' || tempName == 'isVpnNat') {
          EavesdroppingWifiWeight += tempWeight;
        }

      }
      
    }

    myContext.setPasswordWifiPercentBar(Math.round(PasswordWifiPassWeight/PasswordWifiWeight * 100))
    myContext.setEncryptionWifiPercentBar(Math.round(EncryptionWifiPassWeight/EncryptionWifiWeight * 100))
    myContext.setFirewallWifiPercentBar(Math.round(FirewallWifiPassWeight/FirewallWifiWeight * 100))
    myContext.setDnsWifiPercentBar(Math.round(DnsWifiPassWeight/DnsWifiWeight * 100))
    myContext.setEavesdroppingWifiPercentBar(Math.round(EavesdroppingWifiPassWeight/EavesdroppingWifiWeight * 100))


    //<--wifi table 


    //wifi number of failed tests critical, high, med, low:
    myContext.setCritWifiTests(NumCritWifiTests);
    myContext.setHighWifiTests(NumHighWifiTests);
    myContext.setMedWifiTests(NumMedWifiTests);
    myContext.setLowWifiTests(NumLowWifiTests);
    //
    
    myContext.setTotalWifiWeight(totalWifiWeight);
    myContext.setFailedWifiWeight(failedWifiWeight);
    myContext.setReadinessWifiPercent(Math.round(passedWifiWeight/totalWifiWeight * 100))




      // <-- was findWifiScore() in wifimodal.js 

    });
  }

  //<-- weights




  let intervalRun, intervalSync, intervalWifi;


  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });
  
  let animation = useRef(new Animated.Value(0));
  let [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 100) {
      setProgress(progress + 1);
    }
  }, 1000);
  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: true,
    }).start();
  },[progress])

  let width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })


  function resetRun() {

    myContext.setTotalGeneralTests(0)
    myContext.setPassedGeneralTests(0)
    myContext.setFailedGeneralTests(0)
    myContext.setGeneralTestInfo(null)
    myContext.setCritGeneralTests(0)
    myContext.setHighGeneralTests(0)
    myContext.setMedGeneralTests(0)
    myContext.setLowGeneralTests(0)
    myContext.setTotalGeneralWeight(0)
    myContext.setFailedGeneralWeight(0)
    myContext.setReadinessGeneralPercent(0)
  }
  function animateRun() {
    let temp = 0;
    getTestValue();
    getWifiValue();
    myContext.setRunPercent(temp);
      
      
        intervalRun = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalRun);
            let temp2 = temp - 1;
            temp = temp - temp2;
            myContext.setRunStatus("Security Check Complete!");
            //setRunButton(false);
          }

          myContext.setRunPercent(temp)
        }, 500);
      
      
      
    
  }

  function animateWifi() {
    let temp = 0;
    getWifiValue();
    myContext.setWifiPercent(temp);
      
      
        intervalWifi = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalWifi);
            let temp2 = temp - 1;
            temp = temp - temp2;
            myContext.setWifiStatus("Wifi Check Complete!");
            //setWifiButton(false);
          }

          myContext.setWifiPercent(temp)
        }, 500);
      
      
      
    
  }
  function fetchDevices() {
    var formdata = new FormData();
    let tempName, tempRisk, tempReadiness;
    let tempDeviceLoop = [];
    var requestOptions = {
      method: 'GET',
      //body: formdata,
      redirect: 'follow'
    };
    console.log(myContext.UserIDValue)
    //let FetchURL = "http://54.177.45.25/mobileapi/deviceinfo/?user_id="+{myContext.UserIDValue}.toString();
    fetch("http://54.177.45.25/mobileapi/deviceinfo/?user_id="+myContext.UserIDValue, requestOptions)
    .then(response => response.json())
    .then(result => {
      myContext.setDeviceInfo(result)
      //console.log(result)
      // console.log(result)
      // console.log(result[0])
      // console.log(result[0].verified_devices)

      //was setDeviceSync() in syncmodal -->


      

    let i;
    

    for(i = 1; i <= Object.keys(result[0].verified_devices).length; i++) {
      tempName = result[0].verified_devices[i].name;
      tempRisk = result[0].verified_devices[i].risk;
      tempReadiness = parseInt(result[0].verified_devices[i].security_readiness)

      tempDeviceLoop.push(
        <View key = {i} style= {{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', width: '100%', height: '100%', paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

          <View style = {{ flex: 1.5, }}>
            <Text style={{flex: 1, color: 'white', fontSize: wp(4)}} numberOfLines={1}>{tempName}</Text>
          </View>

          <View style = {{ flex: 2, paddingRight: wp(2), paddingLeft: wp(1)}}>
            <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
              <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: tempReadiness > 15 ? tempReadiness.toString()+'%' : '15%', backgroundColor: tempReadiness > 90 ? '#2E7D32' : tempReadiness > 70 ? '#E65100' : tempReadiness > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                <Text style = {{color: 'white', fontSize: wp(2.5)}}>{tempReadiness}%</Text>
              </View>
            </View>
          </View>

          <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: tempReadiness > 90 ? '#2E7D32' : tempReadiness > 70 ? '#E65100' : tempReadiness > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                <Text style = {{color: 'white', fontSize: wp(3.5)}}>{tempRisk == "Medium" ? "Med" : (tempRisk == "Critical" ? "Crit" : tempRisk)}</Text>
              </View>
          </View>

        </View>

      )
      
    }

    



    //<-- was setDeviceSync() in sync modal .js






    })
    .catch(error => console.log('error', error));

    myContext.setDeviceLoop(tempDeviceLoop);

  }

  function animateSync() {
    let temp = 0;
    //getTestValue();
    fetchDevices();
    myContext.setSyncPercent(temp);
      
      
        intervalSync = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalSync);
            let temp2 = temp - 1;
            temp = temp - temp2;
            myContext.setSyncStatus("Device Sync Complete!");
            //setSyncButton(false);
          }

          myContext.setSyncPercent(temp)
        }, 500);
      
      
      
    
  }
// <-- end of modal stuff

  
  let internalColor;
  let securityLevel;
  if (readiness > 60){
    internalColor = "#179314";
    securityLevel = "Secure"
  }
  else if (readiness > 30){
    internalColor = "#f89a05";
    securityLevel = "High"
  }
  else{
    internalColor = "#db3913";
    securityLevel = "Critical"
  }

  function resetButtons() {
    //console.log("===================")
    setButtonOnePressed(false);
    setButtonTwoPressed(false);
    setButtonThreePressed(false);
    setButtonFourPressed(false);
    setButtonFivePressed(false);
    setButtonSixPressed(false);
    setButtonSevenPressed(false);

    setButtonOneStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#9fcFfb', borderRadius: 15,});
    setButtonOneTextStyle({color: '#9fcFfb', height:hp(3), color: 'white'});
    setButtonTwoStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#bee0ff', borderRadius: 15,});
    setButtonTwoTextStyle({color: '#bee0ff', height: hp(3), color: 'white'});
    setButtonThreeStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#d6ebff', borderRadius: 15,});
    setButtonThreeTextStyle({color: '#d6ebff', height:hp(3), color: 'white'});
    setButtonFourStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#f2f9ff', borderRadius: 15,});
    setButtonFourTextStyle({color: '#f2f9ff', height:hp(3), color: 'white'});
    setButtonFiveStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#fffffF', borderRadius: 15,});
    setButtonFiveTextStyle({color: '#fffffF', height:hp(3), color: 'white'});
    setButtonSixStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#fffffF', borderRadius: 15,});
    setButtonSixTextStyle({color: 'white', height:hp(3), color: 'white'});
    setButtonSevenStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: '#fffffF', borderRadius: 15,});
    setButtonSevenTextStyle({color: 'white', height:hp(3), color: 'white'});

  }
  function buttonOneOnPress () {
    resetButtons();
    setButtonOnePressed(true);
    setActiveButtonValue(myContext.DeviceReadinessPercentValue);
    setActiveButtonLabel('Device');
    setButtonOneStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorOne, borderRadius: 15, backgroundColor: colorOne});
    setButtonOneTextStyle({color: '#000000', height:hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  function buttonTwoOnPress () {
    resetButtons();
    setButtonTwoPressed(true);
    setActiveButtonValue(myContext.EmailReadinessPercentValue);
    setActiveButtonLabel('Email');
    setButtonTwoStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorTwo, borderRadius: 15, backgroundColor: colorTwo});
    setButtonTwoTextStyle({color: '#000000', height: hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  function buttonThreeOnPress () {
    resetButtons();
    setButtonThreePressed(true);
    setActiveButtonValue(myContext.WifiReadinessPercentValue);
    setActiveButtonLabel('Wifi');
    setButtonThreeStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorThree, borderRadius: 15, backgroundColor: colorThree});
    setButtonThreeTextStyle({color: '#000000', height:hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  function buttonFourOnPress () {
    resetButtons();
    setButtonFourPressed(true);
    setActiveButtonValue(myContext.DataReadinessPercentValue);
    setActiveButtonLabel('Data');
    setButtonFourStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorFour, borderRadius: 15, backgroundColor: colorFour});
    setButtonFourTextStyle({color: '#000000', height:hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  function buttonFiveOnPress () {
    resetButtons();
    setButtonFivePressed(true);
    setActiveButtonValue(myContext.FirewallReadinessPercentValue);
    setActiveButtonLabel('Firewall');
    setButtonFiveStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorFive, borderRadius: 15, backgroundColor: colorFive});
    setButtonFiveTextStyle({color: '#000000', height:hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  function buttonSixOnPress () {
    resetButtons();
    setButtonSixPressed(true);
    setActiveButtonValue(myContext.WebReadinessPercentValue);
    setActiveButtonLabel('Firewall');
    setButtonSixStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorSix, borderRadius: 15, backgroundColor: colorSix});
    setButtonSixTextStyle({color: '#000000', height:hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  function buttonSevenOnPress () {
    resetButtons();
    setButtonSevenPressed(true);
    setActiveButtonValue(myContext.PrivacyReadinessPercentValue);
    setActiveButtonLabel('Firewall');
    setButtonSevenStyle({...styles.centrify, flex:1, borderWidth: 2, borderColor: colorSeven, borderRadius: 15, backgroundColor: colorSeven});
    setButtonSevenTextStyle({color: '#000000', height:hp(3),});
    if (activeButtonValue > 90) {
      setActiveButtonRiskValue("Low")
      setActiveButtonRiskValueColor("#2E7D32")
    }
    else if (activeButtonValue > 50) {
      setActiveButtonRiskValue("Medium")
      setActiveButtonRiskValueColor("#F57F17")
    }
    else {
      setActiveButtonRiskValue("High")
      setActiveButtonRiskValueColor("#B71C1C")
    }
  }
  


  
  return (

    <View style={{ ...styles.centrify, flex: 1 }}>
      
      <RunModal />
      <SyncModal />
      <WifiModal />


      {/*<Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
      
                
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    
                    <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                      <Text style={styles.modalText}>Security Check</Text>
                    </View>
      
                    <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                      <Progress.Bar
                                        style={styles.progressBar}
                                        progress={runValue}
                                      />
                      <Text style= {{ color: '#D3D3D3'}}>{runValueShow}%</Text>
                      <Text style= {{ color: '#D3D3D3'}}>{myContext.globalVarValue}</Text>
                      <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{runStatus}</Text>
                    </View>
      
                    <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A',  }} >
                      <TouchableHighlight
                        style={ { ...styles.openButton, backgroundColor: "#00ACEB", }}
                        onPress={() => {
                          findGeneralScore();
                          setModalVisible(!modalVisible);
      
                        }}
                        //disabled = {runButton}
                      >
                        <Text style={styles.textStyle}>     Close     </Text>
                      </TouchableHighlight>                
                    </View>
                  </View>
                </View>
              </Modal>
      
              <Modal
                animationType="slide"
                transparent={true}
                visible={modal2Visible}
                
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    
                    <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                      <Text style={styles.modalText}>Sync</Text>
                    </View>
      
                    <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                      <Progress.Bar
                        style={styles.progressBar}
                        progress={syncValue}
                      />
                      <Text style= {{ color: '#D3D3D3'}}>{syncValueShow}%</Text>
                      <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{syncStatus}</Text>
                    </View>
      
                    <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                          setModal2Visible(!modal2Visible);
                        }}
                        // disabled = {syncButton}
                      >
                       <Text style={styles.textStyle}>     Close     </Text>
                      </TouchableHighlight>                
                    </View>
                  </View>
                </View>
              </Modal>
      
              <Modal
                animationType="slide"
                transparent={true}
                visible={modal3Visible}
                
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                      <Text style={styles.modalText}>Wifi check</Text>
                    </View>
      
                    <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                      <Progress.Bar
                        style={styles.progressBar}
                        progress={syncValue}
                      />
                      <Text style= {{ color: '#D3D3D3'}}>{wifiValueShow}%</Text>
                      <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{wifiStatus}</Text>
                    </View>
      
                    <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                          setModal3Visible(!modal3Visible);
                          navigation.navigate("Wifi")
                        }}
                        // disabled = {wifiButton}
                      >
                       <Text style={styles.textStyle}>     Close     </Text>
                      </TouchableHighlight>                
                    </View>
                  </View>
                </View>
              </Modal>*/}

        <View style={{ ...styles.centrify, flex: 9, backgroundColor: '#18222E'}}>
        
          {/*<SafeAreaView>
            <ScrollView>*/}
              <View style={{ ...styles.centrify, flex: 1 }}>
                <View style = {{ ...styles.container, flex: 1, }}>
                  <View style={{ paddingTop: hp(1), }}>
                    <Text style= {{ fontSize: wp(6),   color: '#D3D3D3',   }}>Security Risk</Text>
                    

                  </View>
                </View>
                <View style = {{ ...styles.container, flexDirection: 'row', flex: 4, }}>
                  <View style = {{ ...styles.container, flex: 2  }}>
                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0,}}>
                      <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0,}}>
                      <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(55)}
                        width={wp(55)}
                      >
                        
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.ReadinessGeneralPercentValue }, { y: 100 - myContext.ReadinessGeneralPercentValue }, ]}
                          width={wp(55)}
                          height={wp(55)}
                          radius={wp(14.5)}
                          colorScale={readinessColorOuter}
                          innerRadius={wp(17.5)}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.ReadinessGeneralPercentValue }, { y: 100 - myContext.ReadinessGeneralPercentValue }, ]}
                          width={wp(55)}
                          height={wp(55)}
                          radius={wp(15.9)}
                          colorScale={readinessColorMiddle}
                          innerRadius={wp(16.1)}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.ReadinessGeneralPercentValue }, { y: 100 - myContext.ReadinessGeneralPercentValue }, ]}
                          width={wp(55)}
                          height={wp(55)}
                          radius={wp(15.25)}
                          colorScale={readinessColorInner}
                          innerRadius={wp(16.75)}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />

                        
                        <VictoryLabel 
                          textAnchor="middle"
                          style={{ fontSize: wp(6), fill: 'white'}}
                          x={wp(27.5)}
                          y={wp(27.5)}
                          
                          text={[myContext.ReadinessGeneralPercentValue + "%",securityLevel]}
                        />
                      </VictoryContainer>
                      
                    </View>
                    {/*<View style = {{ ...styles.centrify, flex: 1, paddingBottom: 0, paddingTop: 0, borderWidth: 1 }}>
                      <Text style = {{ fontSize: 15,      }}> {readiness}% </Text>
                      <Text style = {{ fontSize: 15,      }}> {securityLevel} </Text>
                    </View>*/}
                    </View>
                    
                  </View>
                  <View style = {{ ...styles.container, flex: 1, paddingTop: hp(0), flexDirection: 'column', marginRight: windowWidth/50, }}>
                    <View style = {{ ...styles.centrify, flex: 0.75,}}>
                      <Text style = {{color: 'white', fontSize: wp(3)}}>Failed tests: {myContext.FailedGeneralTestsValue + myContext.FailedWifiTestsValue} out of {myContext.TotalGeneralTestsValue + myContext.TotalWifiTestsValue}</Text>
                    </View>
                    <View style = {{ ...styles.centrify, flex: 1, flexDirection: 'row',}}>
                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.CritGeneralTestsValue }, { y: (myContext.TotalGeneralTestsValue  + myContext.TotalWifiTestsValue == 0 ? 1 : myContext.TotalGeneralTestsValue  + myContext.TotalWifiTestsValue) - myContext.CritGeneralTestsValue }, ]}
                          width={wp(12.5)}
                          height={wp(12.5)}
                          colorScale={['#B71C1C','white']}
                          innerRadius={15}
                          radius={20}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />
                        <VictoryLabel 
                          textAnchor="middle"
                          style={{ fontSize: wp(3), fill: 'white'}}
                          x={wp(6.25)}
                          y={wp(6.25)}
                          
                          text={myContext.CritGeneralTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> Critical </Text>
                      </View>

                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.HighGeneralTestsValue }, { y: (myContext.TotalGeneralTestsValue  + myContext.TotalWifiTestsValue== 0 ? 1 : myContext.TotalGeneralTestsValue + myContext.TotalWifiTestsValue) - myContext.HighGeneralTestsValue }, ]}
                          width={50}
                          height={50}
                          colorScale={['#E65100','white']}
                          innerRadius={15}
                          radius={20}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />
                        <VictoryLabel 
                          textAnchor="middle"
                          style={{ fontSize: wp(3), fill: 'white'}}
                          x={wp(6.25)}
                          y={wp(6.25)}
                          
                          text={myContext.HighGeneralTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> High </Text>
                      </View>

                    </View>
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, flexDirection: 'row',}}>
                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.MedGeneralTestsValue }, { y: (myContext.TotalGeneralTestsValue  + myContext.TotalWifiTestsValue== 0 ? 1 : myContext.TotalGeneralTestsValue + myContext.TotalWifiTestsValue) - myContext.MedGeneralTestsValue }, ]}
                          width={wp(12.5)}
                          height={wp(12.5)}
                          colorScale={['#F57F17','white']}
                          innerRadius={15}
                          radius={20}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />
                        <VictoryLabel 
                          textAnchor="middle"
                          style={{ fontSize: wp(3), fill: 'white'}}
                          x={wp(6.25)}
                          y={wp(6.25)}
                          
                          text={myContext.MedGeneralTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> Medium </Text>
                      </View>

                    </View>
                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.LowGeneralTestsValue }, { y: (myContext.TotalGeneralTestsValue  + myContext.TotalWifiTestsValue== 0 ? 1 : myContext.TotalGeneralTestsValue + myContext.TotalWifiTestsValue) - myContext.LowGeneralTestsValue }, ]}
                          width={wp(12.5)}
                          height={wp(12.5)}
                          colorScale={['#2E7D32','white']}
                          innerRadius={15}
                          radius={20}
                          labels={labelData}
                          startAngle = {0}
                          endAngle = {360}
                          
                         

                        />
                        <VictoryLabel 
                          textAnchor="middle"
                          style={{ fontSize: wp(3), fill: 'white'}}
                          x={wp(6.25)}
                          y={wp(6.25)}
                          
                          text={myContext.LowGeneralTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> Low </Text>
                      </View>

                    </View>
                    </View>
                  </View>
                </View>

                <View style = {{ ...styles.container, flex: 1, }}>
                  <View style={{  }}>
                    <Text style= {{ fontSize: wp(6),   color: '#D3D3D3'   }}>Threat Breakdown</Text>
                  </View>
                </View>
                <View style = {{ ...styles.container, flexDirection: 'row', flex: 4, }}>
                  <View style = {{ ...styles.container, flex: 1, alignItems: 'flex-end',  }}>
                    <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(40)}
                        width={wp(40)}
                      >
                            <VictoryPie

                              animate={{ easing: 'exp',}}
                              padAngle={3}
                              radius={
                                ({ datum }) => {
                                  // console.log(buttonOnePressed+ " "+ datum.y + " "+ myContext.DeviceReadinessPercentValue);
                                  // console.log(buttonTwoPressed+ " "+ datum.y + " "+ myContext.EmailReadinessPercentValue);
                                  // console.log(buttonThreePressed+ " "+ datum.y + " "+ myContext.WifiReadinessPercentValue);
                                  // console.log(buttonFourPressed+ " "+ datum.y + " "+ myContext.DataReadinessPercentValue);
                                  // console.log(buttonFivePressed+ " "+ datum.y + " "+ myContext.FirewallReadinessPercentValue);
                                  // console.log(" ")
                                  

                                  if (buttonOnePressed == true && datum.y == myContext.DeviceReadinessPercentValue) {
                                    return wp(16) 
                                  }
                                  else if (buttonTwoPressed == true && datum.y == myContext.EmailReadinessPercentValue) {
                                    return wp(16) 
                                  }
                                  else if (buttonThreePressed == true && datum.y == myContext.WifiReadinessPercentValue) {
                                    return wp(16)
                                  }
                                  else if (buttonFourPressed == true && datum.y == myContext.DataReadinessPercentValue) {
                                    return wp(16) 
                                  }
                                  else if (buttonFivePressed == true && datum.y == myContext.FirewallReadinessPercentValue) {
                                    return wp(16) 
                                  }
                                  else if (buttonSixPressed == true && datum.y == myContext.WebReadinessPercentValue) {
                                    return wp(16) 
                                  }
                                  else if (buttonSevenPressed == true && datum.y == myContext.PrivacyReadinessPercentValue) {
                                    return wp(16) 
                                  }
                                  else {
                                    return wp(14.5)
                                  }
                                  
                                }
                              }
                              data={spreadData}
                              width={wp(40)}
                              height={wp(40)}
                              colorScale={spreadColor}
                              innerRadius={
                                ({ datum }) => {
                                  // console.log(buttonOnePressed+ " "+ datum.y + " "+ myContext.DeviceReadinessPercentValue);
                                  // console.log(buttonTwoPressed+ " "+ datum.y + " "+ myContext.EmailReadinessPercentValue);
                                  // console.log(buttonThreePressed+ " "+ datum.y + " "+ myContext.WifiReadinessPercentValue);
                                  // console.log(buttonFourPressed+ " "+ datum.y + " "+ myContext.DataReadinessPercentValue);
                                  // console.log(buttonFivePressed+ " "+ datum.y + " "+ myContext.FirewallReadinessPercentValue);
                                  // console.log(" ")


                                  if (buttonOnePressed == true && datum.y == myContext.DeviceReadinessPercentValue) {
                                    return wp(12) 
                                  }
                                  else if (buttonTwoPressed == true && datum.y == myContext.EmailReadinessPercentValue) {
                                    return wp(12) 
                                  }
                                  else if (buttonThreePressed == true && datum.y == myContext.WifiReadinessPercentValue) {
                                    return wp(12)
                                  }
                                  else if (buttonFourPressed == true && datum.y == myContext.DataReadinessPercentValue) {
                                    return wp(12) 
                                  }
                                  else if (buttonFivePressed == true && datum.y == myContext.FirewallReadinessPercentValue) {
                                    return wp(12) 
                                  }
                                  else if (buttonSixPressed == true && datum.y == myContext.WebReadinessPercentValue) {
                                    return wp(12) 
                                  }
                                  else if (buttonSevenPressed == true && datum.y == myContext.PrivacyReadinessPercentValue) {
                                    return wp(12) 
                                  }
                                  else {
                                    return wp(13.5)
                                  }
                                  
                                }
                              }
                              startAngle = {0}
                              endAngle = {360}
                              style={{
                                labels: {
                                  fontSize: 0,
                                }
                              }}
                            />{/* can add labeldata */}

                            <VictoryLabel 
                              textAnchor="middle"
                              style={{ fontSize: wp(6), fill: 'white'}}
                              x={wp(20)}
                              y={wp(20)}
                              
                              text={[activeButtonValue+"%"]}
                            />


                    </VictoryContainer>
                    
                  </View>
                  {/* 

                  <View style = {{ ...styles.container, flex: 1, paddingTop: windowHeight/100 }}>
                    <VictoryLegend 
                      x={0} 
                      y={0}
                      height = {windowHeight/3.5}
                      width= {windowWidth/3}
                      itemsPerRow= {6}
                      orientation="vertical"
                      gutter={windowWidth/10}
                      style={{  }}
                      colorScale={spreadColor}
                      data={[
                        { name: "Device" }, { name: "Email" }, { name: "WiFi" }, { name: "Data" }, { name: "Firewall" }, { name: "Web" }
                      ]}
                    />
                  </View>

                  */}
                  <View style = {{ ...styles.container, flex: 1, paddingTop: hp(1),}}>
                    <View style = {{ ...styles.centrify, flex: 1, }}>
                      <Text style = {{ color: 'white' }}>{activeButtonLabel} Risk: <Text style = {{ color: activeButtonRiskValueColor}}>{activeButtonRiskValue}</Text></Text>
                    </View>
                    
                  </View>
                </View>
                <View style = {{ ...styles.container, flex: 1, paddingBottom: hp(2)}}>
                  <View style = {{ ...styles.centrify, flexDirection: 'row', height: hp(7.5)}}>
                    
                    

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft: wp(1), paddingRight: wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonOneOnPress}>
                        <View style = {buttonOneStyle}> 
                          <Text style = {buttonOneTextStyle}> Device </Text>
                          <Text style = {buttonOneTextStyle}> {myContext.DeviceReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft:  wp(1), paddingRight:  wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonTwoOnPress}>
                        <View style = {buttonTwoStyle}> 
                          <Text style = {buttonTwoTextStyle}> Email </Text>
                          <Text style = {buttonTwoTextStyle}> {myContext.EmailReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft: wp(1), paddingRight: wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonThreeOnPress}>
                        <View style = {buttonThreeStyle}> 
                          <Text style = {buttonThreeTextStyle}> Wifi </Text>
                          <Text style = {buttonThreeTextStyle}> {myContext.WifiReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft: wp(1), paddingRight: wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonFourOnPress}>
                        <View style = {buttonFourStyle}> 
                          <Text style = {buttonFourTextStyle}> Data </Text>
                          <Text style = {buttonFourTextStyle}> {myContext.DataReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft: wp(1), paddingRight: wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonFiveOnPress}>
                        <View style = {buttonFiveStyle}> 
                          <Text style = {buttonFiveTextStyle}>Firewall</Text>
                          <Text style = {buttonFiveTextStyle}> {myContext.FirewallReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft: wp(1), paddingRight: wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonSixOnPress}>
                        <View style = {buttonSixStyle}> 
                          <Text style = {buttonSixTextStyle}> Web </Text>
                          <Text style = {buttonSixTextStyle}> {myContext.WebReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, paddingLeft: wp(1), paddingRight: wp(1), }}>
                      <TouchableWithoutFeedback onPress = {buttonSevenOnPress}>
                        <View style = {buttonSevenStyle}> 
                          <Text style = {buttonSevenTextStyle}>Privacy</Text>
                          <Text style = {buttonSevenTextStyle}> {myContext.PrivacyReadinessPercentValue}%</Text>
                        </View>
                      </TouchableWithoutFeedback>    
                    </View>

                    

                    






                  </View>
                </View>
              </View>
           {/* </ScrollView>
          </SafeAreaView>*/}


      
    
        </View>
        <View style={{ ...styles.centrify, flex: 1, flexDirection: 'row', backgroundColor: '#1C2B3A'}}>
          <View style={{ ...styles.centrify, flex: 1, }}>
            <View style={{ ...styles.centrify, flex: 4, alignItems: 'flex-end', paddingRight: wp(2)}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  
                  
                  myContext.setRunModalVisible(true);
                  myContext.setRunStatus("Running Security Check...");
                  //resetRun();
                  animateRun();
                  

                }}
                //onPress={globalFunc}
              >
                <Image
                style={{ width: wp(6), height: wp(6), }}
                source={require('../assets/android/4x/run_btm_bar_menu_normalxxxhdpi.png')}
              />
              <Text style = {{   color: '#FFFFFF',  }}>Run</Text>
              </TouchableOpacity>
              
            </View>
             
          </View>

          <View style={{ ...styles.centrify, flex: 1, }}>
            <View style={{ ...styles.centrify, flex: 4, }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  
                  myContext.setNavigationVar(navigation);
                  myContext.setWifiModalVisible(true);
                  myContext.setWifiStatus("Checking Wifi...");

                  animateWifi();
                }}
              >
                <Image
                style={{ width: wp(6), height: wp(6), }}
                source={require('../assets/android/4x/wifi_check_btm_bar_menu_normalxxxhdpi.png')}
              />
                <Text style = {{   color: '#FFFFFF',  }}>Check WiFi</Text>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={{ ...styles.centrify, flex: 1, }}>
            <View style={{ ...styles.centrify, flex: 4, alignItems: 'flex-start', paddingLeft: wp(2)}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  

                  myContext.setSyncModalVisible(true);
                  myContext.setSyncStatus("Syncing Devices...");
                  animateSync();
                }}
              >
                <Image
                style={{ width: wp(6), height: wp(6), }}
                source={require('../assets/android/4x/sync_btm_bar_menu_normalxxxhdpi.png')}
              />
                <Text style = {{   color: '#FFFFFF',  }}>Sync</Text>
              </TouchableOpacity>
            </View>
             
          </View>

          
          
        </View>
      
      </View>
  );
}



{/*function HeaderComponent(){
  return(
    
    <Text style= {{ fontSize: windowHeight/30, color:'#FFFFFF' }}>White<Text style= {{ fontSize: windowHeight/30, color:'#FE0000' }}>HaX</Text></Text>
    
  )
}
export default function Dashboard({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Home" component={DashboardScreen} options={{
          
          headerTitleStyle: {
            fontSize: windowWidth/10,

            color: 'red',
          },
          headerStyle: {
            backgroundColor: '#1C2B3A',
            height: windowHeight/7.5,
          },
          title: HeaderComponent(),
          headerLeft: () => (
            <TouchableWithoutFeedback  onPress={() => navigation.toggleDrawer()}>
              <View style = {{ paddingLeft: windowWidth/30, }}>
                <Image
                  style={{ width: 35, height: 35, }}
                  source={require('../assets/android/4x/top_bar_menu_iconxxxhdpi.png')}
                />
              </View>
            </TouchableWithoutFeedback>
            
          ),
        }}/>
      
    </Stack.Navigator>
  );
}*/}



const styles = StyleSheet.create({

  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
    
    borderWidth: 0,
  },
  centrify:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
  button: {
    alignItems: "center",
    
    
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(4),
  },
  modalView: {
    height: hp(50),

    width: wp(80),
    margin: hp(3),
    backgroundColor: "#1C2B3A",
    borderRadius: 20,
    padding: wp(5),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: wp(3),
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    
    
         
  },
  modalText: {
    marginTop: hp(5),
    marginBottom: hp(3),
    textAlign: "center",
    fontSize: wp(5),
    color: '#D3D3D3'
         
  },

  progressBarContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: wp(3),
  },
  progressBar: {
    margin: wp(3),
  },
});


