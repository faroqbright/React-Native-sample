import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
  I18nManager,
  Switch,
  Alert,
  DevSettings,
  Platform
} from "react-native";
import { styles } from "./Styles";
import Images from "./../../../assets/images";
import Icons from "./../../../assets/icons";
import colors from "./../../../utils/colors";
// import RNRestart from 'react-native-restart';
//redux
import { connect } from "react-redux";
import { LANDING_CHANGE_STATE } from "../../../Actions/types";
import { stateChange } from "../../../Actions/commonAction";
import Preference from "react-native-preference";
import crashlytics from "@react-native-firebase/crashlytics";
import { strings, ChangeLanguage } from "./../../../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, requestPost } from "../../../network/Api";
const LandingScreen = (props) => {

  const { navigation, isCustomerSelect, isMaahirSelect } = props;
  const [checkForwardBit, setForwardBit] = useState(0);
  const [switchValue, setSwitchValue] = useState(false);
  const [btn, setBtn] = useState("en");
  const inputcheck = () => {
    if (email === "") {
      alert("User name is required");
    } else if (password === "") {
      alert("Enter Password");
    } else {
    }
  };
  const LanguageSelection = async (lang) => {
    await AsyncStorage.setItem("language", lang);
    // await Preference.set('language',lang)
    ChangeLanguage(lang);
  };
  const PersonComponent = (props) => {
    const { } = props;
    return (
      <TouchableOpacity
        onPress={props.selectionClick}
        style={styles.personComponentStyle}
      >
        <Image source={props.img} style={styles.personImg} />
        <Text style={styles.personText}>{props.name}</Text>
        {props.isCheck === true && (
          <Image style={styles.checkImg} source={Icons.personSelection} />
        )}
      </TouchableOpacity>
    );
  };
  const LanguageButtonRender = async () => {
    let lang = await AsyncStorage.getItem("language");
    // let lang = Preference.get('language');

    setBtn(lang ? lang : "en");
  };
  useEffect(() => {
    LanguageButtonRender();
    crashlytics().log("App mounted.");
  }, []);

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Image style={styles.logoImg} source={Icons.logoIcon} />
        <Image
          style={
            checkForwardBit === 0 ? styles.landerOneImg : styles.landerTwoImg
          }
          source={checkForwardBit === 0 ? Images.landerOne : Images.landerTwo}
        />
        {checkForwardBit === 0 ? (
          <View>
            <Text style={styles.headingOne}>
              {strings("landing_screen.heading")}
            </Text>
            <Text style={styles.headingOneDescription}>
              {strings("landing_screen.description")}
            </Text>
            {Platform.OS != 'ios' &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, marginLeft: 20 }}>
                <Text style={styles.headingOneDescription}>{switchValue ? 'Urdu' : 'English'}</Text>
                <Switch
                  ios_backgroundColor="white"
                  style={styles.toggleStyle}
                  value={switchValue}
                  onValueChange={(value) => {
                    Alert.alert(
                      'Alert',
                      'Are you sure to change language?',
                      [
                        { text: 'Cancel', },
                        {
                          text: 'Ok',
                          onPress: async () => {
                            setSwitchValue(value)
                            if (btn != 'en') {
                              console.log('english->', btn)
                              LanguageSelection("en");
                            } else {
                              console.log('urdu->', btn)
                              LanguageSelection("urdu");
                            }
                          },
                        }
                      ],
                      { cancelable: false },
                    );

                  }}
                />
              </View>
            }
          </View>
        ) : (
          <View>
            <Text style={styles.headingTwo}>
              {strings("landing_screen.choose_your_identity")}
            </Text>
            <Text style={styles.headingTwoDescription}>
              {strings("landing_screen.please_select_from_the_following")}
            </Text>
            <View style={styles.personContainer}>
              <PersonComponent
                name={strings("landing_screen.maahir")}
                img={Icons.mahirIcon}
                isCheck={isMaahirSelect}
                selectionClick={() => {
                  props.stateChange(LANDING_CHANGE_STATE, {
                    isCustomerSelect: false,
                    isMaahirSelect: true,
                  });
                  navigation.navigate("LoginScreen");
                }}
              />
              <PersonComponent
                name={strings("landing_screen.customer")}
                img={Icons.customerIcon}
                isCheck={isCustomerSelect}
                selectionClick={() => {
                  props.stateChange(LANDING_CHANGE_STATE, {
                    isCustomerSelect: true,
                    isMaahirSelect: false,
                  });
                  navigation.navigate("LoginScreen");
                }}
              />
            </View>
          </View>
        )}
        {/* {checkForwardBit >= 1 && (
          <View style={[styles.forwardBtnContainer, { alignSelf: 'flex-start' }]}>
            <TouchableOpacity
              onPress={() => {
                setForwardBit(checkForwardBit - 1);
              }}
              style={styles.shadowContainer}
            >
              <Image style={[styles.forwardImg, { transform: btn === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]} source={Icons.leftIcon} />
            </TouchableOpacity>
          </View>
        )}
        {checkForwardBit < 1 && (
          <View style={styles.forwardBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (checkForwardBit < 1) {
                  setForwardBit(checkForwardBit + 1);
                } else {
                  navigation.navigate("LoginScreen");
                }
              }}
              style={styles.shadowContainer}
            >
              <Image style={[styles.forwardImg, { transform: btn === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]} source={Icons.forwardIcon} />
            </TouchableOpacity>
          </View>
        )} */}
      </ScrollView>
      {checkForwardBit >= 1 && (
        <View style={{ left: 20, position: 'absolute', bottom: 20 }}>
          <View style={[styles.forwardBtnContainer, { alignSelf: 'flex-start' }]}>
            <TouchableOpacity
              onPress={() => {
                setForwardBit(checkForwardBit - 1);
              }}
              style={styles.shadowContainer}
            >
              <Image style={[styles.forwardImg, { transform: btn === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]} source={Icons.leftIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {checkForwardBit < 1 && (
        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <View style={styles.forwardBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (checkForwardBit < 1) {
                  setForwardBit(checkForwardBit + 1);
                } else {
                  navigation.navigate("LoginScreen");
                }
              }}
              style={styles.shadowContainer}
            >
              <Image style={[styles.forwardImg, { transform: btn === 'en' ? [{ rotate: '0deg' }] : [{ rotate: '180deg' }] }]} source={Icons.forwardIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  const { landingReducers } = state;
  const { isCustomerSelect, isMaahirSelect } = landingReducers;
  return { isMaahirSelect, isCustomerSelect };
};
export default connect(mapStateToProps, { stateChange })(LandingScreen);
