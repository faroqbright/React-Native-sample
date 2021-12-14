import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
import Fonts from './../../../assets/fonts/'
export const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background
  },
  headingStyle: {
    fontSize: 24,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    color: colors.white
  },
  phoneHeading: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    color: colors.white
  },
  phoneText: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: colors.white,
  },
  jobHeading: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    color: colors.white,
  },
  listView: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 21,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.background
  },
 
  listHeading: {
    fontFamily: Fonts.Medium,
    fontWeight:'500',
    fontSize: 18,
    lineHeight: 22,
    color: colors.primary,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius:8,
    alignItems: 'center',
    marginTop:11
  },
  textContainer: {
    width: '50%',
  },
  itemKm: {
    color: colors.grey,
    fontSize: 12,
    fontWeight:'400',
    fontFamily: Fonts.Regular,
    lineHeight: 22
  },
  itemHeading: {
    color: colors.primary,
    fontSize: 14,
    fontWeight:'700',
    fontFamily: Fonts.Bold,
    lineHeight: 22
  },
  itemPrice: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 22,
    position: 'absolute',
    right: 9
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
    paddingLeft: 25,
    padding: 20,
    alignItems:'center'
  },
  crossImg:{
    width:22,
    height:22,
    resizeMode:'contain',
    tintColor:'grey',
  },
  bellIcon:{
    width:64,
    height:64,
    marginTop:8,
    resizeMode:'contain',
  },
  cancelModalHeading:{
    fontWeight:'700',
    fontSize:24,
    lineHeight:30,
    fontFamily:Fonts.Bold,
    textAlign:'center',
    paddingLeft:15,
    paddingRight:15,
    marginTop:30
  },
  ratingModalHeading:{
    fontWeight:'700',
    fontSize:20,
    lineHeight:30,
    fontFamily:Fonts.SemiBold,
    color:colors.mRatingHeading,
    textAlign:'center',
    paddingLeft:15,
    paddingRight:15,
    marginTop:12,
  },
  ratingSubHeading:{
    fontSize:18,
    fontWeight:'700',
    textAlign:'center',
    color:colors.primary,
    fontFamily:Fonts.Bold,
    marginTop:14
  },
  noteHeading:{
    marginTop:50,
    fontFamily:Fonts.Bold,
    fontSize:18,
    fontWeight:'700'
  },
  descText:{
    fontWeight:'400',
    fontSize:18,
    lineHeight:24,
    marginTop:13,
    fontFamily:Fonts.Regular,
    textAlign:'center',
    marginBottom:60
  }
});
