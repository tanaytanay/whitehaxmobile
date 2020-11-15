import React, {useState, useEffect, useContext} from 'react';
import {   Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
//import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import AppContext from "../components/AppContext";




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();


import {NativeModules} from 'react-native';
var TestModule = NativeModules.TestModule;



function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 30 }}
      source={require('../assets/images/logo.png')}
    />
  );
}

function AccountScreen({navigation}) {


  
  let [Gen, setGen] = useState({"appDetails":[],"deviceInfo":{"name":"","value":""},"generalChecks":[{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","status":"","weight":0}]});
  let [Wifi, setWifi] = useState({"bssid":"","capabilities":"","defaultGateway":"","deviceHostName":"","deviceIP":"","dhcpAddress":"","dns1":"","dns2":"","internalIPAddress":"","macAddress":"","manufacturer":"","ssid":"","whatIsMyIpAddress":"","wifiCheck":[{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0},{"name":"","readinessType":"","remediationStep":"","remediationType":"","severity":"","value":"","weight":0}]});

  

  

  function getTestValue() {
    TestModule.getString((info) => {
      setGen(JSON.parse(info));
      console.log(info);
    });
  }

  
  function getWifiValue() {
    TestModule.getWifi((info) => {
      setWifi(JSON.parse(info));
      console.log(info);
    });
  }

  

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center',  alignItems: 'center', }}>
          
          <View style={styles.body}>
            <View style={{ flex: 1, borderColor: 'black',marginTop: 20, width: '100%'}}>
              <TouchableOpacity
                onPress = {getTestValue}
              >
                <View style={{ flex: 1, width: '100%', height: '100%', padding: 10, backgroundColor: '#64b5f6'}}>
                  <Text style= {{textAlign: 'center'}}> Press For Non-Wifi Test Info </Text>
                </View>            
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 2, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4}}> 
                <Text> Test</Text> 
              </View>
              <View style={{flex: 1}}> 
                <Text> Status </Text> 
              </View>
              <View style={{flex: 1}}> 
                <Text> Weight </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4}}> 
                <Text> WH_Google_Play_Protect</Text> 
              </View>
              <View style={{flex: 1}}> 
                <Text> {Gen.generalChecks[0].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1}}> 
                <Text> {Gen.generalChecks[0].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_OS_Rooted_Check1 </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[1].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[1].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_AntiVirus_Installed</Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[2].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[2].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> isStorageEncryptionDevice </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[3].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[3].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Browser_Default </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[4].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[4].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Browser_Version </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[5].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[5].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_FW_Installed </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[6].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[6].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_DeviceLock_Check </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[7].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[7].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Passwd_Check </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[8].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[8].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_AntiPhishing_Installed </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[9].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[9].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_VPN_App_Check </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[10].status == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Gen.generalChecks[10].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1,marginTop: 20, width: '100%'}}>
              <TouchableOpacity
                onPress = {getWifiValue}
              >
                <View style={{ flex: 1, width: '100%', height: '100%', padding: 10, backgroundColor: '#64b5f6'}}>
                  <Text style= {{textAlign: 'center'}}> Press For Wifi Test Info </Text>
                </View>            
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 2, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4}}> 
                <Text> Test</Text> 
              </View>
              <View style={{flex: 1}}> 
                <Text> Status </Text> 
              </View>
              <View style={{flex: 1}}> 
                <Text> Weight </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_SSID_Visible </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[0].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[0].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_Encrypt_Strength </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[1].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[1].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_Router_IP_Default </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[2].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[2].weight} </Text> 
              </View>
            </View>
          </View>

          

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_Router_Admin_Access </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[3].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[3].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_FW_Port1 </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[4].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[4].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_FW_Port2 </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[5].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[5].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_FW_Port3 </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[6].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[6].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_FW_Port4 </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[7].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[7].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_DNS_Poisoning </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[8].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[8].weight} </Text> 
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderColor: 'black', width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 4,}}>
                <Text> WH_Wifi_VPN_NAT </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[9].value == 'true' ? <Text style={{color:'green'}}> Pass </Text> : <Text style={{color:'red'}}> Fail </Text> } </Text> 
              </View>
              <View style={{flex: 1,}}>
                <Text> {Wifi.wifiCheck[9].weight} </Text> 
              </View>
            </View>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Account({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} options={{
          headerTitle: 'WhiteHaX',
          headerTitleStyle: {
            fontSize: windowWidth/15,
          },
          headerStyle: {
            backgroundColor: '#098af7',
            height: windowHeight/7.5,
          },
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
              <View style = {{ paddingLeft: windowWidth/30, }}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require('../assets/images/burger.png')}
                />
              </View>
            </TouchableWithoutFeedback>
            
          ),
        }}/>
      
    </Stack.Navigator>
  );
}




const styles = StyleSheet.create({
  
  body: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  
});








