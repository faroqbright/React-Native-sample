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
    // padding: 20,
    flex: 1,
    height: windowHeight + 20,
    width: windowWidth,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    margin: 20,
  },
  headerText: {
    fontSize: 18,
    marginRight: 10,
    marginLeft: 10,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  headerImg: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    transform: lang == 'en' ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#FFFFFF70',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchIcon: {
    width: '20%',
    height: 55,
    resizeMode: 'contain',
    marginTop: 5,
  },
  searchBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
  },
  backButton:{
    position:"absolute",
    padding:10,
    top:40,
    left:10
  }
});
