import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//Screens
import HomeScreen from './HomeScreen'
import HomeCategoryDetail from './HomeCategoryDetail/'
import HomeSignUpScreen from './../AuthStack/SignUpScreen'
import HomeOtpScreen from './../AuthStack/OtpScreen'
import HomeLoginScreen from './../AuthStack/LoginScreen'
//Utils
import colors from '../../utils/colors';
//Components
import DrawerComponent from '../../components/DrawerComponent';
/** Home Drawer */
const HomeDrawerStack = (props) => (
    <Drawer.Navigator
        drawerStyle={{ backgroundColor: colors.background }}
        headerMode="none"
        initialRouteName='HomeScreen'
        drawerContent={(props) => <DrawerComponent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
);
/** Home Stack */
export default HomeStack = () => (
    <Stack.Navigator
        headerMode="none"
        initialRouteName='HomeDrawerStack'>
        <Stack.Screen name="HomeDrawerStack" component={HomeDrawerStack} />
        <Stack.Screen name="HomeCategoryDetail" component={HomeCategoryDetail} />
        <Stack.Screen name="HomeSignUpScreen" component={HomeSignUpScreen} />
        <Stack.Screen name="HomeOtpScreen" component={HomeOtpScreen} />
        <Stack.Screen name="HomeLoginScreen" component={HomeLoginScreen} />
    </Stack.Navigator>
);