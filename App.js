import React, { useRef, useState, useEffect, Component, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';

import { TextInput, KeyboardAvoidingView, Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Dashboard from './screens/Dashboard.js';
import DetailsPage from './screens/DetailsPage.js';
import Devices from './screens/Devices.js';
import Remediation from './screens/Remediation.js';
import Account from './screens/Account.js';
import Settings from './screens/Settings.js';
import Testboard from './screens/Testboard.js'
import testAccordion from './screens/testAccordion.js'
import Wifi from './screens/Wifi.js'

import { Dimensions } from 'react-native';

import {NativeModules} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import AppContext from './components/AppContext';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

var TestModule = NativeModules.TestModule;

let validUsers = [{"username":"test_user1","password":"whitehax@123","userid":"6"},{"username":"test_user2","password":"ironsdn@123","userid":"174"},{"username":"test_user3","password":"test@123","userid":"227"},{"username":"test_user4","password":"pass@123","userid":"236"}]



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('./assets/fonts/DidactGothic-Regular.ttf'),
  // });
  const { signOut } = React.useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" labelStyle = {{ color: 'white',       }} onPress={signOut} />
    </DrawerContentScrollView>
  );
}


function Home() {
  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('./assets/fonts/DidactGothic-Regular.ttf'),
  // });
  const { signOut } = React.useContext(AuthContext);
  return (
    
      
      
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerStyle= {{ backgroundColor: '#18222E', }} 
          drawerContentOptions = {{
            activeTintColor: '#D3D3D3',
            itemStyle: { marginVertical: 5, },
            labelStyle: { color: 'white',       }
        }} 
        initialRouteName="Status"
      >
        
        
        <Drawer.Screen 
          name="Status" 
          component={Testboard} 
          options= {{ 
          drawerIcon: config => 
            <Image
              style={{ width: wp(5), height: hp(3),  }}
              source={require('./assets/android/4x/all_check_test_normalxxxhdpi.png')}
            /> 
          }}  
        />
        <Drawer.Screen 
          name="Wifi" 
          component={Wifi} 
          options= {{ 
          drawerIcon: config => 
            <Image
              style={{ width: wp(5), height: hp(3),  }}
              source={require('./assets/android/4x/wifi_security_normalxxxhdpi.png')}
            /> 
          }}  
        />
        <Drawer.Screen 
          name="Devices" 
          component={Devices} 
          options= {{ 
          drawerIcon: config => 
            <Image
              style={{ width: wp(5), height: hp(3),  }}
              source={require('./assets/android/4x/device_menu_activexxxhdpi.png')}
            /> 
          }}  
        />
        <Drawer.Screen 
          name="List of Tests" 
          component={Account} 
          options= {{ 
          drawerIcon: config => 
            <Image
              style={{ width: wp(5), height: hp(3),  }}
              source={require('./assets/android/4x/account_normalxxxhdpi.png')}
            /> 
          }}  
        />
        <Drawer.Screen 
          name="Settings" 
          component={Settings} 
          options= {{ 
          drawerIcon: config => 
            <Image
              style={{ width: wp(5), height: hp(3),  }}
              source={require('./assets/android/4x/settings_normalxxxhdpi.png')}
            /> 
          }}  
        />
        
        

        
        
      </Drawer.Navigator> 
      
    
  )
}


const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Image
                    style={{ width: wp(5), height: hp(3),  }}
                    source={require('./assets/images/Splash.png')}
                  />
    </View>
  );
}

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

function SignInScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
  const myContext = useContext(AppContext);

  
  return (
    <View style= {{ flex:1, backgroundColor: '#18222E'}}>
      {/*<ImageBackground source = {require('./assets/images/bg.jpg')} style= {{flex: 1, resizeMode: 'cover', justifyContent: 'center',}}>*/}
      <HideWithKeyboard style = {{ ...styles.centrify, flex: 3,}}>
        
              <Text style= {{ fontSize: wp(12), color:'white' }}>White<Text style= {{ fontSize: wp(12), color:'red' }}>HaX</Text></Text>


        
        </HideWithKeyboard>
        <View style = {{ ...styles.centrify, flex: 1, paddingBottom: hp(5),}}>
              <Text style = {{ fontSize: wp(7), color: '#D3D3D3' }}> Login to your Account </Text>
        </View>
        <View style = {{ ...styles.centrify, flex: 2, flexDirection: 'column',  }}>
          <View style = {{ ...styles.centrify, flex: 1, }}>
            
          </View>
            
            <View style = {{ }}>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> User Name </Text>
              </View>
              <View style={{ borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1), flexDirection: 'row' }}>
                <View style = {{ flex: 2, width: '100%', borderColor: 'red', borderWidth: 0, justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                      style={{ width: wp(5), height: hp(3),  }}
                      source={require('./assets/android/1x/user_namemdpi.png')}
                    />
                </View>
                <View style = {{ flex: 9, width: '100%', borderColor: 'red', borderWidth: 0}}>
                  <TextInput
                    style = {{ color: 'white', fontSize: wp(5), textAlign: 'left'}}
                    placeholder=""
                    placeholderTextColor = "white"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> Password </Text>
              </View>
              <View style={{ borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1), flexDirection: 'row' }}>
                <View style = {{ flex: 2, width: '100%', borderColor: 'red', borderWidth: 0,  justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                      style={{ width: wp(5), height: hp(3),  }}
                      source={require('./assets/android/1x/passwordmdpi.png')}
                    />
                </View>
                <View style = {{ flex: 9, width: '100%', borderColor: 'red', borderWidth: 0}}>
                  <TextInput
                    style = {{ color: 'white', fontSize: wp(5), textAlign: 'left'}}
                    placeholder=""
                    placeholderTextColor = "white"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>
              
            </View>

            
          
          <View style = {{ ...styles.centrify, flex: 1, paddingTop: hp(2.5), marginBottom: hp(10)}}>
              <View style = {{ ...styles.centrify, flex: 1,}}>
              <Text style = {{ fontSize: wp(4), color: '#D3D3D3' }}> Forgot Password? </Text>
        </View>
          </View>    
        </View>
        <View style= {{flexDirection: 'row', marginBottom: hp(5)}}>

          <View style={{ flex: 0.5, borderWidth: 1, backgroundColor: '#00ACEB', borderColor: '#00bfff', height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, marginLeft: wp(5),  marginRight: wp(5)}}>
                <TouchableHighlight
                  style={{  height: '100%', width: '100%', justifyContent: 'center', }}
                  onPress={() => {
                    let validation = true;
                    let i;
                    for(i = 0 ; i < validUsers.length ; i ++) {
                      if (username == validUsers[i].username && password == validUsers[i].password) {
                        validation = true;
                        myContext.setUserID(validUsers[i].userid)
                        break;
                      }
                    }

                    if( validation == true )
                      signIn({ username, password })
                    else
                      console.log("incorrect")

                  }}
                  
                >

                  <Text style={{ color: 'white', fontSize: wp(5), textAlign: 'center'}}>Login</Text>
                </TouchableHighlight>
                
              </View> 

              <View style={{ flex: 0.5, borderWidth: 1, borderColor: '#00bfff', height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, marginLeft: wp(5), marginRight: wp(5) }}>
                <TouchableHighlight
                  style={{  height: '100%', width: '100%', justifyContent: 'center',  }}
                  onPress={() => navigation.navigate('SignUp')}
                  
                >
                  <Text style={{ color: '#00ACEB', fontSize: wp(5), textAlign: 'center'}}>Register</Text>
                </TouchableHighlight>
                
              </View> 
        </View>
        
        
      {/*</ImageBackground>*/}
    </View>
  );
}

function SignUpScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);
  
  return (
    <View style= {{ flex:1, backgroundColor: '#18222E'}}>
      {/*<ImageBackground source = {require('./assets/images/bg.jpg')} style= {{flex: 1, resizeMode: 'cover', justifyContent: 'center',}}>*/}
        <View style = {{ ...styles.centrify, flex: 0.5, paddingTop: 0, borderColor: 'white', borderWidth: 1,}}>
              <Text style= {{ fontSize: wp(12), color:'white' }}>White<Text style= {{ fontSize: wp(12), color:'red' }}>HaX</Text></Text>


        </View>
        <View style = {{ ...styles.centrify, flex: 0.5, borderColor: 'white', borderWidth: 1,}}>
              <Text style = {{ fontSize: wp(7), color: '#D3D3D3' }}> Self Registration </Text>
        </View>
        <View style = {{ ...styles.centrify, flex: 4, flexDirection: 'column',  }}>
          
            
            <View style = {{ }}>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> User Name </Text>
              </View>
              <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1),  }}>
                <View style={{...styles.centrify, flex: 1,  height: 40, borderWidth: 0, borderColor: 'white'}}> 
                  <Image
                    style={{ width: wp(5), height: hp(3),  }}
                    source={require('./assets/android/1x/user_namemdpi.png')}
                  />
                </View>

                <View style = {{ flex: 7, borderWidth: 0, borderColor: 'white'}}>
                  <TextInput
                    placeholder=""
                    placeholderTextColor = "white"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> Cyber Insurance Account Number </Text>
              </View>
              <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1),  }}>
                <View style={{...styles.centrify, flex: 1,  height: 40, borderWidth: 0, borderColor: 'white'}}> 
                  <Image
                    style={{ width: wp(5), height: hp(3),  }}
                    source={require('./assets/android/1x/cyber_insurance_accountmdpi.png')}
                  />
                </View>

                <View style = {{ flex: 7, borderWidth: 0, borderColor: 'white'}}>
                  <TextInput
                    placeholder=""
                    placeholderTextColor = "white"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> Cyber Insurance Business Name </Text>
              </View>
              <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1),  }}>
                <View style={{...styles.centrify, flex: 1,  height: 40, borderWidth: 0, borderColor: 'white', }}> 
                  <Image
                    style={{ width: wp(5), height: hp(3),  }}
                    source={require('./assets/android/1x/cyber_insurance_namemdpi.png')}
                  />
                </View>

                <View style = {{ flex: 7, borderWidth: 0, borderColor: 'white'}}>
                  <TextInput
                    placeholder=""
                    placeholderTextColor = "white"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> Name </Text>
              </View>
              <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1),  }}>
                <View style={{...styles.centrify, flex: 1,  height: 40, borderWidth: 0, borderColor: 'white'}}> 
                  <Image
                    style={{ width: wp(5), height: hp(3),  }}
                    source={require('./assets/android/1x/namemdpi.png')}
                  />
                </View>

                <View style = {{ flex: 7, borderWidth: 0, borderColor: 'white'}}>
                  <TextInput
                    placeholder=""
                    placeholderTextColor = "white"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              <View style = {{ }}>
                <Text style = {{ fontSize: wp(4), color: '#D3D3D3'}}> Email </Text>
              </View>
              <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#00ACEB', width: wp(90), height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: hp(1),  }}>
                <View style={{...styles.centrify, flex: 1,  height: 40, borderWidth: 0, borderColor: 'white'}}> 
                  <Image
                    style={{ width: wp(5), height: hp(3),  }}
                    source={require('./assets/android/1x/mailmdpi.png')}
                  />
                </View>

                <View style = {{ flex: 7, borderWidth: 0, borderColor: 'white'}}>
                  <TextInput
                    placeholder=""
                    placeholderTextColor = "white"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>
              
            </View>

            
          
             
        </View>
        <View style= {{flexDirection: 'row', marginBottom: hp(5)}}>

          <View style={{ flex: 0.5, borderWidth: 1, backgroundColor: '#00ACEB', borderColor: '#00bfff', height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, marginLeft: wp(5),  marginRight: wp(5)}}>
                <TouchableHighlight
                  style={{ backgroundColor: '#00ACEB' }}
                  onPress={() => signUp({ username, password })}
                  
                >
                  <Text style={{ color: 'white', fontSize: wp(5)}}>Submit</Text>
                </TouchableHighlight>
                
              </View> 

              <View style={{ flex: 0.5, borderWidth: 1, borderColor: '#00bfff', height: hp(7.5), justifyContent: 'center', alignItems: 'center', borderRadius: 75, marginLeft: wp(5), marginRight: wp(5) }}>
                <TouchableHighlight
                  style={{  }}
                  onPress={() => navigation.goBack()}
                  
                >
                  <Text style={{ color: '#00ACEB', fontSize: wp(5)}}>Cancel</Text>
                </TouchableHighlight>
                
              </View> 
        </View>
        
      {/*</ImageBackground>*/}
    </View>
  );
}


const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [globalVar, setGlobalVar] = useState('hi')
  const [modalVisibleGlobal, setModalVisibleGlobal] = useState(false)

  const [RunModalVisible, setRunModalVisible] = useState(false);
  const [RunPercent, setRunPercent] = useState(Math.round(0));
  const [RunStatus, setRunStatus] = useState("Running Security Checks...");

  const [SyncModalVisible, setSyncModalVisible] = useState(false);
  const [SyncPercent, setSyncPercent] = useState(Math.round(0));
  const [SyncStatus, setSyncStatus] = useState("Syncing Devices...");

  const [WifiModalVisible, setWifiModalVisible] = useState(false);
  const [WifiPercent, setWifiPercent] = useState(Math.round(0));
  const [WifiStatus, setWifiStatus] = useState("Running Wifi Checks...");

  const [NavigationVar, setNavigationVar] = useState(null);


  //weight stuff -->
  const [TotalGeneralTests, setTotalGeneralTests] = useState(0);
  const [PassedGeneralTests, setPassedGeneralTests] = useState(0);
  const [FailedGeneralTests, setFailedGeneralTests] = useState(0);
  const [GeneralTestInfo, setGeneralTestInfo] = useState(null);

  const [CritGeneralTests, setCritGeneralTests] = useState(0);
  const [HighGeneralTests, setHighGeneralTests] = useState(0);
  const [MedGeneralTests, setMedGeneralTests] = useState(0);
  const [LowGeneralTests, setLowGeneralTests] = useState(0);


  const [TotalWifiTests, setTotalWifiTests] = useState(0);
  const [PassedWifiTests, setPassedWifiTests] = useState(0);
  const [FailedWifiTests, setFailedWifiTests] = useState(0);
  const [WifiTestInfo, setWifiTestInfo] = useState(null);

  const [DeviceInfo, setDeviceInfo] = useState(null);
  const [DeviceLoop, setDeviceLoop] = useState([]);

  const [CritWifiTests, setCritWifiTests] = useState(0);
  const [HighWifiTests, setHighWifiTests] = useState(0);
  const [MedWifiTests, setMedWifiTests] = useState(0);
  const [LowWifiTests, setLowWifiTests] = useState(0);

  const [TotalGeneralWeight, setTotalGeneralWeight] = useState(0);
  const [FailedGeneralWeight, setFailedGeneralWeight] = useState(0);
  const [PassedGeneralWeight, setPassedGeneralWeight] = useState(0);
  const [ReadinessGeneralPercent, setReadinessGeneralPercent] = useState(0);

  const [TotalWifiWeight, setTotalWifiWeight] = useState(0);
  const [FailedWifiWeight, setFailedWifiWeight] = useState(0);
  const [PassedWifiWeight, setPassedWifiWeight] = useState(0);
  const [ReadinessWifiPercent, setReadinessWifiPercent] = useState(0);

  const [DeviceReadinessPercent, setDeviceReadinessPercent] = useState(0);
  const [EmailReadinessPercent, setEmailReadinessPercent] = useState(0);
  const [WebReadinessPercent, setWebReadinessPercent] = useState(0);
  const [WifiReadinessPercent, setWifiReadinessPercent] = useState(0);
  const [FirewallReadinessPercent, setFirewallReadinessPercent] = useState(0);
  const [DataReadinessPercent, setDataReadinessPercent] = useState(0);
  const [PrivacyReadinessPercent, setPrivacyReadinessPercent] = useState(0);

  const [DeviceReadinessPercentBar, setDeviceReadinessPercentBar] = useState(0);
  const [EmailReadinessPercentBar, setEmailReadinessPercentBar] = useState(0);
  const [WebReadinessPercentBar, setWebReadinessPercentBar] = useState(0);
  const [WifiReadinessPercentBar, setWifiReadinessPercentBar] = useState(0);
  const [FirewallReadinessPercentBar, setFirewallReadinessPercentBar] = useState(0);
  const [DataReadinessPercentBar, setDataReadinessPercentBar] = useState(0);
  const [PrivacyReadinessPercentBar, setPrivacyReadinessPercentBar] = useState(0);

  const [PasswordWifiPercentBar, setPasswordWifiPercentBar] = useState(0);
  const [EncryptionWifiPercentBar, setEncryptionWifiPercentBar] = useState(0);
  const [FirewallWifiPercentBar, setFirewallWifiPercentBar] = useState(0);
  const [DnsWifiPercentBar, setDnsWifiPercentBar] = useState(0);
  const [EavesdroppingWifiPercentBar, setEavesdroppingWifiPercentBar] = useState(0);

  const [OneRemName, setOneRemName] = useState("");
  const [TwoRemName, setTwoRemName] = useState("");
  const [ThreeRemName, setThreeRemName] = useState("");
  const [FourRemName, setFourRemName] = useState("");

  const [OneRemDescription, setOneRemDescription] = useState("");
  const [TwoRemDescription, setTwoRemDescription] = useState("");
  const [ThreeRemDescription, setThreeRemDescription] = useState("");
  const [FourRemDescription, setFourRemDescription] = useState("");

  const [OneRemSteps, setOneRemSteps] = useState([]);
  const [TwoRemSteps, setTwoRemSteps] = useState([]);
  const [ThreeRemSteps, setThreeRemSteps] = useState([]);
  const [FourRemSteps, setFourRemSteps] = useState([]);

  const [SyncDeviceName, setSyncDeviceName] = useState([]);
  const [SyncDeviceReadiness, setSyncDeviceReadiness] = useState([]);
  const [SyncDeviceRisk, setSyncDeviceRisk] = useState([]);

  const [SSID, setSSID] = useState("Unknown");
  //<-- weight stuff
  

  const [UserID, setUserID] = useState("6");
  const globalVariables = {

    //weigh stuff -->

    TotalGeneralTestsValue: TotalGeneralTests,
    PassedGeneralTestsValue: PassedGeneralTests,
    FailedGeneralTestsValue: FailedGeneralTests,
    GeneralTestInfoValue: GeneralTestInfo,
    setTotalGeneralTests,
    setPassedGeneralTests,
    setFailedGeneralTests,
    setGeneralTestInfo,

    CritGeneralTestsValue: CritGeneralTests,
    HighGeneralTestsValue: HighGeneralTests,
    MedGeneralTestsValue: MedGeneralTests,
    LowGeneralTestsValue: LowGeneralTests,
    setCritGeneralTests,
    setHighGeneralTests,
    setMedGeneralTests,
    setLowGeneralTests,

    CritWifiTestsValue: CritWifiTests,
    HighWifiTestsValue: HighWifiTests,
    MedWifiTestsValue: MedWifiTests,
    LowWifiTestsValue: LowWifiTests,
    setCritWifiTests,
    setHighWifiTests,
    setMedWifiTests,
    setLowWifiTests,


    TotalWifiTestsValue: TotalWifiTests,
    PassedWifiTestsValue: PassedWifiTests,
    FailedWifiTestsValue: FailedWifiTests,
    WifiTestInfoValue: WifiTestInfo,
    setTotalWifiTests,
    setPassedWifiTests,
    setFailedWifiTests,
    setWifiTestInfo,

    TotalGeneralWeightValue: TotalGeneralWeight,
    FailedGeneralWeightValue: FailedGeneralWeight,
    PassedGeneralWeightValue: PassedGeneralWeight,
    ReadinessGeneralPercentValue: ReadinessGeneralPercent,
    setTotalGeneralWeight,
    setFailedGeneralWeight,
    setPassedGeneralWeight,
    setReadinessGeneralPercent,

    TotalWifiWeightValue: TotalWifiWeight,
    FailedWifiWeightValue: FailedWifiWeight,
    PassedWifiWeightValue: PassedWifiWeight,    
    ReadinessWifiPercentValue: ReadinessWifiPercent,
    setTotalWifiWeight,
    setFailedWifiWeight,
    setPassedWifiWeight,
    setReadinessWifiPercent,


    DeviceReadinessPercentValue: DeviceReadinessPercent,
    EmailReadinessPercentValue: EmailReadinessPercent,
    WebReadinessPercentValue: WebReadinessPercent,
    WifiReadinessPercentValue: WifiReadinessPercent,
    FirewallReadinessPercentValue: FirewallReadinessPercent,
    DataReadinessPercentValue: DataReadinessPercent,
    PrivacyReadinessPercentValue: PrivacyReadinessPercent,
    setDeviceReadinessPercent,
    setEmailReadinessPercent,
    setWebReadinessPercent,
    setWifiReadinessPercent,
    setFirewallReadinessPercent,
    setDataReadinessPercent,
    setPrivacyReadinessPercent,

    DeviceReadinessPercentBarValue: DeviceReadinessPercentBar,
    EmailReadinessPercentBarValue: EmailReadinessPercentBar,
    WebReadinessPercentBarValue: WebReadinessPercentBar,
    WifiReadinessPercentBarValue: WifiReadinessPercentBar,
    FirewallReadinessPercentBarValue: FirewallReadinessPercentBar,
    DataReadinessPercentBarValue: DataReadinessPercentBar,
    PrivacyReadinessPercentBarValue: PrivacyReadinessPercentBar,
    setDeviceReadinessPercentBar,
    setEmailReadinessPercentBar,
    setWebReadinessPercentBar,
    setWifiReadinessPercentBar,
    setFirewallReadinessPercentBar,
    setDataReadinessPercentBar,
    setPrivacyReadinessPercentBar,

    PasswordWifiPercentBarValue: PasswordWifiPercentBar,
    EncryptionWifiPercentBarValue: EncryptionWifiPercentBar,
    FirewallWifiPercentBarValue: FirewallWifiPercentBar,
    DnsWifiPercentBarValue: DnsWifiPercentBar,
    EavesdroppingWifiPercentBarValue: EavesdroppingWifiPercentBar,
    setPasswordWifiPercentBar,
    setEncryptionWifiPercentBar,
    setFirewallWifiPercentBar,
    setDnsWifiPercentBar,
    setEavesdroppingWifiPercentBar,

    //<-- weight styff

    //rem-->
    OneRemNameValue: OneRemName,
    TwoRemNameValue: TwoRemName,
    ThreeRemNameValue: ThreeRemName,
    FourRemNameValue: FourRemName,
    setOneRemName,
    setTwoRemName,
    setThreeRemName,
    setFourRemName,

    OneRemDescriptionValue: OneRemDescription,
    TwoRemDescriptionValue: TwoRemDescription,
    ThreeRemDescriptionValue: ThreeRemDescription,
    FourRemDescriptionValue: FourRemDescription,
    setOneRemDescription,
    setTwoRemDescription,
    setThreeRemDescription,
    setFourRemDescription,



    OneRemStepsValue: OneRemSteps,
    TwoRemStepsValue: TwoRemSteps,
    ThreeRemStepsValue: ThreeRemSteps,
    FourRemStepsValue: FourRemSteps,
    setOneRemSteps,
    setTwoRemSteps,
    setThreeRemSteps,
    setFourRemSteps,

    //<--rem



    globalVarValue: globalVar,
    modalVisibleGlobalValue: modalVisibleGlobal,

    RunModalVisibleValue: RunModalVisible,
    RunPercentValue: RunPercent,
    RunStatusValue: RunStatus,
    setRunModalVisible,
    setRunPercent,
    setRunStatus,

    SyncModalVisibleValue: SyncModalVisible,
    SyncPercentValue: SyncPercent,
    SyncStatusValue: SyncStatus,
    setSyncModalVisible,
    setSyncPercent,
    setSyncStatus,

    WifiModalVisibleValue: WifiModalVisible,
    WifiPercentValue: WifiPercent,
    WifiStatusValue: WifiStatus,
    setWifiModalVisible,
    setWifiPercent,
    setWifiStatus,

    NavigationVarValue: NavigationVar,
    setNavigationVar,

    SyncDeviceNameValue: SyncDeviceName,
    SyncDeviceRiskValue: SyncDeviceRisk,
    SyncDeviceReadinessValue: SyncDeviceReadiness,
    setSyncDeviceName,
    setSyncDeviceReadiness,
    setSyncDeviceRisk,

    DeviceInfoValue: DeviceInfo,
    setDeviceInfo,

    DeviceLoopValue: DeviceLoop,
    setDeviceLoop,

    SSIDValue: SSID,
    setSSID,

    UserIDValue: UserID,
    setUserID,

    setGlobalVar,
    setModalVisibleGlobal,
    
  };
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AppContext.Provider value={globalVariables}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator
            headerMode="none"
          >
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',

              // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: 'Sign in',

              // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              </>
            ) : (
              // User is signed in
              <Stack.Screen name="Home" component={Home} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({

  centrify:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
})
