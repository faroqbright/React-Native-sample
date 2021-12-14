import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    Alert
} from "react-native";
import { styles } from "./Styles"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MainBackground from './../../../components/HomeBackGround'
import Icons from './../../../assets/icons/'
import Button from './../../../components/Button'
import colors from "./../../../utils/colors";
import Loader from './../../../components/Loader'
import fonts from "../../../assets/fonts";
import Preference from 'react-native-preference'
import { API, requestPost, requestGet } from "../../../network/Api";
import { Rating, AirbnbRating } from 'react-native-ratings';
import moment from 'moment'
import AlertModal from './../../../components/AlertModal'
import {strings} from './../../../i18n';
const CompletedTab = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [ongoingAppointment, setOngoingAppointment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [headingAlert, setHeadingAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [isSuccessAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        getProfileDetail()
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileDetail()
        });
        return unsubscribe;
    }, []);
    const _handleRefresh = () => {
        console.log('----')
        getProfileDetail()
    };
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        // setratingSelByUser(rating)
    }
    const getProfileDetail = () => {
        setLoading(true)
        console.log(Preference.get('userObject').id)
        console.log(Preference.get('userObject').token)
        let formData = new FormData()
        formData.append("customer_id", Preference.get('userObject').id)
        formData.append("maahir_token", Preference.get('userObject').token)
        formData.append("appointment_status", '4,5')
        requestPost(API.MULTIPLE_STATUS_CUStOMER, formData).then((response) => {
            setLoading(false)
            console.log('response Completed Job', response)
            if (response.response_status === '1') {
                var idTemp=[]
                idTemp=response.appointments
                idTemp.sort((item1, item2) => {
                    if (moment(item1.sdt).isAfter(moment(item2.sdt))) {
                        return false;
                    } else {
                        return true;
                    }
                })
                setOngoingAppointment(idTemp)
                // setOngoingAppointment(response.appointments)
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error Completed', error)
        })
    }
    const okAction = () => {
        setAlertModal(false)
        setSuccessAlert(false)
        setHeadingAlert('')
        setDescriptionAlert('')
    }
    // const getProfileDetail2 = (statusId) => {
    //     setLoading(true)
    //     let formData = new FormData()
    //     formData.append("customer_id", Preference.get('userObject').id)
    //     formData.append("customer_token", Preference.get('userObject').token)
    //     formData.append("appointment_status", statusId)
    //     requestPost(API.CUSTOMER_APT_BY_STATUS, formData).then((response) => {
    //         setLoading(false)
    //         console.log('response Completed Job', response)
    //         if (response.response_status === '1') {
    //             let tempArray=[]
    //             ongoingAppointment.forEach((element) => {
    //                 tempArray.push({...element,clickable:true})
    //                 console.log(element)
    //             }); 
    //             response.appointments.forEach((element) => {
    //                 tempArray.push(element)
    //                 console.log(element)
    //             });
    //             setTimeout(()=>{
    //             setOngoingAppointment(tempArray)
    //             },5000)
               
    //         }
    //     }).catch((error) => {
    //         setLoading(false)
    //         console.log('error Completed', error)
    //     })
    // }
    const renderOngoingItem = ({ item, index }) => {
        return (
            <TouchableOpacity  onPress={() => {
                if(item.is_rated==='1'){

                }else{
                    navigation.navigate('JobDetail', { scr: 'complete', itemObj: item }) 
                }
                 }} style={styles.itemContainer}>
                <View style={[styles.textContainer, { width: '63%' }]}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.itemHeading}>{`${item.ag_fname ? item.ag_fname : ''} ${item.ag_lname ? item.ag_lname : ''}`}</Text>
                        {/* <Text style={styles.itemKm}>10 km away</Text> */}
                    </View>
                    {(item.address != '') &&
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Image style={{ width: 11, height: 13, resizeMode: 'contain', marginTop: 5 }} source={Icons.repaireLocation} />
                            <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item.address}</Text>
                        </View>
                    }
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Image style={{ width: 11, height: 13, resizeMode: 'contain', marginTop: 5 }} source={Icons.repaireTime} />
                        <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item.date+'   '+item.time}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', right: 14, height: '100%', flexDirection: 'row', }}>
                    <Text style={styles.itemRightText}>{parseFloat(item.distance).toFixed(2)} km away</Text>
                    {/* <View  style={{width:8,height:8,borderRadius:5,backgroundColor:'green',marginTop:7,marginLeft:5}}/> */}
                </View>
                <View style={styles.ratingContainer}>
                    <AirbnbRating
                        showRating
                        ratingCount={5}
                        showRating={false}
                        defaultRating={(item?.appointment_rating === undefined || item?.appointment_rating === null) ? 0 : parseFloat(item?.appointment_rating).toFixed(2)}
                        isDisabled={true}
                        size={14}
                        fractions={1}
                        selectedColor={colors.buttonOrange}
                        ratingColor={'#F76300'}
                        // unSelectedColor={'grey'}
                        onFinishRating={ratingCompleted}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeStyle}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_handleRefresh}
                    />
                }
                style={{ marginBottom: 100 }}
                showsVerticalScrollIndicator={false}>
                {ongoingAppointment?.length > 0 &&
                    <View style={styles.listView}>
                        <FlatList
                            data={ongoingAppointment}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderOngoingItem}
                        />
                    </View>
                }
            </ScrollView>
            {(loading === false && (ongoingAppointment?.length === 0 || ongoingAppointment?.length === undefined)) &&
                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginTop: -200 }}>
                    <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 16 }}>{strings("global.no_completed")}</Text>
                </View>
            }
            <Loader isShowIndicator={true} loading={loading} />
            <AlertModal
                    isSuccess={isSuccessAlert}
                    modalVisible={alertModal}
                    okAction={okAction}
                    // cancelAction={cancelAction}
                    heading={headingAlert}
                    description={descriptionAlert} />
        </SafeAreaView>
    );
};
export default CompletedTab;
