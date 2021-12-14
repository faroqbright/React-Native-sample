import React, { useEffect } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import { styles } from './Styles';
import { CommonActions } from '@react-navigation/native';
import Preference from "react-native-preference";
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context'
//assets
import Images from './../../assets/images/'
//utils
import preferenceKeys from '../../utils/preferenceKeys'
import icons from "../../assets/icons";

const { height } = Dimensions.get('window')
const aboveLayer = height / 10

const Splash = ({ navigation }) => {
    useEffect(() => {
        auth().signOut()
        const timer = setTimeout(() => {
            if (Preference.get('isMaahirLogin') === true) {
                navigation.reset({ index: 0, routes: [{ name: 'MaahirHomeStack' }] });
            }
            else if (Preference.get('isCustomerLogin') === true) {
                navigation.reset({ index: 0, routes: [{ name: 'HomeStack' }] });
            }
            else{
                navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: aboveLayer * 6 }}>
                <Image
                    source={icons.layerOne}
                    style={[styles.logoStyle, { height: '50%' }]}
                />
                <Image
                    source={icons.layerTwo}
                    style={[styles.logoStyle, { position: 'absolute', opacity: 1 }]}
                />
            </View>

            <Image
                style={styles.logoImg}
                source={icons.logoIcon}
            />           
             <View style={{ width: '100%', height: aboveLayer * 2.2, position: 'absolute', bottom: 0 }}>
                <Image
                    source={icons.layerFour}
                    style={styles.logoStyle}
                />
            </View>
        </SafeAreaView>
    );
};
export default Splash;
