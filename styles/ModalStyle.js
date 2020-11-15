import { StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({

  
  centrify:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
  button: {
    alignItems: "center",
    
    
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(4),
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
});

export { styles } 