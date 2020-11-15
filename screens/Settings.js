import React, { useState, useEffect } from 'react';
import {  Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
//import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Switch } from 'react-native-switch';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();

import {NativeModules} from 'react-native';
//var TestModule = NativeModules.TestModule;
const bordWid = 0;

function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 30 }}
      source={require('../assets/images/logo.png')}
    />
  );
}
function SettingsScreen({navigation}) {

  const [jsonText, setJsonText] = useState('n/a')

  function setResultValue() {
    TestModule.setString();
    
  }
  function getResultValue() {
    TestModule.getString(  (info) => {console.log(info)
      setJsonText(info)

    } );
  }

  const [isEnabled1, setIsEnabled1] = useState(true);
const [isEnabled2, setIsEnabled2] = useState(false);

const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  return (
<View style={{ ...styles.centrify, flex: 1, backgroundColor: '#18222E' }}>      
       {/*<TouchableOpacity
                onPress = {setResultValue}
              >
                <Text> setResultValue  </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress = {getResultValue}
              >
                <Text> getResultValue </Text>

                
              </TouchableOpacity>
              <Text> {jsonText} </Text>*/}

      <View style={{ ...styles.centrify, flex: 1,  }}>
        <View style={{ ...styles.centrify, flex: 1,  }}>
          <Text style = {{ fontSize: 25, color: 'white'}}>Settings</Text>
        </View>
        <View style={{ ...styles.centrify, flex: 6,  paddingLeft: 20, paddingRight: 20,}}>
          <View style={{ ...styles.centrify, flex: 1, borderColor: '#00ACEB', borderWidth: bordWid, flexDirection: 'row', borderBottomWidth: 1,}}>
            <View style = {{ ...styles.centrify, alignItems: 'flex-start',flex: 1, borderColor: 'white', borderWidth: bordWid,  }}> 
              <Text style= {{ fontSize: 20, color: 'white', textAlign: 'left'}}>Notification Options</Text>
            </View>
            <View style = {{ ...styles.centrify, flex: 1, borderColor: 'white', borderWidth: bordWid,  }}> 
              <View style = {{ borderWidth: 1, borderColor: '#00ACEB', borderRadius: 30}} >
              <Switch
                value={isEnabled1}
                onValueChange={toggleSwitch1}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={30}
                barHeight={30}
                circleBorderWidth={0.5}
                backgroundActive={'#00ACEB'}
                backgroundInactive={'#1C2B3A'}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
                changeValueImmediately={true}
                //renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                switchBorderColor={'green'}
              />
              </View>
            </View>


          </View>
          <View style={{ ...styles.centrify, flex: 1, borderColor: '#00ACEB', borderWidth: bordWid, flexDirection: 'row', borderBottomWidth: 1,}}>
            <View style = {{ ...styles.centrify, alignItems: 'flex-start',flex: 1, borderColor: 'white', borderWidth: bordWid,  }}> 
              <Text style= {{ fontSize: 20, color: 'white', textAlign: 'left'}}>Schedule Run</Text>
            </View>
            <View style = {{ ...styles.centrify, flex: 1, borderColor: 'white', borderWidth: bordWid,  }}> 

            </View>


          </View>
          <View style={{ ...styles.centrify, flex: 1, borderColor: '#00ACEB', borderWidth: bordWid, flexDirection: 'row', borderBottomWidth: 1,}}>
            <View style = {{ ...styles.centrify, alignItems: 'flex-start',flex: 1, borderColor: 'white', borderWidth: bordWid,  }}> 
              <Text style= {{ fontSize: 20, color: 'white', textAlign: 'left'}}>Auto-Remediation</Text>
            </View>
            <View style = {{ ...styles.centrify, flex: 1, borderColor: 'white', borderWidth: bordWid,  }}> 
                <View style = {{ borderWidth: 1, borderColor: '#00ACEB', borderRadius: 30}} >
                            <Switch
                value={isEnabled2}
                onValueChange={toggleSwitch2}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={30}
                barHeight={30}
                circleBorderWidth={0.5}
                backgroundActive={'#00ACEB'}
                backgroundInactive={'#1C2B3A'}
                circleActiveColor={'white'}
                circleInActiveColor={'white'}
                changeValueImmediately={true}
                //renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
              </View>
            </View>


          </View>
          <View style={{ ...styles.centrify, flex: 3,  }}>
          
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
}const pad=0;
export default function Settings({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Home" component={SettingsScreen} options={{
          
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

  centrify: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },


});

