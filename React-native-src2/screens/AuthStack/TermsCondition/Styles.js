import { StyleSheet } from 'react-native';
import fonts from '../../../assets/fonts';
import colors from '../../../utils/colors'
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
  topText:{
    fontSize:11,
    marginTop:30,
    fontWeight:'700',
    textAlign:'center',
    paddingLeft:15,
    paddingRight:15,
    marginBottom:10
  },
  text1:{
    fontSize: 16, color: "black",textAlign: "center", margin: 20, marginTop: 30 
  },
  text2:{
    fontSize: 16, color: "black", margin: 20, textAlign: "center", marginTop: 10, fontWeight: "bold" }
});
