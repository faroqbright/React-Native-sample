import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screens
import LandingScreen from './LandingScreen'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import OtpScreen from './OtpScreen'
import OtpSignUp from './OtpSignUp'
import OtpSignUpMaahir from './OtpSignUpMaahir'
import SliderScreen from './Slider/OnBoardingSlider'
import ForgotScreen from './ForgotScreen'
import ResetPasswordScreen from './ResetPassword'
import SignUpMaahir from './SignUpMaahir'
import signUpStepperMahir from './signUpStepperMahir'
import TermsCondition from './TermsCondition/'
/** Auth Stack of the app */
export default AuthStack = () => (
    <Stack.Navigator headerMode="none" initialRouteName='LandingScreen'>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="SliderScreen" component={SliderScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="OtpSignUp" component={OtpSignUp} />
        <Stack.Screen name="OtpSignUpMaahir" component={OtpSignUpMaahir} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="SignUpMaahir" component={SignUpMaahir} />
        <Stack.Screen name="signUpStepperMahir" component={signUpStepperMahir} />
        <Stack.Screen name="TermsCondition" component={TermsCondition} />
    </Stack.Navigator>
);