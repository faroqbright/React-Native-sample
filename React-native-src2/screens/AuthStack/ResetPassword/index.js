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
} from "react-native";
import { styles } from "./Styles";
import InputField from './../../../components/RegistrationInput'
import Button from './../../../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './../../../assets/icons/'
import colors from "../../../utils/colors";
import Fonts from './../../../assets/fonts/'
import Loader from './../../../components/Loader'
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'
import AlertModal from './../../../components/AlertModal'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {strings} from './../../../i18n';

//redux
import { connect } from 'react-redux'
import { RESET_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import { resetResponse, resetRequets, resetError } from '../../../Actions/resetPasswordActions'
import { API, requestPost } from "../../../network/Api";
const ResetPasswordScreen = (props) => {
    const { navigation, tokenForReset, loading } = props
    const [password, setPassword] = useState('');
    const [isHidePassword, setHidePassword] = useState(true);
    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        setPassword('')
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
        if (password === "") {
            // alert("password  is required");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.password_req"))
            setAlertModal(true)
        }
        else if (password.length < 3) {
            // alert("password must be atleast 8 character");
            setSuccessAlert(false)
            setHeadingAlert(strings("validations.field_error"))
            setDescriptionAlert(strings("validations.password_length"))
            setAlertModal(true)
        }
        else {
            let formData = new FormData()
            formData.append("password", password)
            formData.append("token", tokenForReset)
            formData.append("language", languageBit === 'en' ? 1 : 2)
            props.resetRequets(password, tokenForReset)
            requestPost(API.RESET_PASSWORD, formData).then((response) => {
                props.resetResponse(response)
                console.log('response', response)
                if (response.response_status === '1') {
                    console.log('reset api--> ', response)
                    navigation.navigate('LoginScreen')
                }
                else{
                    // Alert.alert(
                    //     "Error",
                    //     '' + response.msg,
                    //     [ { text: "OK", onPress: () => { } }]
                    // );
                    setSuccessAlert(false)
                    setHeadingAlert(strings('global.error'))
                    setDescriptionAlert(''+response.msg)
                    setAlertModal(true)
                }
            }).catch((error) => {
                props.resetError(error)
                console.log('error', error)
            })
        }
    };
    const resetBtn = () => {
        inputcheck()
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ marginTop: 60, justifyContent: 'center' }}>
                <Text style={styles.loginHeading}>{strings('reset_password.reset_password')}</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                        <Image
                            style={[styles.backBtn, { transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]}
                            source={Icons.leftIcon}
                        />
                    </TouchableOpacity>
            </View>
                <Text style={styles.loginDescription}>{strings('reset_password.reset_password')}</Text>
                 <FloatingLabelInputField
                    value={password}
                    rightIcon={true}
                    isRequired={true}
                    maxLength={30}
                    isRight={true}
                    placeholder={strings('reset_password.new_password')}
                    secureTextEntry={isHidePassword}
                    onRightIconPress={() => {
                        setHidePassword(!isHidePassword)
                    }}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                />
                <Button
                    text={strings('reset_password.reset_password')}
                    textStyle={{ fontSize: 17, fontFamily: Fonts.Medium, lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 33 }}
                    clickAction={resetBtn}
                    loading={loading}
                />
            </KeyboardAwareScrollView>
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
    const { forgotReducers, resetPasswordReducers } = state
    const { tokenForReset } = forgotReducers
    const { loading } = resetPasswordReducers
    return { tokenForReset, loading }
}

export default connect(mapStateToProps, { stateChange, resetResponse, resetRequets, resetError })(ResetPasswordScreen)
