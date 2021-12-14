import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    Modal
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './../../../assets/icons/'
import colors from "../../../utils/colors";
import Fonts from './../../../assets/fonts/'
import OTPInput from './../../../components/OTPInput';
import auth from '@react-native-firebase/auth';
import Loader from './../../../components/Loader'
import moment from 'moment'
import AlertModal from './../../../components/AlertModal'
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { connect } from 'react-redux'
import { SIGNUP_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import { signUpRequets, signUpResponse, signUpError } from '../../../Actions/signUpActions'
import { API, requestPost } from "../../../network/Api";
import { strings } from "../../../i18n";

const OtpSignUp = (props) => {
    const { navigation, profileImage, name, phone, password, address, loading, customerLat, customerLng, confirmResult, isFemale } = props
    const [modalVisible, setModal] = useState(false);
    const [internalLoading, setLoading] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [timerCount, setTimer] = useState(60);
    const [languageBit, setLanguage] = useState('en')
    useEffect(() => {
        console.log('gender---->', isFemale === true ? 2 : 1)
        CountFunc()
        checkingLanguageBit()
        // auth().onAuthStateChanged( (user) => {
        //     if (user) {
        //         console.log('user exist')
        //         console.log(user)
        //         signUpApi()
        //     } 
        //     else 
        //     {
        //         console.log('user not exist')
        //         console.log(user)
        //     }
        // });
    }, [navigation]);
      const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const CountFunc = () => {
        setTimer(60);
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    };
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
    const signUpApi = () => {
        setLoading(true)
        console.log('signUp Call')

        // console.log(phone)
        // var tempPhone = phone
        // var phoneParam = tempPhone.replace(/\s/g, '');
        // console.log(phoneParam)
        // phoneParam = phoneParam.substring(1);
        // console.log(phoneParam)
        var phoneParam = phone
        if (phone.replace(/\s/g, '').charAt(0) === '+') {
            phoneParam = phoneParam.replace(/\s/g, '').substring(1);
        }
        else if (phone.replace(/\s/g, '').charAt(0) != '+') {
            phoneParam = phoneParam.replace(/\s/g, '');
        }
        console.log(phoneParam)
        let formData = new FormData()
        formData.append("name", name)
        if (profileImage != null) {
            formData.append("user_image", { uri: profileImage, name: moment().format('x') + '.jpg', type: 'image/jpeg' })
        }
        formData.append("password", password)
        formData.append("mobile", phoneParam)
        formData.append("address", address)
        formData.append("lat", customerLat)
        formData.append("lng", customerLng)
        formData.append("language", languageBit === 'en' ? 1 : 2)
        formData.append("gender", isFemale === true ? 2 : 1)
        // props.signUpRequets(name, phoneParam, password)
        requestPost(API.CUSTOMER_SIGN_UP, formData).then((response) => {
            setLoading(false)
            // props.signUpResponse(response)
            console.log('response', response)
            if (response.response_status === '1') {
                setModal(true)
                setTimeout(() => {
                    setModal(false)
                    navigation.navigate('LoginScreen')
                }, 2500);
            }
            else {
                // Alert.alert(
                //     "Error",
                //     '' + response.msg,
                //     [ { text: "OK", onPress: () => { } }]
                // );
                setSuccessAlert(false)
                setHeadingAlert(strings("global.error"))
                setDescriptionAlert('' + response.msg)
                setAlertModal(true)
                console.log('else', response.msg)

            }

        }).catch((error) => {
            setLoading(false)
            // props.signUpError(error)
            // alert('Please try again')
            setSuccessAlert(false)
            setHeadingAlert(strings("global.error"))
            setDescriptionAlert(strings("global.net_work_error"))
            setAlertModal(true)
            console.log('error', error)
        })
    }
    // async function confirmCode(code) {
    //     try {
    //         await confirmResult.confirm(code).then(user => {
    //             // setLoading(false)
    //             console.log('user--->', user)
    //             // auth().signOut()
    //             // signUpApi()
    //         }).catch(error => {
    //                 setLoading(false)
    //                 alert(error.message)
    //                 console.log(error)
    //             });
    //     } catch (error) {
    //         setLoading(false)
    //         console.log('Invalid code.');
    //     }
    // }
    // async function signInWithPhoneNumber(phoneNumber) {
    //     auth().signOut()
    //     setLoading(true)
    //     auth().signInWithPhoneNumber(phoneNumber).then((confirmation) => {
    //         props.stateChange(SIGNUP_CHANGE_STATE, { internalLoading: false, 'confirmResult': confirmation })
    //         setLoading(false)
    //     }).catch(() => {
    //         setLoading(false)
    //     })
    // }
    const sendOtp = (phoneNumber) => {
        CountFunc()
        setLoading(true)
        let formData = new FormData()
        formData.append("phone_no", phoneNumber)
        formData.append("language", languageBit === 'en' ? 1 : 2)
        requestPost(API.SEND_OTP, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('response sendOtp', response)
                props.stateChange(SIGNUP_CHANGE_STATE, { 'confirmResult': response.otp })
                setLoading(false)
                CountFunc()
            }
        }).catch((error) => {
            setLoading(false)
            // alert(error)
            setSuccessAlert(false)
            setHeadingAlert(strings("global.error"))
            setDescriptionAlert('' + error)
            setAlertModal(true)
            console.log('error sendOtp', error)
        })
    }
    renderSuccessModel = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                // onRequestClose={() => {
                //     // this.setModalVisible(!modalVisible);
                // }}
                >
                    <View
                        style={styles.modalContainer}>
                        <View style={{ borderRadius: 8, backgroundColor: colors.buttonOrange, width: '100%' }}>
                            <ImageBackground source={Icons.modalBackgroundIcon} style={styles.modalInnerCont}>
                                <Image
                                    style={styles.modalImage}
                                    source={Icons.verificationModalIcon}
                                />
                                <Text style={styles.modalHeading}>{strings("otp_screeen.verification_sucess")}</Text>
                                <Text style={styles.modalDescription}>{strings("otp_screeen.now_you_can_use_app")}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ marginTop: 60, justifyContent: 'center' }}>
                    <Text style={styles.loginHeading}>{strings("otp_screeen.verification")}</Text>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                        <Image
                            style={[styles.backBtn,{ transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]}
                            source={Icons.leftIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.loginDescription}>{strings("otp_screeen.please_enter_your")}</Text>
                <View style={styles.otpContainer}>
                    <OTPInput
                        onComplete={(code) => {
                            console.log('phone', phone)
                            console.log('phone---', confirmResult)
                            console.log('phone---', code)
                            // setModal(true)
                            // setLoading(true)
                            // confirmCode(code)
                            if (code === confirmResult.toString()) {
                                signUpApi()
                            }
                            else {
                                // alert('Invalid otp please try again')
                                setSuccessAlert(false)
                                setHeadingAlert(strings("global.error"))
                                setDescriptionAlert(strings("otp_screeen.invalid_otp"))
                                setAlertModal(true)
                            }
                        }}
                    />
                </View>
                {timerCount > 0 ? (
                    <View style={styles.bottomContainer}>
                        <Text style={[styles.bottomText, { textAlign: "center" }]}>
                            {strings("otp_screeen.resend_code")} {timerCount}s
            </Text>
                    </View>
                ) : null}
                {timerCount < 1 ? (
                    <View style={styles.bottomContainer}>
                        <Text style={styles.bottomText}>
                            {strings("otp_screeen.did_not_receive")}{" "}
                            <Text
                                onPress={() => {
                                    // signInWithPhoneNumber(phone)
                                    sendOtp(phone);
                                }}
                                style={{
                                    color: colors.buttonOrange,
                                    textDecorationLine: "underline",
                                }}
                            >
                                {"\n"}{strings("otp_screeen.resend_code")}
                            </Text>
                        </Text>
                    </View>
                ) : null}
                {renderSuccessModel()}
            </KeyboardAwareScrollView>
            <AlertModal
                isSuccess={isSuccessAlert}
                modalVisible={alertModal}
                okAction={okAction}
                // cancelAction={cancelAction}
                heading={headingAlert}
                description={descriptionAlert} />
            <Loader isShowIndicator={true} loading={internalLoading} />
        </SafeAreaView>
    );
};
const mapStateToProps = state => {
    const { signUpReducers } = state
    const { profileImage, name, phone, password, address, customerLat, customerLng, confirmResult, loading, isFemale } = signUpReducers
    return { profileImage, name, phone, password, address, customerLat, customerLng, confirmResult, loading, isFemale }
}
export default connect(mapStateToProps, { stateChange, signUpRequets, signUpResponse, signUpError })(OtpSignUp)

