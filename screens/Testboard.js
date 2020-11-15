import * as React from 'react';
import { Text, View } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions,  TouchableWithoutFeedback, Image } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './Dashboard.js';
import Devices from './Devices.js';
import Remediation from './Remediation.js';
import Details from './DetailsPage.js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;


const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function HeaderComponent(){
  return(
    
    <Text style= {{ fontSize: windowHeight/30, color:'#FFFFFF' }}>White<Text style= {{ fontSize: windowHeight/30, color:'#FE0000' }}>HaX</Text></Text>
    
  )
}
function MyTabs() {
  return (
    
      <Tab.Navigator
        
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#00ACEB',
          //tabStyle: { width: 100 },
          style: { 
            backgroundColor: '#18222E' 
          },
          indicatorStyle: {
            backgroundColor: '#18222E',
          },
          useNativeDriver: true,
          showIcon: true,
        }}
      >
        <Tab.Screen 
          name="Status" 
          component={Home} 
          options = {{ 
            tabBarIcon: ({focused}) => {
              if (focused == true){
                return(
                  <Image
                style={{ width: wp(6), height: hp(4),  }}
                source={require('../assets/android/4x/home_menu_activexxxhdpi.png')}
              />
                )
              }
              else {
                return(
                  <Image
                style={{ width: wp(6), height: hp(4),  }}
                source={require('../assets/android/4x/home_menu_normalxxxhdpi.png')}
              />
                )
              }
            }
              
          }}
        />
        <Tab.Screen 
          name="Details" 
          component={Details}
          options = {{ 
            tabBarIcon: ({focused}) => {
              if (focused == true){
                return(
                  <Image
                style={{ width: wp(6), height: hp(4),  }}
                source={require('../assets/android/4x/details_menu_activexxxhdpi.png')}
              />
                )
              }
              else {
                return(
                  <Image
                style={{ width: wp(6), height: hp(4),  }}
                source={require('../assets/android/4x/details_menu_normalxxxhdpi.png')}
              />
                )
              }
            }
          }} 
        />
        <Tab.Screen 
          name="Remediate" 
          component={Remediation} 
          options = {{ 
            tabBarIcon: ({focused}) => {
              if (focused == true){
                return(
                  <Image
                style={{ width: wp(6), height: hp(4),  }}
                source={require('../assets/android/4x/remediation_menu_menu_activexxxhdpi.png')}
              />
                )
              }
              else {
                return(
                  <Image
                style={{ width: wp(6), height: hp(4),  }}
                source={require('../assets/android/4x/remediation_menu_normalxxxhdpi.png')}
              />
                )
              }
            }
          }}
        />
        
        
      </Tab.Navigator>
    
  );
}

export default function Testboard({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Home" component={MyTabs} options={{
          
          headerTitleStyle: {
            fontSize: windowWidth/10,

            color: 'red',
          },
          headerStyle: {
            backgroundColor: '#1C2B3A',
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

