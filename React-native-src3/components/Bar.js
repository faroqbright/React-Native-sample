import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
  StyleSheet
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {images} from '../../assets/images';

const Bar = props => {
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <View>
      <Text>{props.titleText}</Text>
      </View>
      <View style={styles.secView}>
      <Text style={props.descTextStyle}>{props.descText}</Text>
      <Image style={props.ImgStyle} source={props.Img}/>
      </View>
    </Pressable>
  );
};

export default Bar;


const styles = StyleSheet.create({
container:{
 flexDirection:"row",
 justifyContent:"space-between",
 marginTop:30
},
secView:{
    flexDirection:"row"
}
});