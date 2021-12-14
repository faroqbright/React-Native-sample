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
                hearderText={'About Us'}
                leftButtonIconStyle={{ width: 18, height: 18 }}
            />
            <ScrollView>
                <View style={{width:"100%",height:"100%",backgroundColor:"transparent"}}>
                    <Text style={{fontSize:16,color:"balck",margin:20,textAlign:"center",marginTop:30}}>{
                        "MAAHIR is a way forward, a convenience and the only source to connect local communities with the best technical manpower.\n\n"+

                        "Finding reliable technicians in any area of Pakistan is challenging. Pakistanis pay a heavy price to get the best service but most clients have unpleasent experiences, by either getting unsatisfactory work or by being overcharged.\n\n"+
                    
                        "We bring you the only platform that is genuinely fair to clients as well as hard working technicians. We work very hard to find skilled labor and list them on MAAHIR for you to connect with them.\n\n"+
                        
                        "Each MAAHIR has been fully screened and verified, trained for fair dealing and most importantly rated by all his clients to make sure our clients have multiple options and can make a good decision before hiring someone for any job.\n\n"+
                        
                        "Download MAAHIR on your Android phone today and experience the real change."
                    }</Text>
                </View>
            </ScrollView>
            <Loader loading={loadingInteral} />

        </SafeAreaView>
    );
};

export default AboutUs