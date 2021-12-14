import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Alert,
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
import auth from '@react-native-firebase/auth';
import Fonts from './../../../assets/fonts/'
import Loader from './../../../components/Loader'
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'
import AlertModal from './../../../components/AlertModal'
//redux
import { connect } from 'react-redux'
import { FORGOT_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import { forgotResponse, forgotRequets, forgotError } from '../../../Actions/forgotActions'
import { API, requestPost } from "../../../network/Api";
import {strings} from './../../../i18n';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ForgotScreen = (props) => {
    const { navigation, phone, confirmResult, loading, tokenForReset } = props
    const [loadingInteral, setLoading] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        props.stateChange(FORGOT_CHANGE_STATE, { 'phone': '' })
        checkingLanguageBit()
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const inputcheck = () => {
        if (phone === "") {
            // alert("Phone No is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.phone_req"))
            setAlertModal(true)
        }
        else if (phone.length < 14) {
            // alert("Enter valid phone no");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.phone_invalid"))
            setAlertModal(true)
        }
        else {
            // auth().signOut()
            setLoading(true)
            console.log(phone)
            var phoneParam = phone.replace(/\s/g, '');
            console.log(phoneParam)
            phoneParam = phoneParam.substring(1);
            console.log(phoneParam)

            let formData = new FormData()
            formData.append("mobile", phoneParam)
            formData.append("user_type", props.route.params.isMaahir)
            formData.append("language", languageBit === 'en' ? 1 : 2)
            console.log('parameters====>', JSON.stringify(formData))
            props.forgotRequets(phoneParam)
            requestPost(API.FORGOT_PASSWORD, formData).then((response) => {
                props.forgotResponse(response)
                setLoading(false)
                console.log('response', response)
                if (response.response_status === '1') {
                    if (response.user_info != null) {
                        props.stateChange(FORGOT_CHANGE_STATE, { 'tokenForReset': response.user_info.token })
                        // signInWithPhoneNumber(phone)
                        sendOtp(phone)
                    }
                    else if (response.user_info === null) {
                        setSuccessAlert(false)
                        setHeadingAlert(strings('global.error'))
                        setDescriptionAlert(strings('forgot_password_screen.phone_number_not_register'))
                        setAlertModal(true)
                    }
                }
                else{
                    setSuccessAlert(false)
                    setHeadingAlert(strings('global.error'))
                    setDescriptionAlert('' + response.msg)
                    setAlertModal(true)
                }
            }).catch((error) => {
                props.forgotError(error)
                setLoading(false)
                console.log('error', error)
            })
        }
    };
    const forgetBtn = () => {
        inputcheck()
        // signInWithPhoneNumber(phone)
    }
    const sendOtp = (phoneNumber) => {
        setLoading(true)
        let formData = new FormData()
        formData.append("phone_no", phoneNumber)
        // formData.append("language", languageBit === 'en' ? 1 : 2)
        requestPost(API.SEND_OTP, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('response sendOtp', response)
                props.stateChange(FORGOT_CHANGE_STATE, { 'confirmResult': response.otp })
                navigation.navigate('OtpScreen')
                setLoading(false)
            }
        }).catch((error) => {
            setLoading(false)
            // alert(error)
            setSuccessAlert(false)
            setHeadingAlert(strings('global.error'))
            setDescriptionAlert('' + error)
            setAlertModal(true)
            console.log('error sendOtp', error)
        })
    }
    // async function signInWithPhoneNumber(phoneNumber) {
    //     setLoading(true)
    //     auth().signInWithPhoneNumber(phoneNumber).then((confirmation) => {
    //         props.stateChange(FORGOT_CHANGE_STATE, { loading: false, 'confirmResult': confirmation })
    //         navigation.navigate('OtpScreen')
    //         setLoading(false)
    //     }).catch((error) => {
    //         alert(error)
    //         setLoading(false)
    //     })
    // }
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
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ marginTop: 54, justifyContent: 'center' }}>
                    <Image
                        style={styles.logoImg}
                        source={Icons.logoIcon}
                    />
                    <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                        <Image
                            style={[styles.backBtn, { transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]}
                            source={Icons.leftIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.loginHeading}>{strings('forgot_password_screen.heading')}</Text>
                <Text style={styles.loginDescription}>{strings('forgot_password_screen.please_enter_your')}</Text>
            
                 <FloatingLabelInputField
                    value={phone}
                    keyboardType={'number-pad'}
                    isRequired={true}
                    maxLength={14}
                    placeholder={strings('forgot_password_screen.phone')}
                    onFocus={() => {
                        if (phone.length == 0) {
                            props.stateChange(FORGOT_CHANGE_STATE, { 'phone': '+92 ' })
                        }
                    }}
                    onChangeText={(text) => {
                        if (phone.length < text.length && text.length == 1) {
                            text = text.substring(1) + '+92 '
                        }
                        else if (phone.length < text.length && text.length == 4) {
                            text = '+92 '
                        }
                        props.stateChange(FORGOT_CHANGE_STATE, { 'phone': text })
                    }}
                />
                <Button
                    text={strings('forgot_password_screen.send')}
                    textStyle={{ fontSize: 17, fontFamily: Fonts.Medium, lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 33 }}
                    clickAction={forgetBtn}
                    loading={loadingInteral}
                />
            </KeyboardAwareScrollView>
            <AlertModal
                isSuccess={isSuccessAlert}
                modalVisible={alertModal}
                okAction={okAction}
                // cancelAction={cancelAction}
                heading={headingAlert}
                description={descriptionAlert} />
            <Loader loading={loading} />
            <Loader  isShowIndicator={false} loading={loadingInteral} />
        </SafeAreaView>
    );
};
const mapStateToProps = state => {
    const { forgotReducers } = state
    const { phone, confirmResult, loading, tokenForReset } = forgotReducers
    return { phone, confirmResult, loading, tokenForReset }
}

export default connect(mapStateToProps, { stateChange, forgotResponse, forgotRequets, forgotError })(ForgotScreen)
