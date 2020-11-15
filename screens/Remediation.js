import React, { useRef, useState, useEffect, Component, useContext } from "react";
import { FlatList, Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//import { useFonts } from '@use-expo/font';

//import { AppLoading } from 'expo';
//import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';

const Stack = createStackNavigator();

import AppContext from "../components/AppContext";
import RunModal from '../components/RunModal.js';
import SyncModal from '../components/SyncModal.js';
import WifiModal from '../components/WifiModal.js';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let bordCol = "#00ACEB";
let bordWid = 0;

let ModalVisible = false;
function setModalVisible() {
  console.log(ModalVisible)
  ModalVisible = !ModalVisible;
}

function CustomRow ({ serial, category, description, status, risk, }) {
   
  
  let riskContainerStyle;
  let statusContainerStyle;

  

  let customRowTextStyle = {}

  
  
  
    return(
      <View style={{...styles.customRoww}}>
            
            <View style={{...styles.customRoww_text, flex: 1}}>
                
                <View style= {{flex: 3, margin: wp(2), borderWidth: 0,}}>
    
                  <View style= {{flex: 1,}}>
    
                    <Text style={styles.category} numberOfLines={1}>
                      {category}
                  
                    </Text>
      
                  </View>

                  <View style= {{flex: 1,}}>
    
                    <Text style={styles.description} numberOfLines={2}>
                      {description}
                  
                    </Text>
      
                  </View>
    
                </View>
    
                
                <View style= {{flex: 1.5, margin: wp(2), borderWidth: 0, flexDirection: 'row'}}>
                  <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                    <TouchableOpacity
                      style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                      onPress={setModalVisible}
                    >
                      <Image
                        style={{ width: wp(5), height: hp(3), }}
                        source={require('../assets/images/fix.png')}
                      />
                      <Text style = {{   color: 'white'  }}>Auto</Text>
                    </TouchableOpacity>
                  </View>
                  <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                    <TouchableOpacity
                      style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                      onPress={() => console.log('hi')}
                    >
                      <Image
                        style={{ width: wp(5), height: hp(3), }}
                        source={require('../assets/images/fix.png')}
                      />
                      <Text style = {{   color: 'white'  }}>Manual</Text>
                    </TouchableOpacity>
                  </View>
    
                </View>
    
            </View>
    
        </View>
        );

}
const CustomListview = ({ itemList }) => (
    <View style={{...styles.customRoww, }}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    serial = {item.serial}
                    category={item.category}
                    description = {item.description}
                    status={item.status}
                    risk={item.risk}
                    
                />}
            />

    </View>
);


function getData(){
  return [
    {
      key:"1",
      serial: "1",
      category: "WH Firewall Disable Attack",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "20",
      risk: "PASS",
      
    },
    {
      key:"2",
      serial: "2",
      category: "Web Safe Browsing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "35",
      risk: "FAIL",
      
    },
    {
      key:"3",
      serial: "3",
      category: "Weak Password for Device Unlock",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "42",
      risk: "FAIL",
      
    },
    {
      key:"4",
      serial: "4",
      category: "Email Phishing Threats",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "40",
      risk: "FAIL",
      
    },

    

    
    

  ]
}

//modal stuff -->
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
//<-- modal stuff

export default function RemediationScreen({navigation}) {

  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });
  //Modal stuff -->

  const [ModalArray, setModalArray] = useState([false,false,false,false])
  const myContext = useContext(AppContext);
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
  function getTestValue() {
    TestModule.getString((info) => {
      //console.log(info)
      myContext.setGeneralTestInfo(JSON.parse(info));
      
      myContext.setTotalGeneralTests(JSON.parse(info).generalChecks.length)
      
      
      let i;
      for (i = 0; i < JSON.parse(info).generalChecks.length; i++) {
        if (JSON.parse(info).generalChecks[i].status == "true") {
          myContext.setPassedGeneralTests(++myContext.PassedGeneralTestsValue);
        }
        else {
          myContext.setFailedGeneralTests(++myContext.FailedGeneralTestsValue);
        }
      }
    });

    //findGeneralScore();
  }

  
  function getWifiValue() {
    
    TestModule.getWifi((info) => {
      console.log(info)
      //console.log("x" == "x" ? 'tru' : 'fal')
      myContext.setWifiTestInfo(JSON.parse(info));
      myContext.setTotalWifiTests(JSON.parse(info).wifiCheck.length)
      //console.log(Object.values(JSON.parse(info))[1])
      
      let i;
      for (i = 0; i < JSON.parse(info).wifiCheck.length; i++) {
        if (JSON.parse(info).wifiCheck[i].value == "true") {
          myContext.setPassedWifiTests(++myContext.PassedWifiTestsValue);
        }
        else {
          myContext.setFailedWifiTests(++myContext.FailedWifiTestsValue);
        }
      }

    });
  }
  function animateRun() {
    let temp = 0;
    getTestValue();
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


  function animateSync() {
    let temp = 0;
    //getTestValue();
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
  var OneLoop = [];
  var TwoLoop = [];
  var ThreeLoop = [];
  var FourLoop = [];
  var TopFourLoop = [];
  let i;

  


  for( i = 0; i< myContext.OneRemStepsValue.length; i++) {
    OneLoop.push(
      <View key = {i} style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
                                    
        <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{ justifyContent: 'center', alignItems: 'center', height: wp(4), width: wp(4), backgroundColor: '#00ACEB', borderWidth: 0, borderRadius: 20,  }}>
              <Text style = {{color: 'white', fontSize: wp(3.5)}}></Text>
            </View>
          </View>
        </View>

        <View style = {{ flex: 9, borderColor: bordCol, borderWidth: bordWid, paddingLeft: wp(2), }}>
          <Text style={{color: 'white', fontSize: wp(3.5)}}>{myContext.OneRemStepsValue[i]}</Text>
        </View>
        
      </View>
    );
  }
  for( i = 0; i< myContext.TwoRemStepsValue.length; i++) {
    TwoLoop.push(
      <View key = {i} style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
                                    
        <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{ justifyContent: 'center', alignItems: 'center', height: wp(4), width: wp(4), backgroundColor: '#00ACEB', borderWidth: 0, borderRadius: 20,  }}>
              <Text style = {{color: 'white', fontSize: wp(3.5)}}></Text>
            </View>
          </View>
        </View>

        <View style = {{ flex: 9, borderColor: bordCol, borderWidth: bordWid, paddingLeft: wp(2), }}>
          <Text style={{color: 'white', fontSize: wp(3.5)}}>{myContext.TwoRemStepsValue[i]}</Text>
        </View>
        
      </View>
    );
  }
  for( i = 0; i< myContext.ThreeRemStepsValue.length; i++) {
    ThreeLoop.push(
      <View key = {i} style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
                                    
        <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{ justifyContent: 'center', alignItems: 'center', height: wp(4), width: wp(4), backgroundColor: '#00ACEB', borderWidth: 0, borderRadius: 20,  }}>
              <Text style = {{color: 'white', fontSize: wp(3.5)}}></Text>
            </View>
          </View>
        </View>

        <View style = {{ flex: 9, borderColor: bordCol, borderWidth: bordWid, paddingLeft: wp(2), }}>
          <Text style={{color: 'white', fontSize: wp(3.5)}}>{myContext.ThreeRemStepsValue[i]}</Text>
        </View>
        
      </View>
    );
  }
  for( i = 0; i< myContext.FourRemStepsValue.length; i++) {
    FourLoop.push(
      <View key = {i} style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
                                    
        <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style = {{ justifyContent: 'center', alignItems: 'center', height: wp(4), width: wp(4), backgroundColor: '#00ACEB', borderWidth: 0, borderRadius: 20,  }}>
              <Text style = {{color: 'white', fontSize: wp(3.5)}}></Text>
            </View>
          </View>
        </View>

        <View style = {{ flex: 9, borderColor: bordCol, borderWidth: bordWid, paddingLeft: wp(2), }}>
          <Text style={{color: 'white', fontSize: wp(3.5)}}>{myContext.FourRemStepsValue[i]}</Text>
        </View>
        
      </View>
    );
  }
  
  
  return (
    

    <View style={{ ...styles.container, flex: 1, }}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={ModalArray[0]}
      >
        <View style={styles.centeredView_}>
          <View style={styles.modalView_}>
            
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A', borderBottomWidth: 0.5, borderColor: 'white' }} >
              <Text style={styles.modalText_}>Remediation Steps</Text>
            </View>

            <View style = {{ ...styles.centrify_, flex: 6, backgroundColor: '#1C2B3A', borderColor: 'white', borderWidth: bordWid, }} >
              
              <SafeAreaView style={{ ...styles.container_,   }}>
                <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

                  {OneLoop}

                </ScrollView>
              </SafeAreaView>
              
            </View>
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A',  }} >
              <TouchableHighlight
                style={ { ...styles.openButton_, backgroundColor: "#00ACEB", }}
                onPress={() => {setModalArray([false,false,false,false])}}
                //disabled = {runButton}
              >
                <Text style={styles.textStyle_}>     Close     </Text>
              </TouchableHighlight>                
            </View>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={ModalArray[1]}
      >
        <View style={styles.centeredView_}>
          <View style={styles.modalView_}>
            
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A', borderBottomWidth: 0.5, borderColor: 'white' }} >
              <Text style={styles.modalText_}>Remediation Steps</Text>
            </View>

            <View style = {{ ...styles.centrify_, flex: 6, backgroundColor: '#1C2B3A', borderColor: 'white', borderWidth: bordWid, }} >
              
              <SafeAreaView style={{ ...styles.container_,   }}>
                <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

                  {TwoLoop}

                </ScrollView>
              </SafeAreaView>
              
            </View>
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A',  }} >
              <TouchableHighlight
                style={ { ...styles.openButton_, backgroundColor: "#00ACEB", }}
                onPress={() => {setModalArray([false,false,false,false])}}
                //disabled = {runButton}
              >
                <Text style={styles.textStyle_}>     Close     </Text>
              </TouchableHighlight>                
            </View>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={ModalArray[2]}
      >
        <View style={styles.centeredView_}>
          <View style={styles.modalView_}>
            
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A', borderBottomWidth: 0.5, borderColor: 'white' }} >
              <Text style={styles.modalText_}>Remediation Steps</Text>
            </View>

            <View style = {{ ...styles.centrify_, flex: 6, backgroundColor: '#1C2B3A', borderColor: 'white', borderWidth: bordWid, }} >
              
              <SafeAreaView style={{ ...styles.container_,   }}>
                <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

                  {ThreeLoop}

                </ScrollView>
              </SafeAreaView>
              
            </View>
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A',  }} >
              <TouchableHighlight
                style={ { ...styles.openButton_, backgroundColor: "#00ACEB", }}
                onPress={() => {setModalArray([false,false,false,false])}}
                //disabled = {runButton}
              >
                <Text style={styles.textStyle_}>     Close     </Text>
              </TouchableHighlight>                
            </View>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={ModalArray[3]}
      >
        <View style={styles.centeredView_}>
          <View style={styles.modalView_}>
            
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A', borderBottomWidth: 0.5, borderColor: 'white' }} >
              <Text style={styles.modalText_}>Remediation Steps</Text>
            </View>

            <View style = {{ ...styles.centrify_, flex: 6, backgroundColor: '#1C2B3A', borderColor: 'white', borderWidth: bordWid, }} >
              
              <SafeAreaView style={{ ...styles.container_,   }}>
                <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

                  {FourLoop}

                </ScrollView>
              </SafeAreaView>
              
            </View>
            <View style = {{ ...styles.centrify_, flex: 1, backgroundColor: '#1C2B3A',  }} >
              <TouchableHighlight
                style={ { ...styles.openButton_, backgroundColor: "#00ACEB", }}
                onPress={() => {setModalArray([false,false,false,false])}}
                //disabled = {runButton}
              >
                <Text style={styles.textStyle_}>     Close     </Text>
              </TouchableHighlight>                
            </View>
          </View>
        </View>
      </Modal>
      

      <View style={{ ...styles.container, flex: 1}}>
        <Text style = {{ fontSize: wp(6), color: '#D3D3D3',     }}>Remediation</Text>
        {/*<Text style = {{ fontSize: windowWidth/25, color: 'black',     }}> (Verified Devices) </Text>*/}
      
      </View>

      <View style={{ ...styles.container, flex: 0.5, }}>
        <View style = {{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00ACEB', marginLeft: wp(1), marginRight: wp(1), paddingBottom: hp(1),}}>
          <View style = {{ flex: 3, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Risk</Text>
          </View>

          

          <View style = {{ flex: 1.5, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Remediate</Text>
          </View>
        </View>
      </View>

      <View style={{ ...styles.container, flex: 4 }}>
        <SafeAreaView style={{ ...styles.container_, backgroundColor: '#18222E'}}>
          <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

            <View  style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, padding: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
              <View style= {{flex: 3, margin: wp(2), borderColor: bordCol, borderWidth: bordWid,}}>
                <View style= {{flex: 1, justifyContent: 'center',}}>                  
                  <Text style={{color: 'white', fontSize: wp(4)}} numberOfLines={1}>
                    {myContext.OneRemNameValue}                    
                  </Text>        
                </View>

                <View style= {{flex: 1, justifyContent: 'center',}}>                     
                  <Text style={{color: 'white', fontSize: wp(2.5)}} numberOfLines={2}>
                    {myContext.OneRemDescriptionValue}
                  </Text>
                </View>
              </View>

              <View style= {{flex: 1.5, margin: wp(2), borderColor: bordCol, borderWidth: bordWid, flexDirection: 'row'}}>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => console.log('hi')}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fixDisabled.png')}
                    />
                    <Text style = {{   color: 'grey'  }}>Auto</Text>
                  </TouchableOpacity>
                </View>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => {setModalArray([true,false,false,false])}}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fix.png')}
                    />
                    <Text style = {{   color: 'white'  }}>Manual</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

            <View  style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, padding: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
              <View style= {{flex: 3, margin: wp(2), borderColor: bordCol, borderWidth: bordWid,}}>
                <View style= {{flex: 1, justifyContent: 'center',}}>                  
                  <Text style={{color: 'white', fontSize: wp(4)}} numberOfLines={1}>
                    {myContext.TwoRemNameValue}                    
                  </Text>        
                </View>

                <View style= {{flex: 1, justifyContent: 'center',}}>                     
                  <Text style={{color: 'white', fontSize: wp(2.5)}} numberOfLines={2}>
                    {myContext.TwoRemDescriptionValue}
                  </Text>
                </View>
              </View>

              <View style= {{flex: 1.5, margin: wp(2), borderColor: bordCol, borderWidth: bordWid, flexDirection: 'row'}}>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => console.log('hi')}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fixDisabled.png')}
                    />
                    <Text style = {{   color: 'grey'  }}>Auto</Text>
                  </TouchableOpacity>
                </View>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => {setModalArray([false,true,false,false])}}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fix.png')}
                    />
                    <Text style = {{   color: 'white'  }}>Manual</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
            
            <View  style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, padding: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
              <View style= {{flex: 3, margin: wp(2), borderColor: bordCol, borderWidth: bordWid,}}>
                <View style= {{flex: 1, justifyContent: 'center',}}>                  
                  <Text style={{color: 'white', fontSize: wp(4)}} numberOfLines={1}>
                    {myContext.ThreeRemNameValue}                    
                  </Text>        
                </View>

                <View style= {{flex: 1, justifyContent: 'center',}}>                     
                  <Text style={{color: 'white', fontSize: wp(2.5)}} numberOfLines={2}>
                    {myContext.ThreeRemDescriptionValue}
                  </Text>
                </View>
              </View>

              <View style= {{flex: 1.5, margin: wp(2), borderColor: bordCol, borderWidth: bordWid, flexDirection: 'row'}}>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => console.log('hi')}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fixDisabled.png')}
                    />
                    <Text style = {{   color: 'grey'  }}>Auto</Text>
                  </TouchableOpacity>
                </View>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => {setModalArray([false,false,true,false])}}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fix.png')}
                    />
                    <Text style = {{   color: 'white'  }}>Manual</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

            <View  style= {{ ...styles.tableRow_, borderColor: bordCol, borderWidth: bordWid, padding: wp(1),  justifyContent: 'center', alignItems: 'center' }}>
              <View style= {{flex: 3, margin: wp(2), borderColor: bordCol, borderWidth: bordWid,}}>
                <View style= {{flex: 1, justifyContent: 'center',}}>                  
                  <Text style={{color: 'white', fontSize: wp(4)}} numberOfLines={1}>
                    {myContext.FourRemNameValue}                    
                  </Text>        
                </View>

                <View style= {{flex: 1, justifyContent: 'center',}}>                     
                  <Text style={{color: 'white', fontSize: wp(2.5)}} numberOfLines={2}>
                    {myContext.FourRemDescriptionValue}
                  </Text>
                </View>
              </View>

              <View style= {{flex: 1.5, margin: wp(2), borderColor: bordCol, borderWidth: bordWid, flexDirection: 'row'}}>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => console.log('hi')}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fixDisabled.png')}
                    />
                    <Text style = {{   color: 'grey'  }}>Auto</Text>
                  </TouchableOpacity>
                </View>
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 0}}>
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => {setModalArray([false,false,false,true])}}
                  >
                    <Image
                      style={{ width: wp(5), height: hp(3), }}
                      source={require('../assets/images/fix.png')}
                    />
                    <Text style = {{   color: 'white'  }}>Manual</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

          </ScrollView>
        </SafeAreaView>


      
      </View>
     
      
      

      {/*<View style={{ ...styles.container, flex: 0.75 }}>
        <Text style = {{ fontSize: windowWidth/25, textAlign: 'center', color: 'white',    }}> WhiteHax App on each Device can provide security risk remediation steps </Text>
      </View>*/}


      <View style={{ ...styles.centrifyy, flex: 0.6, flexDirection: 'row', backgroundColor: '#1C2B3A'}}>
          <View style={{ ...styles.centrifyy, flex: 1, }}>
            <View style={{ ...styles.centrifyy, flex: 4, alignItems: 'flex-end', paddingRight: wp(2)}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  myContext.setRunModalVisible(true);
                  myContext.setRunStatus("Running Security Check...");
                  animateRun();

                }}
              >
                <Image
                style={{ width: wp(6), height: wp(6), }}
                source={require('../assets/android/4x/run_btm_bar_menu_normalxxxhdpi.png')}
              />
              <Text style = {{   color: '#FFFFFF',  }}> Run </Text>
              </TouchableOpacity>
              
            </View>
             
          </View>

          <View style={{ ...styles.centrifyy, flex: 1, }}>
            <View style={{ ...styles.centrifyy, flex: 4, }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  myContext.setWifiModalVisible(true);
                  myContext.setWifiStatus("Checking Wifi...");
                  animateWifi();
                }}
              >
                <Image
                style={{ width: wp(6), height: wp(6), }}
                source={require('../assets/android/4x/wifi_check_btm_bar_menu_normalxxxhdpi.png')}
              />
                <Text style = {{   color: '#FFFFFF',  }}> Check WiFi </Text>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={{ ...styles.centrifyy, flex: 1, }}>
            <View style={{ ...styles.centrifyy, flex: 4, alignItems: 'flex-start', paddingLeft: wp(2)}}>
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
                <Text style = {{   color: '#FFFFFF',  }}> Sync </Text>
              </TouchableOpacity>
            </View>
             
          </View>

          
          
      </View>

    </View>

    
  );

};

{/*function HeaderComponent(){
  return(
    
    <Text style= {{ fontSize: windowHeight/30, color:'#FFFFFF' }}>White<Text style= {{ fontSize: windowHeight/30, color:'#FE0000' }}>HaX</Text></Text>
    
  )
}
export default function Devices({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Devices" component={DevicesScreen} options={{
          
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
    width: '100%',
    height: '100%',
    backgroundColor: '#18222E' 
  },
  centrify:{
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  customRoww: {
        flex: 1,
        justifyContent:'center',

        flexDirection: 'row',
       
        
        
        //marginTop: windowHeight/200,
        //marginBottom: windowHeight/200,
        borderRadius: 0,
        backgroundColor: '#18222E',
        elevation: 2,


    },
    
    customRoww_text: {

        //paddingBottom: windowHeight/400,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'center',
        borderBottomWidth: 0,
    },
    firstCustomRowText: {

        //paddingBottom: windowHeight/20,
        //paddingTop: windowHeight/20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'center',
        borderBottomWidth: 0,
    },

    category: {
        fontSize:wp(4) ,
        color: 'white',
              
        
    },
    description: {
        fontSize:wp(3) ,
        color: 'white',
              
        
    },
    status: {
        
        fontSize:15,
        
        color: 'white', 
             
    },
    risk: {
      
        fontSize: 15,
        
        color: 'white', 
        textAlign: 'center',
             
    },



    //modal stuff -->
    centrifyy:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      
    },

    button: {
      alignItems: "center",
      
      
    },

    container_:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#1C2B3A' 
    },

    tableRow_: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      height: '100%',
    },

    //<-- modal stuff




centrify_:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
  
  centeredView_: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView_: {
    flex: 1,
    width: wp(75),
    margin: hp(10),
    backgroundColor: "#1C2B3A",
    borderRadius: 20,
    padding: wp(5),
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 50,
      height: 52
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton_: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: wp(3),
    elevation: 2
  },
  textStyle_: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    
    
         
  },
  modalText_: {
    
    textAlign: "center",
    fontSize: wp(5),
    color: '#D3D3D3'
         
  },

  progressBar_Container_: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: wp(3),
  },
  progressBar_: {
    margin: wp(3),
  },
  
});