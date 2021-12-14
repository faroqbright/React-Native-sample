import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
import Fonts from './../../../assets/fonts/'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import fonts from './../../../assets/fonts/';
export const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: colors.background
  },
  profileImage: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderRadius:55,
    // marginTop:6,
    alignSelf: 'center',
  },
  personName: {
    fontSize: 20,
    color: colors.white,
    marginTop:5,
    fontFamily: Fonts.SemiBold,
    textAlign: 'center'
  },
  phoneHeading: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: Colors.white
  },
  phoneText: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 22
  },
  experienceContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 10,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -40,
    backgroundColor: colors.white,
  },
  expirenceFirstContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  expirenceSecondContainer: {
    width: '40%',
    // alignItems: 'flex-end'
    alignItems:'center',
    // backgroundColor:'red'
  },
  experienceIcon: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
    marginRight: 11
  },
  expericenceHeading: {
    color: colors.grey,
    lineHeight: 22,
    fontFamily: Fonts.Regular,
    marginRight: 5
  },
  expericenceTxt: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: Fonts.SemiBold
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starImg: {
    width: 19,
    height: 19,
    resizeMode: 'contain'
  },
  ratingTxt: {
    lineHeight: 18,
    fontSize: 13,
    color: colors.buttonOrange,
    fontFamily: Fonts.SemiBold,
    marginLeft: 9,
    marginTop: 2
  },
  listView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 21,
  },
  listHeading: {
    fontFamily: Fonts.Medium,
    fontSize: 18,
    lineHeight: 22,
    color: colors.primary,
    marginBottom: 15
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 9,
    alignItems: 'center',

  },
  itemLeftIconCont: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.buttonOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius:8
  },
  textContainer: {
    marginLeft: 16,
    width: '45%',
  },
  itemDate: {
    color: colors.grey,
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 22
  },
  itemHeading: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    lineHeight: 22
  },
  itemPrice: {
    width:'25%',
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 22,
    position: 'absolute',
    right: 9,
    textAlign:'center'
  },
  bottomBtnContainer: {
    backgroundColor: colors.background,
    width: '100%',
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  modalOverlay:{ 
    flex: 1, 
    backgroundColor: colors.modalTransparency, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  modalContainer:{
    width: "90%",
    margin: 16,
    flexDirection: 'column',
    elevation: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 25,
    alignItems:'center'

  },
  bookNowModalHeading:{
    fontSize:18,
    color:colors.primary,
    fontFamily:Fonts.Bold,
    fontWeight:'700',
    textAlign:'center',
    marginTop:10
  },
  dateHeading:{
    fontSize:12,
    fontFamily:Fonts.Regular
  },
  dateTxt:{
    fontSize:14,
    fontFamily:Fonts.Regular,
    color:colors.primary,
    fontWeight:'700',
    // backgroundColor:'red'
  },
  detailTxt:{
    fontWeight:'700',
    fontSize:14,
    fontFamily:fonts.Regular,
    color:colors.primary,
    marginTop:26
  },
  alertDesText:{
    fontFamily:fonts.Regular,
    fontSize:16,
    fontWeight:'400',
    color:colors.primary,
    textAlign:'center',
    marginTop:8
  }
});
