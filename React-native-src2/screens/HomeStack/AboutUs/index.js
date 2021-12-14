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

const AboutUs = (props) => {
    const { navigation } = props
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);

    useEffect(() => {
    }, []);


    const inputcheck = () => {
        if (name === "") {
            alert("Name is required");
        }
        else if (name.length < 6) {
            alert("Name must be of atleast 6 character");
        }
        else if ((/^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(email.trim()) == false) {
            alert('Email format is invalid')
        }
        else if (phone === '') {
            alert("Phone is required");
        }
        else if (message === "") {
            alert("Message is required");
        }
        else {
            contactUsApi()
        }
    };
    const contactUsApi = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("user_id", Preference.get('userObject').id)
        formData.append("user_image", { uri: profileImageForApi, name: moment().format('x') + '.jpg', type: 'image/jpeg' })
        requestPost(API.UPDATE_PICTURE, formData).then((response) => {
            setLoading(false)
            console.log('response', response)
            if (response.response_status === '1') {
            }
            else{
                Alert.alert(
                    "Error",
                    '' + response.msg,
                    [ { text: "OK", onPress: () => { } }]
                );
            }

        }).catch((error) => {
            setLoading(false)
            alert('Please try again')
            console.log('error', error)
        })
    }
    const editBtn = () => {
        inputcheck()
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header 
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={Icons.leftIcon}
                hearderText={strings("about_us_screen.header")}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftButtonIconStyle={{ width: 18, height: 18 }}
            />
            <ScrollView>
                <View style={{width:"100%",height:"100%",backgroundColor:"transparent"}}>
                    <Text style={{fontSize:16,color:"balck",margin:20,textAlign:"center",marginTop:30}}>{
                        strings("about_us_screen.maahir_is_a_way")+

                        strings("about_us_screen.finding_reliable")+
                    
                        strings("about_us_screen.we_bring")+
                        
                        strings("about_us_screen.each_maahir")+
                        
                        strings("about_us_screen.download_maahir")+

                        strings("about_us_screen.you_can_cnontact")
                    }</Text>
                </View>
            </ScrollView>
            <Loader loading={loadingInteral} />

        </SafeAreaView>
    );
};

export default AboutUs