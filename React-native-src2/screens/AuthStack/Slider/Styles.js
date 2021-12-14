import { StyleSheet, Dimensions } from 'react-native';
import colors from './../../../utils/colors'
let deviceHeight = Math.round(Dimensions.get('window').height)
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: deviceHeight,
    resizeMode: 'stretch'
  },
  paginationContainer: {
    position: "absolute",
    width: "100%",
    bottom: 10
  },
  dotStyle: {
    width: 20,
    height: 4,
    backgroundColor: '#FACA43'
  },
  dotInactiveStyle: {
    width: 10,
    height: 10,
    borderRadius: 8,
    marginHorizontal: -7,
    backgroundColor: 'white'
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30
  },
  buttonStyle: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center'
  },
  buttonTxt: {
    fontSize: 20,
    color: 'black'
  }
});
