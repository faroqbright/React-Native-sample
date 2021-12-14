import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
const lang = Preference.get('language');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 40,
    // padding: 10,
    flexDirection:"row",
    alignItems:"center",
    marginTop:40
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
    position:"absolute",
    height: windowHeight,
    width: windowWidth,
  },
  button: {
    marginTop: 200,
    width: '60%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FE921A',
    // marginHorizontal:100
  },
  buttontext: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'white',
    
  },
  profileImage: {
    width: 105,
    height: 105,
    borderRadius: 10,
    borderWidth:1,
    borderColor:"#EE963D",
    resizeMode:"contain"
  },
  redeemHistoryView:{
    height:50,
    width:"100%",
    borderBottomWidth:0.7,
    borderColor:"gray",
    alignItems:"center",
    paddingHorizontal:10,
    flexDirection:"row",
    justifyContent:"space-between"
  }
});
