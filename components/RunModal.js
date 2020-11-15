import React, { useRef, useState, useEffect, Component, useContext } from "react";
import {  Modal, Button, View, Text, Image, TouchableOpacity, TouchableHighlight,  } from 'react-native';
import { styles } from '../styles/ModalStyle.js'
import AppContext from "./AppContext";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




export default function modalTest() {
  const myContext = useContext(AppContext);


  function findGeneralScore() {

    let tempGeneralJSON = myContext.GeneralTestInfoValue
    let tempWifiJSON = myContext.WifiTestInfoValue
    let configJSON = {"profile_subcategory_mappings":[{"id":4001,"test_name":"isLockPasswordEnable","attack_name":"WH_DeviceLock_Check","estimated_time":30,"decription":"Locking the Device when not in use, prevents misuse","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Device Lock","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4002,"test_name":"","attack_name":"WH_SmartLock_Check","estimated_time":30,"decription":"Locking the Device when not in use, prevents misuse","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Smart Lock","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4003,"test_name":"isLockPasswordStrong","attack_name":"WH_Passwd_Check","estimated_time":30,"decription":"You should use a strong passwd for Device and Data protection","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Weak Password","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4004,"test_name":"isGooglePlayProtectEnable","attack_name":"WH_Google_Play_Protect","estimated_time":30,"decription":"Google Play Protect provides application verification","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Application Verification","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4005,"test_name":"","attack_name":"WH_SW_Version_Check","estimated_time":30,"decription":"Keep you Android OS up-to-date to get latest security features","security_soln":"OS and User","remedy_str":"NA","weight":2,"readiness_type":"Device","display_name":"Android OS Version","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4006,"test_name":"","attack_name":"WH_SW_Update_ON","estimated_time":30,"decription":"Keep you Android OS up-to-date to get latest security features","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Android OS Update","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4007,"test_name":"isDefaultBrowserSafe","attack_name":"WH_Browser_Default","estimated_time":30,"decription":"Use a browser that provides strong privacy and data protection","security_soln":"Web Security","weight":2,"readiness_type":"Web","display_name":"Browser Type","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4008,"test_name":"isDefaultBrowserUpdated","attack_name":"WH_Browser_Version","estimated_time":30,"decription":"Keep you Browser up-to-date to get latest security features","security_soln":"Web Security","weight":2,"readiness_type":"Web","display_name":"Broswer Update","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4009,"test_name":"","attack_name":"WH_Safe_Browsing_Check","estimated_time":30,"decription":"NA","security_soln":"Web Security","weight":2,"readiness_type":"Web","display_name":"Safe Browser","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4010,"test_name":"","attack_name":"WH_Web_Proxy_Check","estimated_time":30,"decription":"NA","security_soln":"Web Security","weight":2,"readiness_type":"Web","display_name":"Web Proxy for Web Protection","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4011,"test_name":"","attack_name":"WH_Web_VPN_Check","estimated_time":30,"decription":"NA","security_soln":"Web Security","weight":2,"readiness_type":"Web","display_name":"Web VPN for Web Protection","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4012,"test_name":"","attack_name":"WH_2FA_Auth_Check","estimated_time":30,"decription":"NA","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"2 Factor Authentication","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4013,"test_name":"","attack_name":"WH_Google_Account_Security","estimated_time":30,"decription":"NA","security_soln":"OS and User","weight":2,"readiness_type":"Data","display_name":"Google Account Security","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4014,"test_name":"","attack_name":"WH_Privacy_Loc_Share_Cam","estimated_time":30,"decription":"Turn off Location Sharing when using Camera to protect privacy","security_soln":"Privacy","weight":2,"readiness_type":"Privacy","display_name":"Privacy - Camera Location Sharing","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4015,"test_name":"","attack_name":"WH_Privacy_Loc_Share_Apps","estimated_time":30,"decription":"Turn off Location Sharing when using Social Media to protect privacy","security_soln":"Privacy","weight":2,"readiness_type":"Privacy","display_name":"Privacy - App Location Sharing","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4016,"test_name":"","attack_name":"WH_Privacy_SocMed_Loc_Share","estimated_time":30,"decription":"Turn on Privacy and security settings when using Social Media Apps","security_soln":"Privacy","weight":2,"readiness_type":"Privacy","display_name":"Privacy - Social Media Location Sharing","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4017,"test_name":"isWeakFireWallAppAvailable","attack_name":"WH_FW_Installed","estimated_time":30,"decription":"Firewall protects your Device communication","security_soln":"Firewall","weight":2,"readiness_type":"Firewall","display_name":"Weak Firewall","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4018,"test_name":"isAntiPhishingAppAvailable","attack_name":"WH_AntiPhishing_Installed","estimated_time":30,"decription":"You are missing Email protection against Phishing ","security_soln":"Email","weight":2,"readiness_type":"Email","display_name":"Weak Email Security","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4019,"test_name":"isAntiMalwareAppAvailable","attack_name":"WH_AntiVirus_Installed","estimated_time":30,"decription":"You are missing  protection against Viruses and Malware ","security_soln":"Email, Web","weight":2,"readiness_type":"Email, Web","display_name":"Weak Virus Protection","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4020,"test_name":"isVPNAppAvailable","attack_name":"WH_VPN_App_Check","estimated_time":30,"decription":"You are missing  VPN for enhance privacy and security while browsing Admin User access can cause many types of data and security breach","security_soln":"Email, Web","weight":2,"readiness_type":"Email, Web","display_name":"Blocking ISP Data Snooping","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4021,"test_name":"","attack_name":"WH_DataExfiltration_Cookie_Scan","estimated_time":30,"decription":"NA","security_soln":"Data","weight":2,"readiness_type":"Data","display_name":"Data Stealing thru Cookies","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4022,"test_name":"","attack_name":"WH_DataExfiltration_Dir_Scan","estimated_time":30,"decription":"NA","security_soln":"Data","weight":2,"readiness_type":"Data","display_name":"Data Stealing thru Files","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4023,"test_name":"isDeviceRooted","attack_name":"WH_OS_Rooted_Check1","estimated_time":30,"decription":"Admin User access can cause many types of data and security breach","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Potential 3rd-party Device Control","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4024,"test_name":"isDeviceRooted","attack_name":"WH_OS_Rooted_Check2","estimated_time":30,"decription":"Admin User access can cause many types of data and security breach","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Potential 3rd-party Device Control","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4025,"test_name":"isDeviceRooted","attack_name":"WH_OS_Rooted_Check3","estimated_time":30,"decription":"Admin User access can cause many types of data and security breach","security_soln":"OS and User","weight":2,"readiness_type":"Device","display_name":"Potential 3rd-party Device Control","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4027,"test_name":"isHiddenSSID","attack_name":"WH_Wifi_SSID_Visible","estimated_time":30,"decription":"Hide WiFi SSID to protect your WiFi against intrusions","security_soln":"WiFi Router/FW","weight":6,"readiness_type":"WiFi Security","display_name":"Wifi SSID Pubicly Visible","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4028,"test_name":"isWifiEncrypted","attack_name":"WH_Wifi_Encrypt_Strength","estimated_time":30,"decription":"Use strong WiFI Encryption for stronger security","security_soln":"WiFi Router/FW","weight":9,"readiness_type":"WiFi Security","display_name":"Weak Wifi Encryption","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4029,"test_name":"isIpDefaultRouter","attack_name":"WH_Wifi_Router_IP_Default","estimated_time":30,"decription":"Using vendor default IP increases WiFi break-in risks","security_soln":"WiFi Router/FW","weight":7,"readiness_type":"WiFi Security","display_name":"Wifi uses Vendor Default","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4030,"test_name":"isRouterAdminAccess","attack_name":"WH_Wifi_Router_Admin_Access","estimated_time":30,"decription":"Using vendor default Router passwd increases WiFi break-in risks","security_soln":"WiFi Router/FW","weight":9,"readiness_type":"WiFi Security","display_name":"Wifi Admin Access Break-in","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4031,"test_name":"isport1Available","attack_name":"WH_Wifi_FW_Port1","estimated_time":30,"decription":"Do not allow inbound connections from Internet","security_soln":"WiFi Router/FW","weight":7,"readiness_type":"FirFirewall","display_name":"Firewall Inbound Access","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4032,"test_name":"isport2Available","attack_name":"WH_Wifi_FW_Port2","estimated_time":30,"decription":"Do not allow inbound connections from Internet","security_soln":"WiFi Router/FW","weight":7,"readiness_type":"Firewall","display_name":"Firewall Inbound Access","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4033,"test_name":"isport3Available","attack_name":"WH_Wifi_FW_Port3","estimated_time":30,"decription":"Do not allow inbound connections from Internet","security_soln":"WiFi Router/FW","weight":7,"readiness_type":"Firewall","display_name":"Firewall Inbound Access","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4034,"test_name":"isport4Available","attack_name":"WH_Wifi_FW_Port4","estimated_time":30,"decription":"Do not allow inbound connections from Internet","security_soln":"WiFi Router/FW","weight":7,"readiness_type":"Firewall","display_name":"Firewall Inbound Access","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4035,"test_name":"dnsPos","attack_name":"WH_Wifi_DNS_Poisoning","estimated_time":30,"decription":"Your WiFi accesses potentially compromised DNS server","security_soln":"WiFi Router/FW","weight":6,"readiness_type":"WiFi Security","display_name":"Wifi DNS Poisoning Risk","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}},{"id":4036,"test_name":"isVpnNat","attack_name":"WH_Wifi_VPN_NAT","estimated_time":30,"decription":"You VPN over WiFi to increase Data Security and Privacy","security_soln":"WiFi Router/FW","weight":6,"readiness_type":"WiFi Security","display_name":"No Wifi VPN","active":true,"category":"","remediation":{"auto":true,"steps_list":[],"function":{"function_name":"","function_parameters":""}}}]}
    //console.log(tempGeneralJSON);
    //console.log(tempWifiJSON);
    //console.log(myContext.GeneralTestInfoValue)
    let totalWeight = 0;
    let passedWeight = 0;
    let failedWeight = 0;

    let NumCritTests = 0;
    let NumHighTests = 0;
    let NumMedTests = 0;
    let NumLowTests = 0;

    let NumCritWifiTests = 0;
    let NumHighWifiTests = 0;
    let NumMedWifiTests = 0;
    let NumLowWifiTests = 0;

    let OneRemName = ''
    let setOneRemDescription = '';
    let TwoRemName = ''
    let setTwoRemDescription = '';
    let ThreeRemName = ''
    let setThreeRemDescription = '';
    let FourRemName = ''
    let setFourRemDescription = '';


    let DevicePassWeight = 0;
    let EmailPassWeight = 0;
    let WebPassWeight = 0;
    let WifiPassWeight = 0;
    let FirewallPassWeight = 0;
    let DataPassWeight = 0;
    let PrivacyPassWeight = 0;

    let DeviceWeight = 0;
    let EmailWeight = 0;
    let WebWeight = 0;
    let WifiWeight = 0;
    let FirewallWeight = 0;
    let DataWeight = 0;
    let PrivacyWeight = 0;

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
    // console.log(tempGeneralJSON);
    
    let TopGeneral = [0,0,0,0];
    let TopGeneralIndex = [0,0,0,0];

    let TopWifi = [0,0,0,0];
    let TopWifiIndex = [0,0,0,0];
    
    
    
    let i;



    for (i = 0; i <tempGeneralJSON.generalChecks.length; i++) {
      totalWeight += tempGeneralJSON.generalChecks[i].weight;
      
      if (tempGeneralJSON.generalChecks[i].name == "isWeakFireWallAppAvailable") {
        console.log(tempGeneralJSON.generalChecks[i].status + "     " + tempGeneralJSON.generalChecks[i].weight)
      }

      if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Device") {
        DeviceWeight += tempGeneralJSON.generalChecks[i].weight;
      }
      else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Email") {
        EmailWeight += tempGeneralJSON.generalChecks[i].weight;
      }
      else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Web") {
        WebWeight += tempGeneralJSON.generalChecks[i].weight;
      }
      else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "WiFi Security") {
        WifiWeight += tempGeneralJSON.generalChecks[i].weight;
      }
      else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Firewall") {
        FirewallWeight += tempGeneralJSON.generalChecks[i].weight;
      }
      else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Data") {
        DataWeight += tempGeneralJSON.generalChecks[i].weight;
      }


      

      


      if (tempGeneralJSON.generalChecks[i].status == "true") {
        passedWeight += tempGeneralJSON.generalChecks[i].weight;

        if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Device") {
          DevicePassWeight += tempGeneralJSON.generalChecks[i].weight;
          // myContext.setDeviceReadinessWeightValue(myContext.DeviceReadinessWeightValue)
        }
        else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Email") {
          EmailPassWeight += tempGeneralJSON.generalChecks[i].weight;
          // myContext.setEmailReadinessWeightValue(++ myContext.EmailReadinessWeightValue)
        }
        else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Web") {
          WebPassWeight += tempGeneralJSON.generalChecks[i].weight;
          // myContext.setWebReadinessWeightValue(++ myContext.WebReadinessWeightValue)
        }
        else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "WiFi Security") {
          WifiPassWeight += tempGeneralJSON.generalChecks[i].weight;
          // myContext.setWifiReadinessWeightValue(++ myContext.WifiReadinessWeightValue)
        }
        else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Firewall") {
          FirewallPassWeight += tempGeneralJSON.generalChecks[i].weight;
          // myContext.setFirewallReadinessWeightValue(++ myContext.FirewallReadinessWeightValue)
        }
        else if (tempGeneralJSON.generalChecks[i].readinessType[0] == "Data") {
          DataPassWeight += tempGeneralJSON.generalChecks[i].weight;
          // myContext.setDataReadinessWeightValue(++ myContext.DataReadinessWeightValue)
        }
      }

      else {

        if (tempGeneralJSON.generalChecks[i].weight > TopGeneral[0]) {
          TopGeneral[0] = tempGeneralJSON.generalChecks[i].weight;
          TopGeneralIndex[0] = i;
        }
        else if (tempGeneralJSON.generalChecks[i].weight > TopGeneral[1]) {
          TopGeneral[1] = tempGeneralJSON.generalChecks[i].weight;
          TopGeneralIndex[1] = i;
        }
        else if (tempGeneralJSON.generalChecks[i].weight > TopGeneral[2]) {
          TopGeneral[2] = tempGeneralJSON.generalChecks[i].weight;
          TopGeneralIndex[2] = i;
        }
        else if (tempGeneralJSON.generalChecks[i].weight > TopGeneral[3]) {
          TopGeneral[3] = tempGeneralJSON.generalChecks[i].weight;
          TopGeneralIndex[3] = i;
        }

        failedWeight += tempGeneralJSON.generalChecks[i].weight;
        if (tempGeneralJSON.generalChecks[i].weight >= 9)
          NumCritTests ++ ;
        else if (tempGeneralJSON.generalChecks[i].weight >= 6)
          NumHighTests ++ ;
        else if (tempGeneralJSON.generalChecks[i].weight >= 4)
          NumMedTests ++ ;
        else
          NumLowTests ++ ;
      }

      

    }
    
 

    for (i = 0; i < tempWifiJSON.wifiCheck.length; i ++) {
      totalWeight += tempWifiJSON.wifiCheck[i].weight;

      if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Device") {
        DeviceWeight += tempWifiJSON.wifiCheck[i].weight;
      }
      else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Email") {
        EmailWeight += tempWifiJSON.wifiCheck[i].weight;
      }
      else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Web") {
        WebWeight += tempWifiJSON.wifiCheck[i].weight;
      }
      else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "WiFi Security") {
        WifiWeight += tempWifiJSON.wifiCheck[i].weight;
      }
      else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Firewall") {
        FirewallWeight += tempWifiJSON.wifiCheck[i].weight;
      }
      else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Data") {
        DataWeight += tempWifiJSON.wifiCheck[i].weight;
      }

      if (tempWifiJSON.wifiCheck[i].value == "true") {
        passedWeight += tempWifiJSON.wifiCheck[i].weight;

        if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Device") {
          DevicePassWeight += tempWifiJSON.wifiCheck[i].weight;
          // myContext.setDeviceReadinessWeightWeight(myContext.DeviceReadinessWeightWeight)
        }
        else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Email") {
          EmailPassWeight += tempWifiJSON.wifiCheck[i].weight;
          // myContext.setEmailReadinessWeightWeight(++ myContext.EmailReadinessWeightWeight)
        }
        else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Web") {
          WebPassWeight += tempWifiJSON.wifiCheck[i].weight;
          // myContext.setWebReadinessWeightWeight(++ myContext.WebReadinessWeightWeight)
        }
        else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "WiFi Security") {
          WifiPassWeight += tempWifiJSON.wifiCheck[i].weight;
          // myContext.setWifiReadinessWeightWeight(++ myContext.WifiReadinessWeightWeight)
        }
        else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Firewall") {
          FirewallPassWeight += tempWifiJSON.wifiCheck[i].weight;
          // myContext.setFirewallReadinessWeightWeight(++ myContext.FirewallReadinessWeightWeight)
        }
        else if (tempWifiJSON.wifiCheck[i].readinessType[0] == "Data") {
          DataPassWeight += tempWifiJSON.wifiCheck[i].weight;
          // myContext.setDataReadinessWeightWeight(++ myContext.DataReadinessWeightWeight)
        }
      }
      else {

        // if (tempWifiJSON.wifiCheck[i].weight > TopWifi[0]) {
        //   TopWifi[0] = tempWifiJSON.wifiCheck[i].weight;
        //   TopWifiIndex[0] = i;
        // }
        // else if (tempWifiJSON.wifiCheck[i].weight > TopWifi[1]) {
        //   TopWifi[1] = tempWifiJSON.wifiCheck[i].weight;
        //   TopWifiIndex[1] = i;
        // }
        // else if (tempWifiJSON.wifiCheck[i].weight > TopWifi[2]) {
        //   TopWifi[2] = tempWifiJSON.wifiCheck[i].weight;
        //   TopWifiIndex[2] = i;
        // }
        // else if (tempWifiJSON.wifiCheck[i].weight > TopWifi[3]) {
        //   TopWifi[3] = tempWifiJSON.wifiCheck[i].weight;
        //   TopWifiIndex[3] = i;
        // }


        failedWeight += tempWifiJSON.wifiCheck[i].weight;
        if (tempWifiJSON.wifiCheck[i].weight >= 9)
          NumCritTests ++ ;
        else if (tempWifiJSON.wifiCheck[i].weight >= 6)
          NumHighTests ++ ;
        else if (tempWifiJSON.wifiCheck[i].weight >= 4)
          NumMedTests ++ ;
        else
          NumLowTests ++ ;
      }      

    }
    
    
     //wifi check -->
    let totalWifiWeight = 0;
    let passedWifiWeight = 0;
    let failedWifiWeight = 0;
    //console.log(tempJSON);
    
   
    
    for (i = 0; i <tempWifiJSON.wifiCheck.length; i++) {
      totalWifiWeight += tempWifiJSON.wifiCheck[i].weight;
      if (tempWifiJSON.wifiCheck[i].value == "true") {
        passedWifiWeight += tempWifiJSON.wifiCheck[i].weight;
      }
      else{
        failedWifiWeight += tempWifiJSON.wifiCheck[i].weight;

        if (tempWifiJSON.wifiCheck[i].weight >= 9)
          NumCritWifiTests++;
        else if (tempWifiJSON.wifiCheck[i].weight >= 6)
          NumHighWifiTests++;
        else if (tempWifiJSON.wifiCheck[i].weight >= 4)
          NumMedWifiTests++;
        else
          NumLowWifiTests++;
      }
    }

    //wifi number of failed tests critical, high, med, low:
    myContext.setCritWifiTests(NumCritWifiTests);
    myContext.setHighWifiTests(NumHighWifiTests);
    myContext.setMedWifiTests(NumMedWifiTests);
    myContext.setLowWifiTests(NumLowWifiTests);
    //
    
    myContext.setTotalWifiWeight(totalWifiWeight);
    myContext.setFailedWifiWeight(failedWifiWeight);
    myContext.setReadinessWifiPercent(Math.round(passedWifiWeight/totalWifiWeight * 100))
    //<--wifi check

    //wifi table ->>

    for ( i = 0; i < tempWifiJSON.wifiCheck.length ; i++) {
      let tempName = tempWifiJSON.wifiCheck[i].name;
      let tempStatus = tempWifiJSON.wifiCheck[i].value;
      let tempWeight = tempWifiJSON.wifiCheck[i].weight;

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

    //<--wifi table 

    if (DeviceWeight == 0) DeviceWeight+=1;
    if (WifiWeight == 0) WifiWeight+=1;
    if (DataWeight == 0) DataWeight+=1;
    if (EmailWeight == 0) EmailWeight+=1;
    if (WebWeight == 0) WebWeight+=1;
    if (FirewallWeight == 0) FirewallWeight+=1;
    // handled later: if (PrivacyWeight == 0) PrivacyWeight+=1;
    
    // console.log(totalWeight);
    // console.log(failedWeight);
    // console.log(Math.round(failedWeight/totalWeight * 100) + "%")
    
    myContext.setTotalGeneralWeight(totalWeight);
    myContext.setFailedGeneralWeight(failedWeight);
    myContext.setReadinessGeneralPercent(Math.round(passedWeight/totalWeight * 100))

    myContext.setCritGeneralTests(NumLowTests);
    myContext.setHighGeneralTests(NumMedTests);
    myContext.setMedGeneralTests(NumHighTests);
    myContext.setLowGeneralTests(NumCritTests);

    myContext.setDeviceReadinessPercent(Math.round(DevicePassWeight/totalWeight * 100) == 0 ? 1 : Math.round(DevicePassWeight/totalWeight * 100))
    myContext.setEmailReadinessPercent(Math.round(EmailPassWeight/totalWeight * 100) == 0 ? 1 : Math.round(EmailPassWeight/totalWeight * 100))
    myContext.setWebReadinessPercent(Math.round(WebPassWeight/totalWeight * 100) == 0 ? 1 : Math.round(WebPassWeight/totalWeight * 100))
    myContext.setWifiReadinessPercent(Math.round(WifiPassWeight/totalWeight * 100) == 0 ? 1 : Math.round(WifiPassWeight/totalWeight * 100))
    myContext.setFirewallReadinessPercent(Math.round(FirewallPassWeight/totalWeight * 100) == 0 ? 1 : Math.round(FirewallPassWeight/totalWeight * 100))
    myContext.setDataReadinessPercent(Math.round(DataPassWeight/totalWeight * 100) == 0 ? 1 : Math.round(DataPassWeight/totalWeight * 100))    

    myContext.setDeviceReadinessPercentBar(Math.round(DevicePassWeight/DeviceWeight * 100))
    myContext.setEmailReadinessPercentBar(Math.round(EmailPassWeight/EmailWeight * 100))
    myContext.setWebReadinessPercentBar(Math.round(WebPassWeight/WebWeight * 100))
    myContext.setWifiReadinessPercentBar(Math.round(WifiPassWeight/WifiWeight * 100))
    myContext.setFirewallReadinessPercentBar(Math.round(FirewallPassWeight/FirewallWeight * 100))
    myContext.setDataReadinessPercentBar(Math.round(DataPassWeight/DataWeight * 100))
    
    //PrivacyReadinessPercent and Bar -->
    let j;
    let locationPermFound = false;
    for ( i = 0; i < tempGeneralJSON.appDetails.length; i++) {
        for ( j = 0 ; j < tempGeneralJSON.appDetails[i].permissions.length; j++) {
          if (tempGeneralJSON.appDetails[i].permissions[j] == 'android.permission.ACCESS_COARSE_LOCATION' || tempGeneralJSON.appDetails[i].permissions[j] == 'android.permission.ACCESS_FINE_LOCATION') {
            locationPermFound = true;
            break;
          }
        }
    }

    if(locationPermFound == true) {
        myContext.setPrivacyReadinessPercentBar(0)
        PrivacyWeight = 1;
    }
    else {
        
        myContext.setPrivacyReadinessPercentBar(100)
        PrivacyPassWeight = 6;
    }

    myContext.setPrivacyReadinessPercent(Math.round(PrivacyPassWeight/totalWeight * 100) == 0 ? 1 : Math.round(PrivacyPassWeight/totalWeight * 100))
    //<--PrivacyReadinessPercent and Bar

    myContext.setPasswordWifiPercentBar(Math.round(PasswordWifiPassWeight/PasswordWifiWeight * 100))
    myContext.setEncryptionWifiPercentBar(Math.round(EncryptionWifiPassWeight/EncryptionWifiWeight * 100))
    myContext.setFirewallWifiPercentBar(Math.round(FirewallWifiPassWeight/FirewallWifiWeight * 100))
    myContext.setDnsWifiPercentBar(Math.round(DnsWifiPassWeight/DnsWifiWeight * 100))
    myContext.setEavesdroppingWifiPercentBar(Math.round(EavesdroppingWifiPassWeight/EavesdroppingWifiWeight * 100))



    //rem -->

    //myContext.setOneRem(tempGeneralJSON.generalChecks[TopGeneralIndex].name);
    //console.log(tempGeneralJSON.generalChecks[TopGeneralIndex[1]].name)

    for (i = 0; i < configJSON.profile_subcategory_mappings.length; i ++) {
      if ( tempGeneralJSON.generalChecks[TopGeneralIndex[0]].name == configJSON.profile_subcategory_mappings[i].test_name ) {
        OneRemName = configJSON.profile_subcategory_mappings[i].display_name
        OneRemDescription = configJSON.profile_subcategory_mappings[i].decription
        // console.log(configJSON.profile_subcategory_mappings[i].display_name)
        // console.log(configJSON.profile_subcategory_mappings[i].decription)
      }
      if ( tempGeneralJSON.generalChecks[TopGeneralIndex[1]].name == configJSON.profile_subcategory_mappings[i].test_name ) {
        TwoRemName = configJSON.profile_subcategory_mappings[i].display_name
        TwoRemDescription = configJSON.profile_subcategory_mappings[i].decription
        // console.log(configJSON.profile_subcategory_mappings[i].display_name)
        // console.log(configJSON.profile_subcategory_mappings[i].decription)
      }
      if ( tempGeneralJSON.generalChecks[TopGeneralIndex[2]].name == configJSON.profile_subcategory_mappings[i].test_name ) {
        ThreeRemName = configJSON.profile_subcategory_mappings[i].display_name
        ThreeRemDescription = configJSON.profile_subcategory_mappings[i].decription
        // console.log(configJSON.profile_subcategory_mappings[i].display_name)
        // console.log(configJSON.profile_subcategory_mappings[i].decription)
      }
      if ( tempGeneralJSON.generalChecks[TopGeneralIndex[3]].name == configJSON.profile_subcategory_mappings[i].test_name ) {
        FourRemName = configJSON.profile_subcategory_mappings[i].display_name
        FourRemDescription = configJSON.profile_subcategory_mappings[i].decription
        // console.log(configJSON.profile_subcategory_mappings[i].display_name)
        // console.log(configJSON.profile_subcategory_mappings[i].decription)
      }
    }

    myContext.setOneRemName(OneRemName);
    myContext.setOneRemDescription(OneRemDescription);
   
    myContext.setTwoRemName(TwoRemName);
    myContext.setTwoRemDescription(TwoRemDescription);
   
    myContext.setThreeRemName(ThreeRemName);
    myContext.setThreeRemDescription(ThreeRemDescription);
   
    myContext.setFourRemName(FourRemName);
    myContext.setFourRemDescription(FourRemDescription);
        
    

    myContext.setOneRemSteps(tempGeneralJSON.generalChecks[TopGeneralIndex[0]].remediationStep)
    myContext.setTwoRemSteps(tempGeneralJSON.generalChecks[TopGeneralIndex[1]].remediationStep)
    myContext.setThreeRemSteps(tempGeneralJSON.generalChecks[TopGeneralIndex[2]].remediationStep)
    myContext.setFourRemSteps(tempGeneralJSON.generalChecks[TopGeneralIndex[3]].remediationStep)

    

    //<--rem

    // console.log(myContext.DeviceReadinessPercentValue)
    // console.log(DevicePassWeight)
    // console.log(totalWeight)
    // console.log(Math.round(DevicePassWeight/totalWeight * 100))

    
  }


  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={myContext.RunModalVisibleValue}

          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText}>Security Check</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                                  style={styles.progressBar}
                                  progress={runValue}
                                />*/}
                <Text style= {{ color: '#D3D3D3'}}>{Math.round(myContext.RunPercentValue * 100)}%</Text>
                {/*<Text style= {{ color: '#D3D3D3'}}>{myContext.globalVarValue}</Text>*/}
                <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{myContext.RunStatusValue}</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A',  }} >
                <TouchableHighlight
                  style={ { ...styles.openButton, backgroundColor: "#00ACEB", }}
                  onPress={() => {
                    findGeneralScore();
                    myContext.setRunModalVisible(false);

                  }}
                  //disabled = {runButton}
                >
                  <Text style={styles.textStyle}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>
  )
}






