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

import moment from 'moment'
import { strings } from './../../../i18n';
const UpcomingTab = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [ongoingAppointment, setOngoingAppointment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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
    const getProfileDetail = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("maahir_id", Preference.get('maahirUserObject')?.id)
        formData.append("maahir_token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_status", '1')
        requestPost(API.MAAHIR_APT_BY_STATUS, formData).then((response) => {
            setLoading(false)
            console.log('response Upcoming', response)
            if (response.response_status === '1') {
                var idTemp = []
                idTemp = response.appointments
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
            console.log('error Upcoming', error)
        })
    }
    const renderOngoingItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('JobDetail', {
                        scr: 'upcoming', itemObj: item,
                        onStart: () => {
                            navigation.navigate('Ongoing')
                        }
                    })
                }}
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
                        <Text style={[styles.itemKm, { textAlign: 'left', marginLeft: 11, width: '88%' }]}>{item.date + '   ' + item.time}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', right: 14, height: '100%' }}>
                    <Text style={styles.itemRightText}>{parseFloat(item.distance).toFixed(2) + ' ' + strings("global.km_away")}</Text>
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
                style={{ marginBottom: 10 }}
                showsVerticalScrollIndicator={false}>
                {ongoingAppointment?.length > 0 &&
                    <View style={styles.listView}>
                        {/* <Text style={styles.listHeading}>{'Pending Appointments'}</Text> */}
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
                    <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 16 }}>{strings("global.no_appointment")}</Text>
                </View>
            }
            <Loader isShowIndicator={true} loading={loading} />
        </SafeAreaView>
    );
};
export default UpcomingTab;
