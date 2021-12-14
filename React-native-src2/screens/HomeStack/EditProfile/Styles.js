import { StyleSheet } from 'react-native';
import fonts from '../../../assets/fonts';
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle:{ 
    flex: 1,
    backgroundColor:colors.background,
    alignItems:'center' 
  },
  container:{
    backgroundColor:colors.background,
    width:'100%',
    height:'100%',
    paddingLeft:25,
    paddingRight:25,
  },
  logoImg: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    marginTop: 54
  },
  loginHeading:{
    color:colors.secondary,
    fontSize:29,
    textAlign:'center',
    fontWeight:'700',
    lineHeight:41,
    marginTop:24
  },
  loginDescription:{
    marginTop:16,
    fontSize:20,
    fontWeight:'400',
    lineHeight:30,
    textAlign:'center',
    color:colors.grey,
    // marginBottom:27
  },
  errorContainer:{
    flexDirection:'row',
    marginTop:20,
    alignItems:'center',
  },
  errorTxt:{
    color:colors.grey,
    fontSize:13,
    fontWeight:'400',
    lineHeight:18
  },
  errorImageStyle:{
    width:16,
    height:16,
    marginRight:10,
    resizeMode:'cover'
  },
  bottomContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:24,
    marginBottom:50
  },
  bottomText:{
    fontWeight:'400',
    fontSize:15,
    lineHeight:20,
    textAlign:'center',
    color:colors.grey
  },
  profileOuterContainer: {
    marginTop: 45,
    alignSelf: 'center',
    width: 85,
    height: 85,
    borderRadius:45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.buttonOrange,
    shadowOffset:{
    width: 0,
    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 42,
    resizeMode: 'cover',
    backgroundColor: colors.buttonOrange,
  },
  profileCamera: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },
  uploadTxt:{
    fontSize:15,
    fontFamily:fonts.Bold,
    textAlign:'center',
    marginTop:14,
    fontWeight:'700',
    marginBottom:5
  },
});
