import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Alert,
    ScrollView,
    TextInput,
    Linking,
    Image,
    SafeAreaView,
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
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'
import AlertModal from './../../../components/AlertModal'
import {strings} from './../../../i18n';
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { API, requestPost } from "../../../network/Api";

const ContactUs = (props) => {
    const { navigation } = props
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [languageBit, setLanguage] = useState('en')
    useEffect(() => {
        checkingLanguageBit()
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const inputcheck = () => {
        if (name === "") {
            // alert(strings("validations.name_req"));
            Alert.alert(
                strings('global.error'),
                strings("validations.name_req") ,
                  [{ text: strings('global.ok'), onPress: () => { } }]
              );
        }
        else if (/^[a-zA-Z ]+$/gi.test(name.trim()) == false) {
            // alert(strings("validations.name_contain_only_alphabets_character"))
            Alert.alert(
                strings('global.error'),
                strings("validations.name_contain_only_alphabets_character") ,
                  [{ text: strings('global.ok'), onPress: () => { } }]
              );
        }
        else if ((/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(email.trim()) == false) {
            // alert(strings("validations.email_format"))
            Alert.alert(
                strings('global.error'),
                strings("validations.email_format") ,
                  [{ text: strings('global.ok'), onPress: () => { } }]
              );
        }
        else if (phone === '') {
            // alert(strings("validations.phone_req"));
            Alert.alert(
                strings('global.error'),
                strings("validations.phone_req") ,
                  [{ text: strings('global.ok'), onPress: () => { } }]
              );
        }
        else if (phone.length < 14) {
            // alert(strings("validations.phone_invalid"));
            Alert.alert(
                strings('global.error'),
                strings("validations.phone_invalid") ,
                  [{ text: strings('global.ok'), onPress: () => { } }]
              );
        }
        else if (message === "") {
            // alert(strings("validations.msg_req"));
            Alert.alert(
                strings('global.error'),
                strings("validations.msg_req") ,
                  [{ text: strings('global.ok'), onPress: () => { } }]
              );
        }
        else {
            contactUsApi()
        }
    };
   
    const contactUsApi = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("name", name)
        formData.append("email",email )
        formData.append("mobile",phone )
        formData.append("msg", message)
        requestPost(API.CONTACT_US, formData).then((response) => {
            setLoading(false)
            console.log('response', response)
            if (response.response_status === '1') {
                // alert(response.msg)
                Alert.alert(
                  strings('global.success'),
                  strings('global.your_feedback_send_sucessfully') ,
                    [{ text: strings('global.ok'), onPress: () => { } }]
                );
                setName('')
                setPhone('')
                setEmail('')
                setMessage('')
            }
            else{
                Alert.alert(
                    strings('global.error'),
                    strings('global.please_try_again'),
                    [ { text: strings('global.ok'), onPress: () => { } }]
                );
            }
        }).catch((error) => {
            setLoading(false)
            alert(strings('global.net_work_error'))
            console.log('error', error)
        })
    }
    const sendBtn = () => {
        inputcheck()
    }
    const callBtn = () => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${'' + '051 2305301'}`;
        }
        else {
            number = `tel:${'' + '051 2305301'}`;
        }
        Linking.openURL(number);
    }
    const okAction = () => {
        setAlertModal(false)
        setSuccessAlert(false)
        setHeadingAlert('')
        setDescriptionAlert('')
    }
    const cancelAction = () => {
        setAlertModal(false)
        setSuccessAlert(false)
        setHeadingAlert('')
        setDescriptionAlert('')
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={Icons.leftIcon}
                hearderText={strings("contact_us_screen.contact_us")}             
                rightSecContainerStyle={{marginRight:15}}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftButtonIconStyle={{ width: 18, height: 18,transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
            />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <Text style={styles.topText}>{strings("contact_us_screen.we_will_try")}</Text>
                <FloatingLabelInputField
                    inputContainer={{ height: 50, borderColor: colors.buttonOrange, borderWidth: 1, borderBottomWidth: 1, borderRadius: 8, marginTop: 20 }}
                    value={name}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings("contact_us_screen.name")}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                />
                <FloatingLabelInputField
                    inputContainer={{ height: 50, borderColor: colors.buttonOrange, borderWidth: 1, borderBottomWidth: 1, borderRadius: 8, marginTop: 20 }}
                    value={email}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings("contact_us_screen.email")}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                />
                <FloatingLabelInputField
                    inputContainer={{ height: 50, borderColor: colors.buttonOrange, borderWidth: 1, borderBottomWidth: 1, borderRadius: 8, marginTop: 20 }}
                    value={phone}
                    keyboardType={'number-pad'}
                    isRequired={true}
                    maxLength={14}
                    placeholder={strings("contact_us_screen.mobile_number")}
                    onChangeText={(text) => {
                        if (phone.length < text.length && text.length == 1) {
                            text = text.substring(1) + '+92 '
                        }
                        else if (phone.length < text.length && text.length == 4) {
                            console.log('condition 4')
                            text = '+92 '
                        }
                        setPhone(text)
                    }}
                    onFocus={() => {
                        if (phone.length == 0) {
                            setPhone('+92 ')
                        }
                    }}
                />
                <FloatingLabelInputField
                    inputContainer={{ height: 100, borderColor: colors.buttonOrange, borderWidth: 1, borderBottomWidth: 1, borderRadius: 8, marginTop: 20 }}
                    value={message}
                    isRequired={true}
                    multiline={true}
                    // maxLength={13}
                    placeholder={strings("contact_us_screen.message")}
                    onChangeText={(text) => {
                        setMessage(text)
                    }}
                />
                <Button
                    text={strings("contact_us_screen.send")}
                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 43, marginBottom: 0 }}
                    innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange }}
                    clickAction={sendBtn.bind(this)}
                    loading={loadingInteral}
                />
                  <Button
                    text={strings("contact_us_screen.call")}
                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 13, marginBottom: 30 }}
                    innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange }}
                    clickAction={()=>{callBtn()}}
                />
            </KeyboardAwareScrollView>
            <AlertModal
                isSuccess={isSuccessAlert}
                modalVisible={alertModal}
                okAction={okAction}
                // cancelAction={cancelAction}
                heading={headingAlert}
                description={descriptionAlert} />
            <Loader isShowIndicator={false} loading={loadingInteral} />

        </SafeAreaView>
    );
};

export default ContactUs