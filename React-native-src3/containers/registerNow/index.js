import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import Preference from 'react-native-preference';
import { images } from '../../assets/images';
import { styles } from './styles';
import { isRTL, strings } from '../../i18n';
import { showWarningMsg } from '../../utils';
import Loader from '../../components/loader1';
import KeyboardAccessoryView from '../../components/KeyboardAccessoryView';
import {
    checkNumberAPI,
    signupAPI
} from '../../API/methods/auth';

const lang = Preference.get('language');
const inputAccessoryViewID = "RegisterNow";
const index = props => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const checkNumber = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('phoneNumber', phoneNumber);
            // params.append('otp', 1234);
            console.log('checkNumber-apiData', JSON.stringify(params));
            const response = await checkNumberAPI(params);
            setLoading(false);
            if (response.status === 200) {
                if (response.data.status == 1) {
                    generateOtp()
                } else {
                    props.navigation.navigate('RegisterStep2', { phoneNumber: phoneNumber });
                }
            }
            console.log('checkNumber-response', response.data.status);
        } catch (error) {
            setLoading(false);
            console.log('checkNumber-error', error);
        }
    };
    const generateOtp = () => {
        //const code = Math.floor(1000 + Math.random() * 9000);
        const code = 1234
        Preference.set("OTP", code);
        sendOtp(code);
        console.log("OTP", code)
    }
    const sendOtp = (otp) => {
        return fetch(`https://www.hisms.ws/api.php?send_sms&username=966560060662&password=Aa@120Ss&numbers=${phoneNumber}&sender=Active-code&message=Dear%20Qetafi%20customer,%20One%20Time%20Password%20(${otp})%20is%20`)
            .then(response => {
                console.log("OTP Sent", response);
                saveOtp(otp)
                // props.navigation.navigate('Otp');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const saveOtp = async (otp) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('phoneNumber', phoneNumber);
            params.append('otp', otp);
            console.log('saveOtp-apiData', JSON.stringify(params));
            const response = await signupAPI(params);
            setLoading(false);
            if (response.status === 200) {
                console.log("USERDATA:", JSON.stringify(response) )
                Preference.set('user', response.data.data);
                // Preference.set('authUser', 1);
                props.navigation.navigate('Otp');
            }
            console.log('saveOtp-response', response.data.status);
        } catch (error) {
            setLoading(false);
            console.log('saveOtp-error', error);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={images.backgroundImgAuth}>
                <View style={styles.mainView}>
                    <Image source={images.splashIcon} style={{ alignSelf: 'center', height: 95, width: 80 }} />

                    {/* <Text style={styles.titleText}>{strings('register_now.register_now')}</Text> */}
                    <Text style={styles.textInputTitle}>{strings('register_now.tel_num')}</Text>
                    <TextInput
                        value={phoneNumber}
                        style={styles.textInput}
                        placeholderTextColor="#FFFFFF90"
                        keyboardType="number-pad"
                        placeholder={strings('register_now.tel_num_placeholder')}
                        onChangeText={(text) => {
                            setPhoneNumber(text)
                        }}
                        maxLength={13}
                        inputAccessoryViewID={inputAccessoryViewID}
                        onSubmitEditing={()=>Keyboard.dismiss()}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            const reg = /^(\+92|0|92)[0-9]{11}$/;
                            let phoneNumReg = "/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/";
                            if (phoneNumber == '') {
                                showWarningMsg(strings('register_now.enter_number'))
                            }
                            else if (phoneNumber.length < 11) {
                                showWarningMsg(strings('register_now.invalid_number'))
                            }
                            // } else if (reg.test(phoneNumber) === false) {
                            //     showWarningMsg(strings('register_now.invalid_number'))
                            // }
                            else {
                                checkNumber()
                                // props.navigation.navigate('RegisterStep2', { phoneNumber: phoneNumber });
                            }
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>{strings('register_now.register')}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Loader showLoading={loading} />
            <KeyboardAccessoryView inputAccessoryViewID={inputAccessoryViewID} />
        </View>
    );
};

export default index;
