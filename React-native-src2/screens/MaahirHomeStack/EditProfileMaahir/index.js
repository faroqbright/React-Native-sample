import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Keyboard,
    BackHandler
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
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import fonts from './../../../assets/fonts/'
import AsyncStorage from "@react-native-async-storage/async-storage";
//redux
import { API, requestPost, requestGet } from "../../../network/Api";
import { strings } from './../../../i18n';

const EditProfileMaahir = (props) => {
    const { navigation } = props
    const autoPlaceRef = useRef(null)
    const [showPickerModel, setShowPickerModel] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [profileImageForApi, setProfileImageForApi] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [phone, setPhone] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [homeAdrress, setHomeAdrress] = useState('');
    const [addressPlace, setPlaceHolder] = useState('Business Address *');
    const [loadingInteral, setLoading] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [cashMethod, setCashMethod] = useState(true)
    const [onlineMethod, setOnlineMethod] = useState(false)
    const [historyList, setHistoryList] = useState([]);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isShownPicker, setShownPicker] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [approvalList, setApprovalList] = useState([]);
    const [languageBit, setLanguage] = useState('en')


    useEffect(() => {
        checkingLanguageBit()
        getProfileDetail()
        getCategoryForPicker(0)
        const backAction = () => {
            Alert.alert("Warning", "Are you sure you want to go back your data will be lost ?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Ok", onPress: () => { navigation.goBack() } }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
            backHandler.remove()
        };

        // return () => backHandler.remove();
    }, []);
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
            setProfileImage(response.uri)
            setProfileImageForApi(response.uri)
        }
    }
    const getProfileDetail = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("maahir_id", Preference.get('maahirUserObject').id)
        formData.append("token", Preference.get('maahirUserObject').token)
        requestPost(API.MAAHIR_PROFILE, formData).then((response) => {
            setLoading(false)
            console.log('response getProfileDetail', response)
            if (response.response_status === '1') {
                if (response.data.details.avatar != '') {
                    setProfileImage(response.data.details.avatar)
                }
                setName(response.data.details.first_name)
                setPhone(response.data.details.mobile)
                setMonth(response.data.details.exp_month)
                setYear(response.data.details.exp_year)
                setAddress(response.data.details.business_address)
                setLat(response.data.details.lat)
                setLng(response.data.details.lng)
                setHomeAdrress(response.data.details.address)
                setName1(response.data.details.ref_namea)
                setName2(response.data.details.ref_nameb)
                setPhone1(response.data.details.ref_mobilea)
                setPhone2(response.data.details.ref_mobileb)
                setHistoryList(response.data.maahir_categories)
                setApprovalList(response.data.maahir_categories_for_approval)
                if (response.data.details.business_address != '') {
                    setPlaceHolder(response.data.details.business_address)
                }
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getProfileDetail', error)
        })
    }
    const inputcheck = () => {
        if (name === "") {
            alert(strings("validations.name_req"));
        }
        else if (/^[a-zA-Z ]+$/gi.test(name.trim()) == false) {
            alert(strings('validations.name_contain_only_alphabets_character'));
        }
        else if (year === '' || month === '') {
            alert(strings("validations.experience"));
        }
        else if (homeAdrress === "") {
            alert(strings("validations.home_address"));
        }
        else if (address === "") {
            alert(strings("validations.bussiness_address"));
        }
        else if (cashMethod === false && onlineMethod === false) {
            alert(strings("validations.payment_method"));
        }
        else {
            if (profileImageForApi === '') {
                console.log('call without image')
                updateProfileDetail()
            }
            else {
                console.log('call image')
                updateProfileImage()
                updateProfileDetail()
            }
        }
    };
    const updateProfileDetail = () => {
        setLoadingUpdate(true)
        let formData = new FormData()
        console.log('id->', Preference.get('maahirUserObject').id)
        formData.append("user_id", Preference.get('maahirUserObject').id)
        formData.append("name", name)
        formData.append("address", homeAdrress)
        formData.append("business_address", address)
        formData.append("payment_method", '1')
        formData.append("lat", lat)
        formData.append("lng", lng)
        formData.append("exp_year", year)
        formData.append("exp_month", month)
        requestPost(API.UPDATE_MAAHIR, formData).then((response) => {
            console.log('response', response)
            setLoadingUpdate(false)
            if (response.response_status === '1') {
                Alert.alert(
                    strings("global.success"),
                    strings("edit_profile.maahir_profile_save_successfully"),
                    [
                        { text: strings("global.ok"), onPress: () => { navigation.goBack() } }
                    ]
                );
            }
            else {
                Alert.alert(
                    strings("global.error"),
                    '' + response.msg,
                    [{ text: strings("global.ok"), onPress: () => { } }]
                );
            }

        }).catch((error) => {
            setLoadingUpdate(false)
            Alert.alert(
                strings("global.error"),
                '' + strings("global.net_work_error"),
                [{ text: strings("global.ok"), onPress: () => { } }]
            );
            console.log('error', error)
        })
    }
    const updateProfileImage = () => {
        setLoadingUpdate(true)
        let formData = new FormData()
        formData.append("user_id", Preference.get('maahirUserObject').id)
        formData.append("user_image", { uri: profileImageForApi, name: moment().format('x') + '.jpg', type: 'image/jpeg' })
        requestPost(API.UPDATE_PICTURE, formData).then((response) => {
            setLoadingUpdate(false)
            console.log('response', response)
            if (response.response_status === '1') {
            }
            else {
                Alert.alert(
                    strings("global.error"),
                    '' + response.msg,
                    [{ text: strings("global.ok"), onPress: () => { } }]
                );
            }

        }).catch((error) => {
            setLoadingUpdate(false)
            Alert.alert(
                strings("global.error"),
                '' + strings("global.net_work_error"),
                [{ text: strings("global.ok"), onPress: () => { } }]
            );
            console.log('error', error)
        })
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.itemContainer, {
                borderRadius: 8
            }]}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemHeading}>{item.category_name}</Text>
                </View>
            </View>
        );
    };
    const getCategoryForPicker = (checkBit) => {
        requestGet(API.GET_SERVICE_LIST).then((response) => {
            if (response.response_status === '1') {
                console.log('response service list', response)
                let list = []
                response.category.forEach(element => {
                    list.push({
                        value: element,
                        // value: element.id,
                        label: element.title
                    })
                });
                setItems(list)
                if (checkBit === 1) {
                    setShownPicker(true)
                }
            }
        }).catch((error) => {
            console.log('error service list', error)
        })

    }
    const editBtn = () => {
        inputcheck()
    }
    const categoriesUpdateBtn = () => {
        console.log('selectedItems', selectedItems)
        if (selectedItems.length > 3) {
            alert(strings('edit_profile.you_select_atmost_3_categories'))
        }
        else {
            categoriesUpdateApi()
        }
    }
    const categoriesUpdateApi = () => {
        setLoadingUpdate(true);
        let formData = new FormData();
        var catString = "";
        var subCategoryId = "";
        selectedItems.forEach((element) => {
            console.log(element.value.id);
            catString += element.value.id + ",";
            element?.value?.keywords.forEach((element1) => {
                subCategoryId +=
                    element1?.isSelected === true ? element1?.id + "," : "";
            });
        });

        console.log("subString ->", subCategoryId);
        const editedText = catString.slice(0, -1);
        const editedText2 = subCategoryId.slice(0, -1);
        console.log("catString", editedText);
        console.log("catString", editedText2);


        formData.append("category_ids", editedText);
        formData.append("subcategory_ids", editedText2);
        formData.append("maahir_id", Preference.get('maahirUserObject').id);
        formData.append("token", Preference.get('maahirUserObject').token);
        requestPost(API.UPDATE_MAAHIR_CATEGORIES, formData)
            .then((response) => {
                setLoadingUpdate(false);
                console.log("response", response);
                if (response.response_status === "1") {
                    alert(strings('edit_profile.categories_update_request_send_sucessfully'))
                } else {
                    alert("" + response.msg)
                }
            })
            .catch((error) => {
                setLoadingUpdate(false);
                console.log("error", error);
            });
    };
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => {
                    Alert.alert(
                        strings('edit_profile.warning'),
                        strings('edit_profile.are_you_sure_you_want_to_go_back_your_data_will_be_lost'),
                        [
                            { text: strings('global.cancel') },
                            { text: strings('global.ok'), onPress: () => { navigation.goBack() } }

                        ]
                    );
                }}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftIcon={Icons.leftIcon}
                hearderText={strings('edit_profile.header')}
                leftButtonIconStyle={{ width: 18, height: 18, transform: languageBit === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
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

                <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.name")}</Text>
                <FloatingLabelInputField
                    value={name}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings("edit_profile.name")}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                />
                <FloatingLabelInputField
                    editable={false}
                    value={phone}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings("edit_profile.phone_number")}
                    onChangeText={(text) => {
                        setPhone(text)
                    }}
                />
                <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.exp")}</Text>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                    <InputField
                        customStyle={{ marginRight: 5, width: 65 }}
                        maxLength={2}
                        tholder={'number-pad'}
                        isShowTitle={true}
                        txtPlacHolder={strings('global.years')}
                        val={year}
                        onChangeText={(text) => {
                            setYear(text)
                        }}
                    />
                    {/* <Text style={{fontSize:30}}>/</Text> */}
                    <InputField
                        maxLength={2}
                        tholder={'number-pad'}
                        customStyle={{ marginRight: 0, width: 80 }}
                        isShowTitle={true}
                        txtPlacHolder={strings('global.month')}
                        val={month}
                        onChangeText={(text) => {
                            setMonth(text)
                        }}
                    />
                </View>

                <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.ref")}</Text>
                <InputField
                    customStyle={{ marginTop: 5, marginRight: 0, }}
                    isShowTitle={true}
                    txtPlacHolder={strings('global.name')}
                    val={name1}
                    editable={false}
                    onChangeText={(text) => {
                        setName1(text)
                    }}
                />

                <InputField
                    customStyle={{ marginRight: 0, }}
                    isShowTitle={true}
                    editable={false}
                    txtPlacHolder={strings("edit_profile.phone_number")}
                    val={phone1}
                    tholder={'number-pad'}
                    maxLength={14}
                    onChangeText={(text) => {
                        setPhone1(text)

                    }}
                />
                <InputField
                    customStyle={{ marginRight: 0, }}
                    isShowTitle={true}
                    editable={false}
                    txtPlacHolder={strings("edit_profile.name")}
                    val={name2}
                    onChangeText={(text) => {
                        setName2(text)
                    }}
                />
                <InputField
                    customStyle={{ marginRight: 0 }}
                    isShowTitle={true}
                    txtPlacHolder={strings("edit_profile.phone_number")}
                    val={phone2}
                    editable={false}
                    maxLength={14}
                    tholder={'number-pad'}
                    onChangeText={(text) => {
                        setPhone2(text)
                    }}
                />

                <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.address_identity")}</Text>

                <FloatingLabelInputField
                    value={homeAdrress}
                    // keyboardType={'number-pad'}
                    isRequired={true}
                    // maxLength={14}
                    placeholder={strings("edit_profile.home_address")}
                    onChangeText={(text) => {
                        setHomeAdrress(text)
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder={addressPlace}
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
                        setLat(details.geometry.location.lat)
                        setLng(details.geometry.location.lng)
                        // props.stateChange(SIGNUP_CHANGE_STATE, { 'customerLat': details.geometry.location.lat })
                        // props.stateChange(SIGNUP_CHANGE_STATE, { 'customerLng': details.geometry.location.lng })
                        // props.stateChange(SIGNUP_CHANGE_STATE, { 'address': details.name })
                    }}
                    query={{
                        key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY', language: 'en', // language of the results
                        types: ['cities', 'geocode', 'addresses'], // default: 'geocode'
                    }}
                    textInputProps={{
                        placeholderTextColor: colors.grey,
                        marginLeft: -5
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
                            // marginRight: 15,
                            paddingBottom: 0
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
                <View>
                    <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.categories")}</Text>
                    <FlatList
                        numColumns={2}
                        data={historyList}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        // contentContainerStyle={}
                        renderItem={renderItem}
                    />
                </View>
                {approvalList.length > 0 ?
                    <View>
                        <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.categories_approval")}</Text>
                        <FlatList
                            numColumns={2}
                            data={approvalList}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            // contentContainerStyle={}
                            renderItem={renderItem}
                        />
                    </View>
                    :
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss()
                                if (items.length === 0) {
                                    getCategoryForPicker(1)
                                }
                                else {
                                    setShownPicker(!isShownPicker)
                                }
                            }}
                            style={{ height: 55, width: '100%', justifyContent: 'center', borderBottomColor: colors.primary, borderBottomWidth: .5, marginTop: 15 }}
                        >
                            <Text style={{ marginLeft: 5, fontFamily: fonts.Regular, fontSize: 16, color: colors.grey }}>{strings("edit_profile.edit_categrories")} <Text style={{ color: 'red' }}>*</Text></Text>
                        </TouchableOpacity>
                        {isShownPicker ?
                            <View>
                                <Text style={styles.indicationTextStyle}>{strings('signup.please_select_atleast_1_and_maximum_3_categories')}</Text>
                                <MultipleSelectPicker
                                    items={items}
                                    onSelectionsChange={(ele) => {
                                        setSelectedItems(ele)
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'selectedItems': ele })
                                        setShownPicker(!isShownPicker)
                                    }}
                                    selectedItems={selectedItems}
                                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                            </View>
                            : null
                        }
                        <View style={{ marginTop: 10 }}>
                            {(selectedItems || []).map((item, index) => {
                                return <View style={{ width: '100%', marginTop: 5 }}>
                                    <Text style={{ color: colors.secondary, fontWeight: 'bold', fontSize: 16, }} key={index}>
                                        {' ' + (index + 1) + ' : ' + item.label}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 10 }}>
                                        {
                                            (item.value.keywords || []).map((item1, index1) => {
                                                // console.log('item1', item)
                                                return <TouchableOpacity
                                                    onPress={() => {
                                                        let tempArray = []
                                                        tempArray = [...selectedItems]
                                                        console.log(tempArray[index].value.keywords[index1])
                                                        tempArray[index].value.keywords[index1].isSelected = tempArray[index].value.keywords[index1].isSelected == true ? false : true
                                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'selectedItems': tempArray })
                                                        setSelectedItems(tempArray)
                                                    }}
                                                    style={item1.isSelected === true ? styles.selectedBtn : styles.unSelectedBtn}>
                                                    <Text style={{ color: item1.isSelected === true ? colors.white : colors.primary, textAlign: 'center', }} key={index1}>
                                                        {item1.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            })
                                        }
                                    </View>

                                </View>
                            })}
                            {selectedItems.length > 0 &&
                                <View>
                                    <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16, }}>
                                        {'Note:'}
                                    </Text>
                                    <Text style={{ color: colors.secondary, fontWeight: 'bold', fontSize: 14, textAlign: 'left', marginTop: 5 }}>
                                        {'Your previous categories will be remove after admin approval of new categories.'}
                                    </Text>
                                    <Button
                                        text={strings("edit_profile.update_categories")}
                                        textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                                        backgroundColorStyle={{ borderRadius: 14, marginTop: 13, marginBottom: 0 }}
                                        innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange }}
                                        clickAction={categoriesUpdateBtn.bind(this)}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                }











                <Text style={{ fontSize: 16, color: "black", marginTop: 20, fontWeight: "bold" }}>{strings("edit_profile.pay_info")}</Text>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Button
                        text={strings("edit_profile.cash")}
                        textStyle={cashMethod === false ? styles.unSelectTxt : styles.selectTxt}
                        backgroundColorStyle={cashMethod === false ? [styles.unselectBackground, { marginLeft: 0 }] : [styles.selectBackground,]}
                        innerContainerCustomStyle={cashMethod === false ? styles.unSelectInnerContainer : styles.selectInnerContainer}
                        clickAction={() => {
                            // setCashMethod(!cashMethod)
                        }}
                    />
                    {/* <Button
                        text={strings("edit_profile.online")}
                        textStyle={onlineMethod === false ? styles.unSelectTxt : styles.selectTxt}
                        backgroundColorStyle={onlineMethod === false ? styles.unselectBackground : [styles.selectBackground, { marginLeft: 10 }]}
                        innerContainerCustomStyle={onlineMethod === false ? styles.unSelectInnerContainer : styles.selectInnerContainer}
                        clickAction={() => {
                            setOnlineMethod(!onlineMethod)
                        }}
                    /> */}
                </View>

                <Button
                    text={strings("edit_profile.update")}
                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                    backgroundColorStyle={{ borderRadius: 14, marginTop: 43, marginBottom: 30 }}
                    innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange }}
                    clickAction={editBtn.bind(this)}
                    loading={loadingUpdate}
                />
            </KeyboardAwareScrollView>
            <Loader isShowIndicator={true} loading={loadingInteral} />
            <Loader isShowIndicator={false} loading={loadingUpdate} />
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

export default EditProfileMaahir