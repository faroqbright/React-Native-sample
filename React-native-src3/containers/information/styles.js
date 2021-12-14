import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  ww: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#FE921A',
  },
  titleText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    // writingDirection: 'rtl',
  },
  bottomBtn: {
    position: 'absolute',
    height: 40,
    width: '25%',
    backgroundColor: '#BEBEBE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 40,
    bottom: 40,
  },
});
