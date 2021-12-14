import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Modal,
    RefreshControl,

} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from './../../../utils/colors'
import Icons from './../../../assets/icons/'
import Images from './../../../assets/images/'
import MainBackground from './../../../components/HomeBackGround'
import Header from './../../../components/Header'
import Button from './../../../components/Button'
import fonts from './../../../assets/fonts/'
import { isIPhoneX } from "../../../utils/Dimensions";
import colors from "./../../../utils/colors";
import ImagePickerModel from './../../../components/ImagePickerModel'
import Preference from 'react-native-preference'
import { API, requestPost, requestGet } from "../../../network/Api";
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AvatarComponent from './../../../components/Image'
import { strings } from './../../../i18n';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('screen');


const ProfileScreen = ({ navigation }) => {
    const [maahirData, setMaahirData] = useState('');
    const [loading, setLoading] = useState(false);
    const [customerField, setCustomerField] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [mobile, setMobile] = useState('');
    const [showPickerModel, setShowPickerModel] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [unRatedList, setUnRatedList] = useState([]);
    const [ratingModal, setRatingModal] = useState(false);

    const [ratingCashOption, setRatingCashOption] = useState(0);
    const [appointmentId, setAppointmentId] = useState(0);
    const [commentField, setCommentField] = useState('');
    const [amountField, setAmountField] = useState('');
    const [ratingSelByUser, setratingSelByUser] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        checkingLanguageBit()
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileDetail()
        });
        return unsubscribe;
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const getProfileDetail = () => {
        console.log('2713678628163278136', Preference.get('maahirUserObject'))
        setLoading(true)
        let formData = new FormData()
        formData.append("maahir_id", Preference.get('maahirUserObject').id)
        formData.append("token", Preference.get('maahirUserObject').token)
        requestPost(API.MAAHIR_PROFILE, formData).then((response) => {
            setLoading(false)
            console.log('response getProfileDetail', response)
            console.log('response_category', response.data.maahir_categories)
            if (response.response_status === '1') {
                if (response.data.details.avatar != '') {
                    setProfileImage(response.data.details.avatar)
                }
                setCustomerField(response.data.details.first_name + ' ' + response.data.details.last_name)
                setMobile('+' + response.data.details.mobile)
                setHistoryList(response.data.maahir_categories)
                setMaahirData(response)
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getProfileDetail', error)
        })
    }
    const handleChoosePhoto = (response) => {
        if (response.didCancel) {
            //// console.log('User cancelled image picker');
        } else if (response.error) {
            //// console.log('ImagePickerModel Error: ', response.error);
        } else {
            const source = { uri: response.uri };
            console.log('hello->', response.uri)
            setProfileImage(response.uri)
        }
    }
    const _handleRefresh = () => {
        console.log('----')
        getProfileDetail()
    };
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

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setratingSelByUser(rating)
    }
    return (
        <SafeAreaView style={styles.safeStyle}>
            <SkeletonContent
                containerStyle={{ flex: 1, width: '100%' }}
                animationDirection="horizontalLeft"
                isLoading={loading}
                layout={[
                    { key: 'someId', width: '100%', height: isIPhoneX() ? 370 : 336, },
                    { key: 'someOtherId1', width: 90, height: 90, borderRadius: 50, alignSelf: 'center', borderColor: 'white', borderWidth: 1, position: 'absolute', top: 100 },
                    { key: 'someOtherId2', width: '50%', height: 27, alignSelf: 'center', borderColor: 'white', borderWidth: 1, position: 'absolute', top: 205 },
                    { key: 'someOtherId3', width: '50%', height: 27, alignSelf: 'center', borderColor: 'white', borderWidth: 1, position: 'absolute', top: 245 },
                    { key: 'someOtherId4', width: '80%', height: 30, marginTop: 10, marginLeft: 15 },
                    { key: 'someOtherId5', width: '90%', height: 70, borderRadius: 10, marginTop: 15, marginLeft: 15 },
                    { key: 'someOtherId6', width: '90%', height: 70, borderRadius: 10, marginTop: 8, marginLeft: 15 },
                    { key: 'someOtherId7', width: '90%', height: 70, borderRadius: 10, marginTop: 8, marginLeft: 15 },
                    { key: 'someOtherId8', width: '90%', height: 70, borderRadius: 10, marginTop: 8, marginLeft: 15 }
                ]}
            >
                <MainBackground
                    blueView={isIPhoneX() ? 370 : 336}
                    whiteView={1000}
                    upperContainerChildStyle={{}}
                    upperContainerChild={
                        <View>
                            <Header
                                onLeftAction={() => { navigation.goBack() }}
                                onSecRightAction={() => { navigation.navigate('EditProfileMaahir') }}
                                leftIcon={Icons.leftIcon}
                                leftButtonIconStyle={{ width: 24, height: 25, transform: languageBit === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }}
                                hearderText={strings('profile_screen.profile')}
                                //rightIcon={Icons.notificationDashboardIcon}
                                rightSecIcon={Icons.editIcon}
                                rightSecContainerStyle={{ marginRight: 15 }}

                            />
                            {/* <TouchableOpacity style={{ width: 100, height: 100, alignSelf: 'center', }} onPress={() => { setShowPickerModel(true) }}> */}
                            {/* <Image
                                style={styles.profileImage}
                                source={profileImage === null ? Icons.profilePlaceholder : { uri: API.IMAGE_URL + profileImage }}
                            /> */}
                            <AvatarComponent
                                imageStyle={styles.profileImage}

                                source={API.IMAGE_URL + profileImage}
                                defaultSource={Icons.profilePlaceholder}
                                size={'small'}
                            />
                            {/* </TouchableOpacity> */}
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Customer Name"
                                    placeholderTextColor={colors.white}
                                    autoCapitalize="none"
                                    value={customerField}
                                    maxLength={30}
                                    editable={false}
                                    style={styles.personName}
                                    onChangeText={(text) => {
                                        setCustomerField(text)
                                    }} />
                            </View>
                            {/* <Text style={styles.personName}>{'Maahir Name'}</Text> */}
                            {/* <Text style={styles.phoneHeading}>{'Number phone'}</Text> */}
                            <Text style={styles.phoneText}>{mobile}</Text>

                        </View>
                    }
                    lowerContainerChildStyle={{ flex: 1, width: '100%', backgroundColor: colors.background }}
                    lowerContainerChild={
                        <View style={{ width: '100%', height: '100%', }}>
                            <View style={styles.experienceContainer}>
                                <View style={styles.expirenceFirstContainer}>
                                    <Image
                                        style={styles.experienceIcon}
                                        source={Icons.experienceIcon}
                                    />
                                    <View>
                                        <Text style={[styles.expericenceHeading, { width: '80%' }]}>{strings("profile_screen.your_exp")}</Text>
                                        <Text style={[styles.expericenceTxt, { width: '70%' }]}>{(maahirData?.data?.details.exp_year === null && maahirData?.data?.details.exp_month === null) ? strings('global.not_added_yet') : maahirData?.data?.details.exp_year + strings('global.years') + maahirData?.data?.details.exp_month + strings('global.month')}</Text>
                                    </View>
                                </View>
                                <View style={styles.expirenceSecondContainer}>
                                    <Text style={[styles.expericenceHeading, { textAlign: 'right' }]}>{strings("profile_screen.your_avg_rating")}</Text>
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

                            {(historyList.length === 0) ?
                                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'center', marginTop: -70 }}>{strings("global.no_job_history")}</Text>
                                </View>
                                :
                                <ScrollView
                                    style={{ width: '100%', height: '100%', flex: 1, marginBottom: 50 }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={_handleRefresh}
                                        />
                                    }
                                >
                                    <Text style={[styles.listHeading, { marginTop: 20, marginLeft: 5, width: '90%', alignSelf: 'center' }]}>{strings("profile_screen.address")}</Text>
                                    <View style={styles.addressViewContainer}>
                                        <Text style={[styles.listHeading, { marginBottom: 8 }]}>{strings("profile_screen.home_address")}</Text>
                                        <Text style={styles.addressStyle}>{maahirData?.data?.details.address}</Text>
                                        <Text style={[styles.listHeading, { marginBottom: 8 }]}>{strings("profile_screen.work_address")}</Text>
                                        <Text style={styles.addressStyle}>{maahirData?.data?.details.business_address}</Text>
                                    </View>

                                    <Text style={[styles.listHeading, { marginTop: 20, marginLeft: 5, width: '90%', alignSelf: 'center' }]}>Referral</Text>
                                    <View style={styles.addressViewContainer}>
                                        <Text style={[styles.addressStyle, { marginBottom: 8 }]}>Share this referral with your friends, for each registered mahir you will get a reward in your wallet</Text>
                                        <Text style={{ ...styles.listHeading, alignSelf: 'center', marginTop: 10 }}>{Preference.get('maahirUserObject')?.code}</Text>
                                    </View>
                                    <View style={styles.listView}>
                                        {historyList.length > 0 &&
                                            <View>
                                                <Text style={[styles.listHeading, { marginBottom: 5 }]}>{strings("profile_screen.categories")}</Text>
                                                <FlatList
                                                    numColumns={2}
                                                    data={historyList}
                                                    showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false}
                                                    // contentContainerStyle={}
                                                    renderItem={renderItem}
                                                />
                                            </View>
                                        }
                                    </View>

                                </ScrollView>
                            }
                            {/* <View style={{ position: 'absolute', bottom: 0, backgroundColor: colors.background, width: '100%', height: isIPhoneX() ? 115 : 145, alignSelf: 'center' }} /> */}

                        </View>
                    }
                />
                <ImagePickerModel
                    showPickerModel={showPickerModel}
                    onHideModel={() => {
                        setShowPickerModel(false)
                    }}
                    handleChoosePhoto={handleChoosePhoto}
                />
                <Loader loading={loading} />
            </SkeletonContent>
        </SafeAreaView>
    )
};
export default ProfileScreen;
