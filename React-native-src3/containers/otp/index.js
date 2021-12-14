import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Preference from 'react-native-preference';
import { StackActions } from '@react-navigation/native';
import { images } from '../../assets/images';
import { styles } from './styles';
import OTPInput from '../../components/OTPInput';
import { isRTL, strings } from '../../i18n';
import { showWarningMsg } from '../../utils';
import { otpVerificationAPI } from '../../API/methods/auth';
import Loader from '../../components/loader1';

const otp = props => {
  const otpInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const verifyOtp = () => {
    let otp = otpInputRef.current.getCode();
    console.log("OTPGenerated: ", otp)
    if (otp.length == 4) {
      otpApi(otp);
    } else {
      showWarningMsg('Otp not correct!');
      console.log(otp.length);
    }
  };
  const otpApi = async otp => {
    let userData = Preference.get('user');
    setLoading(true);
    try {
      //const params = new URLSearchParams();
      let body = {
        "phoneNumber": "" + userData.phoneNumber,
        "otp": 1234,
        "fcmToken": "abcdefghijklmnop"
      }
      //params.append('phoneNumber', userData.phoneNumber);
      //params.append('otp', 1234);
      //params.append('fcmToken', 'lsdnvlkndlvknlnlndfvlknf');
      console.log('OTP-apiData', JSON.stringify(body));
      const response = await otpVerificationAPI(body);
      setLoading(false);
      if (response.status === 200) {
        Preference.set('authUser', 2);
        Preference.set('token', response?.data?.data?.token || null);
        console.log('otpVerification-response', response);
        Preference.set('user', response?.data?.data);
        console.log('DATASavedPrefference: ', JSON.stringify(Preference.get('user')))
        props.navigation.reset({ index: 0, routes: [{ name: 'bottomTab' }] });
      }
    } catch ({ error }) {
      setLoading(false);
      // if(error.message == "Request failed with status code 400"){
      console.log('otpVerification-error', error);
      showWarningMsg('Otp not correct!');
      // }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={images.backgroundImgAuth}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
          <Ionicons name={"chevron-back"} color={"white"} size={26} />
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:"center",alignItems:"center",paddingBottom:30}}>
        <View style={styles.mainView}>
          <Text style={styles.titleText}>{strings('otp.enter_code')}</Text>
          <View style={styles.otpView}>
            <OTPInput ref={otpInputRef} />
          </View>
          <TouchableOpacity
            onPress={() => {
              verifyOtp();
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {strings('register_now.register')}
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        <Loader showLoading={loading} />
      </ImageBackground>
    </View>
  );
};

export default otp;
