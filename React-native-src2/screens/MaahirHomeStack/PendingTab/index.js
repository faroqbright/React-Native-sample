import moment from 'moment';
import React, { useEffect, useState } from "react";
import {
    FlatList, Image, Platform, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View
} from "react-native";
import { getBrand, getIpAddress, getModel, getPhoneNumber, getSerialNumber, getUniqueId } from 'react-native-device-info';
import Preference from 'react-native-preference';
import { API, BUILD_VERSION, requestPost } from "../../../network/Api";
import Icons from './../../../assets/icons/';
import Loader from './../../../components/Loader';
import { strings } from './../../../i18n';
import { styles } from "./Styles";


const PendingTab = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [ongoingAppointment, setOngoingAppointment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const getInfo = async () => {
        let formData = new FormData();
        formData.append('token', Preference.get('maahirUserObject')?.token);
        formData.append('brand', getBrand());
        formData.append('model', getModel());
        formData.append('build_no', BUILD_VERSION);
        formData.append('device_id', getUniqueId());
        const ip_address = await getIpAddress();
        formData.append('ip_address', ip_address);
        formData.append('entry_date', moment(new Date()).format('YYYY-MM-DD'));
        formData.append('entry_time', moment(new Date()).format('LT'));
        const name = Platform.select({
            ios: 'ios',
            android: 'android',

        })
        formData.append('name', name);

        const phone_no = await getPhoneNumber();
        formData.append('phone_no', phone_no);
        const serial_no = await getSerialNumber();
        formData.append('serial_no', serial_no);
        console.log(formData)

        const res = await requestPost(API.DEVICE_INFO, formData);
        console.log('device info', res);


    }
    useEffect(() => {
        getInfo();
        console.log('ak ', Preference.get('maahirUserObject')?.token)
        // navigation.navigate('ProfileScreen')
        getProfileDetail()
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileDetail()
        });
        return unsubscribe;
    }, [navigation]);
    const _handleRefresh = () => {
        console.log('----')
        getProfileDetail()
    };
    const getProfileDetail = () => {
        setLoading(true)
        let formData = new FormData()
        formData.append("maahir_id", Preference.get('maahirUserObject')?.id)
        formData.append("maahir_token", Preference.get('maahirUserObject')?.token)
        formData.append("appointment_status", '0')
        requestPost(API.MAAHIR_APT_BY_STATUS, formData).then((response) => {
            setLoading(false)
            console.log('response Pending', response)
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
            console.log('error Pending', error)
        })
    }
    const renderOngoingItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('JobDetail', {
                        scr: 'pending', itemObj: item,
                        onAccept: () => {
                            navigation.navigate('Upcoming')
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
                    <Text style={{ fontWeight: '700', textAlign: 'center', fontSize: 16 }}>{strings("global.no_pending")}</Text>
                </View>
            }
            <Loader isShowIndicator={true} loading={loading} />

        </SafeAreaView>
    );
};
export default PendingTab;
