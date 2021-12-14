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
    TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import InputField from './../../../components/RegistrationInput'
import Button from './../../../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import icons from './../../../assets/icons/'
import colors from "../../../utils/colors";
import Loader from './../../../components/Loader'
import ImagePickerModel from './../../../components/ImagePickerModel'
import moment from 'moment'
import Header from '../../../components/Header' 
import Preference from 'react-native-preference'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CheckBox from './../../../components/CustomCheckBox'
import DateTimePicker from '@react-native-community/datetimepicker';
import AlertModal from './../../../components/AlertModal'
import {strings} from "./../../../i18n";
import Video from 'react-native-video';

//redux
import { API, requestPost } from "../../../network/Api";
import fonts from "../../../assets/fonts";

const JobDetail = (props) => {
    const { navigation } = props
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadingReschedle, setLoadingReschedle] = useState(false);
    const [loadingRating, setLoadingRating] = useState(false);
    const [paymentModel, setPaymentModel] = useState(false);
    const [item, setItem] = useState('')
    const [btnStatusInternal, setBtnStatus] = useState('other');
    const [checkBox, setBox] = useState(false);
    const [bookingAlertModal, setBookingAlertModal] = useState(false);

    const [ratingModal, setRatingModal] = useState(false);
    const [ratingCashOption, setRatingCashOption] = useState(0);
    const [commentField, setCommentField] = useState('');
    const [amountField, setAmountField] = useState('');
    const [ratingSelByUser, setratingSelByUser] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(false);
    const [rescheduleModal, setRescheduleModal] = useState(false);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [explainProblem, setExplainProblem] = useState('');

    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);
   
    const [audioTimer, setAudioTimer] = useState(0);
    const [audioRecording, setAudioRecording] = useState('');
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        if (props.route.params.scr === 'notification') {
            // console.log('-------->', props.route.params.scr)
            getJobDetail(props.route.params.jobId)
        }
        else {
            // console.log('-------->', props.route.params.scr)
            console.log('-------->', props.route.params.itemObj)
            setItem(props.route.params.itemObj)
        }
    }, [navigation]);
    const okAction = () => {
        setAlertModal(false)
        setSuccessAlert(false)
        setHeadingAlert('')
        setDescriptionAlert('')
    }
    const getJobDetail = (id) => {
        setLoading(true)
        let formData = new FormData()
        formData.append("appointment_id", id)
        requestPost(API.APPOINTMENT_DETAIL, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                // console.log('getJobDetail', response)
                if (response.appointment_details === null) {
                    setItem({})
                }
                else {
                    setItem(response.appointment_details)
                    var item = response.appointment_details
                    setBtnStatus(item.status === '0' ? 'pending' : item.status === 6 ? 'ongoing' : item.status === '4' ? 'complete' : item.status === '1' ? 'upcoming' : 'other')
                }
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getJobDetail', error)
        })

    }
    const trackBtn = () => {
        console.log('------------->item--->'+item)
        if (item.lat != '' && item.lat != '')
            navigation.navigate('MaahirDirection', { directionLat: Number(item.lat), directionlng: Number(item.lng), user: 'customer',appointmentDetail:item })
        else {
            alert(strings("job_detail_screen.direction_not_available"))
            // navigation.navigate('MaahirDirection',{directionLat: 0,directionlng:0})
        }
    }
    const completeBtn = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("token", Preference.get('userObject')?.token)
        formData.append("appointment_id", item.id)
        requestPost(API.END_APPOINTMENT, formData).then((response) => {
            setLoading(false)
            if (response.response_status === '1') {
                Alert.alert(
                    strings("job_detail_screen.success"),
                    '' + response.msg,
                    [
                        { text: "OK", onPress: () => { navigation.goBack() } }
                    ]
                );
            }
            else{
                Alert.alert(
                    strings("job_detail_screen.error"),
                    '' + response.msg,
                    [ { text: strings("job_detail_screen.ok"), onPress: () => { } }]
                );
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error completeAppointmentApi', error)
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
                                    source={icons.crossIcon}
                                    style={styles.crossImg}
                                />
                            </TouchableOpacity>
                            <Image
                                source={icons.bellIcon}
                                style={styles.bellIcon}
                            />
                            <Text style={styles.cancelModalHeading}>{strings("job_detail_screen.are_you_sure_you_want")}</Text>
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
    const cancelBtn = () => {
        setLoadingCancel(true)
        let formData = new FormData()
        formData.append("token", Preference.get('userObject')?.token)
        formData.append("appointment_id", item.id)
        formData.append("user_type", 1)
        requestPost(API.CANCEL_APPOINTMENT, formData).then((response) => {
            setLoadingCancel(false)
            console.log('response', response)
            if (response.response_status === '1') {
                Alert.alert(
                    "Success",
                    '' + response.msg,
                    [
                        { text: "OK", onPress: () => { navigation.goBack() } }
                    ]
                );
            }
            else{
                Alert.alert(
                    "Error",
                    '' + response.msg,
                    [ { text: "OK", onPress: () => { } }]
                );
            }

        }).catch((error) => {
            setLoadingCancel(false)
            alert('Please try again')
            console.log('error', error)
        })
    }
    const callBtn = () => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = `telprompt:${'+'+item.ag_mobile}`;
        }
        else {
            number = `tel:${'+'+item.ag_mobile}`;
        }
        Linking.openURL(number);
    }
    const addRating = () => {
        // setRatingModal(true)
        setPaymentModel(true)
    }
    const editBtn = () => {
        inputcheck()
    }
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setratingSelByUser(rating)
    }
    const checkInputcheck = () => {
        if (commentField === "") {
            alert("Comment is required");
        }
        else if (amountField === "") {
            alert("Amount is required");
        }
        else {
            setRatingModal(false)
            setLoadingRating(true)
            let formData = new FormData()
            formData.append("token", Preference.get('userObject').token)
            formData.append("maahir_id", item.agent_id)
            formData.append("price", amountField)
            formData.append("rating", ratingSelByUser)
            formData.append("appointment_id", item.id)
            formData.append("comment", commentField)
            requestPost(API.ADD_RATING, formData).then((response) => {
                setLoadingRating(false)
                console.log('response Rating', response)
                if (response.response_status === '1') {
                    setCommentField('')
                    setAmountField('')
                    setratingSelByUser(1)
                    Alert.alert(
                        "Success",
                        '' + response.msg,
                        [
                            { text: "OK", onPress: () => { navigation.goBack() } }
                        ]
                    );
                }
                else{
                    Alert.alert(
                        "Error",
                        '' + response.msg,
                        [ { text: "OK", onPress: () => { } }]
                    );
                }
            }).catch((error) => {
                setLoadingRating(false)
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
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => { setRatingModal(false) }}>
                                <Image
                                    source={icons.crossIcon}
                                    style={styles.crossImg}
                                />
                            </TouchableOpacity>
                            <Text style={styles.ratingModalHeading}>Please Spare A Moment To Rate The Job.</Text>
                            <Text style={styles.ratingSubHeading}>How Was The Job?</Text>
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
                                {/* <AirbnbRating
                                    showRating
                                    ratingCount={5}
                                    showRating={false}
                                    size={30}
                                    fractions={1}
                                    selectedColor={colors.buttonOrange}
                                    ratingColor={'#F76300'}
                                    // unSelectedColor={'grey'}
                                    onFinishRating={ratingCompleted}
                                /> */}
                            </View>

                            <Text style={styles.ratingSubHeading}>Any Comments ?</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: colors.grey, fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, textAlign: 'center' }}
                                    // underlineColorAndroid="transparent"
                                    placeholder="Enter Your Comment Here..."
                                    placeholderTextColor={colors.grey}
                                    autoCapitalize="none"
                                    value={commentField}
                                    onChangeText={(text) => {
                                        setCommentField(text)
                                    }} />
                            </View>
                            {/* <Text style={styles.ratingSubHeading}>How Did You Pay?</Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Button
                                    text={'Cash'}
                                    textStyle={ratingCashOption === 0 ? styles.selectedTxt : styles.unSelectedTxt}
                                    backgroundColorStyle={ratingCashOption === 0 ? styles.selectedMain : styles.unSelectedMain}
                                    innerContainerCustomStyle={ratingCashOption === 0 ? styles.selectedInner : styles.unSelectedInner}
                                    clickAction={() => { setRatingCashOption(0) }}
                                />
                                <Button
                                    text={'Online'}
                                    textStyle={ratingCashOption === 1 ? styles.selectedTxt : styles.unSelectedTxt}
                                    backgroundColorStyle={ratingCashOption === 1 ? styles.selectedMain : styles.unSelectedMain}
                                    innerContainerCustomStyle={ratingCashOption === 1 ? styles.selectedInner : styles.unSelectedInner}
                                    clickAction={() => { setRatingCashOption(1) }}
                                />

                            </View> */}
                            <Text style={styles.ratingSubHeading}>How Much Did You Pay ?</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: colors.grey, fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, textAlign: 'center' }}
                                    placeholder="Amount..."
                                    placeholderTextColor={colors.grey}
                                    autoCapitalize="none"
                                    value={amountField}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => {
                                        setAmountField(text)
                                    }} />
                            </View>
                            <Button
                                text={'Submit'}
                                textStyle={{ fontSize: 14, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '700', color: colors.white }}
                                backgroundColorStyle={{ width: '50%', borderRadius: 5, height: 45, marginTop: 20,alignSelf:'center' }}
                                innerContainerCustomStyle={{ height: 40, borderRadius: 5, backgroundColor: colors.buttonOrange, }}
                                clickAction={() => {
                                    checkInputcheck()
                                }}
                            />
                            <Text style={[styles.ratingModalHeading,{fontSize:16}]}>Thank you for using Maahir services!</Text>
                       </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    const confirmPayment = () => {
        setPaymentModel(false)
        setRatingModal(true)
    }
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
    const rescheduleBtn =() =>{
        setRescheduleModal(true)
    }
    const renderPaymentModel = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={paymentModel}>
                    <View
                        style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 15, right: 20 }}
                                onPress={() => {
                                    setPaymentModel(false)
                                }}>
                                <Image
                                    source={icons.crossIcon}
                                    style={{ width: 20, height: 20, resizeMode: 'contain', }}
                                />
                            </TouchableOpacity>
                            <Image
                                source={icons.bellIcon}
                                style={{ width: 60, height: 60, resizeMode: 'contain', }}
                            />
                            <Text style={styles.paymentModalTxt}>How will you pay for this Service?</Text>
                          
                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Button
                                    text={'Cash'}
                                    textStyle={paymentMethod === false ? styles.selectTxt : styles.unSelectTxt}
                                    backgroundColorStyle={paymentMethod === false ? styles.selectBackground : [styles.unselectBackground, { marginLeft: 0 }]}
                                    innerContainerCustomStyle={paymentMethod === false ? styles.selectInnerContainer : styles.unSelectInnerContainer}
                                    clickAction={() => {
                                        // setPaymentMethod(!paymentMethod)
                                    }}
                                />
                                <Button
                                    text={'Online'}
                                    textStyle={paymentMethod === false ? styles.unSelectTxt : styles.selectTxt}
                                    backgroundColorStyle={paymentMethod === false ? styles.unselectBackground : [styles.selectBackground, { marginLeft: 10 }]}
                                    innerContainerCustomStyle={paymentMethod === false ? styles.unSelectInnerContainer : styles.selectInnerContainer}
                                    clickAction={() => {
                                        // setPaymentMethod(!paymentMethod)
                                        setSuccessAlert(true)
                                        setHeadingAlert('Coming Soon')
                                        setAlertModal(true)
                                        alert('Online payment is not available.')
                                    }}
                                />
                            </View>
                            { paymentMethod &&
                            <View style={{flexDirection:'row',marginTop:10,width:'100%',justifyContent:'flex-end'}}>
                                <CheckBox
                                    onChange={() => { setBox(!checkBox) }}
                                    isChecked={checkBox}
                                    customTxt={'JazzCash'}
                                    checkstyle={{ backgroundColor: colors.buttonOrange }}
                                    containerStyle={{width:95}}
                                />
                                 <CheckBox
                                    onChange={() => { setBox(!checkBox) }}
                                    isChecked={checkBox}
                                    customTxt={'EasyPaisa'}
                                    checkstyle={{ backgroundColor: colors.buttonOrange }}
                                    containerStyle={{width:95,marginLeft:10}}
                                />
                            </View>
                            }
                            <Button
                                text={'Confirm'}
                                textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 24, height: 53 }}
                                innerContainerCustomStyle={{ height: 48 }}
                                clickAction={confirmPayment}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    const resheduleApi = () => {
        console.log('date', moment(date).format('YYYY-MM-DD'))
        console.log('time', moment(date).format('HH:mm'))
        setLoadingReschedle(true)
        setRescheduleModal(false)
        let formData = new FormData()
        formData.append("appointment_id", item.id)
        formData.append("detail",  explainProblem)
        formData.append("date", moment(date).format('YYYY-MM-DD'))
        formData.append("time", moment(date).format('HH:mm'))
        requestPost(API.RESHEDULE_APPOINTMENT, formData).then((response) => {
            setLoadingReschedle(false)
            console.log('response RESEDULE_APPOINTMENT', response)
            if (response.response_status === '1') {
                console.log('response RESEDULE_APPOINTMENT', response)
                // alert(response.msg)
                Alert.alert(
                    "Success",
                    '' + response.msg,
                    [ { text: "OK", onPress: () => { } }]
                );
                setRescheduleModal(false)
            }
            else if (response.response_status === '2') {
                setRescheduleModal(false)
                    Alert.alert(
                        "Error",
                        '' + response.msg,
                        [ { text: "OK", onPress: () => { } }]
                    );
            }
        }).catch((error) => {
            setLoadingReschedle(false)
            console.log('error RESEDULE_APPOINTMENT', error)
        })
    }
    const renderRescheduleModel = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={rescheduleModal}>
                    <View
                        style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 15, right: 20 }}
                                onPress={() => {
                                    setRescheduleModal(false)
                                    setShow(false)
                                }}>
                                <Image
                                    source={icons.crossIcon}
                                    style={{ width: 20, height: 20, resizeMode: 'contain', }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.bookNowModalHeading}>Book Appointment with the Maahir</Text>
                            <View
                                style={{ marginTop: 24, width: '100%', backgroundColor: '#EDEDED', padding: 7, paddingTop: 7, paddingBottom: 7, borderRadius: 5 }}
                            >
                                {Platform.OS === 'android' ?
                                    <TouchableOpacity onPress={() => {
                                        showDatepicker()
                                    }}>
                                        <Text style={styles.dateHeading}>Date</Text>
                                        <Text style={styles.dateTxt}>{moment(date).format('YYYY-MM-DD')}</Text>
                                    </TouchableOpacity>
                                    :
                                    <View>
                                        <Text style={styles.dateHeading}>Date</Text>
                                        <View style={{ marginBottom: 0 }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                minimumDate={new Date()}
                                                value={date}
                                                mode={'date'}
                                                is24Hour={true}
                                                display="default"
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
                                        <Text style={styles.dateHeading}>Time</Text>
                                        <Text style={styles.dateTxt}>{moment(date).format('hh:mm A')}</Text>
                                    </TouchableOpacity>
                                    :
                                    <View>
                                        <Text style={styles.dateHeading}>Time</Text>
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
                                <TextInput style={{ height: 42, color: '#CECECE', fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, }}
                                    // underlineColorAndroid="transparent"
                                    placeholder="Explain your problem"
                                    placeholderTextColor="#CECECE"
                                    autoCapitalize="none"
                                    value={explainProblem}
                                    onChangeText={(text) => {
                                        setExplainProblem(text)
                                    }} />
                            </View>
                            <Button
                                text={'Confirm'}
                                textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 24, height: 53 }}
                                innerContainerCustomStyle={{ height: 48 }}
                                clickAction={resheduleApi}
                            />
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={icons.leftIcon}
                hearderText={'Job Details'}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftButtonIconStyle={{ width: 18, height: 18 }}
            />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemHeading}>{`${item.ag_fname ? item.ag_fname : ''} ${item.ag_lname ? item.ag_lname : ''}`}</Text>
                    <Text style={styles.itemKm}>{item.distance} km away</Text>
                    <Text style={styles.descriptionHeading}>Description</Text>
                    <Text style={styles.descTxt}>{item.detail}</Text>
                    <Text style={styles.descriptionHeading}>Price</Text>
                    <Text style={styles.descTxt}>{item.price}</Text>
                    {item.voice_note!=null &&
                    <Text style={styles.descriptionHeading}>Voice Message</Text>
                    }
                    {item.voice_note!=null &&
                    <View style={{
                        width: "20%",
                        height: 50,
                        flexDirection: 'row',
                        elevation: 10,
                        backgroundColor: '#EDEDED',
                        justifyContent:'center',
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
                        >
                            <Image
                                resizeMode={'contain'}
                                style={{ width: 23, height: 23, }}
                                source={isPlay ? icons.pauseIcon : icons.playIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    }
                    {(item.address != '') &&
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 30 }}>
                            <Image style={{ width: 11, height: 13, resizeMode: 'contain', marginTop: 5 }} source={icons.repaireLocation} />
                            <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item.address}</Text>
                        </View>
                    }
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <Image style={{ width: 11, height: 13, resizeMode: 'contain', }} source={icons.repaireTime} />
                        <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item.time}</Text>
                    </View>
                </View>
                {(props.route.params.scr === 'pending' || props.route.params.scr === 'upcoming' || btnStatusInternal === 'pending' || btnStatusInternal === 'upcoming') &&
                    <View>
                        <Button
                            text={'Call'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={callBtn.bind(this)}
                        />
                        <Button
                            text={'Reschedule'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginBottom: 0, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15, borderWidth: 1, borderColor: colors.buttonOrange }}
                            clickAction={rescheduleBtn.bind(this)}
                            loading={loadingReschedle}
                        />
                           <Button
                            text={'Cancel'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.buttonOrange }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginBottom: 30, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.white, marginHorizontal: 15, borderWidth: 1, borderColor: colors.buttonOrange }}
                            clickAction={cancelApi.bind(this)}
                            loading={loadingCancel}
                            color={'black'}
                        />
                    </View>
                }
                {(props.route.params.scr === 'ongoing' || btnStatusInternal === 'ongoing') &&
                    <View>
                        <Button
                            text={'Track'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={trackBtn.bind(this)}
                        />
                         <Button
                            text={'Call'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={callBtn.bind(this)}
                        />
                        {/* <Button
                            text={'Job Completed'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={completeBtn.bind(this)}
                             loading={loadingInteral}
                        /> */}
                        <Button
                            text={'Cancel'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.buttonOrange }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 11, marginBottom: 30, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.white, marginHorizontal: 15, borderWidth: 1, borderColor: colors.buttonOrange }}
                            clickAction={cancelApi.bind(this)}
                            loading={loadingCancel}
                            color={'black'}
                        />
                    </View>
                }
                {(props.route.params.scr === 'complete' || btnStatusInternal === 'complete') &&
                    <View>
                        <Button
                            text={'Add Rating'}
                            textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white }}
                            backgroundColorStyle={{ borderRadius: 14, marginTop: 73, marginHorizontal: 15 }}
                            innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, marginHorizontal: 15 }}
                            clickAction={addRating.bind(this)}
                            loading={loadingRating}
                        />
                    </View>
                }
                {renderRatingtModal()}
                {renderPaymentModel()}
                {renderRescheduleModel()}
                {renderCancelAlertModal()}
            </KeyboardAwareScrollView>
            {(show && Platform.OS === 'android') && (
                                <DateTimePicker
                                    testID="dateTimePicker1"
                                    minimumDate={new Date()}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
            <Loader isShowIndicator={false} loading={loadingInteral} />
            <Loader isShowIndicator={false} loading={loadingReschedle} />
            <Loader isShowIndicator={false} loading={loadingRating} />
            <Loader isShowIndicator={false} loading={loadingCancel} />
            <AlertModal
                    isSuccess={isSuccessAlert}
                    modalVisible={alertModal}
                    okAction={okAction}
                    // cancelAction={cancelAction}
                    heading={headingAlert}
                    description={descriptionAlert} />
                     <Video
                ignoreSilentSwitch={"ignore"}
                onEnd={() => {
                    setIsPlay(!isPlay)
                    setAudioTimer(0)
                }}
                source={{ uri: API.VOICE_URL+audioRecording }}
                playInBackground={true}
                paused={!isPlay}
            />
        </SafeAreaView>
    );
};

export default JobDetail