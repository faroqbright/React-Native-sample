import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bacIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
    transform: lang == 'en' ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bottomIcons: {width: 50, height: 50, resizeMode: 'contain', marginTop: 20,borderRadius:10},
  bottomIconsView: {
    position: 'absolute',
    bottom: 80,
    right: lang == 'en' ? 20 : null,
    left: lang == 'en' ? null : 20,
  },
  bottomTextView: {
    position: 'absolute',
    bottom: 80,
    right: lang == 'en' ? null : 20,
    left: lang == 'en' ? 20 : null,
  },
  Text: {color: 'white', writingDirection: lang == 'en' ? 'ltr' : 'rtl'},
  detailBar: {
    width: windowWidth / 3 + 30,
    marginLeft: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor:"black"
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },
  modalMainView: {
    width: '80%',
    height: 300,
    // backgroundColor: '#FFFFFF',
    // position: 'absolute',
    marginBottom: 100,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  madal2: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoterInfoView:{
    width:"80%",
    borderRadius:10,
    backgroundColor:"white",
    padding:20,
    alignItems:"center"
  },
  promoterInfoImage:{
    width:"40%",
    height:100,
    borderRadius:10,
  },
  closeButton:{
    position:"absolute",left:-5,top:-5
  }
});
