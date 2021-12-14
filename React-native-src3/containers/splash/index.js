import React, {useEffect, useState} from 'react';
import {View, Text, Image, Animated, ImageBackground} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Preference from 'react-native-preference';
import {images} from '../../assets/images';
import {styles} from './styles';

const index = props => {
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 90,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 90,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            Animated.timing(animation, {
              toValue: 90,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              Animated.timing(animation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start();
            });
          });
        });
      });
    });
    const timer = setTimeout(() => {
      let authStatus = Preference.get('authUser');
      if (authStatus == 2) {
        props.navigation.dispatch(StackActions.replace('bottomTab'));
      } else if (authStatus == 1) {
        props.navigation.dispatch(StackActions.replace('Otp'));
      } else {
        props.navigation.dispatch(StackActions.replace('Information'));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const rotateImage = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={images.splashBackground}>
        {/* <Image style={styles.topRectangle} source={images.rectangle} /> */}
        {/* <Image style={styles.bottomRectangle} source={images.rectangle} /> */}
        <Image source={images.splashIcon} />
        <Image style={styles.splashIcon} source={images.logoText} />
        <Animated.Image
          style={[styles.splashIcon, {transform: [{rotate: rotateImage}]}]}
          source={images.splashRotater}
        />
      </ImageBackground>
    </View>
  );
};

export default index;
