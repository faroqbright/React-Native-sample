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
  loginHeading:{
    color:colors.secondary,
    fontSize:29,
    textAlign:'center',
    fontWeight:'700',
    // lineHeight:41,
    // marginTop:64
  },
  loginDescription:{
    marginTop:16,
    fontSize:16,
    fontWeight:'400',
    lineHeight:22,
    textAlign:'center',
    color:colors.grey,
    marginBottom:27
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
    lineHeight:15
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
