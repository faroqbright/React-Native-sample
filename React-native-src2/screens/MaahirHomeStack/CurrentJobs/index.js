import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    FlatList,
    Platform,
    Image,
    ImageBackground,
    Linking,
    Modal,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Button from './../../../components/Button'
import Header from '../../../components/Header'
import Icons from './../../../assets/icons/'
import Images from './../../../assets/images/'
import { isIPhoneX } from "../../../utils/Dimensions";
import MainBackground from './../../../components/HomeBackGround'
import colors from "./../../../utils/colors";
import Loader from './../../../components/Loader'
import Preference from 'react-native-preference'
//redux
import { API, requestPost, requestGet } from "../../../network/Api";
import fonts from "../../../assets/fonts";

const CurrentJob = (props) => {
    const { navigation } = props
    const [loading, setLoading] = useState(false);
    const [ongoingAppointment, setOngoingAppointment] = useState([]);

    useEffect(() => {
        getJobDetail()
    }, []);

    const getJobDetail = () => {
        setLoading(true)
        let formData = new FormData()
        // formData.append("maahir_id", '69')
        // formData.append("customer_token", '87a4b5be8c43fdbc6113bc1b9e9f821265')
        // formData.append("appointment_status", '5')
        formData.append("maahir_id", Preference.get('maahirUserObject')?.id)
        formData.append("customer_token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_status", '6')
        requestPost(API.MAAHIR_APT_BY_STATUS, formData).then((response) => {
            setLoading(false)
            console.log('response getJobDetail', response)
            if (response.response_status === '1') {
                setOngoingAppointment(response.appointments)
            }
        }).catch((error) => {
            setLoading(false)
            console.log('error getJobDetail', error)
        })
    }



    const renderOngoingItem = ({ item, index }) => {
        return (
            <View
                style={styles.itemContainer}>
                <View style={[styles.textContainer, { width: '67%' }]}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.itemHeading}>{`${item.cl_fname ? item.cl_fname : ''} ${item.cl_lname ? item.cl_lname : ''}`}</Text>
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
                        <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item.time}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', right: 14, height: '100%' }}>
                    <Text style={styles.itemRightText}>{parseFloat(item.distance).toFixed(2)} km away</Text>
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={Icons.leftIcon}
                // centerComponentExtraStyle={{paddingRight:20}}
                hearderText={'Ongoing Jobs'}
                leftButtonIconStyle={{ width: 18, height: 18 }}
            />
            <View style={styles.listView}>
                {/* <Text style={styles.listHeading}>{'Ongoing Jobs'}</Text> */}
                {ongoingAppointment.length > 0 ?
                    <FlatList
                        data={ongoingAppointment}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderOngoingItem}
                    />
                    :
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: fonts.Bold, fontSize: 18, fontWeight: '700', marginTop: -100 }}>No Ongoing job available</Text>
                    </View>
                }
            </View>
            <Loader loading={loading} />
        </SafeAreaView>
    );
};


export default CurrentJob
