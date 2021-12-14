
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * 
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    LogBox,
    StatusBar,
    View,
    SafeAreaView,
    Platform,
    Modal,
    StyleSheet,
    Text,
    Linking,
    TextInput,
    Alert,
    PermissionsAndroid,
    TouchableOpacity,
    Image,
} from 'react-native'
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';
import Routing from './Routing'
import Sound from 'react-native-sound';
import colors from './utils/colors';
import icons from './assets/icons/'
import fonts from "./assets/fonts/";
import { Provider } from 'react-redux';
import reduxStore from './Store'
import Loader from './components/Loader/'
import Preference from 'react-native-preference'
import { API, BUILD_VERSION, requestPost, requestGet } from "./network/Api";
import { StackActions } from '@react-navigation/native';
import Button from './components/Button'
import crashlytics from '@react-native-firebase/crashlytics';
import { Rating, AirbnbRating } from 'react-native-ratings';
import FlashMessage from "react-native-flash-message";
import CountDown from 'react-native-countdown-component';
import moment from 'moment'
import { strings } from './i18n';
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
    EventType,
    AndroidImportance,
    AndroidCategory,
    AndroidVisibility
} from '@notifee/react-native';
import bgMessaging from './bgMessaging';

const store = reduxStore();

LogBox.ignoreAllLogs(true)
StatusBar.setTranslucent(true)
StatusBar.setBackgroundColor(colors.transparent)
StatusBar.setBarStyle('dark-content')

export const navigatorRef = React.createRef(null);

export default App = (props) => {
    var maahirNameRating = ''
    var descriptionRating = ''
    var todayDate = moment(new Date());
    var otherDate = moment("06/06/2021 23:59:59");
    var ms = moment(todayDate, "DD/MM/YYYY HH:mm:ss").diff(moment(otherDate, "DD/MM/YYYY HH:mm:ss"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    const popupRef = useRef(null);
    const bellSound = new Sound(require("./assets/sounds/offers.mpeg"), null, null)
    const bellSoundThirty = new Sound(require("./assets/sounds/offer_thirty.mp3"), null, null)
    const [loadingInteral, setLoading] = useState(false);
    const [bookingAlertModal, setBookingAlertModal] = useState(false);
    const [msgAlertModal, setMsgAlertModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [commentField, setCommentField] = useState('');
    const [amountField, setAmountField] = useState('');
    const [ratingSelByUser, setratingSelByUser] = useState(5);
    const [ratingData, setRatingData] = useState([]);
    const [seconds, setSecond] = useState(s);
    const [isNotification, setIsNotification] = useState(false);



    useEffect(() => {
        // Preference.set('isShowMsg',false)
        try {
            getVersionDetail()
            createNotificationListenersLatest();
            if (Preference.get('isCustomerLogin') === true) {
                getUnRatedAppointment()
                console.log('unRated--->', Preference.get('userObject').id, Preference.get('userObject').token)
            }
        } catch (error) {
            console.log("App.js Notification try catch", "trycatch: ", error)
        }
        const appointmentId = Preference.get('jobId')
        if (appointmentId) {
            setTimeout(() => {
                setIsNotification(true)
            }, 2500);
        }
    }, []);

    useEffect(() => {
        if (isNotification) {
            initDeepLinking()
        }
    }, [isNotification])

    const initDeepLinking = () => {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                if (url) {
                    navigate(url);
                }
            })
        }

        Linking.addEventListener('url', handleOpenURL);
    }

    const handleOpenURL = (event) => {
        navigate(event.url);
    }

    const navigate = (url) => {
        try {
            const appointmentId = Preference.get('jobId')
            console.log('DeepLink', 'url-appointmentId', appointmentId)
            if (appointmentId) {
                Preference.set('jobId', null)
                const _params = {
                    scr: 'notification',
                    jobId: appointmentId,
                    onAction: () => {
                        console.log('onAction Call')
                        bellSoundThirty.stop()
                    }
                }
                setTimeout(() => {
                    navigateAction("MaahirHomeStack", {
                        screen: "JobDetail",
                        params: _params
                    })
                }, 2000);
            }
        } catch (error) {
            console.log('DeepLink', 'parse-error', error)
        }
    }

    const getUnRatedAppointment = () => {
        maahirNameRating = ''
        descriptionRating = ''
        setLoading(true)
        let formData = new FormData()
        formData.append("customer_id", Preference.get('userObject').id)
        formData.append("customer_token", Preference.get('userObject').token)
        requestPost(API.CUSTOMER_UNRATED_JOB, formData).then((response) => {
            setLoading(false)
            console.log('response getUnRatedAppointment', response)
            if (response.response_status === '1' && response.unrated_jobs.length > 0) {
                console.log('response getUnRatedAppointment', response)
                let array = []
                array.push({
                    maahir_id: response.unrated_jobs[0].agent_id,
                    appointment_id: response.unrated_jobs[0].id,
                    maahirName: response.unrated_jobs[0].ag_fname,
                    description: response.unrated_jobs[0].detail,
                })
                maahirNameRating = response.unrated_jobs[0].ag_fname
                descriptionRating = response.unrated_jobs[0].detail
                setRatingData(array)
                console.log('..................><><><>', array)
                console.log(ratingData)
                setRatingModal(true)
                // alert('notifcation list found --->',response.unrated_jobs.length)
            }
            if (response.response_status === '2') {
                //   alert(response.msg)
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getUnRatedAppointment', error)
        })
    }

    const onNofifeeActionHandle = async (data, type, detail) => {
        if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
            console.log('User pressed an action with the id:', detail.pressAction.id);
            console.log('User pressed an action with the id:', detail);
            if (detail.pressAction.id == 'accept') {
                const _params = {
                    scr: 'notification',
                    jobId: JSON.parse(data.appointment_id),
                }
                navigateAction("MaahirHomeStack", { screen: "JobDetail", params: _params })
            }
            await notifee.cancelNotification(detail.notification.id);
        }
    }

    const notifeeSetting = async (remoteMessage) => {
        const { notification, data } = remoteMessage;
        const { title, body, } = notification
        const channelId = await notifee.createChannel({
            id: 'alarm',
            name: 'Firing alarms & timers',
            lights: false,
            vibration: true,
            importance: AndroidImportance.DEFAULT,
            sound: 'offer.mp3',
        });

        await notifee.setNotificationCategories([
            {
                id: 'post',
                summaryFormat: 'You have %u+ unread messages from %@.',
                actions: [
                    {
                        id: 'accept',
                        title: 'Accept',
                    },
                    {
                        id: 'reject',
                        title: 'Reject',
                    },
                ],
            },
        ]);

        notifee.onForegroundEvent(({ type, detail }) => onNofifeeActionHandle(data, type, detail));

        notifee.onBackgroundEvent(({ type, detail }) => onNofifeeActionHandle(data, type, detail));

        setTimeout(() => {
            notifee.displayNotification({
                title: title,
                body: 'You have immediate appointment, if you like please click on Accept',
                data: data,
                ios: {
                    categoryId: 'post',
                    summaryArgument: 'John',
                    summaryArgumentCount: 10,
                },
                android: {
                    channelId: channelId,
                    category: AndroidCategory.CALL,
                    ongoing: true,
                    autoCancel: false,
                    visibility: AndroidVisibility.PUBLIC,
                    importance: AndroidImportance.HIGH,
                    sound: 'offer.mp3',
                    actions: [
                        {
                            title: 'Accept',
                            pressAction: {
                                id: 'accept',
                                launchActivity: 'default'
                            },
                        },
                        {
                            title: 'Reject',
                            pressAction: {
                                id: 'reject',
                            },
                        },
                    ],
                },
            });
        }, 3000);
    }
    const getVersionDetail = () => {
        requestGet(API.GET_VERSION).then((response) => {
            console.log('response Version', response)
            console.log('response Version', response.details.android)
            console.log('response Version', response.details.ios)
            if (response.response_status === '1') {
                if (Platform.OS === 'android') {
                    if (BUILD_VERSION != response.details.android) {
                        setBookingAlertModal(true)
                    }
                }
                else {
                    if (BUILD_VERSION != response.details.ios) {
                        setBookingAlertModal(true)
                    }
                }
            }
        }).catch((error) => {
            console.log('error Version', error)
        })
    }
    const handleNotification = (data, type) => {
        let dataDetails = data
        dataDetails = JSON.parse(data.appointment_id)
        console.log('-------', dataDetails)
        let _params = {
            scr: 'notification',
            jobId: dataDetails,
            onAction: () => {
                console.log('onAction Call')
                bellSoundThirty.stop()
            }
        }
        //Maahir Side Notification
        if (type === '0') {
            navigateAction("MaahirHomeStack", { screen: "JobDetail", params: _params })
        }
        else if (type === "0") {
            navigateAction("Upcoming")
        }
        else if (type === '5') {
            navigateAction("CompletedJob")
        }
        else if (type === "0") {
            navigateAction("MaahirHomeStack", { screen: "JobDetail", params: _params })
        }
        //Customer Side Notification
        else if (type === "3") {
            navigateAction("RepairScreen")
        }
        else if (type === "1") {
            navigateAction("RepairScreen", { screen: "Upcoming" })
        }
        else if (type === "6") {
            navigateAction("RepairScreen", { screen: "Ongoing" })
        }
        else if (type === "4") {
            navigateAction("RepairScreen", { screen: "Completed" })
            // let array=[data]
            // setRatingData(array)
            // setRatingModal(true)
        }
    }
    const handleQuiteNotification = (data, type) => {
        let dataDetails = data
        dataDetails = JSON.parse(data.appointment_id)
        console.log('-------', dataDetails)
        let _params = {
            scr: 'notification',
            jobId: dataDetails,
        }
        //Maahir Side Notification
        if (type === '0') {
            setTimeout(() => {
                navigateAction("MaahirHomeStack", { screen: "JobDetail", params: _params })
            }, 3000);
        }
        else if (type === "0") {   ////////////// ISSUE TO CKECK ADDED BY AAKASH
            setTimeout(() => {
                navigateAction("Upcoming")
            }, 5000);
        }
        else if (type === "5") {
            setTimeout(() => {
                navigateAction("CompletedJob")
            }, 3000);
        }
        //Customer Side Notification
        else if (type === "3") {
            setTimeout(() => {
                navigateAction("RepairScreen")
            }, 3000);
        }
        else if (type === "1") {
            setTimeout(() => {
                navigateAction("RepairScreen", { screen: "Upcoming" })
            }, 3000);
        }
        else if (type === "6") {
            setTimeout(() => {
                navigateAction("RepairScreen", { screen: "Ongoing" })
            }, 3000);
        }
        else if (type === "4") {
            setTimeout(() => {
                navigateAction("RepairScreen", { screen: "Completed" })
            }, 3000);
        }
    }
    const navigateAction = (_routeName, _params) => {
        if (navigatorRef?.current) {
            navigatorRef.current.navigate(_routeName,
                { ..._params }
            )
        } else {
            console.log('App', 'this.navigator = false')
        }
    }

    const createNotificationListenersLatest = async () => {
        await requestUserPermission()
        const token = await messaging().getToken()
        this.notificationListener = messaging().onMessage(async remoteMessage => {
            console.log("createNotificationListenersLatest", "notificationListener-remoteMessage", JSON.stringify(remoteMessage))
            const { notification, data } = remoteMessage;
            const { title, body } = notification ? notification : {
                title: "New Offer",
                body: "You have immediate appointment, if you like please click on Accept"
            }
            showNotification(title, body, data);
            if (Preference.get('notificationCount') === undefined || Preference.get('notificationCount') === null) {
                Preference.set('notificationCount', '1')
            } else {
                var a = parseInt(Preference.get('notificationCount')) + 1
                Preference.set('notificationCount', a)
            }
            if (title != 'New Offer') {
                bellSound.play();
            }
            if (title === 'New Offer') {
                console.log('notification Text', title)
                bellSoundThirty.play();
            }
            if (data.status === "4") {
                let array = [data]
                setRatingData(array)
                setRatingModal(true)
            }
        })

        this.notificationOpenedListener = messaging().setBackgroundMessageHandler(async remoteMessage => {
            // console.log("createNotificationListenersLatest", "notificationOpenedListener-remoteMessage", JSON.stringify(remoteMessage))
            const { notification, data } = remoteMessage
            bellSoundThirty.play()
            console.log('\n\n\n\nnotification Text-call')
            bgMessaging(remoteMessage)
        });
        this.quitStateListener = messaging().getInitialNotification().then(async remoteMessage => {
            if (remoteMessage) {
                const { notification, data } = remoteMessage
                // const { title } = notification
                console.log('Notification caused app to open from quit state:');
                handleQuiteNotification(data, notification ? notification?.title : '')
            }
        });
        this.backgroundStateListener = messaging().onNotificationOpenedApp(async remoteMessage => {
            if (remoteMessage) {
                const { notification, data } = remoteMessage
                // const { title } = notification
                console.log('Notification caused app to open from backgroundStateListener:');
                handleNotification(data, data.status)
            }
        });
    }
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log("requestUserPermission", 'enabled', enabled)
    }
    const pauseMessageNotification = () => {
        return Preference.get('type_pause_direct_messages')
    }
    /** Show notification banner in app */
    const showNotification = (title, body, data) => {
        if (popupRef.current) {
            popupRef.current.show({
                onPress: () => handleNotification(data, data.status),
                appIconSource: icons.appIcon,
                appTitle: 'Maahir',
                timeText: 'Now',
                title: title,
                body: body,
                slideOutTime: title === 'New Offer' ? 30000 : 5000
            });
        }
    }
    const renderAlertModal = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={bookingAlertModal}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
                                {strings('app_js.new_version_available')}
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                {strings('app_js.please_update_maahir_app_to')}
                            </Text>
                            <Button
                                text={strings('app_js.update_your_app')}
                                textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white, }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 15, height: 59 }}
                                innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, height: 52 }}
                                clickAction={() => {
                                    if (Platform.OS === 'android') {
                                        Linking.openURL("market://details?id=com.maahir");
                                    }
                                    else {
                                        Linking.openURL("https://apps.apple.com/pk/app/maahir/id1561312598");
                                    }
                                }}
                            />
                            {Platform.OS === 'ios' &&
                                <Button
                                    text={strings('app_js.ignore')}
                                    textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white, }}
                                    backgroundColorStyle={{ width: '100%', borderRadius: 14, height: 59 }}
                                    innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, height: 52 }}
                                    clickAction={() => {
                                        setBookingAlertModal(false)
                                    }}
                                />
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    const renderMsgModal = () => {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={msgAlertModal}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={{ fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
                                {`السلام عليكم ماہر فیملی!`}
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                {`ہم معذرت خواہ ہیں کہ ہمیں کچھ  تکنیکی مسائل کا سامنا کرنا پڑ رہا ھےجس پر مسلسل کام جاری ہےـ  ہم جلد آپ کومزید آگاہ کریں گے
ـ آپکے تعاون کا بے حد شکریہ ـ`}
                            </Text>
                            <Text style={{ marginTop: 10 }}>{strings('app_js.we_will_be_live_in')}</Text>
                            <CountDown
                                // until={1324}
                                until={parseInt(Math.abs(ms) / 1000)}
                                onFinish={() => { setMsgAlertModal(false) }}
                                // onPress={() => alert('hello')}
                                size={20}
                                style={{ marginTop: 10 }}
                                digitStyle={{ backgroundColor: colors.buttonOrange }}
                                digitTxtStyle={{ color: colors.white }}
                            />
                            <Button
                                text={strings('global.ok')}
                                textStyle={{ fontSize: 17, fontWeight: '500', lineHeight: 22, color: colors.white, }}
                                backgroundColorStyle={{ width: '100%', borderRadius: 14, marginTop: 15, height: 59 }}
                                innerContainerCustomStyle={{ backgroundColor: colors.buttonOrange, height: 52 }}
                                clickAction={() => {
                                    Preference.set('isShowMsg', true)
                                    setMsgAlertModal(false)
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setratingSelByUser(rating)
    }
    const checkInputcheck = () => {
        console.log('input check --------<><><><><><><><>', ratingData)
        if (amountField === "") {
            alert(strings('app_js.amount_is_required'));
        }
        else {
            setRatingModal(false)
            setLoading(true)
            let formData = new FormData()
            formData.append("token", Preference.get('userObject')?.token)
            formData.append("maahir_id", ratingData[0].maahir_id)
            formData.append("price", amountField)
            formData.append("rating", ratingSelByUser)
            formData.append("appointment_id", ratingData[0].appointment_id)
            formData.append("comment", commentField)
            requestPost(API.ADD_RATING, formData).then((response) => {
                setLoading(false)
                setRatingData([])
                console.log('response Rating', response)
                if (response.response_status === '1') {
                    setCommentField('')
                    setAmountField('')
                    setratingSelByUser(5)
                    Alert.alert(
                        "" + strings('global.success'),
                        '' + response.msg,
                        [
                            { text: strings('global.ok'), onPress: () => { getUnRatedAppointment() } }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        strings('global.error'),
                        '' + response.msg,
                        [{ text: strings('global.ok'), onPress: () => { } }]
                    );
                }
            }).catch((error) => {
                setRatingData([])
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
                            {/* <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => { setRatingModal(false) }}>
                                <Image
                                    source={icons.crossIcon}
                                    style={styles.crossImg}
                                />
                            </TouchableOpacity> */}
                            <Text style={styles.ratingModalHeading}>{strings('app_js.please_spare_a_moment_to_rate_the_job')}</Text>
                            {/* <Text style={[styles.ratingSubHeading,{fontSize:14}]}>{`Job completed by ${maahirNameRating} ${descriptionRating} `}</Text> */}
                            {(ratingData[0]?.maahirName === undefined && ratingData[0]?.description === undefined) ? null
                                :
                                <Text style={[styles.ratingSubHeading, { fontSize: 14, color: 'red', marginTop: 5 }]}>{strings('app_js.job_completed_by') + ' ' + `${ratingData[0]?.maahirName}`}</Text>
                            }
                            {/* {(ratingData[0]?.maahirName === undefined && ratingData[0]?.description === undefined) ? null
                                :
                                <Text style={[styles.ratingSubHeading, { fontSize: 14, color: 'red', marginTop: 5 }]}>{`Job completed by ${ratingData[0]?.maahirName} ${ratingData[0]?.description} `}</Text>
                            } */}
                            <Text style={[styles.ratingSubHeading, { marginTop: 5 }]}>{strings('app_js.how_was_the_job')}</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 8, width: '100%', marginTop: 9 }}>
                                <Rating
                                    startingValue={5}
                                    ratingCount={5}
                                    showRating={false}
                                    imageSize={30}
                                    fractions={1}
                                    type={'custom'}
                                    selectedColor={'#f1c40f'}
                                    ratingColor={'#F76300'}
                                    ratingBackgroundColor='#c8c7c8'
                                    starContainerStyle={{ backgroundColor: 'green', width: 30 }}
                                    // ratingImage={icons.crossImg}
                                    onFinishRating={ratingCompleted}
                                />
                            </View>

                            <Text style={styles.ratingSubHeading}>{strings('app_js.any_comments')}</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: colors.black, fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, textAlign: 'center' }}
                                    // underlineColorAndroid="transparent"
                                    placeholder={strings('app_js.enter_your_comment_here')}
                                    placeholderTextColor={colors.grey}
                                    autoCapitalize="none"
                                    value={commentField}
                                    onChangeText={(text) => {
                                        setCommentField(text)
                                    }} />
                            </View>
                            <Text style={styles.ratingSubHeading}>{strings('app_js.how_did_you_pay')}</Text>
                            <View style={{ borderRadius: 14, borderWidth: 1, borderColor: colors.buttonOrange, padding: 3, width: '100%', marginTop: 9 }}>
                                <TextInput style={{ height: 42, color: colors.black, fontSize: 14, fontWeight: '700', fontFamily: fonts.Bold, textAlign: 'center' }}
                                    placeholder={strings('app_js.amount')}
                                    placeholderTextColor={colors.grey}
                                    autoCapitalize="none"
                                    value={amountField}
                                    keyboardType={'number-pad'}
                                    onChangeText={(text) => {
                                        setAmountField(text)
                                    }} />
                            </View>
                            <Button
                                text={strings('app_js.submit')}
                                textStyle={{ fontSize: 14, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '700', color: colors.white }}
                                backgroundColorStyle={{ width: '50%', borderRadius: 5, height: 45, marginTop: 20 }}
                                innerContainerCustomStyle={{ height: 40, borderRadius: 5, backgroundColor: colors.buttonOrange }}
                                clickAction={() => {
                                    checkInputcheck()
                                }}
                            />
                            <Text style={styles.ratingModalHeading}>{strings('app_js.thank_you_for_using_maahir_services')}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <Routing />
                <NotificationPopup
                    ref={popupRef}
                    style={{ zIndex: 99 }}
                />
            </SafeAreaView>
            {renderAlertModal()}
            {renderMsgModal()}
            {renderRatingtModal()}
            <Loader loading={loadingInteral} />
            <FlashMessage position={'bottom'} floating={true} />
        </Provider>
    )
}
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.modalTransparency,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: "90%",
        margin: 16,
        flexDirection: 'column',
        elevation: 10,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingLeft: 25,
        padding: 20,
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.modalTransparency,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: "90%",
        margin: 16,
        flexDirection: 'column',
        elevation: 10,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingLeft: 25,
        padding: 20,
        alignItems: 'center'
    },
    crossImg: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        tintColor: 'grey',
    },
    bellIcon: {
        width: 64,
        height: 64,
        marginTop: 8,
        resizeMode: 'contain',
    },
    cancelModalHeading: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 30,
        fontFamily: fonts.Bold,
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 30
    },
    ratingModalHeading: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 27,
        fontFamily: fonts.SemiBold,
        color: colors.mRatingHeading,
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 12,
    },
    ratingSubHeading: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: colors.primary,
        fontFamily: fonts.Bold,
        marginTop: 14
    },
    noteHeading: {
        marginTop: 50,
        fontFamily: fonts.Bold,
        fontSize: 18,
        fontWeight: '700'
    },
    descText: {
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 24,
        marginTop: 13,
        fontFamily: fonts.Regular,
        textAlign: 'center',
        marginBottom: 60
    },
    selectedMain: {
        width: '41%',
        borderRadius: 5,
        height: 45
    },
    selectedInner: {
        height: 40,
        borderRadius: 5
    },
    selectedTxt: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        lineHeight: 20,
        fontWeight: '700',
        color: colors.white
    },
    unSelectedInner: {
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.secondary,
        backgroundColor: colors.white
    },
    unSelectedMain: {
        width: '41%',
        borderRadius: 5,
        height: 45
    },
    unSelectedTxt: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        lineHeight: 20,
        fontWeight: '700',
        color: colors.secondary
    }

})