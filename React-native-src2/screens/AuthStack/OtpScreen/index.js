import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
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
import auth from '@react-native-firebase/auth';
import OTPInput from './../../../components/OTPInput';
import Loader from './../../../components/Loader'
import { stateChange } from '../../../Actions/commonAction'
import { FORGOT_CHANGE_STATE } from '../../../Actions/types'
import { API, requestPost } from "../../../network/Api";
import AlertModal from './../../../components/AlertModal'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { strings } from "../../../i18n";

//redux
import { connect } from 'react-redux'

const OtpScreen = (props) => {
    const { navigation, phone, confirmResult } = props
    const [modalVisible, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [timerCount, setTimer] = useState(60);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        CountFunc()
        checkingLanguageBit()

        // auth().onAuthStateChanged( (user) => {
        //     if (user) {
        //         console.log('user exist')
        //         console.log(user)
        //         setModal(true)
        //         setTimeout(() => {
        //             setModal(false)
        //             navigation.navigate('ResetPasswordScreen')
        //         }, 2500);
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
    // async function confirmCode(code) {
    //     try {
    //         await confirmResult.confirm(code).then(user => {
    //             console.log('user--->', user)
    //             setModal(true)
    //             setTimeout(() => {
    //                 setModal(false)
    //                 navigation.navigate('ResetPasswordScreen')
    //             }, 2500);
    //             setLoading(false)
    //         })
    //             .catch(error => {
    //                 setLoading(false)
    //                 alert(error.message)
    //                 console.log(error)
    //             });
    //     } catch (error) {
    //         console.log('Invalid code.');
    //     }
    // }
    // async function signInWithPhoneNumber(phoneNumber) {
    //     setLoading(true)
    //     auth().signInWithPhoneNumber(phoneNumber).then((confirmation) => {
    //         props.stateChange(FORGOT_CHANGE_STATE, { loading: false, 'confirmResult': confirmation })
    //         setLoading(false)
    //     }).catch(() => {
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
    const sendOtp = (phoneNumber) => {
        setLoading(true)
        let formData = new FormData()
        formData.append("phone_no", phoneNumber)
        formData.append("language", languageBit === 'en' ? 1 : 2)
        requestPost(API.SEND_OTP, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('response sendOtp', response)
                props.stateChange(FORGOT_CHANGE_STATE, { 'confirmResult': response.otp })
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
                            style={[styles.backBtn, { transform: languageBit === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]}
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
                                setModal(true)
                                setTimeout(() => {
                                    setModal(false)
                                    navigation.navigate('ResetPasswordScreen')
                                }, 2500);
                            }
                            else {
                                setSuccessAlert(false)
                                setHeadingAlert('Error')
                                setDescriptionAlert('Invalid otp please try again')
                                setAlertModal(true)
                                // alert('Invalid otp please try again')
                            }
                        }}
                    />
                </View>
                {/* <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Didn't receive a verification code? <Text
                        onPress={() => { 
                            sendOtp(phone)
                            // signInWithPhoneNumber(phone)
                        }}
                        style={{ color: colors.buttonOrange, textDecorationLine: 'underline' }}>
                        {'\n'}Resend the code
                        </Text></Text>
                </View> */}
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
            <Loader isShowIndicator={true} loading={loading} />
        </SafeAreaView>
    );
};
const mapStateToProps = state => {
    const { forgotReducers } = state
    const { phone, confirmResult } = forgotReducers
    return { phone, confirmResult }
}
export default connect(mapStateToProps, { stateChange })(OtpScreen)

