import {StyleSheet,Dimensions} from 'react-native';
import Preference from 'react-native-preference';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRectangle: {
    position: 'absolute',
    right: -310,
    top: -50,
    transform: [{rotate: '80deg'}],
    opacity: 0.7,
    tintColor: '#FF951A',
  },
  bottomRectangle: {
    position: 'absolute',
    bottom: -100,
    left: -300,
    opacity: 1,
    transform: [{rotate: '300deg'}],
  },
  splashIcon: {
    marginTop: 40,
  },
  mainView: {
    // height: windowHeight / 2,
    width: windowWidth - 80,
    backgroundColor: '#FFFFFF50',
    borderWidth: 0.3,
    borderColor: '#FFE5B9',
    borderRadius: 5,
    padding:40
  },
  titleText:{
    fontSize:22,
    fontWeight:"600",
    color:"white",
    alignSelf:"center",
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
    // marginTop:40
  },
  textInputTitle:{
    fontSize:18,
    color:"white",
    marginTop:40,
    marginBottom:20,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
  },
  textInput:{
    width:"100%",
    height:50,
    borderWidth:1,
    borderColor:"white",
    borderRadius:5,
    paddingHorizontal:20,
    marginBottom:20,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
  },
  button:{
    width:'100%',
    height:50,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5,
    borderWidth:1,
    borderColor:'#EE963D'
  },
  buttonText:{
    fontSize:18,
    color:"#D72119",
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
  },
  bottomText:{
    color:"white",
    textAlign:"center",
    marginTop:40,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
  }
});
