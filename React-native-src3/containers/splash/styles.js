import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRectangle: {position: 'absolute', left: -230, top: -230, opacity: 0.7},
  bottomRectangle: {
    position: 'absolute',
    bottom: -230,
    right: -340,
    opacity: 0.7,
    transform: [{rotate: '300deg'}],
  },
  splashIcon: {
      marginTop:40
  },
});
