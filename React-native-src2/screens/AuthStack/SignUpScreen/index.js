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
    Linking
} from "react-native";
import { styles } from "./Styles";
import InputField from './../../../components/RegistrationInput'
import Button from './../../../components/Button'
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './../../../assets/icons/'
import colors from "../../../utils/colors";
import CheckBox from './../../../components/CustomCheckBox'
import Loader from './../../../components/Loader'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ImagePickerModel from './../../../components/ImagePickerModel'
import moment from 'moment'
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'
import AlertModal from './../../../components/AlertModal'
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { connect } from 'react-redux'
import { SIGNUP_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import { signUpRequets, signUpResponse, signUpError } from '../../../Actions/signUpActions'
import { API, requestPost } from "../../../network/Api";
import { strings } from './../../../i18n';
import { color } from "react-native-reanimated";
const SignUpScreen = (props) => {
    const { navigation, profileImage, name, phone, password, address, customerLat, customerLng, loading, confirmResult,isFemale } = props
    // const [loading, setLoading] = useState(false);
    const autoPlaceRef = useRef(null)
    const [loadingInteral, setLoading] = useState(false);
    const [checkBox, setBox] = useState(false);
    const [isHidePassword, setHidePassword] = useState(true);
    const [showPickerModel, setShowPickerModel] = useState(false);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        props.stateChange(SIGNUP_CHANGE_STATE, { 'phone': '', password: '', name: '', profileImage: null, confirmResult: null })
        checkingLanguageBit()
    }, [navigation]);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const handleChoosePhoto = (response) => {
        if (response.didCancel) {
            //// console.log('User cancelled image picker');
        } else if (response.error) {
            //// console.log('ImagePickerModel Error: ', response.error);
        } else {
            const source = { uri: response.uri };
            console.log('uri->', response.uri)
            props.stateChange(SIGNUP_CHANGE_STATE, { 'profileImage': response.uri })
        }
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
        // if (profileImage === null) {
        //     // alert("Image is required");
        //     setSuccessAlert(false)
        //     setHeadingAlert(strings("validations.field_error"))
        //     setDescriptionAlert(strings("validations.image_req"))
        //     setAlertModal(true)
        // }
        if (name === "") {
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
        else if (address === "") {
            // alert("Address is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.address_req"))
            setAlertModal(true)
        }
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
        else if (checkBox === false) {
            // alert("Please accept terms and condition");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.tems_and_conditions_req"))
            setAlertModal(true)
        }
        else {
            // auth().signOut()
            // signInWithPhoneNumber(phone)
            // sendOtp(phone)
            var phoneParam = phone
            if (phone.replace(/\s/g, '').charAt(0) === '+') {
                phoneParam = phoneParam.replace(/\s/g, '').substring(1);
                verifyPhone(phoneParam)
            }
            else if (phone.replace(/\s/g, '').charAt(0) != '+') {
                phoneParam = phoneParam.replace(/\s/g, '');
                verifyPhone(phoneParam)

            }
            console.log(phoneParam)
            // verifyPhone(phone)
        }
    };
    const verifyPhone = (phoneNumber) => {
        setLoading(true)
        // var tempPhone = phoneNumber
        // console.log(tempPhone)
        // var phoneParam = tempPhone.replace(/\s/g, '');
        // console.log(phoneParam)
        // phoneParam = phoneParam.substring(1);
        console.log('VerifyPhone phoneNumber--->', phoneNumber)
        let formData = new FormData()
        formData.append("phone_no", phoneNumber)
        formData.append("language", languageBit === 'en' ? 1 : 2)
        requestPost(API.PHONE_VERIFICATION, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('response sendOtp', response)
                sendOtp(phoneNumber)
                setLoading(false)
                console.log('VerifyPhone phoneNumber--->', phoneNumber)
            }
            else {
                setSuccessAlert(false)
                setHeadingAlert(strings('global.error'))
                setDescriptionAlert('' + response.msg)
                setAlertModal(true)
                console.log('VerifyPhone phoneNumber--->', phoneNumber)
            }
        }).catch((error) => {
            setLoading(false)
            // alert('Server error please try again')
            setSuccessAlert(false)
            setHeadingAlert(strings('global.error'))
            setDescriptionAlert(strings('global.net_work_error'))
            setAlertModal(true)
            console.log('error verification phone', error)
        })
    }
    const sendOtp = (phoneNumber) => {
        setLoading(true)
        let formData = new FormData()
        formData.append("phone_no", phoneNumber)
        formData.append("language", languageBit === 'en' ? 1 : 2)
        console.log('sendOtp phoneNumber--->', phoneNumber)
        requestPost(API.SEND_OTP, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('response sendOtp', response)
                props.stateChange(SIGNUP_CHANGE_STATE, { 'confirmResult': response.otp })
                navigation.navigate('OtpSignUp')
                setLoading(false)
                console.log('sendOtp phoneNumber--->', phoneNumber)
            }
            else {
                setSuccessAlert(false)
                setHeadingAlert(strings('global.error'))
                setDescriptionAlert(strings('signup.please_try_again_and_check_your_phone_number'))
                // setDescriptionAlert('' + response.msg)
                setAlertModal(true)
            }
        }).catch((error) => {
            setLoading(false)
            // alert(error)
            setSuccessAlert(false)
            setHeadingAlert(strings('global.error'))
            setDescriptionAlert(error)
            setAlertModal(true)
            console.log('error sendOtp', error)
        })
    }
    // async function signInWithPhoneNumber(phone) {
    //     setLoading(true)
    //     auth().signInWithPhoneNumber(phone).then((confirmation) => {
    //         props.stateChange(SIGNUP_CHANGE_STATE, { loading: false, 'confirmResult': confirmation })
    //         navigation.navigate('OtpSignUp')
    //         setLoading(false)
    //     }).catch((error) => {
    //         alert(error)
    //         setLoading(false)
    //     })
    // }
    const signUpBtn = () => {
        inputcheck()
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <Image
                    style={styles.logoImg}
                    source={Icons.logoIcon}
                />
                <Text style={styles.loginHeading}>{strings("signup.customer_signup")}</Text>
                {/* <Text style={styles.loginDescription}>Welcome to <Text style={{ fontWeight: 'bold' }}> Customer </Text>{'\n'} Signup to continue</Text> */}
                <View style={styles.profileOuterContainer}>
                    <Image source={{ uri: profileImage }} style={styles.profileContainer} />
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => { setShowPickerModel(true) }}>
                        <Image
                            style={styles.profileCamera}
                            source={Icons.profileCameraIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.uploadTxt}>{strings("signup.please_upload_your_photo")}</Text>
                <FloatingLabelInputField
                    // inputContainer={{ marginTop: 10 }}
                    value={name}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings('signup.name')}
                    onChangeText={(text) => {
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'name': text })
                    }}
                />
                <FloatingLabelInputField
                    value={phone}
                    keyboardType={'number-pad'}
                    isRequired={true}
                    maxLength={14}
                    placeholder={strings('signup.phone')}
                    onFocus={() => {
                        if (phone.length == 0) {
                            props.stateChange(SIGNUP_CHANGE_STATE, { 'phone': '+92 ' })
                        }
                    }}
                    onChangeText={(text) => {
                        if (phone.length < text.length && text.length == 1) {
                            text = text.substring(1) + '+92 '
                        }
                        else if (phone.length < text.length && text.length == 4) {
                            text = '+92 '
                        }
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'phone': text })
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder={strings('signup.address')}
                    placeholderTextColor={'red'}
                    ref={autoPlaceRef}
                    value={address}
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'search'}
                    fetchDetails={true}
                    listViewDisplayed={false}
                    onPress={(data, details = null) => {
                        console.log('BusinessSetup', 'details', details.geometry.location.lat);
                        console.log('BusinessSetup', 'details', details.geometry.location.lng);
                        let postalItem = details.address_components.find((item) => {
                            console.log('item', item)
                            if (Array.isArray(item.types)) {
                                if (item.types.length > 0) {
                                    if (item.types[0] === 'postal_code') {
                                        return true
                                    }
                                }
                            }
                            return false
                        })
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'customerLat': details.geometry.location.lat })
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'customerLng': details.geometry.location.lng })
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'address': details.name })
                    }}
                    query={{
                        key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY', language: 'en', // language of the results
                        types: ['cities', 'geocode', 'addresses'], // default: 'geocode'
                    }}
                    textInputProps={{
                        placeholderTextColor: colors.grey
                    }}
                    styles={{
                        textInput: {
                            color: colors.grey,
                            fontSize: 16,
                            backgroundColor: colors.background,
                            // backgroundColor:'red',
                            marginLeft: -5,
                        },
                        textInputContainer: {
                            backgroundColor: colors.background,
                            borderBottomWidth: .5,
                            marginTop: 5,
                            borderTopColor: 'white',
                            paddingLeft: 0,
                            borderColor: colors.primary,
                            // marginRight: 15,
                            paddingBottom: 0,
                        }
                    }}

                    nearbyPlacesAPI='GooglePlacesSearch'
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe',
                    }}
                    GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: ['name', 'formatted_address', 'geometry'],
                    }}
                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                    debounce={200}
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
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'password': text })
                    }}
                />
                <View style={styles.radioBtnMainContainer}>
                    <TouchableOpacity 
                      onPress={() => {
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'isFemale': false})
                    }}
                    style={styles.radioBtn}>
                        <TouchableOpacity
                            onPress={() => {
                                props.stateChange(SIGNUP_CHANGE_STATE, { 'isFemale': false})

                            }}
                            style={styles.radioTouch}>
                            <View style={[styles.fillRadio,{backgroundColor: isFemale ? 'white' :colors.grey }]} />
                        </TouchableOpacity>
                        <Text style={styles.radioText}>{strings('signup.male')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     onPress={() => {
                        props.stateChange(SIGNUP_CHANGE_STATE, { 'isFemale': true})
                    }}
                    style={[styles.radioBtn, { marginLeft: 25 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                props.stateChange(SIGNUP_CHANGE_STATE, { 'isFemale': true})
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
                    loading={loadingInteral}
                />
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>{strings('signup.already_have_an_account')} <Text
                        onPress={() => { navigation.navigate('LoginScreen') }}
                        style={{ color: colors.grey, fontWeight: '500' }}>
                        {strings('signup.login')}</Text>
                    </Text>
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
            <Loader isShowIndicator={false} loading={loadingInteral} />
            <ImagePickerModel
                showPickerModel={showPickerModel}
                onHideModel={() => {
                    setShowPickerModel(false)
                }}
                handleChoosePhoto={handleChoosePhoto}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    const { signUpReducers } = state
    const { profileImage, name, phone, password, loading, address, customerLat, customerLng, confirmResult,isFemale } = signUpReducers
    return { profileImage, name, phone, password, loading, address, customerLat, customerLng, confirmResult,isFemale }
}
export default connect(mapStateToProps, { stateChange, signUpRequets, signUpResponse, signUpError })(SignUpScreen)