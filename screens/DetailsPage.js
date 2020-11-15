import React, { useRef, useState, useEffect, Component, useContext } from "react";
import { FlatList, Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
//import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
//import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';
//import { useFonts } from '@use-expo/font';
import { VictoryLegend, VictoryPie, VictoryLabel, VictoryContainer } from "victory-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AppContext from "../components/AppContext";
import RunModal from '../components/RunModal.js';
import SyncModal from '../components/SyncModal.js';
import WifiModal from '../components/WifiModal.js';
import {NativeModules} from 'react-native';

import { useIsFocused} from '@react-navigation/native'; 

var TestModule = NativeModules.TestModule;


const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const readiness = 50;
const readinessData = [{ y: readiness }, { y: 100 - readiness }, ];
const readinessColor = ["#db3913", "white"];
const labelData = [''];
//let bordCol = "#00ACEB";
let bordCol = "white";
let bordWid = 0;

const readinessColorInner = ["#db3913", "transparent"];
const readinessColorMiddle = ["black", "black"];
const readinessColorOuter = ["white", "white"];

function CustomRow ({ category, status, risk }) {
   
  
  let riskContainerStyle;
  let statusContainerStyle;

  if (status > 90){
    statusContainerStyle = {flex: status/100, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#2E7D32', borderRadius: 20,};
    risk = "Low"
    //bordCol = "#2E7D32"
  }
  
  else if (status > 70){
    statusContainerStyle = {flex: status/100, backgroundColor: '#E65100', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#E65100', borderRadius: 20,};
    risk = "Med"
    //bordCol = "#E65100"
  }
  else if (status > 40){
    statusContainerStyle = {flex: status/100, backgroundColor: '#F57F17', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#F57F17', borderRadius: 20,};
    risk = "High"
    //bordCol = "#F57F17"
  }
  else{
    statusContainerStyle = {flex: status/100+0.2, backgroundColor: '#B71C1C', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#B71C1C', borderRadius: 20,};
    risk = "Crit"
    //bordCol = "#B71C1C"
  }


  
    return(
      <View style={{...styles.customRoww}}>
            
            <View style={{...styles.customRoww_text}}>
                <View style= {{flex: 2, margin: windowWidth/25,}}>
    
                  <Text style={styles.category}>
                    {category}
                
                  </Text>
    
                </View>
    
                <View style= {{flex: 2, margin: windowWidth/25, borderWidth: 0.25, borderRadius: 20, borderColor: bordCol }}>
                  <View style = {{ flex: 2, flexDirection: 'row'}}>
                    <View style = {statusContainerStyle}>
                      <Text style={{ fontSize: wp(3), textAlign: 'center', color: 'white'}}>{status}%</Text>
                    </View>

                    
                  </View>
                </View>
    
                <View style= {{...riskContainerStyle, flex: 1}}>
                  <View style = {{flex:2, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={styles.risk}>
                      {risk}
                  
                    </Text>
                  </View>
    
                </View>
    
            </View>
    
        </View>
        );

}


const CustomListview = ({ itemList }) => (
    <View style={{...styles.customRoww, paddingTop: 0,}}>
        <FlatList
                
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    category={item.category}
                    status={item.status}
                    risk={item.risk}
                />}
            />

    </View>
);


function getData(){
  //var pass_fail = status > 60 ? "pass" : "fail";
   
  //const myContext = useContext(AppContext);
  return [
    {
      key :"1",
      category: "Device Security",
      status:  50,
      risk: "",
    },
    {
      key :"2",
      category: "Email Security",
      status:  50,
      risk: "",
    },
    {
      key :"3",
      category: "Web Security",
      status:  50,
      risk: "",
    },
    {
      key :"4",
      category: "Firewall Security",
      status:  50,
      risk: "FAIL",
    },
    {
      key :"5",
      category: "WiFi Security",
      status:  50,
      risk: "",
    },
    {
      key :"6",
      category: "Data Security",
      status: 50,
      risk: "",
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


export default function DetailsScreen({navigation}) {

  //Modal stuff -->
const myContext = useContext(AppContext);
  
  
  let intervalRun, intervalSync, intervalWifi;
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
    //getTestValue();
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






  let internalColor;
  let securityLevel;
  if (readiness > 60){
    internalColor = "#179314";
    securityLevel = "Secure"
  }
  else if (readiness > 30){
    internalColor = "#f89a05";
    securityLevel = "Average"
  }
  else{
    internalColor = "#db3913";
    securityLevel = "Critical"
  }
  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });

  useIsFocused();
  return (
    

    <View style={{ ...styles.container, flex: 1 }}>
      

      <View style={{ ...styles.container, flex: 1 }}>
        <Text style = {{ fontSize: wp(6), color: '#D3D3D3',       }}>Security Risk</Text>
      
      </View>

      <View style={{ ...styles.container, flex: 2.2 }}>
        <View style = {{ ...styles.container, flexDirection: 'row', }}>
                  <View style = {{ ...styles.container, flex: 2  }}>
                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0,  marginBottom: 0}}>
                      <VictoryContainer
                        x={0}
                        y={0}
                        height={windowWidth/1.8}
                        width={windowWidth/1.8}
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
                          
                          text={[myContext.ReadinessGeneralPercentValue + "%",'High']}
                        />
                      </VictoryContainer>
                    </View>
                    
                    
                  </View>
                  <View style = {{ ...styles.container, flex: 1, paddingTop: hp(0), flexDirection: 'column', marginRight: windowWidth/50, }}>
                    <View style = {{ ...styles.centrify, flex: 0.5,}}>
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
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}>  </Text>
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
                        <Text style = {{ fontSize: 15, color: 'white'      }}>  </Text>
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
                        <Text style = {{ fontSize: 15, color: 'white'      }}>  </Text>
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
                        <Text style = {{ fontSize: 15, color: 'white'      }}>  </Text>
                      </View>

                    </View>
                    </View>
                  </View>
                </View>
      
      </View>
      <View style={{ ...styles.container, flex: 1,  marginTop: hp(1),  }}>
        <Text style = {{ fontSize: wp(6), color: '#D3D3D3',   }}>Threat Breakdown</Text>
      
      </View>
      <View style={{ ...styles.container, flex: 0.5, }}>
        <View style = {{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00ACEB', marginLeft: wp(2), marginRight: wp(2), paddingBottom: hp(1),}}>
          <View style = {{ flex: 1.5, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB'}}>Category</Text>
          </View>

          <View style = {{ flex: 2, paddingRight: wp(4)}}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Readiness</Text>
          </View>

          <View style = {{ flex: 1, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Risk</Text>
          </View>
        </View>
      </View>
      
      
      <View style={{...styles.container, flex: 3,}}>
      
        
        <SafeAreaView style={{ ...styles.container,   }}>
          <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Device Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.DeviceReadinessPercentBarValue > 15 ? myContext.DeviceReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.DeviceReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.DeviceReadinessPercentBarValue > 70 ? '#E65100' : myContext.DeviceReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.DeviceReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.DeviceReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.DeviceReadinessPercentBarValue > 70 ? '#E65100' : myContext.DeviceReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.DeviceReadinessPercentBarValue > 90 ? 'Low' : myContext.DeviceReadinessPercentBarValue > 70 ? 'Med' : myContext.DeviceReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1)}}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Email Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.EmailReadinessPercentBarValue > 15 ? myContext.EmailReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.EmailReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.EmailReadinessPercentBarValue > 70 ? '#E65100' : myContext.EmailReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.EmailReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.EmailReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.EmailReadinessPercentBarValue > 70 ? '#E65100' : myContext.EmailReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.EmailReadinessPercentBarValue > 90 ? 'Low' : myContext.EmailReadinessPercentBarValue > 70 ? 'Med' : myContext.EmailReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Wifi Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.WifiReadinessPercentBarValue > 15 ? myContext.WifiReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.WifiReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.WifiReadinessPercentBarValue > 70 ? '#E65100' : myContext.WifiReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.WifiReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.WifiReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.WifiReadinessPercentBarValue > 70 ? '#E65100' : myContext.WifiReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.WifiReadinessPercentBarValue > 90 ? 'Low' : myContext.WifiReadinessPercentBarValue > 70 ? 'Med' : myContext.WifiReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Data Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.DataReadinessPercentBarValue > 15 ? myContext.DataReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.DataReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.DataReadinessPercentBarValue > 70 ? '#E65100' : myContext.DataReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.DataReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.DataReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.DataReadinessPercentBarValue > 70 ? '#E65100' : myContext.DataReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.DataReadinessPercentBarValue > 90 ? 'Low' : myContext.DataReadinessPercentBarValue > 70 ? 'Med' : myContext.DataReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Firewall Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.FirewallReadinessPercentBarValue > 15 ? myContext.FirewallReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.FirewallReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.FirewallReadinessPercentBarValue > 70 ? '#E65100' : myContext.FirewallReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.FirewallReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.FirewallReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.FirewallReadinessPercentBarValue > 70 ? '#E65100' : myContext.FirewallReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.FirewallReadinessPercentBarValue > 90 ? 'Low' : myContext.FirewallReadinessPercentBarValue > 70 ? 'Med' : myContext.FirewallReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Web Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.WebReadinessPercentBarValue > 15 ? myContext.WebReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.WebReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.WebReadinessPercentBarValue > 70 ? '#E65100' : myContext.WebReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.WebReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.WebReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.WebReadinessPercentBarValue > 70 ? '#E65100' : myContext.WebReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.WebReadinessPercentBarValue > 90 ? 'Low' : myContext.WebReadinessPercentBarValue > 70 ? 'Med' : myContext.WebReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{color: 'white', fontSize: wp(4)}}>Privacy Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.PrivacyReadinessPercentBarValue > 15 ? myContext.PrivacyReadinessPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.PrivacyReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.PrivacyReadinessPercentBarValue > 70 ? '#E65100' : myContext.PrivacyReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.PrivacyReadinessPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.PrivacyReadinessPercentBarValue > 90 ? '#2E7D32' : myContext.PrivacyReadinessPercentBarValue > 70 ? '#E65100' : myContext.PrivacyReadinessPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.PrivacyReadinessPercentBarValue > 90 ? 'Low' : myContext.PrivacyReadinessPercentBarValue > 70 ? 'Med' : myContext.PrivacyReadinessPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>
            

            


            

            






          </ScrollView>
        </SafeAreaView>
      


      </View>
      
      
     
      
      

      {/*<View style={{ ...styles.container, flex: 0.5 }}>
              <Text style = {{ fontSize: windowWidth/25, color: 'white',          }}> Please go to Remediation for further Guidance </Text>
            </View>*/}



      <View style={{ ...styles.centrifyy, flex: 1, flexDirection: 'row', backgroundColor: '#1C2B3A'}}>
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
}
{/*function HeaderComponent(){
  return(
    
    <Text style= {{ fontSize: windowHeight/30, color:'#FFFFFF' }}>White<Text style= {{ fontSize: windowHeight/30, color:'#FE0000' }}>HaX</Text></Text>
    
  )
}
export default function DetailsPage({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Home" component={DetailsScreen} options={{
          
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

  //table -->

  tableRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },

  //<-- table


  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#18222E' 
  },
  centrify:{
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  centrify1:{
    justifyContent: 'center',
    alignItems: 'center',
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

        paddingBottom: 0,
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
        fontSize: wp(3.5),
        color: 'white', 
             
        
    },
    status: {
        
        fontSize:windowWidth/25,
        
        color: 'white', 
             
    },
    risk: {
      
        fontSize: windowWidth/30,
        
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
    centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(4),
  },

    //<-- modal stuff
  
});