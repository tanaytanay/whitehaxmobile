import React, { useRef, useState, useEffect, Component, useContext } from "react";
import {  Modal, Button, View, Text, Image, TouchableOpacity, TouchableHighlight,  } from 'react-native';
import { styles } from '../styles/ModalStyle.js'
import AppContext from "./AppContext";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function modalTest() {
  const myContext = useContext(AppContext);
  /* now running in getwifivalue ()

  function findWifiScore() {
    let tempWifiJSON = myContext.WifiTestInfoValue;
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
    
    
    let i;
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



  } */

  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={myContext.WifiModalVisibleValue}

          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText}>Wifi Check</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                                  style={styles.progressBar}
                                  progress={wifiValue}
                                />*/}
                <Text style= {{ color: '#D3D3D3'}}>{Math.round(myContext.WifiPercentValue * 100)}%</Text>
                {/*<Text style= {{ color: '#D3D3D3'}}>{myContext.globalVarValue}</Text>*/}
                <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{myContext.WifiStatusValue}</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A',  }} >
                <TouchableHighlight
                  style={ { ...styles.openButton, backgroundColor: "#00ACEB", }}
                  onPress={() => {
                    //findWifiScore();
                    myContext.setWifiModalVisible(false);
                    //console.log(myContext.NavigationVarValue);
                    myContext.NavigationVarValue.navigate("Wifi");

                  }}
                  //disabled = {wifiButton}
                >
                  <Text style={styles.textStyle}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>
  )
}






