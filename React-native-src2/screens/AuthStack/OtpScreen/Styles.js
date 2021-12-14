import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
import Fonts from './../../../assets/fonts/'
export const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center'
  },
  container: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    paddingLeft: 25,
    paddingRight: 25,
  },
  loginHeading: {
    color: colors.secondary,
    fontSize: 29,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 41,
    // marginTop: 64
  },
  loginDescription: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    textAlign: 'center',
    color: colors.grey,
    marginBottom: 27
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 50
  },
  bottomText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
    color: colors.grey
  },
  otpContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 25,
    paddingLeft: 5,
    paddingRight: 5,
    // backgroundColor:'red'
  },
  modalImage: {
    width: 37,
    height: 37,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  modalHeading: {
    marginTop: 20,
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.Bold
  },
  modalDescription: {
    marginTop: 15,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.Regular
  },
  modalInnerCont: {
    width: "100%", 
    resizeMode:'stretch',
    elevation: 10,
    borderRadius: 8,
    paddingTop:35,
    paddingBottom:35
    // padding: 35,
    // paddingLeft: 5,
    // paddingRight: 5,
  },
  modalContainer: {
    flex: 1,
    // width:'90%',
    // height:'100%',
    backgroundColor: '#000000AA',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf:'center'
    paddingLeft:20,
    paddingRight:20
  },
  backBtn:{
    width:25,
    height:25,
    resizeMode:'contain',
    tintColor:'black',
    position:'absolute',
    // top:58
  }
});
