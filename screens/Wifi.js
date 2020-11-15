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

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const readinessColor = ["red", "white"];
const labelData = [''];
let bordCol = "#00ACEB";
let bordWid = 0;
let SSID = "Home-WiFi"

const readinessColorInner = ["#db3913", "transparent"];
const readinessColorMiddle = ["black", "black"];
const readinessColorOuter = ["white", "white"];
function CustomRow ({ category, status, risk }) {
   
  

  let riskContainerStyle;
  let statusContainerStyle;
  if (status > 90){
    statusContainerStyle = {flex: status/100, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#2E7D32', borderRadius: 20, };
    risk = "Low"
    //bordCol = "#2E7D32"
  }
  
  else if (status > 30){
    statusContainerStyle = {flex: status/100, backgroundColor: '#E65100', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#E65100', borderRadius: 20,};
    risk = "High"
    //bordCol = "#E65100"
  }
  else{
    statusContainerStyle = {flex: status/100+0.1, backgroundColor: '#B71C1C', justifyContent: 'center', alignItems:'center', borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#B71C1C', borderRadius: 20,};
    risk = "Crit"
    //bordCol = "#B71C1C"
  }

  
    return(
      <View style={{...styles.customRoww}}>
            
            <View style={{...styles.customRoww_text}}>
                <View style= {{flex: 2, margin: windowWidth/25,}}>
    
                  <Text style={styles.category} numberOfLines={1}>
                    {category}
                
                  </Text>
    
                </View>
    
                <View style= {{flex: 2, margin: windowWidth/25, borderWidth: 0.25, borderRadius:20, borderColor: bordCol  }}>
                  <View style = {{ flex: 2, flexDirection: 'row'}}>
                    <View style = {statusContainerStyle}>
                      <Text style={{ fontSize: wp(3), textAlign: 'center', color: 'white'}}>{status}%</Text>
                    </View>

                    
                  </View>
                </View>
                
                <View style= {{...riskContainerStyle, flex: 1}}>
                  <View style = {{flex:2, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={styles.risk}>{risk}</Text>
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
  
  return [
    {
      key :"1",
      category: "Password Security",
      status:  "91",
      risk: "PASS",
    },
    {
      key :"2",
      category: "Encryption Strength",
      status:  "40",
      risk: "PASS",
    },
    {
      key :"3",
      category: "Firewall Strength",
      status:  "35",
      risk: "FAIL",
    },
    {
      key :"4",
      category: "DNS Poisoning Risk",
      status:  "22",
      risk: "FAIL",
    },
    {
      key :"5",
      category: "Eavesdropping",
      status:  "62",
      risk: "PASS",
    },
    {
      key :"6",
      category: "Data Security",
      status: "42",
      risk: "FAIL",
    },
  ]
}
 function WifiScreen({navigation}) {

  const myContext = useContext(AppContext);

  let internalColor;
  let securityLevel;
  if (myContext.ReadinessWifiPercentValue > 60){
    internalColor = "red";
    securityLevel = "WiFi Risk"
  }
  else if (myContext.ReadinessWifiPercentValue > 30){
    internalColor = "orange";
    securityLevel = "WiFi Risk"
  }
  else{
    internalColor = "green";
    securityLevel = "WiFi Risk"
  }
  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });
  return (
    

    <View style={{ ...styles.container, flex: 1 }}>
      
      

      <View style={{ ...styles.container, flex: 0.5 }}>
        <Text style = {{ fontSize: wp(6), color: '#D3D3D3',       }}>WiFi Security for <Text style = {{ fontStyle: 'italic'}}>{myContext.SSIDValue}</Text></Text>
      
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
                          data={[{ y: myContext.ReadinessWifiPercentValue }, { y: 100 - myContext.ReadinessWifiPercentValue }, ]}
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
                          data={[{ y: myContext.ReadinessWifiPercentValue }, { y: 100 - myContext.ReadinessWifiPercentValue }, ]}
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
                          data={[{ y: myContext.ReadinessWifiPercentValue }, { y: 100 - myContext.ReadinessWifiPercentValue }, ]}
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
                          style={{ fontSize: wp(4), fill: 'white' }}
                          x={windowWidth/3.6}
                          y={windowWidth/3.6}
                          
                          text={[myContext.ReadinessWifiPercentValue + "%",securityLevel]}
                        />
                      </VictoryContainer>
                    </View>
                    
                    
                  </View>
                  <View style = {{ ...styles.container, flex: 1, paddingTop: hp(5), flexDirection: 'column', marginRight: windowWidth/50, }}>
                    <View style = {{ ...styles.centrify, flex: 0.5, }}>
                      <Text style = {{color: 'white', fontSize: wp(3)}}>Failed tests: {myContext.FailedWifiTestsValue} out of {myContext.TotalWifiTestsValue}</Text>
                    </View>
                    <View style = {{ ...styles.centrify1, flex: 1, flexDirection: 'row',}}>
                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.CritWifiTestsValue }, { y: (myContext.TotalWifiTestsValue == 0 ? 1 : myContext.TotalWifiTestsValue) - myContext.CritWifiTestsValue }, ]}
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
                          
                          text={myContext.CritWifiTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> Critical </Text>
                      </View>

                    </View>

                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.HighWifiTestsValue }, { y: (myContext.TotalWifiTestsValue == 0 ? 1 : myContext.TotalWifiTestsValue) - myContext.HighWifiTestsValue }, ]}
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
                          
                          text={myContext.HighWifiTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> High </Text>
                      </View>

                    </View>
                    </View>

                    <View style = {{ ...styles.centrify1, flex: 1, flexDirection: 'row',}}>
                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.MedWifiTestsValue }, { y: (myContext.TotalWifiTestsValue == 0 ? 1 : myContext.TotalWifiTestsValue) - myContext.MedWifiTestsValue }, ]}
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
                          
                          text={myContext.MedWifiTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> Medium </Text>
                      </View>

                    </View>
                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <VictoryContainer 
                        x={0}
                        y={0}
                        height={wp(12.5)}
                        width={wp(12.5)}
                      >
                        <VictoryPie
                          
                          animate={{ easing: 'exp',}}
                          data={[{ y: myContext.LowWifiTestsValue }, { y: (myContext.TotalWifiTestsValue == 0 ? 1 : myContext.TotalWifiTestsValue) - myContext.LowWifiTestsValue }, ]}
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
                          
                          text={myContext.LowWifiTestsValue}
                        />
                      </VictoryContainer>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: wp(3), color: 'white'      }}> Low </Text>
                      </View>

                    </View>
                    </View>
                  </View>
                </View>
      
      </View>
      <View style={{ ...styles.container, flex: 0.5,  marginTop: hp(1),  }}>
        <Text style = {{ fontSize: wp(6), color: '#D3D3D3',   }}> Wifi Threat Breakdown </Text>
      
      </View>
      <View style={{ ...styles.container, flex: 0.5, }}>
        <View style = {{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00ACEB', marginLeft: wp(2), marginRight: wp(2), paddingBottom: hp(1),}}>
          <View style = {{ flex: 2, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB',}}>Category</Text>
          </View>

          <View style = {{ flex: 2, paddingRight: wp(4)}}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Readiness</Text>
          </View>

          <View style = {{ flex: 1, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Risk</Text>
          </View>
        </View>
      </View>

      <View style={{ ...styles.container, flex: 3 }}>
        <SafeAreaView style={{ ...styles.container,   }}>
          <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingTop: hp(2.5), paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{ flex: 1.5, color: 'white', fontSize: wp(4)}} numberOfLines={1}>Password Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.PasswordWifiPercentBarValue > 15 ? myContext.PasswordWifiPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.PasswordWifiPercentBarValue > 90 ? '#2E7D32' : myContext.PasswordWifiPercentBarValue > 70 ? '#E65100' : myContext.PasswordWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.PasswordWifiPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.PasswordWifiPercentBarValue > 90 ? '#2E7D32' : myContext.PasswordWifiPercentBarValue > 70 ? '#E65100' : myContext.PasswordWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.PasswordWifiPercentBarValue > 90 ? 'Low' : myContext.PasswordWifiPercentBarValue > 70 ? 'Med' : myContext.PasswordWifiPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1)}}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{ flex: 1.5, color: 'white', fontSize: wp(4)}} numberOfLines={1}>Encryption Strength</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.EncryptionWifiPercentBarValue > 15 ? myContext.EncryptionWifiPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.EncryptionWifiPercentBarValue > 90 ? '#2E7D32' : myContext.EncryptionWifiPercentBarValue > 70 ? '#E65100' : myContext.EncryptionWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.EncryptionWifiPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.EncryptionWifiPercentBarValue > 90 ? '#2E7D32' : myContext.EncryptionWifiPercentBarValue > 70 ? '#E65100' : myContext.EncryptionWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.EncryptionWifiPercentBarValue > 90 ? 'Low' : myContext.EncryptionWifiPercentBarValue > 70 ? 'Med' : myContext.EncryptionWifiPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{ flex: 1.5, color: 'white', fontSize: wp(4)}} numberOfLines={1}>Firewall Security</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.FirewallWifiPercentBarValue > 15 ? myContext.FirewallWifiPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.FirewallWifiPercentBarValue > 90 ? '#2E7D32' : myContext.FirewallWifiPercentBarValue > 70 ? '#E65100' : myContext.FirewallWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.FirewallWifiPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.FirewallWifiPercentBarValue > 90 ? '#2E7D32' : myContext.FirewallWifiPercentBarValue > 70 ? '#E65100' : myContext.FirewallWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.FirewallWifiPercentBarValue > 90 ? 'Low' : myContext.FirewallWifiPercentBarValue > 70 ? 'Med' : myContext.FirewallWifiPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid,}}>
                <Text style={{ flex: 1.5, color: 'white', fontSize: wp(4)}} numberOfLines={1}>DNS Poisoning Risk</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.DnsWifiPercentBarValue > 15 ? myContext.DnsWifiPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.DnsWifiPercentBarValue > 90 ? '#2E7D32' : myContext.DnsWifiPercentBarValue > 70 ? '#E65100' : myContext.DnsWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.DnsWifiPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.DnsWifiPercentBarValue > 90 ? '#2E7D32' : myContext.DnsWifiPercentBarValue > 70 ? '#E65100' : myContext.DnsWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.DnsWifiPercentBarValue > 90 ? 'Low' : myContext.DnsWifiPercentBarValue > 70 ? 'Med' : myContext.DnsWifiPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            <View style= {{ ...styles.tableRow, borderColor: bordCol, borderWidth: bordWid, paddingBottom: hp(3), paddingLeft: wp(1), paddingRight: wp(1) }}>

              <View style = {{ flex: 1.5, borderColor: bordCol, borderWidth: bordWid, }}>
                <Text style={{ flex: 1.5, color: 'white', fontSize: wp(4)}} numberOfLines={1}>Eavesdropping</Text>
              </View>

              <View style = {{ flex: 2, borderColor: bordCol, borderWidth: bordWid, paddingRight: wp(2), paddingLeft: wp(1)}}>
                <View style = {{ height: '100%', borderWidth: 0.25, borderRadius: 20, borderColor: '#00ACEB' }}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: myContext.EavesdroppingWifiPercentBarValue > 15 ? myContext.EavesdroppingWifiPercentBarValue.toString()+'%' : '15%', backgroundColor: myContext.EavesdroppingWifiPercentBarValue > 90 ? '#2E7D32' : myContext.EavesdroppingWifiPercentBarValue > 70 ? '#E65100' : myContext.EavesdroppingWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(2.5)}}>{myContext.EavesdroppingWifiPercentBarValue}%</Text>
                  </View>
                </View>
              </View>

              <View style = {{ flex: 1, borderColor: bordCol, borderWidth: bordWid, justifyContent: 'center', alignItems: 'center'}}>
                  <View style = {{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '75%', backgroundColor: myContext.EavesdroppingWifiPercentBarValue > 90 ? '#2E7D32' : myContext.EavesdroppingWifiPercentBarValue > 70 ? '#E65100' : myContext.EavesdroppingWifiPercentBarValue > 40 ? '#F57F17' : '#B71C1C', borderWidth: 0, borderRadius: 20,  }}>
                    <Text style = {{color: 'white', fontSize: wp(3.5)}}>{myContext.EavesdroppingWifiPercentBarValue > 90 ? 'Low' : myContext.EavesdroppingWifiPercentBarValue > 70 ? 'Med' : myContext.EavesdroppingWifiPercentBarValue > 40 ? 'High' : 'Crit'}</Text>
                  </View>
              </View>

            </View>

            

            


            

            






          </ScrollView>
        </SafeAreaView>
      
      </View>
     
       <View style={{ ...styles.centrifyy, flex: 0.6, flexDirection: 'row', backgroundColor: '#1C2B3A'}}>
          <View style={{ ...styles.centrifyy, flex: 1, }}>
            <View style={{ ...styles.centrifyy, flex: 4, alignItems: 'flex-end', paddingRight: wp(2)}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(true);
                  setRunStatus("Running Security Check...");
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
                  setModal3Visible(true);
                  setWifiStatus("Checking Wifi connection...");
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
                  setModal2Visible(true);
                  setSyncStatus("Syncing Devices...");
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
function HeaderComponent(){
  return(
    
    <Text style= {{ fontSize: windowHeight/30, color:'#FFFFFF' }}>White<Text style= {{ fontSize: windowHeight/30, color:'#FE0000' }}>HaX</Text></Text>
    
  )
}
export default function Wifi({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Wifi" component={WifiScreen} options={{
          
          headerTitleStyle: {
            fontSize: windowWidth/10,

            color: 'red',
          },
          headerStyle: {
            backgroundColor: '#1C2B3A',
            height: windowHeight/7.5,
            height: wp(15),
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
}


const styles = StyleSheet.create({

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

    //<-- modal stuff


    tableRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      height: '100%',
    },
});