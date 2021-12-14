import { StyleSheet } from 'react-native';
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
    height: 35,
    resizeMode: 'contain',
    // marginTop: 54
  },
  loginHeading:{
    color:colors.secondary,
    fontSize:29,
    textAlign:'center',
    fontWeight:'700',
    lineHeight:41,
    marginTop:24,
    marginBottom:27
  },
  loginDescription:{
    marginTop:16,
    fontSize:20,
    fontWeight:'400',
    lineHeight:30,
    textAlign:'center',
    color:colors.grey,
    marginBottom:27
  },
  forgotText:{
    marginTop:16,
    fontWeight:'400',
    lineHeight:30,
    textAlign:'center',
    color:colors.grey,
    alignSelf:'flex-end'
  },
  errorContainer:{
    flexDirection:'row',
    marginTop:14,
    alignItems:'center',
  },
  errorTxt:{
    color:colors.alertText,
    fontSize:12,
    fontWeight:'400',
    lineHeight:15,
    width:'88%'
  },
  errorImageStyle:{
    width:13,
    height:13,
    marginRight:10,
    resizeMode:'contain'
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
  backBtn:{
    width:25,
    height:25,
    resizeMode:'contain',
    tintColor:'black',
    position:'absolute',
    // top:58
  }
});
