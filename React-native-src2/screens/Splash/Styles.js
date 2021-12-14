import { StyleSheet } from 'react-native';
import colors from './../../utils/colors'
export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
 
  logoStyle:{
    width: "100%",
    height: '100%',
    resizeMode: 'stretch',
  },
  logoImg: {
    width: '80%',
    height: 60,
    resizeMode: 'contain',
    alignSelf:'center'
  },
});
