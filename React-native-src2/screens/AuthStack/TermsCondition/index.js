import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
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
import ImagePickerModel from './../../../components/ImagePickerModel'
import moment from 'moment'
import Header from '../../../components/Header'
import Preference from 'react-native-preference'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {strings} from './../../../i18n';
//redux
import { API, requestPost } from "../../../network/Api";

const TermsCondition = (props) => {
    const { navigation } = props
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);

    useEffect(() => {
    }, []);


    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={Icons.leftIcon}
                hearderText={'Terms and Conditions'}
                leftButtonIconStyle={{ width: 18, height: 18 }}
            />
            <ScrollView>
                <View style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}>
                    <Text style={styles.text1}>{
                       strings("terms_and_conditions.bullet1") +"\n" +
                       strings("terms_and_conditions.bullet2") +"\n" +
                       strings("terms_and_conditions.bullet3") + "\n" +
                       strings("terms_and_conditions.bullet4") + "\n" +
                       strings("terms_and_conditions.bullet5") +
                       strings("terms_and_conditions.bullet6") + " \n"
                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.1")}</Text>
                    <Text style={styles.text1}>{strings("terms_and_conditions.1_point_1")+"\n" +
                        strings("terms_and_conditions.1_point_2")+ "\n" +
                        strings("terms_and_conditions.1_point_3")+ "\n" +
                        strings("terms_and_conditions.1_point_4")+ "\n"
                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.2")}</Text>
                    <Text style={styles.text1}>{
                        strings("terms_and_conditions.2_point_1")+"\n" +
                        strings("terms_and_conditions.2_point_2")+ "\n" +
                        strings("terms_and_conditions.2_point_3")+ "\n" +
                        strings("terms_and_conditions.2_point_4")+ "\n"
                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.3")}</Text>
                    <Text style={styles.text1}>{
                        strings("terms_and_conditions.3_point_1")+"\n" +
                        strings("terms_and_conditions.3_point_2")+ "\n" +
                        strings("terms_and_conditions.3_point_3")+ "\n" +
                        strings("terms_and_conditions.3_point_4")+ "\n" +
                        strings("terms_and_conditions.3_point_5")+ "\n" +
                        strings("terms_and_conditions.3_point_6")+ "\n" +
                        strings("terms_and_conditions.3_point_7")+ "\n" +
                        strings("terms_and_conditions.3_point_8")+ "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.4")}</Text>
                    <Text style={styles.text1}>{
                      strings("terms_and_conditions.4_point_1")  +"\n"+
                      strings("terms_and_conditions.4_point_2")    +"\n"+
                      strings("terms_and_conditions.4_point_3")    +"\n"+
                      strings("terms_and_conditions.4_point_4")   +"\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.5") }</Text>
                    <Text style={styles.text1}>{
                        strings("terms_and_conditions.5_point_1") +"\n" +
                        strings("terms_and_conditions.5_point_2") +  "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.6")}</Text>
                    <Text style={styles.text1}>{
                      strings("terms_and_conditions.6_point_1") +  "\n" +
                      strings("terms_and_conditions.6_point_2") +  "\n" +
                      strings("terms_and_conditions.bullet7") +  "\n" +
                      strings("terms_and_conditions.bullet8") +  "\n" +
                      strings("terms_and_conditions.bullet9") +  "\n" +
                      strings("terms_and_conditions.bullet10") +  "\n" +
                      strings("terms_and_conditions.bullet11") +  "\n" +
                      strings("terms_and_conditions.bullet12") +  "\n" +
                      strings("terms_and_conditions.bullet13") +  " \n" +
                      strings("terms_and_conditions.bullet14") +  "\n" +
                      strings("terms_and_conditions.bullet15") +  "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.7")}</Text>
                    <Text style={styles.text1}>{
                       strings("terms_and_conditions.7_point_1") + "\n" +
                       strings("terms_and_conditions.7_point_2") + "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.8")}</Text>
                    <Text style={styles.text1}>{
                       strings("terms_and_conditions.8_point_1")+ "\n" +
                       strings("terms_and_conditions.8_point_2")+ "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.9")}</Text>
                    <Text style={styles.text1}>{
                          strings("terms_and_conditions.9_point_1")+ "\n" +
                          strings("terms_and_conditions.9_point_2")+ "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.10")}</Text>
                    <Text style={styles.text1}>{
                    strings("terms_and_conditions.10_point_1")+ "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.11")}</Text>
                    <Text style={styles.text1}>{
                      strings("terms_and_conditions.11_point_1")+   "\n"

                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.12")}</Text>
                    <Text style={styles.text1}>{
                       strings("terms_and_conditions.12_point_1")+  "\n"
                    }</Text>
                    <Text style={styles.text2}>{strings("terms_and_conditions.13")}</Text>
                    <Text style={styles.text1}>{
                      strings("terms_and_conditions.13_point_1")+   "\n"
                    }</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TermsCondition