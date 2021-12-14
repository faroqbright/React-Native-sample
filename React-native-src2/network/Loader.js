import React, {Component} from 'react';
import {View, ActivityIndicator,Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');
export default class Loader extends Component {
  render() {
    return (
      <View
        style={{
          // flex: 1,
          width:width,
          height:height,
          marginLeft:-25,
          position: 'absolute',
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: '#00000020',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00A1BC" />
      </View>
    );
  }
}
