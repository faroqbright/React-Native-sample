import { StyleSheet, Dimensions, Platform } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
const lang = Preference.get('language');
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
  topRectangle: {
    position: 'absolute',
    right: -310,
    top: -50,
    transform: [{ rotate: '80deg' }],
    opacity: 0.7,
    tintColor: '#FF951A',
  },
  bottomRectangle: {
    position: 'absolute',
    bottom: -100,
    left: -300,
    opacity: 1,
    transform: [{ rotate: '300deg' }],
  },
  splashIcon: {
    marginTop: 40,
  },
  mainView: {
    // height: windowHeight / 1.5,
    width: windowWidth - 80,
    backgroundColor: '#FFFFFF50',
    borderWidth: 0.3,
    borderColor: '#FFE5B9',
    borderRadius: 5,
    padding: 30,
    height:windowHeight/1.2
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
    // marginTop:40
  },
  textInputTitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
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
  },
  buttonText: {
    fontSize: 18,
    color: '#D72119',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  bottomText: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  calender: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  dob: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 20,
  },
  flatlistView: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
  },
  boxView: {
    // width: '28.3%',
    minHeight: 30,
    margin: 5,
    backgroundColor: '#FFFFFF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    paddingHorizontal: 10
  },
  threeColumView: { marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap' },
  modalMainView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000020',
  },
  datePickerView: {
    width: '80%',
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
  },
  backButton:{
    // position:"absolute",
    padding:10,
    // top:40,
    // left:10,
    // alignSelf:"flex-start",
    marginTop: Platform.OS == 'ios'? 40:20
  }
});
