import {StyleSheet} from 'react-native';
import Preference from 'react-native-preference';
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 20,
    marginLeft:20
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
    marginRight: lang == 'en' ? null : -5,
    marginLeft: lang == 'en' ? -5 : null,
    transform: lang == 'en' ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
  },
  forwardImg: {
    tintColor: 'gray',
    width: 12,
    height: 12,
    resizeMode: 'contain',
    transform: lang == 'en' ? [{rotate: '0deg'}] : [{rotate: '180deg'}],
  },
  barDesc: {
    fontSize: 10,
    marginLeft: 10,
    marginRight:10,
    color: 'gray',
  },
  line: {
    height: 0.5,
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'gray',
  },
  scroll: {flexGrow: 1},
  title: {
    fontSize: 12,
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
    color: 'gray',
  },
  bottomTitle: {
    fontSize: 12,
    color: 'gray',
    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    margin: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  radioBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  radio: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'gray',
  },
  modalOk: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    height: 30,
    width: 30,
    backgroundColor: "white",
    borderRadius: 15,
    left: -8,
    top: -8,
    justifyContent: "center",
    alignItems: "center"
  }
});
