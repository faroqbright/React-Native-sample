import {StyleSheet, Dimensions, Platform} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal:10
  },
  searchIcon: {
    width: 50,
    height: 50,
    // resizeMode:"contain"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom:20
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  backgroundImg: {
    // flex: 1,
    width: windowWidth,
    height: windowHeight - 20,
    paddingHorizontal: 20,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 10,
  },
  linearGradientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  linearGradientHeaderText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
});
