import React, { useRef, useState, useEffect, Component, useContext } from "react";
import { FlatList, Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppContext from "../components/AppContext";

//import { useFonts } from '@use-expo/font';

//import { AppLoading } from 'expo';
//import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';

const Stack = createStackNavigator();






import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let bordCol = "#00ACEB";
let bordWid = 1

function CustomRow ({ serial, category, status, risk, imgSrc }) {
   
  
  let riskContainerStyle;
  let statusContainerStyle;

  if (status > 90){
    statusContainerStyle = {flex: status/100, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems:'center',  borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#2E7D32', borderRadius: 20,};
    risk = "Low"
  }
  
  else if (status > 30){
    statusContainerStyle = {flex: status/100, backgroundColor: '#E65100', justifyContent: 'center', alignItems:'center',  borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#E65100' ,borderRadius: 20,};
    risk = "High"
  }
  else{
    statusContainerStyle = {flex: status/100+0.1, backgroundColor: '#B71C1C', justifyContent: 'center', alignItems:'center',  borderRadius: 20,}
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: '#B71C1C' ,borderRadius: 20,};
    risk = "Crit"
  }

  let customRowTextStyle;

  if (serial == 1 ) {
    customRowTextStyle = {...styles.customRoww_text};
  }
  else{
    customRowTextStyle = {...styles.customRoww_text};
  }
  
  
    return(
      <View style={{...styles.customRoww}}>
            
            <View style={customRowTextStyle}>
                
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
    <View style={{...styles.customRoww, }}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    serial = {item.serial}
                    category={item.category}
                    status={item.status}
                    risk={item.risk}
                    imgSrc={item.imgSrc}
                />}
            />

    </View>
);


function getData(){
  return [
    {
      key:"1",
      serial: "1",
      category: "Phone 1",
      status: "20",
      risk: "PASS",
      imgSrc: require('../assets/images/android.png'),
    },
    {
      key:"2",
      serial: "2",
      category: "iPad 1",
      status: "35",
      risk: "FAIL",
      imgSrc: require('../assets/images/ios.png'),
    },
    {
      key:"3",
      serial: "3",
      category: "iPad 2",
      status: "42",
      risk: "FAIL",
      imgSrc: require('../assets/images/ios.png'),
    },
    {
      key:"4",
      serial: "4",
      category: "PC 1",
      status: "40",
      risk: "FAIL",
      imgSrc: require('../assets/images/win.png'),
    },
    {
      key:"5",
      serial: "5",
      category: "Mac 1",
      status: "92",
      risk: "FAIL",
      imgSrc: require('../assets/images/mac.png'),
    },

    {
      key:"6",
      serial: "6",
      category: "Phone 2",
      status: "22",
      risk: "FAIL",
      imgSrc: require('../assets/images/ios.png'),
    },

    
    

  ]
}


function DevicesScreen({navigation}) {

  // let [fontsLoaded] = useFonts({
  //   'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  // });
  const myContext = useContext(AppContext);

  let i;
  const [tempData, setTempData] = useState('n/a')

  
  
  
  
  
  return (
    

    <View style={{ ...styles.container, flex: 1, }}>
      
      

      <View style={{ ...styles.container, flex: 0.5}}>
        <Text style = {{ fontSize: wp(6), color: '#D3D3D3',     }}> Current Security Status </Text>
        {/*<Text style = {{ fontSize: windowWidth/25, color: 'black',     }}> (Verified Devices) </Text>*/}
      
      </View>

      <View style={{ ...styles.container, flex: 0.5, }}>
        <View style = {{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00ACEB', marginLeft: wp(1), marginRight: wp(1), paddingBottom: hp(1),}}>
          <View style = {{ flex: 1.5, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB'}}>Device Name</Text>
          </View>

          <View style = {{ flex: 2, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Readiness</Text>
          </View>

          <View style = {{ flex: 1, }}>
            <Text style = {{ fontSize: wp(4), color: '#00ACEB', textAlign: 'center'}}>Risk</Text>
          </View>
        </View>
      </View>

      <View style={{ ...styles.container, flex: 4 }}>
        <SafeAreaView style={{ ...styles.container,   }}>
          <ScrollView style={{ flex: 1, width: '100%', height: '100%'}}>

            {myContext.DeviceLoopValue}
            

            


            

            






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
                onPress={() => console.log(tempData)}
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
                onPress={() => console.log('yo')}
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

function HeaderComponent(){
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
}

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
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
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
        fontSize:wp(3.5) ,
        color: 'white',
              
        
    },
    status: {
        
        fontSize:15,
        
        color: 'white', 
             
    },
    risk: {
      
        fontSize: wp(3),
        
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
  
});