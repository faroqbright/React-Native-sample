import 'react-native-gesture-handler';
import React, {useRef, useEffect} from 'react';
import {View, SafeAreaView, Image, StyleSheet, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {withInAppNotification} from 'react-native-in-app-notification';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import Preference from 'react-native-preference';
import {images} from './assets/images/index';
import Splash from './containers/splash/index';
import Menu from './containers/menu/index';
import Home from './containers/home/index';
import Play from './containers/play/index';
import GiftBox from './containers/giftBox/index';
import User from './containers/user/index';
import Information from './containers/information/index';
import RegisterNow from './containers/registerNow/index';
import Otp from './containers/otp/index';
import RegisterStep2 from './containers/RegisterStep2/index';
import RegistrationDetail from './containers/registrationDeatil/index';
import CategoryDetail from './containers/categoryDetail/index';
import Ad from './containers/ad/index';
import SearchBrands from './containers/searchBrands/index';
import CompanyDetails from './containers/companyDetails/index';
import Setting from './containers/setting/index';
import favourite from './containers/favourite';
import Invitefriends from './containers/Invitefriends';
import MyPoints from './containers/myPoints';
import NotificationPopup from 'react-native-push-notification-popup';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs(true);

const Routing = props => {
  const popupRef = useRef(null);

  useEffect(() => {
    requestUserPermission();
    createNotificationListeners();
  }, []);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getToken();
      console.log('Authorization status:', authStatus);
    }
  };
  const createNotificationListeners = async () => {
    await messaging().onMessage(async remoteMessage => {
      console.log(
        'onMessage',
        'notificationListener-remoteMessage',
        JSON.stringify(remoteMessage),
      );
      if (remoteMessage) {
        showNotification(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
    });

    await messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'setBackgroundMessageHandler',
        'notificationOpenedListener-remoteMessage',
        JSON.stringify(remoteMessage),
      );
      if (remoteMessage) {
        showNotification(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
    });
    await messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          showNotification(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
          );
        }
      });
    await messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'onNotificationOpenedApp',
        'notificationOpenedListener-remoteMessage',
        JSON.stringify(remoteMessage),
      );
      if (remoteMessage) {
        showNotification(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
    });
  };

  const getToken = async () => {
    let fcmToken = await Preference.get('fcmToken');
    console.log('Token from Message', fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      console.log('Token from Message', fcmToken);

      if (fcmToken) {
        // user has a device token
        await Preference.set('fcmToken', fcmToken);
      }
    }
  };

  const showNotification = async (title, body) => {
    if (popupRef && popupRef.current)
      popupRef.current?.show({
        onPress: () => {
          console.log('Pressed');
        },
        appIconSource: null,
        appTitle: 'Qetafi',
        timeText: 'Now',
        title: title,
        body: body,
        slideOutTime: 5000,
      });

  };
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="splash"
            component={Splash}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="Information"
            component={Information}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="RegisterNow"
            component={RegisterNow}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="Otp"
            component={Otp}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="RegisterStep2"
            component={RegisterStep2}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="RegistrationDetail"
            component={RegistrationDetail}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="CategoryDetail"
            component={CategoryDetail}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="Ad"
            component={Ad}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="SearchBrands"
            component={SearchBrands}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="CompanyDetails"
            component={CompanyDetails}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="Setting"
            component={Setting}
          />
          <RootStack.Screen
            options={{headerShown: false}}
            name="bottomTab"
            component={bottomTab}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="favourite"
            component={favourite}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="Invitefriends"
            component={Invitefriends}
          />
          <RootStack.Screen
            options={{
              title: '',
              headerShown: false,
            }}
            name="MyPoints"
            component={MyPoints}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      <FlashMessage position="bottom" floating={true} />
      <NotificationPopup ref={popupRef} />
    </>
  );
};
const bottomTab = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          // borderTopColor: '#141414',
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          height: 60,
          // backgroundColor: '#141414',
        },
        keyboardHidesTabBar: 'true',
        activeTintColor: '#C4501B',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={styles.tabContainer}>
                <Image
                  source={focused ? images.menuActive : images.menuInactive}
                  style={styles.tabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={styles.tabContainer}>
                <Image
                  source={focused ? images.homeActive : images.homeInactive}
                  style={styles.tabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Play"
        component={Play}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={styles.tabContainer}>
                <Image
                  source={focused ? images.playActive : images.playInactive}
                  style={styles.tabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="GiftBox"
        component={GiftBox}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={styles.tabContainer}>
                <Image
                  source={
                    focused ? images.giftBoxActive : images.giftBoxInactive
                  }
                  style={styles.tabIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View style={styles.tabContainer}>
                <Image
                  source={focused ? images.userActive : images.userInactive}
                  style={styles.tabIcon}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default Routing;
const styles = StyleSheet.create({
  tabContainer: {
    width: 45,
    height: 45,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
  },
  tabIcon: {
    height: '65%',
    width: '65%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
