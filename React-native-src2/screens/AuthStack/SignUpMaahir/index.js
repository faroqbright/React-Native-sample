import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    Linking,
    ImageBackground
} from "react-native";
import { styles } from "./Styles";
import InputField from './../../../components/RegistrationInput'
import Button from './../../../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './../../../assets/icons/'
import colors from "../../../utils/colors";
import CheckBox from './../../../components/CustomCheckBox'
import Loader from './../../../components/Loader'
import ImagePickerModel from './../../../components/ImagePickerModel'
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'
import { API, requestPost, requestGet } from "../../../network/Api";
import AlertModal from './../../../components/AlertModal'
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { connect } from 'react-redux'
import { MAAHIR_SIGNUP_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import {strings} from './../../../i18n';
const SignUpMaahirScreen = (props) => {
    const autoPlaceRef = useRef(null)
    const { navigation, profileImage, name, phone, address, maahirLat, maahirLng, password, referralCode,isFemale } = props
    const [checkBox, setBox] = useState(false);
    const [showPickerModel, setShowPickerModel] = useState(false);
    const [isHidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'name': '', profileImage: null, password: '' })
        checkingLanguageBit()
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
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
    const inputcheck = () => {
        if (profileImage === null) {
            // alert("Image is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.image_req"))
            setAlertModal(true)
        }
        else if (name === "") {
            // alert("Name is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.name_req"))
            setAlertModal(true)
        }
        else if (/^[a-zA-Z ]+$/gi.test(name.trim()) == false) {
            // alert("Name is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.name_contain_only_alphabets_character"))
            setAlertModal(true)
        }
        else if (phone === "") {
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
        // else if (phone.length < 14) {
        //     // alert("Phone is required");
        //     setSuccessAlert(false)
        //     setHeadingAlert(strings("validations.field_error"))
        //     setDescriptionAlert(strings("validations.phone_invalid"))
        //     setAlertModal(true)
        // }
        else if (password === "") {
            // alert("Password is required");
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
        else if (checkBox === false) {
            // alert("Please accept terms and condition");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.tems_and_conditions_req"))
            setAlertModal(true)
        }
        else {
            verifyPhone(phone)
        }
    };
    const signUpBtn = () => {
        inputcheck()
    }
    const handleChoosePhoto = (response) => {
        if (response.didCancel) {
            //// console.log('User cancelled image picker');
        } else if (response.error) {
            //// console.log('ImagePickerModel Error: ', response.error);
        } else {
            const source = { uri: response.uri };
            props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'profileImage': response.uri })
        }
    }
    const verifyPhone = (phoneNumber) => {
        setLoading(true)
        // var tempPhone = phoneNumber
        // console.log(tempPhone)
        // var phoneParam = tempPhone.replace(/\s/g, '');
        // console.log(phoneParam)
        // phoneParam = phoneParam.substring(1);
        // console.log(phoneParam)

        var phoneParam = phoneNumber
        if (phoneNumber.replace(/\s/g, '').charAt(0) === '+') {
            phoneParam = phoneNumber.replace(/\s/g, '').substring(1);
        }
        else if (phoneNumber.replace(/\s/g, '').charAt(0) != '+') {
            phoneParam = phoneNumber.replace(/\s/g, '');
        }

        let formData = new FormData()
        formData.append("phone_no", phoneParam)
        formData.append("language", languageBit === 'en' ? 1 : 2)
        requestPost(API.PHONE_VERIFICATION, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('response sendOtp', response)
                navigation.navigate('signUpStepperMahir')
                setLoading(false)
            }
            else{
                // Alert.alert(
                //     "Error",
                //     '' + response.msg,
                //     [ { text: "OK", onPress: () => { } }]
                // );
                setSuccessAlert(false)
                setHeadingAlert(strings('global.error'))
                setDescriptionAlert('' + response.msg)
                setAlertModal(true)
            }
        }).catch((error) => {
            setLoading(false)
            // alert('Server error please try again')
            setSuccessAlert(false)
            setHeadingAlert(strings('global.network_error'))
            setDescriptionAlert(strings('global.net_work_error'))
            setAlertModal(true)
            console.log('error verification phone', error)
        })
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <Image
                    style={styles.logoImg}
                    source={Icons.logoIcon}
                />
                <Text style={styles.loginHeading}>{strings('signup.maahir_signup')}</Text>
                <View style={styles.profileOuterContainer}>
                    <Image source={{ uri: profileImage }} style={styles.profileContainer} />
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => { setShowPickerModel(true) }}>
                        <Image
                            style={styles.profileCamera}
                            source={Icons.profileCameraIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.uploadTxt}>{strings('signup.please_upload_your_photo')}</Text>

                <FloatingLabelInputField
                    inputContainer={{ marginTop: 10 }}
                    value={name}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings('signup.name')}
                    onChangeText={(text) => {
                        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'name': text })
                    }}
                />
                <FloatingLabelInputField
                    value={phone}
                    keyboardType={'number-pad'}
                    isRequired={true}
                    maxLength={14}
                    placeholder={strings('signup.phone_number')}
                    onFocus={() => {
                        if (phone.length == 0) {
                            props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'phone': '+92 ' })
                        }
                    }}
                    onChangeText={(text) => {
                        if (phone.length < text.length && text.length == 1) {
                            text = text.substring(1) + '+92 '
                        }
                        else if (phone.length < text.length && text.length == 4) {
                            text = '+92 '
                        }
                        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'phone': text })
                    }}
                />
                <FloatingLabelInputField
                    value={password}
                    // keyboardType={'number-pad'}
                    rightIcon={true}
                    isRequired={true}
                    isRight={true}
                    placeholder={strings('signup.password')}
                    secureTextEntry={isHidePassword}
                    onRightIconPress={() => {
                        setHidePassword(!isHidePassword)
                    }}
                    onChangeText={(text) => {
                        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'password': text })
                    }}
                />
                <FloatingLabelInputField
                    // inputContainer={{ marginTop: 10 }}
                    value={referralCode}
                    // keyboardType={'number-pad'}
                    // isRequired={true}
                    // maxLength={14}
                    placeholder={strings('signup.referral_code')}
                    onChangeText={(text) => {
                        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'referralCode': text })
                    }}
                />
                 <View style={styles.radioBtnMainContainer}>
                    <TouchableOpacity 
                      onPress={() => {
                        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'isFemale': false})
                    }}
                    style={styles.radioBtn}>
                        <TouchableOpacity
                            onPress={() => {
                                props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'isFemale': false})

                            }}
                            style={styles.radioTouch}>
                            <View style={[styles.fillRadio,{backgroundColor: isFemale ? 'white' :colors.grey }]} />
                        </TouchableOpacity>
                        <Text style={styles.radioText}>{strings('signup.male')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     onPress={() => {
                        props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'isFemale': true})
                    }}
                    style={[styles.radioBtn, { marginLeft: 25 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'isFemale': true})
                            }}
                            style={styles.radioTouch}>
                            <View style={[styles.fillRadio,{backgroundColor: isFemale ? colors.grey :colors.white }]} />
                        </TouchableOpacity>
                        <Text style={styles.radioText}>{strings('signup.female')}</Text>
                    </TouchableOpacity>
                </View>
               
                <View style={styles.errorContainer}>
                    <CheckBox
                        onChange={() => { setBox(!checkBox) }}
                        onChangeTerm={() => { 
                            // navigation.navigate('TermsCondition') 
                            Linking.openURL("https://maahirpro.com/terms-and-conditions")
                        }}
                        isChecked={checkBox}
                        checkstyle={{ backgroundColor: colors.secondary }}
                    />
                </View>
                <Button
                    text={strings('signup.sign_up')}
                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 33 }}
                    clickAction={signUpBtn.bind(this)}
                    loading={loading}
                />
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>{strings('signup.already_have_an_account')}<Text
                        onPress={() => { navigation.navigate('LoginScreen') }}
                        style={{ color: colors.grey, fontWeight: '500' }}>
                        {strings('signup.login')}</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
            <ImagePickerModel
                showPickerModel={showPickerModel}
                onHideModel={() => {
                    setShowPickerModel(false)
                }}
                handleChoosePhoto={handleChoosePhoto}
            />
             <AlertModal
                isSuccess={isSuccessAlert}
                modalVisible={alertModal}
                okAction={okAction}
                // cancelAction={cancelAction}
                heading={headingAlert}
                description={descriptionAlert} />
            <Loader isShowIndicator={false} loading={loading} />
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    const { maahirSignUpReducers } = state
    const { profileImage, name, address, maahirLat, maahirLng, password, phone, referralCode,isFemale } = maahirSignUpReducers
    return { profileImage, name, address, maahirLat, maahirLng, password, phone, referralCode,isFemale }
}
export default connect(mapStateToProps, { stateChange })(SignUpMaahirScreen)