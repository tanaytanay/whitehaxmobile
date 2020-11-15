import React, { useRef, useState, useEffect, Component } from "react";
import { Animated, Modal, FlatList, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
//import { useFonts } from '@use-expo/font';

//import { AppLoading } from 'expo';
//import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';
//import * as Progress from 'react-native-progress';
//import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//import {Timeline} from 'react-native-just-timeline';

const Stack = createStackNavigator();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

function CustomRow ({ serial, category, status, risk, modalNum }) {

  const [runValue, setRunValue] = useState(0);
  const [syncValue, setSyncValue] = useState(0);
  const [runStatus, setRunStatus] = useState("Remediating...");
  const [syncStatus, setSyncStatus] = useState("Remediating...");
  const [runButton, setRunButton] = useState(true);
  const [syncButton, setSyncButton] = useState(true);
  let runValueShow = Math.round(runValue * 100);
  let syncValueShow = Math.round(syncValue * 100);
  let intervalRun, intervalSync;

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

    setRunValue(temp);
      
      
        intervalRun = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalRun);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setRunStatus("Remediation Complete!");
            setRunButton(false);
          }

          setRunValue(temp)
        }, 500);
      
      
      
    
  }
  function animateSync() {
    let temp = 0;
    setSyncValue(temp);
      
      
        intervalSync = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalSync);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setSyncStatus("Remediation Complete!");
            setSyncButton(false);
          }

          setSyncValue(temp)
        }, 500);
      
      
      
    
  }








  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  
  let riskContainerStyle;
  let statusContainerStyle;

  if (status > 90){
    statusContainerStyle = {flex: status/100, backgroundColor: 'green', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'green'};
    risk = "LOW"
  }
  else if (status > 60){
    statusContainerStyle = {flex: status/100, backgroundColor: 'yellow', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'yellow'};
    risk = "MED"
  }
  else if (status > 30){
    statusContainerStyle = {flex: status/100, backgroundColor: 'orange', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'orange'};
    risk = "HIGH"
  }
  else{
    statusContainerStyle = {flex: status/100, backgroundColor: 'red', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'red'};
    risk = "CRIT"
  }

  let customRowTextStyle = {...styles.customRoww_text};
  // if (serial == 1 ) {
  //   customRowTextStyle = {...styles.firstCustomRowText};
  // }
  // else{
  //   customRowTextStyle = {...styles.customRoww_text};
  // }
  
  
    return(
      
      
      <View style={{...styles.customRoww}}>
        <Modal          animationType="slide"          transparent={true}          visible={modal1Visible}                  >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalTitle}>Weak Password for Wifi</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 5, backgroundColor: '#1C2B3A' }} >
                <Text style = {{ ...styles.modalStepNum }}> Step 1 </Text>
                <Text style={{...styles.modalText, }}>Login to your Wifi router</Text>
                <Text style = {{ ...styles.modalStepNum }}> Step 2 </Text>
                <Text style={{...styles.modalText, }}>Go to the Administrator account page</Text>
                <Text style = {{ ...styles.modalStepNum }}> Step 3 </Text>
                <Text style={{...styles.modalText, }}>Change the WiFi router password to make it at least 10 characters long with a combination of upper/lower case, numbers and alphanumerics.</Text>
              </View>
              
             


              

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModal1Visible(!modal1Visible);
                  }}
                  
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <Modal           animationType="slide"           transparent={true}           visible={modal2Visible}        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalTitle}> Web Safe Browsing </Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                                  style={styles.progressBar}
                                  progress={runValue}
                                />*/}
                <Text>{runValueShow}%</Text>
                <Text style = {{ marginTop: 20, fontSize: 15,}}>{runStatus}</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModal2Visible(!modal2Visible);
                  }}
                  disabled = {runButton}
                  
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <Modal          animationType="slide"          transparent={true}          visible={modal3Visible}          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalTitle}>Weak Password for Device Unlock</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 5, backgroundColor: '#1C2B3A' }} >
                <Text style = {{ ...styles.modalStepNum }}> Step 1 </Text>
                <Text style={{...styles.modalText, }}>Go to the Settings App</Text>
                <Text style = {{ ...styles.modalStepNum }}> Step 2 </Text>
                <Text style={{...styles.modalText, }}>Click Device Lock and choose Password option.</Text>
                <Text style = {{ ...styles.modalStepNum }}> Step 3 </Text>
                <Text style={{...styles.modalText, }}>Type  the password that is at least 10 characters long with a combination of upper/lower case, numbers and alphanumerics.</Text>
              </View>
              
              

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModal3Visible(!modal3Visible);
                  }}
                  
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <Modal          animationType="slide"          transparent={true}          visible={modal4Visible}          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalTitle}> Email Phishing Threats </Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                  style={styles.progressBar}
                  progress={syncValue}
                />*/}
                <Text>{syncValueShow}%</Text>
                <Text style = {{ marginTop: 20, fontSize: 15 }}>{syncStatus}</Text>
              </View>
              

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModal4Visible(!modal4Visible);
                  }}
                  
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>
            
            <View style={customRowTextStyle}>
                
                <View style= {{flex: 3, margin: windowWidth/25, alignItems: 'flex-start'}}>
    
                  <Text style={ {...styles.category, color: 'white'}}>
                    {category}
                
                  </Text>
    
                </View>
    
                
                <View style= {{flex: 1, margin: windowWidth/25, alignItems: 'center', justifyContent:'center', alignItems: 'center',}}>
    
                  <TouchableOpacity
                    style={{...styles.button, alignItems: 'center', justifyContent:'center'}}
                    onPress={() => {
                      if (serial == 1) 
                      {
                        setModal1Visible(true);
                      }
                      else if (serial == 2)
                      {
                        setModal2Visible(true);
                        setRunStatus("Remediating...");
                        animateRun();

                      }
                      else if (serial == 3)
                      {
                        setModal3Visible(true);
                      }
                      else
                      {
                        setModal4Visible(true);
                        setSyncStatus("Remediating...");
                        animateSync();
                      }

                      

                    }}
                  >
                  <Image
                    style={{ width: windowWidth/20, height: windowWidth/20, }}
                    source={require('../assets/images/fix.png')}
                  />
                  <Text style = {{   color: 'white'  }}> Remediate </Text>
                </TouchableOpacity>
    
                </View>
    
            </View>
    
        </View>
        );

}
const CustomListview = ({ itemList }) => (
    <View style={{...styles.customRoww, paddingTop: windowHeight/75, }}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    serial = {item.serial}
                    category={item.category}
                    status={item.status}
                    risk={item.risk}
                    modalNum={item.modalNum}
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
      status: "CRITICAL",
      risk: "PASS",
      modalNum: 1,
    },
    {
      key:"2",
      serial: "2",
      category: "Web Safe Browsing",
      status: "CRITICAL",
      risk: "FAIL",
      modalNum: 2,
    },
    {
      key:"3",
      serial: "3",
      category: "Weak Password for Device Unlock",
      status: "CRITICAL",
      risk: "FAIL",
      modalNum: 3,
    },
    {
      key:"4",
      serial: "4",
      category: "Email Phishing Threats",
      status: "CRITICAL",
      risk: "FAIL",
      modalNum: 4,
    },
    

    
    

  ]
}
//modall stuff -->
function useInterval1(callback, delay) {
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
//<-- modall stuff

export default function RemediationScreen({navigation}) {

  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else{



  //modall stuff -->

  const [modallVisible, setModallVisible] = useState(false);
  const [modall2Visible, setModall2Visible] = useState(false);
  const [modall3Visible, setModall3Visible] = useState(false);

  const [runnValue, setRunnValue] = useState(0);
  const [synccValue, setSynccValue] = useState(0);
  const [wifiiValue, setWifiiValue] = useState(0);

  const [runnStatus, setRunnStatus] = useState("Runnning Security Checks...");
  const [synccStatus, setSynccStatus] = useState("Syncing Devices...");
  const [wifiiStatus, setWifiiStatus] = useState("Runnning Wifii Checks...");

  const [runnButton, setRunnButton] = useState(true);
  const [synccButton, setSynccButton] = useState(true);
  const [wifiiButton, setWifiiButton] = useState(true);

  let runnValueShow = Math.round(runnValue * 100);
  let synccValueShow = Math.round(synccValue * 100);
  let wifiiValueShow = Math.round(wifiiValue * 100);

  let intervalRunn, intervalSync, intervalWifii;


  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });

  let animationn = useRef(new Animated.Value(0));
  let [progresss, setProgresss] = useState(0);
  useInterval(() => {
    if(progresss < 100) {
      setProgresss(progresss + 1);
    }
  }, 1000);
  useEffect(() => {
    Animated.timing(animationn.current, {
      toValue: progresss,
      duration: 100,
      useNativeDriver: true,
    }).start();
  },[progresss])

  let width = animationn.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })

  function animateRunn() {
    let temp = 0;

    setRunnValue(temp);
      
      
        intervalRunn = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalRunn);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setRunnStatus("Security Check Complete!");
            setRunnButton(false);
          }

          setRunnValue(temp)
        }, 500);
      
      
      
    
  }

  function animateWifii() {
    let temp = 0;

    setWifiiValue(temp);
      
      
        intervalWifii = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalRunn);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setWifiiStatus("Wifii Check Complete!");
            setWifiiButton(false);
          }

          setWifiiValue(temp)
        }, 500);
      
      
      
    
  }
  function animateSyncc() {
    let temp = 0;
    setSynccValue(temp);
      
      
        intervalSync = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalSync);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setSynccStatus("Sync Complete!");
            setSynccButton(false);
          }

          setSynccValue(temp)
        }, 500);
      
      
      
    
  }

// <-- end of modall stuff

  return (
    

    <View style={{ ...styles.container, flex: 1, }}>
      
      <Modal          animationType="slide"          transparent={true}          visible={modallVisible}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              
              <View style = {{ ...styles.centrifyy, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText1}>Security Check</Text>
              </View>

              <View style = {{ ...styles.centrifyy, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                                  style={styles.progressBar1}
                                  progress={runValue}
                                />*/}
                <Text style= {{ color: '#D3D3D3'}}>{runnValueShow}%</Text>
                <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{runnStatus}</Text>
              </View>

              <View style = {{ ...styles.centrifyy, flex: 1, backgroundColor: '#1C2B3A',  }} >
                <TouchableHighlight
                  style={ { ...styles.openButton1, backgroundColor: "#00ACEB", }}
                  onPress={() => {
                    setModallVisible(!modallVisible);

                  }}
                  disabled = {runnButton}
                >
                  <Text style={styles.textStyle1}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <Modal          animationType="slide"          transparent={true}          visible={modall2Visible}          >
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              
              <View style = {{ ...styles.centrifyy, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText1}>Sync</Text>
              </View>

              <View style = {{ ...styles.centrifyy, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                  style={styles.progressBar1}
                  progress={syncValue}
                />*/}
                <Text style= {{ color: '#D3D3D3'}}>{synccValueShow}%</Text>
                <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{synccStatus}</Text>
              </View>

              <View style = {{ ...styles.centrifyy, flex: 1, backgroundColor: '#1C2B3A' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton1, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModall2Visible(!modall2Visible);
                  }}
                  disabled = {synccButton}
                >
                 <Text style={styles.textStyle1}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <Modal          animationType="slide"          transparent={true}          visible={modall3Visible}           >
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              
              <View style = {{ ...styles.centrifyy, flex: 1, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText1}>Wifi</Text>
              </View>

              <View style = {{ ...styles.centrifyy, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                  style={styles.progressBar1}
                  progress={syncValue}
                />*/}
                <Text style= {{ color: '#D3D3D3'}}>{wifiiValueShow}%</Text>
                <Text style = {{ marginTop: hp(5), fontSize: wp(4), color: '#D3D3D3' }}>{wifiiStatus}</Text>
              </View>

              <View style = {{ ...styles.centrifyy, flex: 1, backgroundColor: '#1C2B3A' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton1, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModall3Visible(!modall3Visible);
                    navigation.navigate("Wifi")
                  }}
                  disabled = {wifiiButton}
                >
                 <Text style={styles.textStyle1}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

      <View style={{ ...styles.container, flex: 0.5}}>
        <Text style = {{ fontSize: windowWidth/20, color: 'white',     }}> Top 4 Recommendations for Remediation </Text>
        
      
      </View>

      
      <View style={{ ...styles.container, flex: 4 }}>
        <View style={{...styles.container}}>
        <CustomListview
          itemList={getData()}
        />
      </View>
      
      </View>
     
      
      

      

      <View style={{ ...styles.centrifyy, flex: 0.75, flexDirection: 'row', backgroundColor: '#1C2B3A'}}>
          <View style={{ ...styles.centrifyy, flex: 1, }}>
            <View style={{ ...styles.centrifyy, flex: 4, alignItems: 'flex-end', paddingRight: wp(2)}}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  setModallVisible(true);
                  setRunnStatus("Running Security Check...");
                  animateRunn();

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
                style={styles.button1}
                onPress={() => {
                  setModall3Visible(true);
                  setWifiiStatus("Checking Wifi connection...");
                  animateWifii();
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
                style={styles.button1}
                onPress={() => {
                  setModall2Visible(true);
                  setSynccStatus("Syncing Devices...");
                  animateSyncc();
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
    <Text style= {{ fontSize: windowHeight/30, color:'white' }}>White<Text style= {{ fontSize: windowHeight/30, color:'red' }}>HaX</Text></Text>

  )
}

export default function Remediation({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Remediation" component={RemediationScreen} options={{

          headerTitle: HeaderComponent(),
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
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  customRoww: {
        flex: 1,
        justifyContent:'center',

        flexDirection: 'row',
       
        
        
        marginTop: windowHeight/200,
        marginBottom: windowHeight/200,
        borderRadius: 5,
        backgroundColor: '#18222E',
        elevation: 2,


    },
    
    customRoww_text: {

        paddingBottom: windowHeight/400,
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

        paddingBottom: windowHeight/20,
        paddingTop: windowHeight/20,
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
        fontSize: wp(3),
        
        textAlign: 'center',
              
        
    },
    status: {
        
        fontSize:windowWidth/25,
        
        color: 'black', 
             
    },
    risk: {
      
        fontSize: windowWidth/30,
        
        color: 'black', 
        textAlign: 'center',
             
    },




    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      height: windowHeight/1.5,

      width: windowWidth/1.2,
      margin: 20,
      backgroundColor: "#1C2B3A",
      borderRadius: 20,
      padding: 35,
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
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",         
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20,
      color: 'white'
           
    },
    modalText: {
      textAlign: 'center',
      fontSize: 15,
      marginBottom: 15,
      color: 'white'

    },
    modalStepNum: {
      textAlign: 'center',
      fontSize: 17,
      color: 'white'
    },







    //modal stuff -->


    centrifyy:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      
    },
    button1: {
      alignItems: "center",
      
      
    },
    modalView1: {
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
    openButton1: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: wp(3),
      elevation: 2
    },
    textStyle1: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      
      
           
    },
    modalText1: {
      marginTop: hp(5),
      marginBottom: hp(3),
      textAlign: "center",
      fontSize: wp(5),
      color: '#D3D3D3'
           
    },

    progressBarContainer1: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      //paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: wp(3),
    },
    progressBar1: {
      margin: wp(3),
    },
    centeredView1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp(4),
    },

    //<-- modal stuff
  



  // timeline ---->

  container1: {
    flex: 1,
    //padding: 20,
    //paddingTop:65,
    backgroundColor:'white'
  },
  list1: {
    flex: 1,
    //marginTop:20,
  },



  // <--- timeline
});