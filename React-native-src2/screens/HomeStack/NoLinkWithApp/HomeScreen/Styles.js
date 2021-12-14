import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle:{ 
    flex: 1,
    alignItems:'center' 
  },
  logoStyle:{
    width: 180,
    height: 125,
    resizeMode: 'contain',
    marginTop:40,
    marginLeft:10
  },
  loginTxtStyle:{
    fontSize:18,
    marginTop:60,
    textAlign:'center',
  },
  independentTxtStyle:{
    marginTop:100,
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'red',
    padding:30
  }
});
