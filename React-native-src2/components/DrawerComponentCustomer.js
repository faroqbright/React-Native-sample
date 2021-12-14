import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
    Linking,
    Dimensions,
    Platform
} from 'react-native';
import Preference from 'react-native-preference'

//Utils
import colors from '../utils/colors';
import fonts from '../assets/fonts/'
import preferenceKeys from '../utils/preferenceKeys';
import { API, requestPost, requestGet } from "./../network/Api";
import Loader from './Loader'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertModal from './../components/AlertModal'
import { strings, ChangeLanguage } from './../i18n';
import { Switch } from 'react-native-switch';

const { width, height } = Dimensions.get('window')
//Components
import DrawerItem from './DrawerItem';
import icons from '../assets/icons';

export default class CompanyDrawerContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            switchValue: false,
            btn: 'en',
            headingAlert: '',
            descriptionAlert: '',
            alertModal: false,
            isSuccessAlert: false
        }
    }
    componentDidMount() {
        this.languageButtonRender()
    }
    languageButtonRender = async () => {
        let lang = await AsyncStorage.getItem("language");
        this.setState({
            btn: lang ? lang : "en"
        })
    };
    changeLanguageAPi = (language) => {
        this.setState({ loading: true })
        let formData = new FormData()
        formData.append("token", Preference.get('userObject')?.token)
        formData.append("language", language === 'en' ? 1 : 2)
        requestPost(API.SET_USER_LANGUAGE, formData).then((response) => {
            this.setState({ loading: false })
            console.log('response', response)
            if (response.response_status === '1') {
                this.LanguageSelection(language)
            }
            else {
                this.setState({
                    headingAlert: strings('global.error'),
                    descriptionAlert: response.msg,
                    alertModal: true,
                    isSuccessAlert: false
                })
            }
        }).catch((error) => {
            this.setState({ loading: false })
            this.setState({
                headingAlert: strings('global.network_error'),
                descriptionAlert: strings('global.net_work_error'),
                alertModal: true,
                isSuccessAlert: false
            })
            console.log('error', error)
        })
    }
    LanguageSelection = async (lang) => {
        await AsyncStorage.setItem("language", lang);
        // await Preference.set('language',lang)
        ChangeLanguage(lang);
    };
    okAction() {
        this.setState({
            headingAlert: '',
            descriptionAlert: '',
            alertModal: false,
            isSuccessAlert: false
        })
    }
    cancelAction() {
        this.setState({
            headingAlert: '',
            descriptionAlert: '',
            alertModal: false,
            isSuccessAlert: false
        })
    }
    logout() {
        this.setState({ loading: true })
        console.log('tokennnnn--->', Preference.get('userObject').id)
        let formData = new FormData()
        formData.append("user_id", Preference.get('userObject').id)
        requestPost(API.LOGOUT, formData).then((response) => {
            this.setState({ loading: false })
            if (response.response_status === '1') {
                console.log('response logout ', response)
                Preference.clear();
                this.props.navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
            }
            else {
                Alert.alert(
                    strings('global.error'),
                    '' + response.msg,
                    [{ text: strings('global.ok'), onPress: () => { } }]
                );
            }
        }).catch((error) => {
            this.setState({ loading: false })
            Alert.alert(
                strings('global.error'),
                '' + strings('global.net_work_error'),
                [{ text: strings('global.ok'), onPress: () => { } }]
            );
            console.log('error logout', error)
        })
    }

    render() {
        const { navigation } = this.props
        return (
            <ScrollView
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ width: '100%', height: '100%', flexDirection: 'row', backgroundColor: 'yellow' }}>
                    <View style={styles.drawerContainer}>
                        <Image
                            style={styles.logoImg}
                            source={icons.logoIcon}
                        />
                        <DrawerItem
                            //  containerStyle={{ marginTop:20 }}
                            title={strings('drawer_components.home')}
                            imageSource={icons.drawerHome}
                            titleStyle={styles.textHeading}
                            containerStyle={{ marginTop: 0 }}
                            onPress={() => {
                                navigation.toggleDrawer()
                            }}
                        />
                        {/* <DrawerItem
                        title={'Tell A Friend'}
                        imageSource={icons.drawerFriend}
                        titleStyle={styles.textHeading}
                        onPress={() => {
                        }}
                    /> */}
                        <DrawerItem
                            title={strings('drawer_components.help_center')}
                            imageSource={icons.drawerTerms}
                            titleStyle={styles.textHeading}
                            onPress={() => {
                                navigation.navigate('AboutDrawer')
                                // navigation.navigate('AboutUs')
                            }}
                        />
                        {/* <DrawerItem
                        title={'Term and Conditions'}
                        imageSource={icons.drawerTerms}
                        titleStyle={styles.textHeading}
                        onPress={() => {
                            Linking.openURL("https://maahirpro.com/")
                            //navigation.navigate('ContactUs')
                        }}
                        />
                         <DrawerItem
                          title={strings('drawer_components.privacy_policy')}
                        imageSource={icons.drawerTerms}
                        titleStyle={styles.textHeading}
                        onPress={() => {
                            Linking.openURL("https://maahirpro.com/")
                            //navigation.navigate('ContactUs')
                        }}
                        /> */}
                        <DrawerItem
                            title={strings('drawer_components.contact_us')}
                            imageSource={icons.drawerTerms}
                            titleStyle={styles.textHeading}
                            onPress={() => {
                                navigation.navigate('ContactUs')
                            }}
                        />
                        <DrawerItem
                            containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            titleStyle={styles.textHeading}
                            title={strings('drawer_components.logout')}
                            imageSource={icons.drawerLogout}
                            onPress={() => {
                                this.logout()
                            }}
                        />
                        {Platform.OS === 'android' &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingLeft: 20, paddingRight: 20 }}>
                                <Text style={styles.headingOneDescription}>{strings('drawer_components.language')}</Text>
                                <Switch
                                    value={this.state.switchValue}
                                    onValueChange={(value) => {
                                        Alert.alert(
                                            strings('drawer_components.alert'),
                                            strings('drawer_components.are_you_sure_to_change_language'),
                                            [
                                                { text: strings('global.cancel'), },
                                                {
                                                    text: strings('global.ok'),
                                                    onPress: async () => {
                                                        this.setState({
                                                            switchValue: value
                                                        })
                                                        if (this.state.btn != 'en') {
                                                            console.log('english->', this.state.btn)
                                                            this.changeLanguageAPi('en')
                                                            // this.LanguageSelection("en");
                                                        } else {
                                                            this.changeLanguageAPi('urdu')
                                                            console.log('urdu->', this.state.btn)
                                                            // this.LanguageSelection("urdu");
                                                        }
                                                    },
                                                }
                                            ],
                                            { cancelable: false },
                                        );
                                    }}
                                    disabled={false}
                                    activeText={'English'}
                                    inActiveText={'Urdu   '}
                                    backgroundActive={'gray'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#eAeAeA'}
                                    circleInActiveColor={'#eAeAeA'}
                                    switchWidthMultiplier={3}
                                    innerCircleStyle={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 0
                                    }} 
                                />
                            </View>
                        }
                        <AlertModal
                            isSuccess={this.state.isSuccessAlert}
                            modalVisible={this.state.alertModal}
                            okAction={() => {
                                this.okAction()
                            }}
                            // cancelAction={this.cancelAction()}
                            heading={this.state.headingAlert}
                            description={this.state.descriptionAlert} />
                        <Loader isShowIndicator={true} loading={this.state.loading} />
                    </View>
                    <TouchableOpacity style={{ width: '28%', paddingTop: 55, marginStart: 20 }}>
                        {/* <TouchableOpacity
                            onPress={() => {
                                navigation.toggleDrawer()
                            }}
                        >
                            <Image
                                style={{ width: 24, height: 24, resizeMode: 'contain', }}
                                source={icons.hamburgerMain}
                            />
                        </TouchableOpacity> */}
                    </TouchableOpacity>
                </View>
                {/* <Loader loading={this.state.loading} /> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    drawerContainer: {
        // flex: 1,
        backgroundColor: colors.white,
        paddingTop: 50,
        height: '100%',
        width: '100%',
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textHeading: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: fonts.Bold
    },
    logoImg: {
        width: '70%',
        height: 40,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 0,
        marginBottom: 20
    },
    headingOneDescription: {
        color: colors.primary,
        fontSize: 16,
        lineHeight: 26,
        fontWeight: '700',
    },
})