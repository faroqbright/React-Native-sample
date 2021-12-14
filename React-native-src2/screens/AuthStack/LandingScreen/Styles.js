import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  container: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    // alignItems:'center',
    marginBottom:80
  },
  logoImg: {
    width: '100%',
    height: 45,
    resizeMode: 'contain',
    marginTop: 55
  },
  landerOneImg: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 35,
    alignSelf: 'center'
  },
  landerTwoImg: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    alignSelf: 'center'
  },
  headingOne: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 46,
    marginTop: 26
  },
  headingTwo: {
    color: colors.secondary,
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 26,
    marginTop: 0,
    textAlign: 'center'
  },
  headingOneDescription: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
    },
  headingTwoDescription: {
    color: colors.grey,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    marginTop: 16,
    textAlign: 'center'
  },
  forwardBtnContainer: {
    overflow: 'hidden',
    width: 53,
    height: 55,
    borderRadius: 14,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
    // marginBottom: 33,
  },
  shadowContainer: {
    width: 53,
    height: 51,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forwardImg: {
    width: 13,
    height: 23,
    resizeMode: 'contain',
  },
  personContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 26,
    justifyContent: 'space-around',
    marginBottom: 30
  },
  personComponentStyle: {
    alignItems: "center",
    justifyContent: 'center',
    width: 110,
    height: 110,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  personImg: {
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  personText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    color: colors.secondary,
    marginTop: 10
  },
  checkImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: 11,
    top: 11
  }
});
