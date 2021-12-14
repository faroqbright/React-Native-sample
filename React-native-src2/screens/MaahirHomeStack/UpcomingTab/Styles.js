import { StyleSheet } from 'react-native';
import Fonts from './../../../assets/fonts/'
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle:{ 
    flex: 1,
    // alignItems:'center' ,
    backgroundColor:colors.background
  },
  profileImage: {
    resizeMode: 'cover',
    width: 95,
    height: 95,
    borderRadius:50,
    alignSelf:'center',
    marginTop:-30
  },
  personName: {
    fontSize: 19,
    color: colors.white,
    marginTop: 8,
    fontFamily: Fonts.Bold,
    fontWeight:'700',
    textAlign:'center'
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
    fontFamily: Fonts.Medium,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 11
  },
  textContainer: {
    width: '50%',
  },
  itemKm: {
    color: colors.grey,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts.Regular,
    lineHeight: 22,
    width:'47%',
    textAlign:'right'
  },
  itemHeading: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Fonts.Bold,
    lineHeight: 22,
    width:'52%'
  },
  itemRightText: {
    // color: colors.secondary,
    // fontSize: 12,
    // fontWeight: '700',
    // fontFamily: Fonts.Bold,
    // lineHeight: 22,
    // textAlign:'center',
    // width:'100%'
    color: colors.grey,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Fonts.Regular,
    lineHeight: 22,
  },
  itemPrice: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 22,
    position: 'absolute',
    right: 9
  },
});
