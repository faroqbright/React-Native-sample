import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    Alert,
    BackHandler,
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
import FloatingLabelInputField from './../../../components/FloatingLabelInputField'

//redux
import { API, requestPost } from "../../../network/Api";
import {strings} from './../../../i18n';
import AsyncStorage from "@react-native-async-storage/async-storage";
const EditProfile = (props) => {
    const { navigation } = props
    // const [loading, setLoading] = useState(false);
    const autoPlaceRef = useRef(null)
    const [profileImage, setProfileImage] = useState('');
    const [profileImageForApi, setProfileImageForApi] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [addressPlace, setPlaceHolder] = useState('Address *');
    const [loadingInteral, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [showPickerModel, setShowPickerModel] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        getProfileDetail()
        checkingLanguageBit()

        const backAction = () => {
            Alert.alert(strings('edit_profile.warning'),strings('edit_profile.are_you_sure_you_want_to_go_back_your_data_will_be_lost'), [
              {
                text: strings('global.cancel'),
                onPress: () => null,
                style: "cancel"
              },
              { text: strings('global.ok'), onPress: () => {navigation.goBack()} }
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
      
          return () => backHandler.remove();
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
        if(lang==='urdu'){
            setPlaceHolder('پتہ *')
        }
    }
    const handleChoosePhoto = (response) => {
        if (response.didCancel) {
            //// console.log('User cancelled image picker');
        } else if (response.error) {
            //// console.log('ImagePickerModel Error: ', response.error);
        } else {
            const source = { uri: response.uri };
            setProfileImage(response.uri)
            setProfileImageForApi(response.uri)
        }
    }
    const getProfileDetail = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("customer_id", Preference.get('userObject').id)
        formData.append("customer_token", Preference.get('userObject').token)
        requestPost(API.CUSTOMER_PROFILE, formData).then((response) => {
            setLoading(false)
            console.log('response getProfileDetail', response)
            if (response.response_status === '1') {
                if (response.data.details.avatar != '') {
                    setProfileImage(response.data.details.avatar)
                }
                setName(response.data.details.first_name)
                setPhone(response.data.details.mobile)
                setAddress(response.data.details.address)
                if (response.data.details.address != '') {
                    setPlaceHolder(response.data.details.address)
                }
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getProfileDetail', error)
        })
    }
    const inputcheck = () => {
        if (name === "" ) {
            alert(strings("validations.name_req"));
        }
        else if (/^[a-zA-Z ]+$/gi.test(name.trim()) == false) {
            alert("Name contain only alphabets character");
        }
        else if (address === "") {
            alert("validations.address_req");
        }
        else {
            if (profileImageForApi === '') {
                console.log('call without image')
                updateProfileDetail()
            }
            else {
                console.log('call image')
                updateProfileImage()
            }
        }
    };
    const updateProfileDetail = () => {
        setUpdateLoading(true)
        let formData = new FormData()
        console.log('id->',Preference.get('userObject').id)
        formData.append("user_id", Preference.get('userObject').id)
        formData.append("name", name)
        formData.append("address", address)
        requestPost(API.UPDATE_CUSTOMER, formData).then((response) => {
            console.log('response', response)
            setUpdateLoading(false)
            if (response.response_status === '1') {
                Alert.alert(
                    strings('global.success'),
                    '' + response.msg,
                    [
                        { text:  strings('global.ok'), onPress: () => { navigation.goBack() } }
                    ]
                );
            }
            else{
                Alert.alert(
                    strings('global.error'),
                    '' + response.msg,
                    [ { text: "OK", onPress: () => { } }]
                );
            }
        }).catch((error) => {
            setUpdateLoading(false)
            alert( strings('global.net_work_error'))
            console.log('error', error)
        })
    }
    const updateProfileImage = () => {
        setUpdateLoading(true)
        let formData = new FormData()
        formData.append("user_id", Preference.get('userObject').id)
        formData.append("user_image", { uri: profileImageForApi, name: moment().format('x') + '.jpg', type: 'image/jpeg' })
        requestPost(API.UPDATE_PICTURE, formData).then((response) => {
            setUpdateLoading(false)
            console.log('response', response)
            if (response.response_status === '1') {
                updateProfileDetail()
            }
            else{
                Alert.alert(
                    strings('global.error'),
                    '' + response.msg,
                    [ { text: strings('global.ok'), onPress: () => { } }]
                );
            }

        }).catch((error) => {
            setUpdateLoading(false)
            alert(strings('global.net_work_error'))
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
                onLeftAction={() => {
                    Alert.alert(strings('edit_profile.warning'),strings('edit_profile.are_you_sure_you_want_to_go_back_your_data_will_be_lost'), [
                        {
                          text: strings('global.cancel'),
                          onPress: () => null,
                          style: "cancel"
                        },
                        { text: strings('global.ok'), onPress: () => {navigation.goBack()} }
                      ]);
                    }}
                leftIcon={Icons.leftIcon}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                hearderText={strings("edit_profile.header")}
                leftButtonIconStyle={{ width: 18, height: 18,transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
            />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View style={styles.profileOuterContainer}>
                    <Image source={profileImageForApi === '' ? { uri: API.IMAGE_URL + profileImage } : { uri: profileImageForApi }} style={styles.profileContainer} />
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={() => { setShowPickerModel(true) }}>
                        <Image
                            style={styles.profileCamera}
                            source={Icons.profileCameraIcon}
                        />
                    </TouchableOpacity>
                </View>
                     <FloatingLabelInputField
                    value={name}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings('edit_profile.name')}
                    onChangeText={(text) => {
                        setName(text)                    }}
                />
                 <FloatingLabelInputField
                    value={phone}
                    // keyboardType={'number-pad'}
                    editable={false}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings('edit_profile.phone_number')}
                    onChangeText={(text) => {
                        setPhone(text)
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder={addressPlace }
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
                        setAddress(details.name)
                        // props.stateChange(SIGNUP_CHANGE_STATE, { 'customerLat': details.geometry.location.lat })
                        // props.stateChange(SIGNUP_CHANGE_STATE, { 'customerLng': details.geometry.location.lng })
                        // props.stateChange(SIGNUP_CHANGE_STATE, { 'address': details.name })
                    }}
                    query={{
                        key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY', language: 'en', // language of the results
                        types: ['cities', 'geocode', 'addresses'], // default: 'geocode'
                    }}
                    styles={{
                        textInput: {
                            color: colors.grey,
                            fontSize: 16,
                            backgroundColor: colors.background,
                        },
                        textInputContainer: {
                            backgroundColor: colors.background,
                            borderBottomWidth: .5,
                            marginTop: 5,
                            borderTopColor: 'white',
                            paddingLeft: 0,
                            borderColor: colors.primary,
                            marginRight: 15,
                            paddingBottom: 0,
                        }
                    }}
                    textInputProps={{
                        placeholderTextColor:colors.grey,
                        marginLeft:-5
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
                <Button
                    text={strings('edit_profile.update')}
                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 43, marginBottom: 30 }}
                    innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange }}
                    clickAction={editBtn.bind(this)}
                    loading={updateLoading}

                />
            </KeyboardAwareScrollView>
            <Loader  isShowIndicator={true} loading={loadingInteral} />
            <Loader  isShowIndicator={false} loading={updateLoading} />
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

export default EditProfile