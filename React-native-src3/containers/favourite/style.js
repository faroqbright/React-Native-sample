import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  header: {
    padding: 10,
    flexDirection:"row",
    alignItems:"center",
  },
  backIcon:{
    width:20,
    height:20,
    marginLeft:20,
    marginRight:20,
    resizeMode:"contain",
    transform:lang == 'en' ?[{rotate:'180deg'}] : [{rotate:'0deg'}]
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  ImageBackground: {
    height: windowHeight,
    width: windowWidth,
  },
  centeredDiv:{
    height:windowHeight-85,
    justifyContent:"center",
    alignItems:"center",
  }
});
