import {StyleSheet} from 'react-native';
import Preference from 'react-native-preference';
const lang = Preference.get('language');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '500',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  headings: {
    marginTop: 50,
    marginLeft: 50,
    width: '70%',
  },
  titleFont: {
    fontSize: 20,
    marginRight: 20,
    marginLeft: 20,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  titleView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  icons: {width: 25, height: 25, resizeMode: 'contain'},
  profileImage: {
    width: 105,
    height: 105,
    borderRadius: 10,
    borderWidth:1,
    borderColor:"#EE963D",
    resizeMode:"contain"
  },
});
