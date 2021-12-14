import React, { useEffect, useState } from 'react';
import { Image, View, Dimensions, Text, StyleSheet, Keyboard, } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isIphoneX } from './../../utils/isIphoneX'
import Icons from './../../assets/icons/'
import Fonts from './../../assets/fonts/'
import DrawerComponent from '../../components/DrawerComponentCustomer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('screen');

//Screens
import RepairScreen from './RepairScreen/'
import JobDetail from './JobDetail/'
import ServiceScreen from './ServiceScreen/'
import ConsultationScreen from './ConsultationScreen/'
import ProfileScreen from './ProfileScreen/'
import EditProfile from './EditProfile/'
import MaahirScreen from './MahirProfile/'
import ServiceByLocation from './ServiceByLocation/'
import ContactUs from './ContactUs/'
import MaahirDirection from './../HomeStack/MaahirDirection/'
import AboutUs from './AboutUs/'
import LocationSelector from './LocationSelector/'
import AboutDrawer from './AboutDrawer/'
//Utils
import colors from '../../utils/colors';
import {strings} from './../../i18n';


const HomeDrawerStack = (props) => (
    <Drawer.Navigator
        // drawerStyle={{ backgroundColor: '#00000000', width: '70%',}}
        drawerStyle={{ backgroundColor: 'red', width: '70%',}}
        headerMode="none"
        initialRouteName='MyTabs'
        drawerContent={(props) => <DrawerComponent {...props} />}>
        <Drawer.Screen name="MyTabs" component={MyTabs} />
    </Drawer.Navigator>
)
function MyTabs() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])
    return (
        <Tab.Navigator
            tabBarOptions={{
                // activeTintColor: colors.buttonOrange,
                showLabel: false,
                // inactiveTintColor: colors.grey,
                keyboardHidesTabBar: true,
                style: {
                    height: isKeyboardVisible === false ? '12%' : 0,
                    // width: (width/10)*9,
                    width:'90%',
                    // height: 90,
                    backgroundColor: colors.bottomTab,
                    marginLeft: '5%',
                    marginRight: '5%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isIphoneX() ? 30 : 15,
                    borderRadius: 39,
                    overflow:'hidden',
                    // paddingTop: 20,
                    // paddingBottom: 10,
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    elevation: 9,
                    position: 'absolute',
                },
                // labelStyle: {
                //     fontSize: 11,
                //     fontWeight: '400',
                //     fontFamily: Fonts.Regular,
                //     marginTop: 15,
                // }
            }}
            initialRouteName={'ServiceScreen'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'RepairScreen') {
                        if (focused)
                            return (
                                <View style={{alignItems:'center'}}>
                                    <View style={[styles.iconContainer]}>
                                        <Image source={Icons.repairIcon} style={{ width: 24, height: 24, tintColor: colors.white }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={styles.activeText}>{strings("home_stack.activites")}</Text>
                                </View>
                            )
                        else
                            return (
                                <View style={{alignItems:'center'}}>
                                    <View style={[styles.iconContainer, { backgroundColor: colors.white }]}>
                                        <Image source={Icons.repairIcon} style={{ width: 21, height: 23, }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={styles.unActiveText}>{strings("home_stack.activites")}</Text>
                                </View>
                            )
                    }
                    if (route.name === 'ServiceScreen') {
                        if (focused)
                            return (
                                <View style={{alignItems:'center'}}> 
                                    <View style={[styles.iconContainer, { height: isKeyboardVisible === false ? 48 : 0 }]}>
                                        <Image source={Icons.serviceIcon} style={{ width: 21, height: 23, tintColor: colors.white }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={styles.activeText}>{strings("home_stack.services")}</Text>
                                </View>
                            )
                        else
                            return (
                                <View style={{ marginTop: isKeyboardVisible ? 100 : 0,alignItems:'center'}}>
                                    <View style={[styles.iconContainer, {backgroundColor: colors.white }]}>
                                        <Image source={Icons.serviceIcon} style={{ width: 21, height: 23, tintColor: 'gray' }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={styles.unActiveText}>{strings("home_stack.services")}</Text>
                                </View>
                            )
                    }
                    // if (route.name === 'ConsultationScreen') {
                    //     if (focused)
                    //         return (
                    //             <View style={{ width: 48, height: 48, backgroundColor: colors.buttonOrange, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }}>
                    //                 <Image source={Icons.consultationIcon} style={{ width: 21, height: 23, tintColor: colors.white }} resizeMode={'contain'} />
                    //             </View>
                    //         )
                    //     else
                    //         return (
                    //             <View style={{ width: 48, height: 48, backgroundColor: colors.white, borderRadius: 35, alignItems: 'center', justifyContent: 'center' }}>
                    //                 <Image source={Icons.consultationIcon} style={{ width: 21, height: 23, tintColor: 'gray' }} resizeMode={'contain'} />
                    //             </View>
                    //         )
                    // }
                    if (route.name === 'ProfileScreen') {
                        if (focused)
                            return (
                                <View style={{alignItems:'center'}}>
                                    <View style={[styles.iconContainer,]}>
                                        <Image source={Icons.profileIcon} style={{ width: 21, height: 23, tintColor: colors.white }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={styles.activeText}>{strings("home_stack.profile")}</Text>
                                </View>
                            )
                        else
                            return (
                                <View style={{ marginTop: isKeyboardVisible ? 100 : 0 ,alignItems:'center'}}>
                                    <View style={[styles.iconContainer, {backgroundColor: colors.white }]}>
                                        <Image source={Icons.profileIcon} style={{ width: 21, height: 23, tintColor: 'gray' }} resizeMode={'contain'} />
                                    </View>
                                    <Text style={styles.unActiveText}>{strings("home_stack.profile")}</Text>
                                </View>
                            )
                    }
                },
            })}

        >
            <Tab.Screen
                name="RepairScreen"
                component={RepairScreen}
                options={{
                    tabBarLabel: 'Activites',
                }}
            />
            <Tab.Screen
                name="ServiceScreen"
                component={ServiceScreen}
                options={{
                    tabBarLabel: 'Services',
                }}
            />
            {/* <Tab.Screen
                name="ConsultationScreen"
                component={ConsultationScreen}
                options={{
                    tabBarLabel: 'Consultation',
                }}
            /> */}
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen} 
                options={{
                    tabBarLabel: 'Profile',
                }}
            />

        </Tab.Navigator >
    );
}
/** Home Stack */
export default HomeStack = () => (
    <Stack.Navigator
        headerMode="none"
        initialRouteName='MyTabs'>
        <Stack.Screen name="HomeDrawerStack" component={HomeDrawerStack} />
        {/* <Stack.Screen name="MyTabs" component={MyTabs} /> */}
        <Stack.Screen name="ServiceByLocation" component={ServiceByLocation} />
        <Stack.Screen name="MaahirScreen" component={MaahirScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="JobDetail" component={JobDetail} />
        <Stack.Screen name="MaahirDirection" component={MaahirDirection} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="AboutDrawer" component={AboutDrawer} />
        <Stack.Screen name="LocationSelector" component={LocationSelector} />
    </Stack.Navigator>
);


export const styles = StyleSheet.create({
    activeText: {
        fontSize: 11,
        fontWeight: '400',
        fontFamily: Fonts.Regular,
        color: colors.buttonOrange,
        marginTop: 5
    },
    unActiveText: {
        fontSize: 11,
        fontWeight: '400',
        fontFamily: Fonts.Regular,
        color: colors.grey,
        marginTop: 5
    },
    iconContainer: {
        width: 48,
        height: 48,
        backgroundColor: colors.buttonOrange,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',

    }
});