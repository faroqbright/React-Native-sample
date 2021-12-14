import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImg: {
    padding: 20,
    // flex: 1,
    height: windowHeight - 20,
    width: windowWidth,
  },
  userDetail: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  userDetailTextView: {
    marginRight: lang == 'en' ? 0 : 20,
    marginLeft: lang == 'en' ? 0 : 20,
    marginTop:5
  },
  nameTitle: {
    fontSize: 20,
    fontWeight: '700',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
    width:"70%"
  },
  playImageView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  playImage: {height: 20, width: 20},
  giftBox: {
    width: '100%',
    height: 175,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EE963D',
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF70',
    justifyContent: 'center',
  },
  giftBoxImgView: {flexDirection: 'row', alignItems: 'center'},
  giftBoxImg: {height: 50, width: 50},
  giftBoxText: {fontSize: 22, marginLeft: 20, marginTop: 5},
  linearGradient: {
    width: '35%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  titleText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
});
