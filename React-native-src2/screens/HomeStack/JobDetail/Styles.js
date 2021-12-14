import { StyleSheet } from 'react-native';
import fonts from '../../../assets/fonts';
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle:{ 
    flex: 1,
    backgroundColor:colors.background,
    alignItems:'center' 
  },
  container:{
    backgroundColor:colors.background,
    width:'100%',
    height:'100%',
    // overflow:'visible',
  },
  listView: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 21,
    backgroundColor: colors.background,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listHeading: {
    fontFamily: fonts.Medium,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
  },
  itemContainer: {
    backgroundColor: colors.white,
    padding: 14,
    paddingBottom:30,
    borderRadius: 8,
    marginTop: 25,
    shadowColor: "#000",
    marginHorizontal:15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    },
  textContainer: {
    width: '100%',
  },
  itemKm: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fonts.Regular,
    lineHeight: 22,
  },
  itemHeading: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.Bold,
    lineHeight: 22,
    width:'52%'
  },
  itemRightText: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fonts.Regular,
    lineHeight: 22,
  },
  itemPrice: {
    fontFamily: fonts.Bold,
    fontSize: 16,
    lineHeight: 22,
    position: 'absolute',
    right: 9
  },
  descriptionHeading:{
    color:colors.grey,
    fontWeight:'700',
    fontSize:14,
    marginTop:5
  },
  descTxt:{
    color:colors.grey,
    fontWeight:'400',
    fontSize:13,
    marginTop:5
  },
  paymentModalTxt:{
    fontWeight:'500',
    fontSize:16,
    marginTop:27
  },
  unSelectTxt: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: colors.buttonOrange
  },
  unselectBackground: {
    borderRadius: 14,
    width: '47%',
    height: 41,
    marginLeft: 10
  },
  unSelectInnerContainer: {
    height: 36,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.buttonOrange
  },
  selectTxt: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: colors.white
  },
  selectBackground: {
    borderRadius: 14,
    width: '47%',
    height: 41
  },
  selectInnerContainer: {
    height: 36,
    backgroundColor: colors.buttonOrange
  },
  bookNowModalHeading:{
    fontSize:24,
    color:colors.primary,
    fontFamily:fonts.Bold,
    fontWeight:'700',
    textAlign:'center',
    marginTop:10
  },
  dateHeading:{
    fontSize:12,
    fontFamily:fonts.Regular
  },
  dateTxt:{
    fontSize:14,
    fontFamily:fonts.Regular,
    color:colors.primary,
    fontWeight:'700',
    // backgroundColor:'red'
  },




  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalTransparency,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    width: "90%",
    margin: 16,
    flexDirection: 'column',
    elevation: 10,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingLeft: 25,
    padding: 20,
    alignItems: 'center'
  },
  crossImg: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: 'grey',
  },
  bellIcon: {
    width: 64,
    height: 64,
    marginTop: 8,
    resizeMode: 'contain',
  },
  cancelModalHeading: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fonts.Bold,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30
  },
  ratingModalHeading: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 30,
    fontFamily: fonts.SemiBold,
    color: colors.mRatingHeading,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 12,
  },
  ratingSubHeading: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.primary,
    fontFamily: fonts.Bold,
    marginTop: 14
  },
  noteHeading: {
    marginTop: 50,
    fontFamily: fonts.Bold,
    fontSize: 18,
    fontWeight: '700'
  },
  descText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 13,
    fontFamily: fonts.Regular,
    textAlign: 'center',
    marginBottom: 60
  },
  selectedMain: {
    width: '41%',
    borderRadius: 5,
    height: 45
  },
  selectedInner: {
    height: 40,
    borderRadius: 5
  },
  selectedTxt: {
    fontSize: 14,
    fontFamily: fonts.Medium,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.white
  },
  unSelectedInner: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.white
  },
  unSelectedMain: {
    width: '41%',
    borderRadius: 5,
    height: 45
  },
  unSelectedTxt: {
    fontSize: 14,
    fontFamily: fonts.Medium,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.secondary
  }





});
