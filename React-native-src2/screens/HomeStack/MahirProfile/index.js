import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import {
    Alert, Dimensions, FlatList,
    Image,
    Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Preference from 'react-native-preference';
import { AirbnbRating } from 'react-native-ratings';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import SoundRecorder from 'react-native-sound-recorder';
import Video from 'react-native-video';
//redux
import { connect } from 'react-redux';
import { stateChange } from '../../../Actions/commonAction';
import { maahirBookError, maahirBookRequets, maahirBookResponse, maarhirDetailError, maarhirDetailRequets, maarhirDetailResponse } from '../../../Actions/maahirDetailActions';
import { API, requestPost } from "../../../network/Api";
import { isIPhoneX } from "../../../utils/Dimensions";
import Fonts from './../../../assets/fonts/';
import icons from './../../../assets/icons/';
import Button from './../../../components/Button';
import Header from './../../../components/Header';
import MainBackground from './../../../components/HomeBackGround';
import AvatarComponent from './../../../components/Image';
import Loader from './../../../components/Loader';
import { strings } from './../../../i18n';
import { default as Colors, default as colors } from './../../../utils/colors';
import { styles } from "./Styles";

const { width, height } = Dimensions.get('screen');

const MaahirProfile = (props) => {
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY';
    const { navigation, maahirId, serviceSelected, myLatitudeRedux, myLongitudeRedux, myAddressRedux, distance } = props
    const autoPlaceRef = useRef(null)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [appointmentLocation, setAppointmentLocation] = useState('Select Address');
    const [autoCompletePlaceholder, setAutoCompletePlaceholder] = useState('');
    const [appointmentLat, setAppointmentLat] = useState(null);
    const [appointmentLng, setAppointmentLng] = useState(null);
    const [isbookNowClick, setBookNowClick] = useState(true);
    const [show, setShow] = useState(false);
    const [loadingSkelton, setLoadingSkelton] = useState(false);
    const [loadingBookNowBtn, setLoadingBookNowBtn] = useState(false);
    const [loadingScheduleBtn, setLoadingScheduleBtn] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [audioTimer, setAudioTimer] = useState(0);
    const [audioRecording, setAudioRecording] = useState('');
    const [isPlay, setIsPlay] = useState(false);
    const [voiceAudio, setVoiceAudio] = useState('');
    const [languageBit, setLanguage] = useState('en')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };
    const [maahirData, setMaahirData] = useState('');
    const [maahirFirstName, setMaahirFirstName] = useState('');
    const [maahirLastName, setMaahirLastName] = useState('');
    const [explainProblem, setExplainProblem] = useState('');
    const [maahirProfileImage, setrofileImage] = useState(null);
    const [maahirPhone, setMaahirPhone] = useState('');
    const [historyList, setHistoryList] = useState([]);
    const [currentJobList, setCurrentJobList] = useState([]);
    const [bookNowModal, setBookNowModal] = useState(false);
    const [bookNowModal1, setBookNowModal1] = useState(false);
    const [bookingAlertModal, setBookingAlertModal] = useState(false);
    useEffect(() => {
        checkingLanguageBit()
        console.log('userData', Preference.get('userObject').address)
        console.log('redux lat', myLatitudeRedux)
        console.log('props lat', props.route.params.lati)
        console.log('props lat', props.route.params.adres)
        console.log('redux lng', myLongitudeRedux)
        getOneTimeLocation()
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const getOneTimeLocation = () => {
        setLoadingSkelton(true)
        console.log('Getting Location ... ')
        Geolocation.getCurrentPosition(
            (position) => {
                setLoadingSkelton(false)
                setAppointmentLat(Number(position.coords.latitude))
                setAppointmentLng(Number(position.coords.longitude))
                getDirectionApi(Number(position.coords.latitude), Number(position.coords.longitude))
            },
            (error) => {
                console.log('error ', error)
                setLoadingSkelton(false)
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };
    const getDirectionApi = (lat, lng) => {
        setLoadingSkelton(true)
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_APIKEY}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            }
        }).then(response => {
            setLoadingSkelton(false)
            console.log('popop', response.results[1]?.formatted_address)
            setAppointmentLocation(response.results[1]?.formatted_address)
            getMaahirDetail()
        }).catch(error => {
            setLoadingSkelton(false)
            console.log('Error:', error);
        });
    }
    const bookNowMahir = (isScheduled) => {
        
        // if (audioRecording === '') {
        //     alert(strings('maahir_profile.please_select_voice'))
        //     return;
        // }
        if (appointmentLocation != '' && appointmentLocation != 'Select Address' && appointmentLocation != undefined) {
            isScheduled ? setLoadingScheduleBtn(true) : setLoadingBookNowBtn(true)

            console.log('maahirId', myAddressRedux)
            console.log('date', moment(date).format('YYYY-MM-DD'))
            console.log('time', moment(date).format('HH:mm'))
            setBookNowModal(false)
            setBookNowModal1(false)
            let formData = new FormData()
            formData.append("customer_id", Preference.get('userObject').id)
            formData.append("maahir_id", maahirId)
            formData.append("category_id", serviceSelected)
            formData.append("customer_name", Preference.get('userObject').first_name)
            formData.append("detail", explainProblem)
            formData.append("date", moment(date).format('YYYY-MM-DD'))
            formData.append("time", moment(date).format('HH:mm'))
            formData.append("token", Preference.get('userObject').token)
            formData.append("lat", appointmentLat)
            formData.append("lng", appointmentLng)
            formData.append("address", appointmentLocation)
            formData.append("distance", distance)
            if (audioRecording != '') {
                let audioData = { uri: audioRecording, name: moment().format('x') + '.m4a', type: 'audio/x-m4a' }
                formData.append("voice_note", audioData)
            }
            props.maahirBookRequets(
                Preference.get('userObject').id,
                maahirId,
                serviceSelected,
                Preference.get('userObject').first_name,
                'XYZ',
                moment(date).format('DD:MM:YY'),
                moment(date).format('hh:mm A'),
                Preference.get('userObject').token
            )
            requestPost(API.BOOK_APPOINTMENT, formData).then((response) => {
                isScheduled ? setLoadingScheduleBtn(false) : setLoadingBookNowBtn(false)
                console.log('response booking', response)
                props.maahirBookResponse(response)
                if (response.response_status === '1') {
                    console.log('response BOOK_APPOINTMENT', response)
                    // alert(response.msg)
                    setBookNowModal1(false)

                    navigation.navigate('MyTabs', {
                        screen: 'RepairScreen',
                        params: {
                            screen: "Pending",
                        }
                    })
                }
                else if (response.response_status === '2') {
                    setBookNowModal1(false)

                    Alert.alert(
                        strings('global.error'),
                        '' + response.msg,
                        [{ text:strings('global.ok'), onPress: () => { } }]
                    );

                }
            }).catch((error) => {
                isScheduled ? setLoadingScheduleBtn(false) : setLoadingBookNowBtn(false)
                props.maahirBookError(error)
                console.log('error BOOK_APPOINTMENT', error)
            })
        }
        else {
            alert(strings('maahir_profile.please_select_address'))
        }
    }
    const renderInvitationModel = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={bookNowModal}>
                    <View
                        style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 15, right: 20 }}
                                onPress={() => {
                                    setBookNowModal(false)
                                    setShow(false)
                                }}>
                                <Image
                                    source={icons.crossIcon}
                                    style={{ width: 20, height: 20, resizeMode: 'contain', }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bookNowModalHeading}>{strings('maahir_profile.book_appointment_with_the_maahir')}</Text>
                            <View
                                style={{ marginTop: 24, width: '100%', backgroundColor: '#EDEDED', padding: 7, paddingTop: 7, paddingBottom: 7, borderRadius: 5 }}
                            >
                                {Platform.OS === 'android' ?
                                    <TouchableOpacity onPress={() => {
                                        showDatepicker()
                                    }}>
                                        <Text style={styles.dateHeading}>{strings('maahir_profile.date')}</Text>
                                        <Text style={styles.dateTxt}>{moment(date).format('YYYY-MM-DD')}</Text>
                                    </TouchableOpacity>
                                    :
                                    <View>
                                        <Text style={styles.dateHeading}>{strings('maahir_profile.date')}</Text>
                                        <View style={{ marginBottom: 0 }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                minimumDate={new Date()}
                                                value={date}
                                                mode={'date'}
                                                is24Hour={true}
                                                display="default"
                                                // display="inline"
                                                onChange={onChange}
                                            />
                                        </View>
                                    </View>
                                }
                            </View>
                            <View
                                style={{ marginTop: 10, width: '100%', backgroundColor: '#EDEDED', padding: 5, paddingTop: 7, paddingBottom: 7, borderRadius: 5 }}
                            >

                                {Platform.OS === 'android' ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            showTimepicker()
                                        }}>
                                        <Text style={styles.dateHeading}>{strings('maahir_profile.time')}</Text>
                                        <Text style={styles.dateTxt}>{moment(date).format('hh:mm A')}</Text>
                                    </TouchableOpacity>
                                    :
                                    <View>
                                        <Text style={styles.dateHeading}>{strings('maahir_profile.time')}</Text>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            minimumDate={new Date()}
                                            value={date}
                                            textColor="white"
                                            mode={'time'}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    </View>
                                }
                            </View>
                            <View style={{ borderRadius: 5, backgroundColor: '#EDEDED', padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: colors.primary, fontSize: 14, fontWeight: '700', fontFamily: Fonts.Bold, marginLeft: Platform.OS === 'ios' ? 5 : 0 }}
                                    // underlineColorAndroid="transparent"
                                    placeholder={strings('maahir_profile.explain_your_problem')}
                                    placeholderTextColor={colors.primary}
                                    autoCapitalize="none"
                                    value={explainProblem}
                                    onChangeText={(text) => {
                                        setExplainProblem(text)
                                    }} />
                            </View>



                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 9 }}>
                                <GooglePlacesAutocomplete
                                    placeholder={appointmentLocation}
                                    ref={autoPlaceRef}
                                    value={appointmentLocation}
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
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'maahirLat': details.geometry.location.lat })
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'maahirLng': details.geometry.location.lng })
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'address': details.name })
                                        setAppointmentLocation(details.name)
                                        setAutoCompletePlaceholder(details.name)
                                        setAppointmentLat(details.geometry.location.lat)
                                        setAppointmentLng(details.geometry.location.lng)
                                    }}
                                    query={{
                                        key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY', language: 'en', // language of the results
                                        types: ['cities', 'geocode', 'addresses'], // default: 'geocode'
                                    }}
                                    textInputProps={{
                                        placeholderTextColor: colors.primary
                                    }}
                                    styles={{
                                        textInput: {
                                            color: colors.primary,
                                            fontSize: 14,
                                            paddingLeft: 5,
                                            height: 50,
                                            fontFamily: Fonts.Bold,
                                            fontWeight: '700',
                                            backgroundColor: '#EDEDED',
                                            // backgroundColor:'red'
                                        },
                                        textInputContainer: {
                                            paddingLeft: 0,
                                            borderRadius: 5,
                                            backgroundColor: '#EDEDED',
                                            width: '90%',
                                            height: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }
                                    }}
                                    nearbyPlacesAPI='GooglePlacesSearch'
                                    GooglePlacesSearchQuery={{
                                        rankby: 'distance',
                                        type: 'cafe',
                                    }}
                                    GooglePlacesDetailsQuery={{
                                        fields: ['name', 'formatted_address', 'geometry'],
                                    }}
                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    debounce={200}
                                />
                                {/* <View
                                    style={{ borderRadius: 5, backgroundColor: '#EDEDED', padding: 7, width: '85%', height: 50, justifyContent: 'center', }}>
                                    <Text numberOfLines={1} style={{ color: '#CECECE', fontSize: 14, fontWeight: '700', fontFamily: Fonts.Bold, }} >{appointmentLocation === '' ? 'Select appointment address' : appointmentLocation}</Text>
                                </View> */}
                                <TouchableOpacity
                                    style={{ marginRight: 10, marginTop: 12 }}
                                    onPress={() => {
                                        setBookNowModal(false)
                                        setTimeout(() => {
                                            showMessage({
                                                message: strings('maahir_profile.long_press'),
                                                type: "info",
                                                duration: 7000
                                            });
                                            navigation.navigate('LocationSelector', {
                                                onMaahirProfile: (address, lat, lng) => {
                                                    setBookNowModal(true)
                                                    console.log('MMMMM', address, lat, lng)
                                                    if (address != undefined) {
                                                        setAppointmentLocation(address)
                                                        setAppointmentLat(lat)
                                                        setAppointmentLng(lng)
                                                    }
                                                    else {
                                                        alert(strings('maahir_profile.you_drop_pin'))
                                                    }
                                                }
                                            })
                                        }, 300);
                                    }}
                                >
                                    <Image
                                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                                        source={icons.locationMarkerIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: "100%",
                                height: 50,
                                flexDirection: 'row',
                                elevation: 10,
                                backgroundColor: '#EDEDED',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 8,
                                borderRadius: 7,
                                paddingLeft: 7,
                                paddingRight: 7
                            }}>
                                {audioRecording === '' &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (Platform.OS == 'android') {
                                                if (isRecording === true) {
                                                    stopRecording()
                                                }
                                                else {
                                                    checkPermission()
                                                }
                                            }
                                            else {
                                                if (isRecording === true) {
                                                    stopRecording()
                                                }
                                                else {
                                                    startRecording()
                                                }
                                            }
                                        }}
                                    >
                                        <Image
                                            resizeMode={'contain'}
                                            style={{ width: 25, height: 25 }}
                                            source={isRecording === true ? icons.recordIcon : icons.stopRecordIcon}
                                        />
                                    </TouchableOpacity>
                                }
                                {/* <Text style={{
                                    fontSize: 24,
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>{audioTimer < 10 ?
                                    '00:0' + audioTimer
                                    :
                                    parseInt(audioTimer / 60) === 0 ?
                                        '00:' + audioTimer % 60
                                        : (audioTimer % 60 < 10 && audioTimer / 60 < 10) ?
                                            '0' + parseInt(audioTimer / 60) + ':0' + audioTimer % 60
                                            : (audioTimer % 60 < 10) ?
                                                parseInt(audioTimer / 60) + ':0' + audioTimer % 60
                                                : '0' + parseInt(audioTimer / 60) + ':' + audioTimer % 60
                                    }
                                </Text>  */}
                                <Text style={{ marginRight: 10, fontSize: 12, fontWeight: 'bold', width: "50%", textAlign: "center" }}>{isRecording ? strings('global.recording_started') : audioRecording === '' ? strings('global.explain_your_problem_in_voice') : strings('global.recording_success')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    {audioRecording != '' &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (isPlay) {
                                                    setIsPlay(false)
                                                }
                                                else {
                                                    setIsPlay(true)
                                                }
                                            }}
                                            style={{ marginRight: 5 }}
                                        >
                                            <Image
                                                resizeMode={'contain'}
                                                style={{ width: 23, height: 23, }}
                                                source={isPlay ? icons.pauseIcon : icons.playIcon}
                                            />
                                        </TouchableOpacity>
                                    }
                                    {audioRecording != '' &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAudioRecording('')
                                                setAudioTimer(0)
                                            }}
                                        >
                                            <Image
                                                resizeMode={'contain'}
                                                style={{ width: 23, height: 23, }}
                                                source={icons.cancelRecordIcon}
                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <Button
                                text={'Confirm'}
                                textStyle={{ fontSize: 16, fontFamily: Fonts.Medium, lineHeight: 20, fontWeight: '500', color: Colors.white }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 24, height: 53 }}
                                innerContainerCustomStyle={{ height: 48 }}
                                clickAction={() => { bookNowMahir(true) }}
                            />
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
    const renderBookingAlertModal = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={bookingAlertModal}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { setBookingAlertModal(false) }}
                        style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            {/* <Text style={styles.detailTxt}>Details</Text>
                            <Text style={styles.alertDesText}>Repair orders will be prioritized in the order that they have been set up and received.</Text> */}
                            <Text style={styles.bookNowModalHeading}>{strings('maahir_profile.do_you_want_to_proceed')}</Text>
                           {languageBit==='en' ?
                            <Text style={styles.alertDesText}>You already have {maahirData?.my_current_appointments?.length} appointments in queue.</Text>
                            :
                            <Text style={styles.alertDesText}> {strings('maahir_profile.appointments_in_queue')+" "+maahirData?.my_current_appointments?.length +" "+strings('maahir_profile.you_already_have')}</Text>
                           }
                            <Button
                                text={strings('maahir_profile.accept')}
                                textStyle={{ fontSize: 16, fontFamily: Fonts.Medium, lineHeight: 20, fontWeight: '500', color: Colors.white }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 24, height: 53 }}
                                innerContainerCustomStyle={{ height: 48 }}
                                clickAction={acceptPreviousOrder}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
    const renderBookNowModel = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={bookNowModal1}>
                    <View
                        style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 15, right: 20 }}
                                onPress={() => {
                                    setBookNowModal1(false)
                                }}>
                                <Image
                                    source={icons.crossIcon}
                                    style={{ width: 20, height: 20, resizeMode: 'contain', }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bookNowModalHeading}>{strings('maahir_profile.book_appointment_with_the_maahir')}</Text>
                            <View
                                style={{ marginTop: 24, width: '100%', backgroundColor: '#EDEDED', padding: 7, paddingTop: 7, paddingBottom: 7, borderRadius: 5 }}
                            >
                                <Text style={styles.dateHeading}>{strings('maahir_profile.date')}</Text>
                                <Text style={styles.dateTxt}>{moment(date).format('YYYY-MM-DD')}</Text>
                            </View>
                            <View
                                style={{ marginTop: 10, width: '100%', backgroundColor: '#EDEDED', padding: 5, paddingTop: 7, paddingBottom: 7, borderRadius: 5 }}
                            >
                                <Text style={styles.dateHeading}>{strings('maahir_profile.time')}</Text>
                                <Text style={styles.dateTxt}>{moment(date).format('hh:mm A')}</Text>
                            </View>
                            <View style={{ borderRadius: 5, backgroundColor: '#EDEDED', padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: colors.primary, fontSize: 14, fontWeight: '700', fontFamily: Fonts.Bold, marginLeft: Platform.OS === 'ios' ? 5 : 0 }}
                                    // underlineColorAndroid="transparent"
                                    placeholder={strings('maahir_profile.explain_your_problem')}
                                    placeholderTextColor={colors.primary}
                                    autoCapitalize="none"
                                    value={explainProblem}
                                    onChangeText={(text) => {
                                        setExplainProblem(text)
                                    }} />
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 9 }}>
                                <GooglePlacesAutocomplete
                                    placeholder={appointmentLocation}
                                    ref={autoPlaceRef}
                                    value={appointmentLocation}
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
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'maahirLat': details.geometry.location.lat })
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'maahirLng': details.geometry.location.lng })
                                        // props.stateChange(MAAHIR_SIGNUP_CHANGE_STATE, { 'address': details.name })
                                        setAppointmentLocation(details.name)
                                        setAutoCompletePlaceholder(details.name)
                                        setAppointmentLat(details.geometry.location.lat)
                                        setAppointmentLng(details.geometry.location.lng)
                                    }}
                                    query={{
                                        key: 'AIzaSyAG8XBFKHqkH3iKweO_y3iC6kYvcwdsKxY', language: 'en', // language of the results
                                        types: ['cities', 'geocode', 'addresses'], // default: 'geocode'
                                    }}
                                    textInputProps={{
                                        placeholderTextColor: colors.primary
                                    }}
                                    styles={{
                                        textInput: {
                                            color: colors.primary,
                                            fontSize: 14,
                                            paddingLeft: 5,
                                            height: 50,
                                            fontWeight: '700',
                                            backgroundColor: '#EDEDED',
                                            // backgroundColor:'red'
                                        },
                                        textInputContainer: {
                                            paddingLeft: 0,
                                            borderRadius: 5,
                                            backgroundColor: '#EDEDED',
                                            width: '90%',
                                            height: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }
                                    }}
                                    nearbyPlacesAPI='GooglePlacesSearch'
                                    GooglePlacesSearchQuery={{
                                        rankby: 'distance',
                                        type: 'cafe',
                                    }}
                                    GooglePlacesDetailsQuery={{
                                        fields: ['name', 'formatted_address', 'geometry'],
                                    }}
                                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                                    debounce={200}
                                />
                                {/* <View
                                    style={{ borderRadius: 5, backgroundColor: '#EDEDED', padding: 7, width: '85%', height: 50, justifyContent: 'center', }}>
                                    <Text numberOfLines={1} style={{ color: '#CECECE', fontSize: 14, fontWeight: '700', fontFamily: Fonts.Bold, }} >{appointmentLocation === '' ? 'Select appointment address' : appointmentLocation}</Text>
                                </View> */}
                                <TouchableOpacity
                                    style={{ marginRight: 10, marginTop: 12 }}
                                    onPress={() => {
                                        setBookNowModal1(false)
                                        setTimeout(() => {
                                            showMessage({
                                                message: strings('maahir_profile.long_press'),
                                                type: "info",
                                                duration: 7000
                                            });
                                            navigation.navigate('LocationSelector', {
                                                onMaahirProfile: (address, lat, lng) => {
                                                    setBookNowModal1(true)
                                                    console.log('MMMMM', address, lat, lng)
                                                    if (address != undefined) {
                                                        setAppointmentLocation(address)
                                                        setAppointmentLat(lat)
                                                        setAppointmentLng(lng)
                                                    }
                                                    else {
                                                        alert(strings('maahir_profile.you_drop_pin'))
                                                    }
                                                }
                                            })
                                        }, 300);
                                    }}>
                                    <Image
                                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                                        source={icons.locationMarkerIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: "100%",
                                height: 50,
                                flexDirection: 'row',
                                elevation: 10,
                                backgroundColor: '#EDEDED',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 8,
                                borderRadius: 7,
                                paddingLeft: 7,
                                paddingRight: 7
                            }}>
                                {audioRecording === '' &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (Platform.OS == 'android') {
                                                if (isRecording === true) {
                                                    stopRecording()
                                                }
                                                else {
                                                    checkPermission()
                                                }
                                            }
                                            else {
                                                if (isRecording === true) {
                                                    stopRecording()
                                                }
                                                else {
                                                    startRecording()
                                                }
                                            }
                                        }}
                                    >
                                        <Image
                                            resizeMode={'contain'}
                                            style={{ width: 25, height: 25 }}
                                            source={isRecording === true ? icons.recordIcon : icons.stopRecordIcon}
                                        />
                                    </TouchableOpacity>
                                }
                                {/* <Text style={{
                                    fontSize: 24,
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>{audioTimer < 10 ?
                                    '00:0' + audioTimer
                                    :
                                    parseInt(audioTimer / 60) === 0 ?
                                        '00:' + audioTimer % 60
                                        : (audioTimer % 60 < 10 && audioTimer / 60 < 10) ?
                                            '0' + parseInt(audioTimer / 60) + ':0' + audioTimer % 60
                                            : (audioTimer % 60 < 10) ?
                                                parseInt(audioTimer / 60) + ':0' + audioTimer % 60
                                                : '0' + parseInt(audioTimer / 60) + ':' + audioTimer % 60
                                    }
                                </Text> */}
                                <Text style={{ marginRight: 10, fontSize: 12, fontWeight: 'bold', width: "50%", textAlign: "center" }}>{isRecording ? strings('global.recording_started') : audioRecording === '' ? strings('global.explain_your_problem_in_voice') : strings('global.recording_success')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    {audioRecording != '' &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (isPlay) {
                                                    setIsPlay(false)
                                                }
                                                else {
                                                    setIsPlay(true)
                                                }
                                            }}
                                            style={{ marginRight: 5 }}
                                        >
                                            <Image
                                                resizeMode={'contain'}
                                                style={{ width: 23, height: 23, }}
                                                source={isPlay ? icons.pauseIcon : icons.playIcon}
                                            />
                                        </TouchableOpacity>
                                    }
                                    {audioRecording != '' &&
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAudioRecording('')
                                                setAudioTimer(0)
                                            }}
                                        >
                                            <Image
                                                resizeMode={'contain'}
                                                style={{ width: 23, height: 23, }}
                                                source={icons.cancelRecordIcon}
                                            />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <Button
                                text={strings('maahir_profile.confirm')}
                                textStyle={{ fontSize: 16, fontFamily: Fonts.Medium, lineHeight: 20, fontWeight: '500', color: Colors.white }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 24, height: 53 }}
                                innerContainerCustomStyle={{ height: 48 }}
                                clickAction={() => { bookNowMahir(false) }}
                            />
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
    const acceptPreviousOrder = () => {
        setBookingAlertModal(false)
        setBookNowModal1(true)
    }
    const getMaahirDetail = () => {
        setLoadingSkelton(true)
        console.log('tokennnnn--->', Preference.get('userObject').token)
        let formData = new FormData()
        formData.append("maahir_id", maahirId)
        formData.append("token", Preference.get('userObject').token)
        props.maarhirDetailRequets(maahirId, Preference.get('userObject').token)
        requestPost(API.MAAHIR_DETAIL, formData).then((response) => {
            props.maarhirDetailResponse(response)
            setLoadingSkelton(false)
            console.log('response maahir Detail', response.data.topreviews)
            if (response.response_status === '1') {
                console.log('response service list', response)
                setMaahirData(response)
                setHistoryList(response.job_history)
                setCurrentJobList(response.ongoing_appointments)
                setMaahirFirstName(response?.data?.details?.first_name === undefined ? '' : response?.data?.details?.first_name)
                setMaahirLastName(response?.data?.details?.last_name === undefined ? '' : response?.data?.details?.last_name)
                setMaahirPhone(response?.data?.details?.mobile === undefined ? '' : '+' + response?.data?.details?.mobile)
                setrofileImage(response?.data?.details?.avatar === '' ? null : response?.data?.details?.avatar)
                console.log('image---->', maahirProfileImage)
                console.log('image---->', maahirProfileImage)
            }
        }).catch((error) => {
            setLoadingSkelton(false)
            props.maarhirDetailError(error)
            alert(strings('global.net_work_error'))
            console.log('error service list', error)
        })
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.itemContainer, {
                borderTopLeftRadius: index === 0 ? 8 : 0,
                borderTopRightRadius: index === 0 ? 8 : 0,
                borderBottomLeftRadius: index === historyList.length - 1 ? 8 : 0,
                borderBottomRightRadius: index === historyList.length - 1 ? 8 : 0
            }]}>
                <View style={styles.itemLeftIconCont}>
                    <Image
                        source={icons.historyIcon}
                        source={{ uri: API.IMAGE_URL + item.cl_avatar }}
                        style={styles.leftIcon}
                    />
                </View>
                <View style={styles.textContainer}>
                    {/* <Text style={styles.itemDate}>{strings('maahir_profile.pkr')}</Text>
                    <Text style={styles.itemHeading}>{strings('maahir_profile.pkr')}</Text> */}
                    <Text style={styles.itemDate}>{item.date}</Text>
                    <Text style={styles.itemHeading}>{item.cl_fname + ' ' + item.cl_lname}</Text>
                </View>
                <Text style={styles.itemPrice}>{item.price != null ? item.price +' '+strings('maahir_profile.pkr') : strings('maahir_profile.pkr')+'0'}</Text>
                {/* <Text style={styles.itemPrice}>{strings('maahir_profile.pkr')}</Text> */}
            </View>
        );
    };
    const renderCurrentJobItem = ({ item, index }) => {
        return (
            <View style={[styles.itemContainer, {
                borderTopLeftRadius: index === 0 ? 8 : 0,
                borderTopRightRadius: index === 0 ? 8 : 0,
                borderBottomLeftRadius: index === currentJobList.length - 1 ? 8 : 0,
                borderBottomRightRadius: index === currentJobList.length - 1 ? 8 : 0
            }]}>
                <View style={styles.itemLeftIconCont}>
                    <Image
                        source={icons.historyIcon}
                        source={{ uri: API.IMAGE_URL + item.cl_avatar }}
                        style={styles.leftIcon}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.itemDate}>{item.date}</Text>
                    <Text numberOfLines={4} ellipsizeMode={'tail'} style={styles.itemHeading}>{item.detail}</Text>
                    {/* <Text style={styles.itemHeading}>{item.cl_fname + ' ' + item.cl_lname}</Text> */}
                </View>
                {/* <Text style={styles.itemPrice}>{item.price + ' PKR'}</Text> */}
            </View>
        );
    };
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        // setratingSelByUser(rating)
    }
    const stopRecording = async () => {
        // clearInterval(timer)
        SoundRecorder.stop()
            .then(result => {
                console.log('stopped recording, audio file saved at: ' + JSON.stringify(result));
                setIsRecording(false)
                setAudioRecording(Platform.OS == 'android' ? 'file://' + result.path : result.path)
                // setAudioRecording(Platform.OS == 'android' ? 'file://' + result.path : result.path)
            });

    }
    const setProgress = () => {
        const temp = progressSeconds + 1
        const progressMins = Math.floor((temp) / 60)
        const progressSecs = ((temp) % 60).toFixed(0)
        const updatedProgressMins = progressMins < 10 ? `0${progressMins}` : progressMins
        const updatedProgressSecs = progressSecs < 10 ? `0${progressSecs}` : progressSecs
        const progressTimeTemp = `${updatedProgressMins}:${updatedProgressSecs}`

        // setProgressSeconds((progressSeconds) => progressSeconds+1);
        // handleClick()
        setProgressSeconds(temp)
        setProgressSeconds((state) => {
            console.log(state); // "React is awesome!"
            return state;
        });


        console.log('progress1-->', progressSeconds)
        setProgressTime(progressTimeTemp)
    }
    const startRecording = () => {
        // console.log('enter in start recording')
        // setAudioTimer(0)
        // // const timer = setInterval(() => {
        // //     setAudioTimer(audioTimer+1)
        // // }, 1000);

        // setInterval(() => {
        //     setAudioTimer(audioTimer + 1)
        // }, 1000);

        SoundRecorder.start(SoundRecorder.PATH_CACHE + '/audio.m4a')
            .then(() => {
                setIsRecording(true)
                // timer = setInterval(() => {
                //     setProgress()
                //     // console.log('progress-->',progressTime)
                // }, 5000);
                console.log('started recording');
            });
    }
    const checkPermission = async () => {
        let result;
        try {
            result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
            // console.log('permission result:', result);
            if(result==='granted')
            {
                startRecording()
            }
        } catch (error) {
            console.error('failed getting permission, result:', result);
        }
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <SkeletonContent
                containerStyle={{ flex: 1, width: '100%' }}
                animationDirection="horizontalLeft"
                isLoading={loadingSkelton}
                layout={[
                    { key: 'someId', width: '100%', height: isIPhoneX() ? 370 : 336, },
                    { key: 'someOtherId1', width: 90, height: 90, borderRadius: 50, alignSelf: 'center', borderColor: 'white', borderWidth: 1, position: 'absolute', top: 100 },
                    { key: 'someOtherId2', width: '50%', height: 27, alignSelf: 'center', borderColor: 'white', borderWidth: 1, position: 'absolute', top: 205 },
                    { key: 'someOtherId3', width: '50%', height: 27, alignSelf: 'center', borderColor: 'white', borderWidth: 1, position: 'absolute', top: 245 },
                    { key: 'someOtherId4', width: '80%', height: 80, borderRadius: 10, marginTop: -35, alignSelf: 'center', borderColor: 'white', borderWidth: 1 },
                    { key: 'someOtherId5', width: '80%', height: 30, marginTop: 10, marginLeft: 15 },
                    { key: 'someOtherId6', width: '90%', height: 70, borderRadius: 10, marginTop: 15, marginLeft: 15 },
                    { key: 'someOtherId7', width: '90%', height: 70, borderRadius: 10, marginTop: 8, marginLeft: 15 },
                    { key: 'someOtherId8', width: '90%', height: 70, borderRadius: 10, marginTop: 8, marginLeft: 15 },
                    { key: 'someOtherId9', width: '90%', height: 70, borderRadius: 10, marginTop: 8, marginLeft: 15 }
                ]}
            >
                <MainBackground
                    blueView={isIPhoneX() ? 370 : 336}
                    whiteView={1000}
                    upperContainerChildStyle={{}}
                    upperContainerChild={
                        <View>
                            <Header
                                leftIcon={icons.leftIcon}
                                leftButtonIconStyle={{ width: 14, height: 18,transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
                                onLeftAction={() => { navigation.goBack() }}
                                hearderText={strings('maahir_profile.maahir_profile')}
                            // rightIcon={icons.notificationDashboardIcon}
                            />
                            {/* <Image
                                style={styles.profileImage}
                                source={(maahirProfileImage === null) ? icons.profilePlaceholder : { uri: API.IMAGE_URL + maahirProfileImage }}
                            /> */}
                            <AvatarComponent
                                imageStyle={styles.profileImage}
                                source={API.IMAGE_URL + maahirProfileImage}
                                defaultSource={icons.profilePlaceholder}
                                size={'small'}
                            />
                            <Text style={styles.personName}>{maahirFirstName + ' ' + maahirLastName}</Text>
                            {/* <Text style={styles.phoneHeading}>{'Number phone'}</Text> */}
                            {/* <Text 
                            onPress={()=>{
                                console.log('click')
                                let number = '';
                                if (Platform.OS === 'ios') {
                                    number = `telprompt:${''+maahirPhone}`;
                                }
                                else {
                                    number = `tel:${''+maahirPhone}`;
                                }
                                Linking.openURL(number);
                            }}
                             style={styles.phoneText}>{maahirPhone}</Text> */}
                        </View>
                    }
                    lowerContainerChildStyle={{ flex: 1, width: '100%', backgroundColor: colors.background }}
                    lowerContainerChild={
                        <View style={{ flex: 1 }}>
                            <View style={styles.experienceContainer}>
                                <View style={styles.expirenceFirstContainer}>
                                    <Image
                                        style={styles.experienceIcon}
                                        source={icons.experienceIcon}
                                    />
                                    <View>
                                        <Text style={styles.expericenceHeading}>{strings('maahir_profile.experience')}</Text>
                                        <Text style={[styles.expericenceTxt, { width: '70%' }]}>{((maahirData?.data?.details.exp_year === null || maahirData?.data?.details.exp_year === undefined ) && (maahirData?.data?.details.exp_month === null || maahirData?.data?.details.exp_month === undefined )) ? strings('maahir_profile.not_added_yet') : maahirData?.data?.details.exp_year + ' '+strings('global.years') +' ' + maahirData?.data?.details.exp_month + ' '+strings('global.month') +' '}</Text>
                                    </View>
                                </View>
                                <View style={styles.expirenceSecondContainer}>
                                    <Text style={[styles.expericenceHeading, { textAlign: 'right' }]}>{strings('maahir_profile.average_rating')}</Text>
                                    <View style={styles.ratingContainer}>
                                        <AirbnbRating
                                            showRating
                                            ratingCount={5}
                                            showRating={false}
                                            defaultRating={(maahirData?.data?.rating === undefined || maahirData?.data?.rating === null) ? 0 : parseFloat(maahirData?.data?.rating).toFixed(2)}
                                            isDisabled={true}
                                            size={14}
                                            fractions={1}
                                            selectedColor={colors.buttonOrange}
                                            ratingColor={'#F76300'}
                                            // unSelectedColor={'grey'}
                                            onFinishRating={ratingCompleted}
                                        />
                                    </View>
                                </View>
                            </View>
                            {(currentJobList.length === 0 && historyList.length === 0) ?
                                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'center', marginTop: -70 }}>{strings('maahir_profile.no_job_history_available')}</Text>
                                </View>
                                :
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    style={{ flexGrow: 1 }}
                                    contentContainerStyle={{ flexGrow: 1 }}>
                                    {currentJobList.length > 0 &&
                                        <View style={styles.listView}>
                                            <Text style={styles.listHeading}>{strings('maahir_profile.current_appointments')}</Text>
                                            <FlatList
                                                data={currentJobList}
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={renderCurrentJobItem}
                                            />
                                        </View>
                                    }
                                    {historyList.length > 0 &&
                                        <View style={styles.listView}>
                                            <Text style={styles.listHeading}>{strings('maahir_profile.job_history')}</Text>
                                            <FlatList
                                                data={historyList}
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={renderItem}
                                            />
                                        </View>
                                    }
                                </ScrollView>
                            }
                            <View style={{ width: '100%', height: isIPhoneX() ? 70 : 70 }} />
                            <View style={styles.bottomBtnContainer}>
                                {currentJobList.length === 0 &&
                                    <Button
                                        text={strings('maahir_profile.book_now')}
                                        textStyle={{ fontSize: 12, fontFamily: Fonts.Medium, lineHeight: 22, color: Colors.white }}
                                        backgroundColorStyle={{ width: '38%', borderRadius: 14, minHeight: 40, height: null, }}
                                        innerContainerCustomStyle={{ minHeight: 35, height: null, }}
                                        clickAction={() => {
                                            if (maahirData?.my_current_appointments?.length === 0) {
                                                // setBookNowModal(true)
                                                setDate(new Date())
                                                setBookNowModal1(true)
                                                setBookNowClick(true)
                                            }
                                            else {
                                                setDate(new Date())
                                                setBookNowClick(true)
                                                setBookingAlertModal(true)
                                            }
                                        }}
                                        loading={loadingBookNowBtn}
                                    />

                                }
                                <Button
                                    text={strings('maahir_profile.schedule_for_later')}
                                    textStyle={{ fontSize: 12, fontFamily: Fonts.Medium, lineHeight: 22, color: Colors.white }}
                                    backgroundColorStyle={{ width: currentJobList.length === 0 ? '56%' : '100%', borderRadius: 14, minHeight: 40, height: null, alignSelf: 'center' }}
                                    innerContainerCustomStyle={{ minHeight: 35, height: null, }}
                                    clickAction={() => {
                                        setBookNowClick(false)
                                        setBookNowModal(true)
                                    }}
                                    loading={loadingScheduleBtn}
                                />
                            </View>
                            {renderInvitationModel()}
                            {renderBookingAlertModal()}
                            {renderBookNowModel()}
                            {(show && Platform.OS === 'android') && (
                                <DateTimePicker
                                    testID="dateTimePicker1"
                                    minimumDate={new Date()}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    // display="inline"
                                    onChange={onChange}
                                />
                            )}
                            <Loader isShowIndicator={false} loading={loadingBookNowBtn} />
                            <Loader isShowIndicator={false} loading={loadingScheduleBtn} />
                        </View>
                    }
                />
                <Video
                    ignoreSilentSwitch={"ignore"}
                    onEnd={() => {
                        setIsPlay(!isPlay)
                        setAudioTimer(0)
                    }}
                    source={{ uri: audioRecording }}
                    playInBackground={true}
                    paused={!isPlay}
                />
            </SkeletonContent>
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    const { maahirDetailReducers, serviceByLocationReducers, serviceReducers } = state
    // const { loading } = maahirDetailReducers
    const { maahirId, myLatitudeRedux, myLongitudeRedux, myAddressRedux, distance } = serviceByLocationReducers
    const { serviceSelected } = serviceReducers
    return { maahirId, serviceSelected, myLatitudeRedux, myLongitudeRedux, myAddressRedux, distance }
}
export default connect(mapStateToProps, {
    stateChange,
    maarhirDetailRequets,
    maarhirDetailResponse,
    maarhirDetailError,
    maahirBookRequets,
    maahirBookResponse,
    maahirBookError
})(MaahirProfile)
