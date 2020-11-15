import React, { useRef, useState, useEffect, Component, useContext } from "react";
import {  Modal, Button, View, Text, Image, TouchableOpacity, TouchableHighlight,  } from 'react-native';
import { styles } from '../styles/ModalStyle.js'
import AppContext from "./AppContext";


export default function modalTest() {
  const myContext = useContext(AppContext);
  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={myContext.modalVisibleGlobalValue}

          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 2, backgroundColor: '#1C2B3A' }} >
                <Text style={styles.modalText}>Security Checkl</Text>
                <Text style= {{ color: 'red'}}></Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: '#1C2B3A' }} >
                {/*<Progress.Bar
                                  style={styles.progressBar}
                                  progress={runValue}
                                />*/}
                
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: '#1C2B3A',  }} >
                <TouchableHighlight
                  style={ { ...styles.openButton, backgroundColor: "#00ACEB", }}
                  onPress={() => {
                    //findGeneralScore();
                    
                    myContext.setModalVisibleGlobal(false)

                  }}
                  
                >
                  <Text style={styles.textStyle}>     Close     </Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>
  )
}






