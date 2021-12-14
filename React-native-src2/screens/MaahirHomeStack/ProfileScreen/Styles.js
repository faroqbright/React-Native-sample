import { StyleSheet, Dimensions } from 'react-native';
import colors from './../../../utils/colors'
import Fonts from './../../../assets/fonts/'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  safeStyle: {
    // flex: 1,
    width: '100%',
    height: '100%',
    minHeight: height,
    backgroundColor: colors.background
  },
  profileImage: {
    resizeMode: 'cover',
    width: 95,
    height: 95,
    borderRadius: 50,
    alignSelf: 'center'
  },
  personName: {
    fontSize: 19,
    color: colors.white,
    marginTop: 3,
    fontFamily: Fonts.Bold,
    fontWeight: '700',
    textAlign: 'center',
    width: '100%'
  },
  phoneHeading: {
    marginTop: 5,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.white
  },
  phoneText: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    marginTop: 3,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: 22
  },
  experienceContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 10,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -40,
    backgroundColor: colors.white,
    justifyContent: 'space-between'
  },
  expirenceFirstContainer: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  expirenceSecondContainer: {
    width: '47%',
    alignItems: 'flex-end'
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
    // marginRight: 5,
    fontSize: 12,
  },
  expericenceTxt: {
    color: colors.primary,
    fontSize: 17,
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
    width: '100%',
    height: '100%',
    marginBottom: 20
  },
  addressViewContainer: {
    padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 1,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10
  },
  listHeading: {
    fontFamily: Fonts.Medium,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 15
  },
  addressStyle: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 15
  },
  itemContainer: {
    width: '48%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 8,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10
  },
  itemLeftIconCont: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.buttonOrange,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  textContainer: {
    marginLeft: 10,
    alignItems: 'center',
    width: '80%',
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
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 22,
    position: 'absolute',
    right: 9
  },
  bottomBtnContainer: {
    backgroundColor: colors.background,
    width: '100%',
    position: 'absolute',
    bottom: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
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
    fontFamily: Fonts.Bold,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30
  },
  ratingModalHeading: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    fontFamily: Fonts.SemiBold,
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
    fontFamily: Fonts.Bold,
    marginTop: 14
  },
  noteHeading: {
    marginTop: 50,
    fontFamily: Fonts.Bold,
    fontSize: 18,
    fontWeight: '700'
  },
  descText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 13,
    fontFamily: Fonts.Regular,
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
    fontFamily: Fonts.Medium,
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
    fontFamily: Fonts.Medium,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.secondary
  }


});
