import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Linking,
    Image,
    SafeAreaView,
    Alert,
    Modal,
    PermissionsAndroid,
    TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import icons from './../../../assets/icons/'
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
import { Rating, AirbnbRating } from 'react-native-ratings';
import AlertModal from './../../../components/AlertModal'
import AlertModalGoBack from './../../../components/AlertModal'
import SoundRecorder from 'react-native-sound-recorder';
import Video from 'react-native-video';
import AsyncStorage from "@react-native-async-storage/async-storage";

//redux
import { API, requestPost } from "../../../network/Api";
import fonts from "../../../assets/fonts";


import { connect } from 'react-redux'
import { MAAHIR_APPOINTMENT_DETAIL_CHANGE_STATE } from '../../../Actions/types'
import { stateChange } from '../../../Actions/commonAction'
import { strings } from './../../../i18n';




const JobDetail = (props) => {
    console.log('asdsad', route);
    const { navigation, screenTab, route } = props

    const onAccept = route.params?.onAccept
    const onStart = route.params?.onStart
    const onAction = route.params?.onAction

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);
    const [item, setItem] = useState('')
    const [btnStatusInternal, setBtnStatus] = useState('other');
    const [languageBit, setLanguage] = useState('en')

    const [ratingModal, setRatingModal] = useState(false);

    const [ratingCashOption, setRatingCashOption] = useState(0);
    const [commentField, setCommentField] = useState('');
    const [amountField, setAmountField] = useState('');
    const [ratingSelByUser, setratingSelByUser] = useState(1);
    const [bookingAlertModal, setBookingAlertModal] = useState(false);

    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [alertModalGoBack, setAlertModalGoBack] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);

    const [isRecording, setIsRecording] = useState(false);
    const [audioTimer, setAudioTimer] = useState(0);
    const [audioRecording, setAudioRecording] = useState('');
    const [isPlay, setIsPlay] = useState(false);
    const [voiceAudio, setVoiceAudio] = useState('');

    useEffect(() => {
        checkingLanguageBit()
        if (props.route.params.scr === 'notification') {
            console.log('-------->', props.route.params.scr)
            getJobDetail(props.route.params.jobId)
        }
        else {
            console.log('-------->', props.route.params.scr)
            console.log('-------->', props.route.params.itemObj)
            setItem(props.route.params.itemObj)
            if (props.route.params.itemObj.voice_note != null) {
                console.log('____________M_________')
                setAudioRecording(props.route.params.itemObj.voice_note)
            }
        }
        setTimeout(() => {
            navigation.goBack();
        }, 120000);
    }, [navigation]);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
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
    const okActionGoBack = () => {
        setAlertModalGoBack(false)
        setSuccessAlert(false)
        setHeadingAlert('')
        setDescriptionAlert('')
        navigation.goBack()
        if (onAccept && typeof onAccept == 'function') onAccept()
    }
    const getJobDetail = (id) => {
        setLoading(true)
        let formData = new FormData()
        formData.append("appointment_id", id)
        formData.append("token", Preference.get('maahirUserObject')?.token)
        requestPost(API.APPOINTMENT_DETAIL, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('getJobDetail', response)
                if (response.appointment_details === null) {
                    setItem({})
                }
                else {
                    setItem(response.appointment_details)
                    setAudioRecording(response.appointment_details.voice_note)
                    var item = response.appointment_details
                    setBtnStatus(item?.status === '0' ? 'pending' : item?.status === '6' ? 'ongoing' : item?.status === '4' ? 'complete' : item?.status === '1' ? 'upcoming' : 'other')
                }
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getJobDetail', error)
        })

    }
    const trackBtn = () => {
        console.log('------------->' + item)
        if (item?.lat != '' && item?.lat != '')
            navigation.navigate('CustomerDirection', { directionLat: Number(item?.lat), directionlng: Number(item?.lng), user: 'Maahir', appointmentDetail: item })
        else {
            // alert('Customer direction not available')
            setSuccessAlert(false)
            setHeadingAlert('Error')
            setDescriptionAlert('Customer direction not available')
            setAlertModal(true)
            // navigation.navigate('CustomerDirection',{directionLat: 0,directionlng:0})
        }
    }
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setratingSelByUser(rating)
    }
    const checkInputcheck = () => {
        if (commentField === "") {
            // alert("Comment is required");
            setSuccessAlert(false)
            setHeadingAlert('Field Error')
            setDescriptionAlert('Comment is required')
            setAlertModal(true)
        }
        else if (amountField === "") {
            // alert("Amount is required");
            setSuccessAlert(false)
            setHeadingAlert('Field Error')
            setDescriptionAlert('Amount is required')
            setAlertModal(true)
        }
        else {
            setRatingModal(false)
            setLoading(true)
            let formData = new FormData()
            formData.append("token", Preference.get('maahirUserObject').token)
            formData.append("user_id", Preference.get('maahirUserObject').id)
            formData.append("price", amountField)
            formData.append("rating", ratingSelByUser)
            formData.append("appointment_id", item?.id)
            formData.append("comment", commentField)
            requestPost(API.ADD_RATING, formData).then((response) => {
                setLoading(false)
                console.log('response Rating', response)
                if (response.response_status === '1') {
                    setCommentField('')
                    setAmountField('')
                    setratingSelByUser(1)
                    // Alert.alert(
                    //     "Success",
                    //     '' + response.msg,
                    //     [
                    //         { text: "OK", onPress: () => { navigation.goBack() } }
                    //     ]
                    // );
                    setSuccessAlert(false)
                    setHeadingAlert('Field Error')
                    setDescriptionAlert('' + response.msg)
                    setAlertModal(true)
                }
                else {
                    // Alert.alert(
                    //     "Error",
                    //     '' + response.msg,
                    //     [{ text: "OK", onPress: () => { } }]
                    // );
                    setSuccessAlert(false)
                    setHeadingAlert('Field Error')
                    setDescriptionAlert('' + response.msg)
                    setAlertModal(true)
                }
            }).catch((error) => {
                setLoading(false)
                console.log('error Rating', error)
            })
        }
    };
    const renderRatingtModal = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ratingModal}>
                    <View
                        activeOpacity={1}
                        style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, { paddingTop: 13, paddingBottom: 13, }]}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => { setRatingModal(false) }}>
                                <Image
                                    source={Icons.crossIcon}
                                    style={styles.crossImg}
                                />
                            </TouchableOpacity>
                            <Text style={styles.ratingModalHeading}>{strings("job_detail_screen.please_spare_a_moment_to_rate_the_job")}</Text>
                            <Text style={styles.ratingSubHeading}>{strings("job_detail_screen.how_was_the_job")}</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 8, width: '100%', marginTop: 9 }}>
                                <Rating
                                    startingValue={1}
                                    ratingCount={5}
                                    showRating={false}
                                    imageSize={30}
                                    fractions={1}
                                    type={'custom'}
                                    selectedColor={'#f1c40f'}
                                    ratingColor={'#F76300'}
                                    ratingBackgroundColor='#c8c7c8'
                                    starContainerStyle={{ backgroundColor: 'green', width: 30 }}
                                    // ratingImage={Icons.crossImg}
                                    onFinishRating={ratingCompleted}
                                />
                            </View>

                            <Text style={styles.ratingSubHeading}>{strings("job_detail_screen.any_comments")}</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: '#CECECE', fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, textAlign: 'center' }}
                                    // underlineColorAndroid="transparent"
                                    placeholder={strings("job_detail_screen.enter_your_comment_here")}
                                    placeholderTextColor="#CECECE"
                                    autoCapitalize="none"
                                    value={commentField}
                                    onChangeText={(text) => {
                                        setCommentField(text)
                                    }} />
                            </View>
                            <Text style={styles.ratingSubHeading}>{strings("job_detail_screen.how_did_you_pay")}</Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Button
                                    text={strings("job_detail_screen.cash")}
                                    textStyle={ratingCashOption === 0 ? styles.selectedTxt : styles.unSelectedTxt}
                                    backgroundColorStyle={ratingCashOption === 0 ? styles.selectedMain : styles.unSelectedMain}
                                    innerContainerCustomStyle={ratingCashOption === 0 ? styles.selectedInner : styles.unSelectedInner}
                                    clickAction={() => { setRatingCashOption(0) }}
                                />
                                <Button
                                    text={strings("job_detail_screen.online")}
                                    textStyle={ratingCashOption === 1 ? styles.selectedTxt : styles.unSelectedTxt}
                                    backgroundColorStyle={ratingCashOption === 1 ? styles.selectedMain : styles.unSelectedMain}
                                    innerContainerCustomStyle={ratingCashOption === 1 ? styles.selectedInner : styles.unSelectedInner}
                                    clickAction={() => { setRatingCashOption(1) }}
                                />

                            </View>
                            <Text style={styles.ratingSubHeading}>{strings("job_detail_screen.how_much_did_you_pay")}</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: '#CECECE', fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, textAlign: 'center' }}
                                    placeholder={strings("job_detail_screen.amount")}
                                    placeholderTextColor="#CECECE"
                                    autoCapitalize="none"
                                    value={amountField}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => {
                                        setAmountField(text)
                                    }} />
                            </View>
                            <Button
                                text={strings("job_detail_screen.submit")}
                                textStyle={{ fontSize: 14, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '700', color: colors.white }}
                                backgroundColorStyle={{ width: '50%', borderRadius: 5, height: 45, marginTop: 20 }}
                                innerContainerCustomStyle={{ height: 40, borderRadius: 5, backgroundColor: colors.buttonOrange }}
                                clickAction={() => {
                                    checkInputcheck()
                                }}
                            />
                            <Text style={styles.ratingModalHeading}>{strings("job_detail_screen.thank_you_for_using_maahir_services")}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    const acceptPendingAppointmentApi = () => {
        console.log('clicked')
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_id", item?.id)
        requestPost(API.APPROVE_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('acceptPendingAppointmentApi', response)
                // Alert.alert(
                //     "Success",
                //     '' + response.msg,
                //     [
                //         {
                //             text: "OK", onPress: () => {
                //                 navigation.goBack()
                //                 if (onAccept && typeof onAccept == 'function') onAccept()
                //             }
                //         }
                //     ]
                // );
                setSuccessAlert(true)
                setHeadingAlert(strings("global.success"))
                setDescriptionAlert('' + response.msg)
                // setAlertModalGoBack(true)
                setBtnStatus('upcoming');
            }
            else {
                // Alert.alert(
                //     "Error",
                //     '' + response.msg,
                //     [{ text: "OK", onPress: () => { } }]
                // );
                setSuccessAlert(false)
                setHeadingAlert(strings("global.error"))
                setDescriptionAlert('' + response.msg)
                setAlertModal(true)
            }
        }).catch((error) => {
            setLoading(false)
            setSuccessAlert(false)
            setHeadingAlert(strings("global.error"))
            setDescriptionAlert(strings("job_detail_screen.time_out_you_cannot_respond_to_this_job_anymore"))
            setAlertModal(true)
            console.log('error acceptPendingAppointmentApi', error)
        })
    }
    const rejectPendingAppointmentApi = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_id", item?.id)
        requestPost(API.REJECT_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('rejectPendingAppointmentApi', response)
                // Alert.alert(
                //     "Success",
                //     '' + response.msg,
                //     [
                //         { text: "OK", onPress: () => { navigation.goBack() } }
                //     ]
                // );
                setSuccessAlert(true)
                setHeadingAlert(strings("global.success"))
                setDescriptionAlert('' + response.msg)
                setAlertModalGoBack(true)
            }
        }).catch((error) => {
            setLoading(false)
            setSuccessAlert(false)
            setHeadingAlert(strings("global.error"))
            setDescriptionAlert(strings("job_detail_screen.time_out_you_cannot_respond_to_this_job_anymore"))
            setAlertModal(true)
            console.log('error rejectPendingAppointmentApi', error)
        })
    }
    const callBtn = () => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${'+' + item?.cl_mobile}`;
        }
        else {
            number = `tel:${'+' + item?.cl_mobile}`;
        }
        Linking.openURL(number);
    }
    const startUpcomingAppointmentApi = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_id", item?.id)
        requestPost(API.START_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('startUpcomingAppointmentApi', response)
                Alert.alert(
                    strings("global.success"),
                    '' + response.msg,
                    [
                        {
                            text: strings("global.ok"), onPress: () => {
                                navigation.goBack()
                                if (onStart && typeof onStart == 'function') onStart()
                            }
                        }
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
            setLoading(false)
            console.log('error startUpcomingAppointmentApi', error)
        })
    }
    const endOngoingAppointmentApi = (appointmentId) => {
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_id", item?.id)
        requestPost(API.END_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                console.log('endOngoingAppointmentApi', response)
                Alert.alert(
                    strings("global.success"),
                    '' + response.msg,
                    [
                        { text: strings("global.ok"), onPress: () => { navigation.goBack() } }
                    ]
                );
                // setRatingModal(true)
            }
            else {
                Alert.alert(
                    strings("global.error"),
                    '' + response.msg,
                    [{ text: strings("global.ok"), onPress: () => { } }]
                );
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error endOngoingAppointmentApi', error)
        })
    }
    const cancelBtn = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_id", item?.id)
        formData.append("user_type", 2)
        requestPost(API.CANCEL_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            console.log('response', response)
            if (response.response_status === '1') {
                Alert.alert(
                    strings("global.success"),
                    '' + response.msg,
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
            setLoading(false)
            Alert.alert(
                strings("global.error"),
                '' + strings("global.please_try_again"),
                [{ text: strings("global.ok"), onPress: () => { } }]
            );
            console.log('error', error)
        })
    }
    const dismissApi = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_id", item?.id)
        requestPost(API.DISMISS_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            console.log('response', response)
            if (response.response_status === '1') {
                Alert.alert(
                    strings("global.success"),
                    '' + response.msg,
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
            setLoading(false)
            Alert.alert(
                strings("global.error"),
                '' + strings("global.please_try_again"),
                [{ text: strings("global.ok"), onPress: () => { } }]
            );
            console.log('error', error)
        })
    }
    const renderCancelAlertModal = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={bookingAlertModal}>
                    <View
                        activeOpacity={1}
                        style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => { setBookingAlertModal(false) }}>
                                <Image
                                    source={Icons.crossIcon}
                                    style={styles.crossImg}
                                />
                            </TouchableOpacity>
                            <Image
                                source={Icons.bellIcon}
                                style={styles.bellIcon}
                            />
                            <Text style={styles.cancelModalHeading}>{strings("job_detail_screen.are_you_sure_you_want_to_cancel")}</Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Button
                                    text={strings("job_detail_screen.yes")}
                                    textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                                    backgroundColorStyle={{ width: '47%', borderRadius: 14, marginTop: 24, height: 41 }}
                                    innerContainerCustomStyle={{ height: 36, borderRadius: 14, }}
                                    clickAction={acceptModalBtn}
                                />
                                <Button
                                    text={strings("job_detail_screen.no")}
                                    textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.secondary }}
                                    backgroundColorStyle={{ width: '47%', borderRadius: 14, marginTop: 24, height: 41 }}
                                    innerContainerCustomStyle={{ height: 36, borderRadius: 14, borderWidth: 1, borderColor: colors.secondary, backgroundColor: colors.white }}
                                    clickAction={cancelModalBtn}
                                />
                            </View>
                            <Text style={styles.noteHeading}>{strings("job_detail_screen.note")}</Text>
                            <Text style={styles.descText}>{strings("job_detail_screen.only_two_cancel_allowed")}</Text>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    const acceptModalBtn = () => {
        setBookingAlertModal(false)
        cancelBtn()
    }
    const cancelModalBtn = () => {
        setBookingAlertModal(false)
    }
    const cancelApi = () => {
        setBookingAlertModal(true)
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => {
                    if (onAction && typeof onAction == 'function') onAction()
                    navigation.goBack()
                }}
                leftIcon={Icons.leftIcon}
                hearderText={strings("job_detail_screen.job_detail")}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftButtonIconStyle={{ width: 18, height: 18, transform: languageBit === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
            />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemHeading}>{`${item?.cl_fname ? item?.cl_fname : ''} ${item?.cl_lname ? item?.cl_lname : ''}`}</Text>
                    <Text style={styles.itemKm}>{item?.distance + ' ' + strings("job_detail_screen.km_away")}</Text>
                    <Text style={styles.descriptionHeading}>{strings("job_detail_screen.description")}</Text>
                    <Text style={styles.descTxt}>{item?.detail}</Text>
                    <Text style={styles.descriptionHeading}>{strings("job_detail_screen.price")}</Text>
                    <Text style={styles.descTxt}>{item.price}</Text>
                    {item.voice_note != null &&
                        <Text style={styles.descriptionHeading}>{strings("job_detail_screen.voice_message")}</Text>
                    }
                    {item.voice_note != null &&
                        <View style={{
                            width: "20%",
                            height: 50,
                            flexDirection: 'row',
                            elevation: 10,
                            backgroundColor: '#EDEDED',
                            // justifyContent: 'space-between',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 8,
                            borderRadius: 7,
                            paddingLeft: 7,
                            paddingRight: 7
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (isPlay) {
                                        setIsPlay(false)
                                    }
                                    else {
                                        setIsPlay(true)
                                    }
                                }}
                            // style={{ marginRight: 5 }}
                            >
                                <Image
                                    resizeMode={'contain'}
                                    style={{ width: 23, height: 23, }}
                                    source={isPlay ? icons.pauseIcon : icons.playIcon}
                                />
                            </TouchableOpacity>

                            {/* <Text style={{ marginRight: 10, fontSize: 12, fontWeight: 'bold', width: "50%", textAlign: "center" }}>{isRecording ? 'Recording Playing' : audioRecording === '' ? 'Press to play' : 'stop'}</Text> */}
                        </View>
                    }
                    {item?.address != '' &&
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 30 }}>
                            <Image style={{ width: 11, height: 13, resizeMode: 'contain', marginTop: 5 }} source={Icons.repaireLocation} />
                            <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item?.address}</Text>
                        </View>
                    }
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <Image style={{ width: 11, height: 13, resizeMode: 'contain', }} source={Icons.repaireTime} />
                        <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item?.time}</Text>
                    </View>
                </View>
                {(props.route.params.scr === 'pending' || btnStatusInternal === 'pending') &&
                    <View>
                        {/* <Button
                            text={'Call'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={() => { callBtn() }}
                        /> */}
                        <Button
                            text={strings("job_detail_screen.accept")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={() => {
                                if (onAction && typeof onAction == 'function') onAction()
                                acceptPendingAppointmentApi()
                            }}
                        />
                        <Button
                            text={strings("job_detail_screen.reject")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.buttonOrange }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginBottom: 30, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.white, marginHorizontal: 15, borderWidth: 1, borderColor: colors.buttonOrange }}
                            clickAction={() => {
                                if (onAction && typeof onAction == 'function') onAction()
                                rejectPendingAppointmentApi()
                            }}
                        />
                    </View>
                }
                {(props.route.params.scr === 'upcoming' || btnStatusInternal === 'upcoming') &&
                    <View>
                        <Button
                            text={strings("job_detail_screen.call")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={() => { callBtn() }}
                        />
                        <Button
                            text={strings("job_detail_screen.start")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={() => { startUpcomingAppointmentApi() }}
                        />
                        {/* <Button
                            text={'Dismiss'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.buttonOrange }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.white, marginHorizontal: 15, borderWidth: 1, borderColor: colors.buttonOrange }}
                            clickAction={() => { dismissApi() }}
                        /> */}
                        <Button
                            text={strings("job_detail_screen.cancel")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.buttonOrange }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginBottom: 30, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.white, marginHorizontal: 15, borderWidth: 1, borderColor: colors.buttonOrange }}
                            clickAction={() => { cancelApi() }}
                        />

                    </View>
                }
                {(props.route.params.scr === 'ongoing' || btnStatusInternal === 'ongoing') &&
                    <View>
                        <Button
                            text={strings("job_detail_screen.route")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={trackBtn.bind(this)}
                        />
                        <Button
                            text={strings("job_detail_screen.end_job")}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={endOngoingAppointmentApi.bind(this)}
                        />
                    </View>
                }
                {renderRatingtModal()}
                {renderCancelAlertModal()}
            </KeyboardAwareScrollView>
            <AlertModal
                isSuccess={isSuccessAlert}
                modalVisible={alertModal}
                okAction={okAction}
                // cancelAction={cancelAction}
                heading={headingAlert}
                description={descriptionAlert} />
            <AlertModalGoBack
                isSuccess={isSuccessAlert}
                modalVisible={alertModalGoBack}
                okAction={okActionGoBack}
                heading={headingAlert}
                description={descriptionAlert} />
            <Loader isShowIndicator={true} loading={loadingInteral} />
            <Video
                ignoreSilentSwitch={"ignore"}
                onEnd={() => {
                    setIsPlay(!isPlay)
                    setAudioTimer(0)
                }}
                source={{ uri: API.VOICE_URL + audioRecording }}
                playInBackground={true}
                paused={!isPlay}
            />
        </SafeAreaView>
    );
};

// export default JobDetail
const mapStateToProps = state => {
    const { maahirAppointmentDetailReducers } = state
    const { screenTab } = maahirAppointmentDetailReducers
    return { screenTab }
}
export default connect(mapStateToProps,
    {
        stateChange,
    })(JobDetail)
