import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    Alert,
    SafeAreaView,
    Linking,
    TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import InputField from './../../../components/RegistrationInput'
import Button from './../../../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './../../../assets/icons/'
import colors from "../../../utils/colors";
import Loader from './../../../components/Loader'
import ImagePickerModel from './../../../components/ImagePickerModel'
import moment from 'moment'
import Header from '../../../components/Header'
import Preference from 'react-native-preference'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import fonts from "../../../assets/fonts";
import {strings} from './../../../i18n';
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { API, requestPost } from "../../../network/Api";

const AboutDrawer = (props) => {
    const { navigation } = props
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        checkingLanguageBit()

    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const aboutUsBtn =()=>{
        // navigation.navigate('AboutUs')
        Linking.openURL("https://maahirpro.com/about-us")
    }
    const privacyBtn =()=>{
        Linking.openURL("https://maahirpro.com/privacy_policy")
    }
    const termsConditionBtn =()=>{
        Linking.openURL("https://maahirpro.com/terms-and-conditions")
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={Icons.leftIcon}
                hearderText={strings("help_center.help_center")}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftButtonIconStyle={{ width: 18, height: 18,transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
            />
            <ScrollView>
                <View style={{ width: "100%", height: "100%",alignItems:'center',marginBottom:50}}>
                    <Button
                        text={strings("help_center.about_us")}
                        textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                        backgroundColorStyle={{ width: '90%', borderRadius: 14, marginTop: 24, height: 51 }}
                        innerContainerCustomStyle={{ height: 46, borderRadius: 14,backgroundColor:colors.buttonOrange }}
                        clickAction={aboutUsBtn}
                    />
                       <Button
                        text={strings("help_center.privacy_policy")}
                        textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                        backgroundColorStyle={{ width: '90%', borderRadius: 14, marginTop: 10, height: 51 }}
                        innerContainerCustomStyle={{ height: 46, borderRadius: 14,backgroundColor:colors.buttonOrange }}
                        clickAction={privacyBtn}
                    />
                       <Button
                        text={strings("help_center.terms_and_condition")}
                        textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                        backgroundColorStyle={{ width: '90%', borderRadius: 14, marginTop: 10, height: 51 }}
                        innerContainerCustomStyle={{ height: 46, borderRadius: 14,backgroundColor:colors.buttonOrange }}
                        clickAction={termsConditionBtn}
                    />
                </View>
            </ScrollView>
            <Loader loading={loadingInteral} />

        </SafeAreaView>
    );
};

export default AboutDrawer