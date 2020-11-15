import React, { useRef, useState, useEffect, Component } from "react";
import { Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { VictoryLegend, VictoryPie, VictoryLabel, VictoryContainer } from "victory-native";
//import Constants from 'expo-constants';
//import {} from 'react';
//import { useFonts } from '@use-expo/font';
//import * as Progress from 'react-native-progress';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();
const bordWid = 0;
const pad=0;

import Summary from './Summary.js'

//import { Icon } from 'react-native-elements'
//import Speedometer from 'react-native-speedometer-chart';
//import Pie from 'react-native-pie';

  

  function Remediation(){
    return(
      <View> <Text> hi </Text> </View>
    )
  }

  function Resources(){
    return(
      <View> <Text> hi </Text> </View>
    )
  }



  function testScreen({navigation}) {

 


  
  return (

    <View style={{ ...styles.centrify, paddingTop: 20, flex: 1, backgroundColor: '#18222E' }}>
      <View style = {{ ...styles.centrify, flex: 2, borderWidth: bordWid, borderColor: 'white', paddingLeft: 20, paddingRight: 20,}}>
        <View style = {{ ...styles.centrify, flex: 1, flexDirection: 'row', backgroundColor: '#00ACEB', padding: 10, borderRadius: 10, }}>
          
          <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
              <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white',  flexDirection: 'row' }}>
                <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  
                </View>
                <View style = {{ ...styles.centrify, alignItems: 'flex-start', flex: 5, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  <Text style = {{ color: 'white', fontSize: 15 }}> AUBLRSESMANISH </Text>
                </View>
              </View>
              <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white',  flexDirection: 'row' }}>
                <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  
                </View>
                <View style = {{ ...styles.centrify, alignItems: 'flex-start', flex: 5, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  <Text style = {{ color: 'white', fontSize: 15 }}> Splunk </Text>
                </View>
              </View>
          </View>

          <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
              <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white',  flexDirection: 'row' }}>
                <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  
                </View>
                <View style = {{ ...styles.centrify, alignItems: 'flex-start', flex: 5, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  <Text style = {{ color: 'white', fontSize: 15 }}> lite_user1 </Text>
                </View>
              </View>
              <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white',  flexDirection: 'row' }}>
                <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  
                </View>
                <View style = {{ ...styles.centrify, alignItems: 'flex-start', flex: 5, borderWidth: bordWid, padding: pad, borderColor: 'white'}}>
                  <Text style = {{ color: 'white', fontSize: 15 }}> Time </Text>
                </View>
              </View>
          </View>

          

        </View>
      </View>

      <View style = {{ ...styles.centrify, flex: 1, borderWidth: bordWid, borderColor: 'white', paddingLeft: 20, paddingRight: 20,}}>
        
      </View>

      <View style = {{ ...styles.centrify, flex: 10, borderWidth: bordWid, borderColor: 'white', paddingLeft: 20, paddingRight: 20,}}>

      </View>




    </View>
  );
}



function HeaderComponent(){
  return(
    
    <Text style= {{ fontSize: windowHeight/30, color:'#FFFFFF' }}>White<Text style= {{ fontSize: windowHeight/30, color:'#FE0000' }}>HaX</Text></Text>
    
  )
}
export default function test({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Home" component={testScreen} options={{
          
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

  centrify: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },


});

