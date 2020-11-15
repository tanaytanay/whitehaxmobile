import React, { useRef, useState, useEffect, Component, useContext } from "react";
import {  Modal, Button, View, Text, Image, TouchableOpacity, TouchableHighlight,  } from 'react-native';
import { styles } from '../styles/ModalStyle.js'
import AppContext from "./AppContext";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function modalTest() {
  const myContext = useContext(AppContext);
  /* now running in fetchDevices:

  function setDeviceSync(){

    let tempDeviceInfo = myContext.DeviceInfoValue;
    // console.log(myContext.DeviceInfoValue)
    // console.log(tempDeviceInfo)
    // console.log(tempDeviceInfo[0])
    // console.log(tempDeviceInfo[0].verified_devices)

    let tempName, tempRisk, tempReadiness;

    let i;
    let tempDeviceLoop = [];

    for(i = 1; i <= Object.keys(tempDeviceInfo[0].verified_devices).length; i++) {
      tempName = tempDeviceInfo[0].verified_devices[i].name;
      tempRisk = tempDeviceInfo[0].verified_devices[i].risk;
      tempReadiness = parseInt(tempDeviceInfo[0].verified_devices[i].security_readiness)

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

    myContext.setDeviceLoop(tempDeviceLoop);

  } */
  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={myContext.SyncModalVisibleValue}

          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText}>Device Sync</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                                  style={styles.progressBar}
                                  progress={syncValue}
                                />*/}
                <Text style= {{ color: '#D3D3D3'}}>{Math.round(myContext.SyncPercentValue * 100)}%</Text>
                {/*<Text style= {{ color: '#D3D3D3'}}>{myContext.globalVarValue}</Text>*/}
                <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{myContext.SyncStatusValue}</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A',  }} >
                <TouchableHighlight
                  style={ { ...styles.openButton, backgroundColor: "#00ACEB", }}
                  onPress={() => {
                    //setDeviceSync();
                    myContext.setSyncModalVisible(false);

                  }}
                  //disabled = {syncButton}
                >
                  <Text style={styles.textStyle}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>
  )
}






