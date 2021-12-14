import {StyleSheet, Dimensions,Platform} from 'react-native';
import Preference from 'react-native-preference';
const lang = Preference.get('language');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  mainView: {
    // height: windowHeight / 2,
    width: windowWidth - 80,
    backgroundColor: '#FFFFFF50',
    borderWidth: 0.3,
    borderColor: '#FFE5B9',
    borderRadius: 5,
    padding: 40,
    justifyContent: 'center',
    alignSelf:"center"
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    alignSelf: 'center',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EE963D',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#D72119',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl'
  },
  otpView: {
    marginVertical: 20,
  },
  backButton:{
    // position:"absolute",
    padding:10,
    // top:40,
    // left:10,
    marginTop: Platform.OS == 'ios'? 40:20
  }
});
