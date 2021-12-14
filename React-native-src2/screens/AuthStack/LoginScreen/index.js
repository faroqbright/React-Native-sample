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
import Loader from './../../../components/Loader'
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'
import Preference from 'react-native-preference'
import messaging from '@react-native-firebase/messaging';
import AlertModal from './../../../components/AlertModal'
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { connect } from 'react-redux'
import { LOGIN_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import { loginRequets, loginResponse, loginError } from '../../../Actions/loginActions'
import { API, requestPost } from "../../../network/Api";
import { strings } from './../../../i18n';

const LoginScreen = (props) => {
    const { navigation, phone, password, loading, isMaahirSelect } = props
    const [isHidePassword, setHidePassword] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [interLoading, setInternalLoading] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        props.stateChange(LOGIN_CHANGE_STATE, { 'phone': '', password: '' })
        checkingLanguageBit()
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const fetchFcmToken = () => {
        messaging().hasPermission()
            .then(hasPermission => {
                messaging().getToken()
                    .then(fcmToken => {
                        if (fcmToken) {
                            console.log('Firebase token: ' + JSON.stringify(fcmToken))
                            loginAPi(fcmToken)
                        } else {
                            // user doesn't have a device token yet
                            console.log('Firebase token: ' + JSON.stringify(fcmToken))
                        }
                    }).catch(error => {
                        console.log('Firebase getToken error: ' + JSON.stringify(error))
                        console.log('Firebase getToken error: ' + error)
                    })
            })
            .catch(error => {
                console.log('Firebase hasPermission error: ' + JSON.stringify(error))
            })
    }
    const inputcheck = () => {
        if (phone === "") {
            // alert("Phone is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.phone_req"))
            setAlertModal(true)
        }
        else if (phone.replace(/\s/g, '').charAt(0) === '+' && phone.replace(/\s/g, '').substring(1).length != 12) {
            // phone.replace(/\s/g, '').substring(1).length<12 
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.phone_invalid"))
            setAlertModal(true)
        }
        else if (phone.replace(/\s/g, '').charAt(0) != '+' && phone.replace(/\s/g, '').length != 12) {
            // phone.replace(/\s/g, '').substring(1).length<12 
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.phone_invalid"))
            setAlertModal(true)
        }
        //    else if (phone.length < 14) {
        //         // alert("Phone is required");
        //         setSuccessAlert(false)
        //         setHeadingAlert(strings("validations.field_error"))
        //         setDescriptionAlert(strings("validations.phone_invalid"))
        //         setAlertModal(true)
        //     }
        else if (password === "") {
            // alert("Password required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.password_req"))
            setAlertModal(true)
        }
        else if (password.length < 3) {
            // alert("password must be of atleast 6 character");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.password_length"))
            setAlertModal(true)
        }
        else {
            fetchFcmToken()
        }
    };
    loginAPi = (token) => {
        // var tempPhone = phone
        // var phoneParam = tempPhone.replace(/\s/g, '');
        // phoneParam = phoneParam.substring(1);

        setInternalLoading(true)
        var phoneParam = phone
        if (phone.replace(/\s/g, '').charAt(0) === '+') {
            phoneParam = phoneParam.replace(/\s/g, '').substring(1);
        }
        else if (phone.replace(/\s/g, '').charAt(0) != '+') {
            phoneParam = phoneParam.replace(/\s/g, '');
        }
        console.log(phoneParam)
        let formData = new FormData()
        formData.append("email", phoneParam)
        formData.append("password", password)
        formData.append("fcm_token", token)
        formData.append("language", languageBit === 'en' ? 1 : 2)

        // props.loginRequets(phone, password,token)
        requestPost(API.SIGN_IN, formData).then((response) => {
            setInternalLoading(false)
            // props.loginResponse(response)
            console.log('response', response)
            if (response.response_status === '1') {
                if (response.user_data.user_type === '2' && isMaahirSelect === true) {
                    Preference.set('maahirUserObject', response.user_data)
                    Preference.set('isMaahirLogin', true)
                    navigation.reset({ index: 0, routes: [{ name: 'MaahirHomeStack' }] });
                }
                else if (response.user_data.user_type === '1' && isMaahirSelect === false) {
                    Preference.set('isCustomerLogin', true)
                    Preference.set('userObject', response.user_data)
                    navigation.reset({ index: 0, routes: [{ name: 'HomeStack' }] });
                }
                else if (response.user_data.user_type === '1' && isMaahirSelect === true) {
                    setSuccessAlert(false)
                    setHeadingAlert(strings('global.error'))
                    setDescriptionAlert(strings('login_screen.no_maahir_found_with_these_creditional'))
                    setAlertModal(true)
                }
                else if (response.user_data.user_type === '2' && isMaahirSelect === false) {
                    setSuccessAlert(false)
                    setHeadingAlert(strings('global.error'))
                    setDescriptionAlert(strings('login_screen.no_customer_found_with_these_creditional'))
                    setAlertModal(true)
                }
            }
            else {
                setError(true)
                setErrorMsg(response.msg)
            }
        }).catch((error) => {
            // props.loginError(error)
            // alert('Please check your internet and try again')
            setSuccessAlert(false)
            setHeadingAlert(strings('global.network_error'))
            setDescriptionAlert(strings('global.net_work_error'))
            setAlertModal(true)

            setInternalLoading(false)
            console.log('error', error)
        })
    }
    loginBtn = () => {
        inputcheck()
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
                <Text style={styles.loginHeading}>{isMaahirSelect === true ? strings('login_screen.maahir') : strings('login_screen.customer')} {strings('login_screen.login')}</Text>
                {/* <Text style={styles.loginDescription}>Welcome to <Text style={{ fontWeight: 'bold' }}>{isMaahirSelect === true ? 'Maahir' : 'Customer'}</Text>{'\n'} Login to continue</Text> */}
                {/* <InputField
                    isShowTitle={true}
                    txtPlacHolder={'Phone'}
                    val={phone}
                    maxLength={14}
                    tholder={'number-pad'}
                    onFocus={() => {
                        if (phone.length == 0) {
                            props.stateChange(LOGIN_CHANGE_STATE, { 'phone': '+92 ' })
                        }
                        setError(false)
                    }}
                    onChangeText={(text) => {
                        setError(false)
                        if (phone.length < text.length && text.length == 1) {
                            text = text.substring(1) + '+92 '
                        }
                        else if (phone.length < text.length && text.length == 4) {
                            console.log('condition 4')
                            text = '+92 '
                        }
                        props.stateChange(LOGIN_CHANGE_STATE, { 'phone': text })
                    }}
                /> */}
                {/* <InputField
                    isShowTitle={true}
                    isRight={true}
                    txtPlacHolder={'Password'}
                    val={password}
                    secureType={isHidePassword}
                    clickAction={() => {
                        setHidePassword(!isHidePassword)
                        console.log(isHidePassword)
                    }}
                    onFocus={() => {
                        setError(false)
                    }}
                    onChangeText={(text) => {
                        setError(false)
                        props.stateChange(LOGIN_CHANGE_STATE, { 'password': text })
                    }}
                /> */}
                <FloatingLabelInputField
                    value={phone}
                    keyboardType={'number-pad'}
                    isRequired={true}
                    maxLength={14}
                    placeholder={strings('login_screen.phone')}
                    onFocus={() => {
                        if (phone.length == 0) {
                            props.stateChange(LOGIN_CHANGE_STATE, { 'phone': '+92 ' })
                        }
                        setError(false)
                    }}
                    onChangeText={(text) => {
                        setError(false)
                        if (phone.length < text.length && text.length == 1) {
                            text = text.substring(1) + '+92 '
                        }
                        else if (phone.length < text.length && text.length == 4) {
                            console.log('condition 4')
                            text = '+92 '
                        }
                        props.stateChange(LOGIN_CHANGE_STATE, { 'phone': text })
                    }}
                />
                <FloatingLabelInputField
                    value={password}
                    // keyboardType={'number-pad'}
                    rightIcon={true}
                    isRequired={true}
                    isRight={true}
                    placeholder={strings('login_screen.password')}
                    secureTextEntry={isHidePassword}
                    onRightIconPress={() => {
                        setHidePassword(!isHidePassword)
                        console.log(isHidePassword)
                    }}
                    onFocus={() => {
                        setError(false)
                    }}
                    onChangeText={(text) => {
                        setError(false)
                        props.stateChange(LOGIN_CHANGE_STATE, { 'password': text })
                    }}
                />

                {isError === true &&
                    <View style={styles.errorContainer}>
                        <Image
                            style={styles.errorImageStyle}
                            source={Icons.alertIcon}
                        />
                        <Text style={styles.errorTxt}>{errorMsg}</Text>
                        {/* <Text style={styles.errorTxt}>Phone or password is wrong, please check again</Text> */}
                    </View>
                }
                <Text onPress={() => { navigation.navigate('ForgotScreen', { isMaahir: isMaahirSelect === true ? 2 : 1 }) }} style={styles.forgotText}>{strings('login_screen.forgot_password')}</Text>
                <Button
                    text={strings("login_screen.login")}
                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 33 }}
                    clickAction={loginBtn.bind(this)}
                    loading={interLoading}
                />
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>{strings("login_screen.do_not_have_an_account")} <Text
                        onPress={() => {
                            if (isMaahirSelect === true) { navigation.navigate('SignUpMaahir') }
                            else { navigation.navigate('SignUpScreen') }
                        }}
                        style={{ color: colors.secondary }}>
                        {strings("login_screen.create_account")}
                    </Text></Text>
                </View>
            </KeyboardAwareScrollView>
            <AlertModal
                isSuccess={isSuccessAlert}
                modalVisible={alertModal}
                okAction={okAction}
                // cancelAction={cancelAction}
                heading={headingAlert}
                description={descriptionAlert} />
            <Loader loading={loading} />
            <Loader isShowIndicator={false} loading={interLoading} />
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    const { loginReducers, landingReducers } = state
    const { name, phone, password, loading } = loginReducers
    const { isMaahirSelect } = landingReducers
    return { phone, password, loading, isMaahirSelect }
}

export default connect(mapStateToProps, { stateChange, loginRequets, loginResponse, loginError })(LoginScreen)
