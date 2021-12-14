import React from 'react';
import { Image, View, Dimensions } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isIphoneX } from './../../utils/isIphoneX'
import Icons from './../../assets/icons/'
import Fonts from './../../assets/fonts/'
import DrawerComponent from '../../components/DrawerComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const { width, height } = Dimensions.get('screen');

//Screens
import AppointmentDetail from './AppointmentDetail/'
import CustomerDirection from './CustomerDirection/'
import CompletedJob from './CompletedJob/'
import CurrentdJob from './CurrentJobs/'
import AboutUs from '../HomeStack/AboutUs/'
import ProfileScreen from '../MaahirHomeStack/ProfileScreen'
import EditProfileMaahir from './EditProfileMaahir/'
import JobDetail from './JobDetail/'
import ContactUs from './ContactUs/'
import AboutDrawer from './AboutDrawer/'
import HelpCenter from './HelpCenter/'
import WalletOption from './WalletOption/'

//Utils
import colors from '../../utils/colors';


const HomeDrawerStack = (props) => (
    <Drawer.Navigator
        drawerStyle={{ backgroundColor: '#00000000', width: '70%' }}
        headerMode="none"
        initialRouteName='AppointmentDetail'
        drawerContent={(props) => <DrawerComponent {...props} />}>
        <Drawer.Screen name="AppointmentDetail" component={AppointmentDetail} />
    </Drawer.Navigator>
);

/** Home Stack */
export default MaahirStack = () => (
    <Stack.Navigator
        headerMode="none"
        initialRouteName='AppointmentDetail'>
        <Stack.Screen name="HomeDrawerStack" component={HomeDrawerStack} />
        {/* <Stack.Screen name="AppointmentDetail" component={AppointmentDetail} /> */}
        <Stack.Screen name="CustomerDirection" component={CustomerDirection} />
        <Stack.Screen name="CompletedJob" component={CompletedJob} />
        <Stack.Screen name="CurrentdJob" component={CurrentdJob} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="EditProfileMaahir" component={EditProfileMaahir} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="JobDetail" component={JobDetail} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="AboutDrawer" component={AboutDrawer} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
        <Stack.Screen name="WalletOption" component={WalletOption} />
    </Stack.Navigator>
);