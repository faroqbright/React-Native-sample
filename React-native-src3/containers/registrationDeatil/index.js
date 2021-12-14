import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import Preference from 'react-native-preference';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';

import { images } from '../../assets/images';
import { styles } from './styles';
import { isRTL, strings } from '../../i18n';
import RNPickerSelect from 'react-native-picker-select';
import {
  signupAPI,
  getAllCitiesAPI,
  getCategoriesAPI,
} from '../../API/methods/auth';
import Loader from '../../components/loader1';
import { showWarningMsg } from '../../utils';
import moment from 'moment';

const lang = Preference.get('language');
const genderArray = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  },
]

const registrationDeatil = props => {
  const { route, navigation } = props;

  const phoneNumber = route.params?.phoneNumber;
  const name = route.params?.name;
  const email = route.params?.email;

  const [loading, setLoading] = useState(false);
  const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [dateOrTimeValue, setDateOrTimeValue] = useState(new Date());
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectGender, setSelectGender] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getCities();
    getCategories();
  }, []);

  const pickerStyle = {
    inputIOS: {
      color: 'black',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
    },
    inputAndroid: {
      color: 'white',
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
  };

  const verifyFields = () => {
    if (
      moment(dateOrTimeValue).format('MMDDYYYY') === moment().format('MMDDYYYY')
    ) {
      showWarningMsg(strings('registraton_detail.date'));
      return false;
    } else if (selectedCity === undefined || selectedCity === '') {
      showWarningMsg(strings('registraton_detail.city_required'));
      return false;
    } else if (selectGender === undefined || selectGender === '') {
      showWarningMsg(strings('registraton_detail.gender_required'));
      return false;
    } else if (selectedCategories.length < 1) {
      showWarningMsg(strings('registraton_detail.cat_required'));
      return false;
    } else {
      return true;
    }
  };

  const registerUser = async (otp) => {
    if (verifyFields()) {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        selectedCategories.map(item => {
          params.append('categoryArray[]', item._id);
        });
        params.append('email', email);
        params.append('name', name);
        params.append('phoneNumber', phoneNumber);
        params.append('cityId', selectedCity._id);
        params.append('gender', selectGender);
        params.append('otp', otp);
        params.append('dateOfBirth', moment(dateOrTimeValue).format('YYYY-MM-DD'));
        console.log('registerUser-apiData', JSON.stringify(params));
        const response = await signupAPI(params);
        setLoading(false);
        if (response.status === 200) {
          console.log("USERDATA:", JSON.stringify(response) )
          Preference.set('user', response.data.data);
          Preference.set('authUser', 1);
          navigation.navigate('Otp');
          // getMoviesFromApi()
        }
        console.log('registerUser-response', response.status);
      } catch (error) {
        setLoading(false);
        console.log('registerUser-error', error);
      }
    }
  };
  const sendOtp = (otp) => {
    return fetch(`https://www.hisms.ws/api.php?send_sms&username=966560060662&password=Aa@120Ss&numbers=${phoneNumber}&sender=Active-code&message=Dear%20Qetafi%20customer,%20One%20Time%20Password%20(${otp})%20is%20`)
        .then(response => {
            console.log("ÖTP Sent", response);
            registerUser(otp)
        })
        .catch((error) => {
            console.error(error);
        });
};
  const generateOtp = () => {
    //const code = Math.floor(1000 + Math.random() * 9000);
    const code = 1234
    Preference.set("OTP", code);
    sendOtp(code);
    console.log("OTP", code)
}
  const getCities = async () => {
    setLoading(true);
    try {
      const response = await getAllCitiesAPI();
      setLoading(false);
      console.log('getCities-response', response.status);
      setCities(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('getCities-error', error);
    }
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoriesAPI();
      setLoading(false);
      console.log('getCategories-response', response.status);
      setCategories(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('getCategories-error', error);
    }
  };

  const cityPickerItem = () => {
    let list = [];

    for (let a = 0; a < cities.length; a++) {
      cities[a].englishName
        ? list.push({ label: cities[a].englishName, value: cities[a] })
        : null;
    }
    return list;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={images.backgroundImgAuth}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name={"chevron-back"} color={"white"} size={26} />
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <View style={styles.mainView}>
          <Text style={styles.titleText}>
            {strings('log_in.enter_personal_info')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setDateTimePickerVisible(true);
            }}
            style={styles.dob}>
            <Text
              style={{
                color: 'white',
                writingDirection: lang == 'en' ? 'ltr' : 'rtl',
              }}>
              {showDate
                ? moment(dateOrTimeValue).format('MM/DD/YYYY')
                : strings('registraton_detail.dob')}
            </Text>
            <Image style={styles.calender} source={images.calendar} />
          </TouchableOpacity>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 15,
              paddingLeft: 3,
            }}>
            <RNPickerSelect
              placeholder={{ label: strings('setting.city'), value: '' }}
              inputAndroid={{ color: 'black', backgroundColor: 'red' }}
              style={{ color: 'black', backgroundColor: 'red' }}
              value={selectedCity}
              style={pickerStyle}
              useNativeAndroidPickerStyle={false}
              onValueChange={value => {
                setSelectedCity(value);
              }}
              items={cityPickerItem()}
            />
          </View>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 15,
              paddingLeft: 3,
            }}>
            <RNPickerSelect
              placeholder={{ label: strings('registraton_detail.gender'), value: '' }}
              inputAndroid={{ color: 'black', backgroundColor: 'red' }}
              style={{ color: 'black', backgroundColor: 'red' }}
              value={selectGender}
              style={pickerStyle}
              useNativeAndroidPickerStyle={false}
              onValueChange={value => {
                setSelectGender(value);
              }}
              items={genderArray}
            />
          </View>
          <View style={styles.flatlistView}>
            {selectedCategories.length > 0 ? (
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <ScrollView horizontal>
                  {selectedCategories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item._id + '_' + index}
                        onPress={() => {
                          let temp = selectedCategories;
                          temp.splice(index, 1);
                          setSelectedCategories([...temp]);
                        }}
                        style={[styles.boxView, { flexDirection: 'row' }]}>
                        <Text
                          style={{
                            writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                            fontSize: 10,
                          }}>
                          {lang == 'en' ? item.englishName : item.arabicName}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 10,
                            color: 'white',
                            writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                          }}>
                          x
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <Text
                style={{
                  color: '#FFFFFF70',
                  marginRight: 10,
                  paddingLeft: 7,
                  writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                }}>
                {strings('registraton_detail.ur_interestes')}
              </Text>
            )}
          </View>
          <ScrollView
            style={{ height: 200, marginBottom: 10}}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              flexGrow: 1,
            }}>
            {categories.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item._id + '__' + index}
                  onPress={() => {
                    let newList = [...selectedCategories];
                    const Value = newList.includes(item);
                    if (!Value) {
                      newList.push(item);
                      setSelectedCategories(newList);
                    }
                  }}
                  style={styles.boxView}>
                  <Text
                    style={{
                      writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                      fontSize: 10,
                    }}>
                    {lang == 'en' ? item.englishName : item.arabicName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              generateOtp();
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {strings('register_now.register')}
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
      <Loader showLoading={loading} />
      {Platform.OS === 'android' ? (
        dateTimePickerVisible && (
          <DateTimePicker
            maximumDate={new Date()}
            mode="date"
            display="spinner"
            value={dateOrTimeValue}
            onChange={(event, value) => {
              console.log('value', value);
              setDateOrTimeValue(value);
              setDateTimePickerVisible(false);
              setShowDate(true);
            }}
          />
        )
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={dateTimePickerVisible}>
          <TouchableOpacity
            onPress={() => {
              setDateTimePickerVisible(false);
            }}
            style={styles.modalMainView}>
            <View style={styles.datePickerView}>
              <DateTimePicker
                maximumDate={new Date()}
                mode="date"
                display="spinner"
                value={new Date(dateOrTimeValue)}
                onChange={(event, value) => {
                  console.log('value', value);
                  setDateOrTimeValue(value);
                  setDateTimePickerVisible(true);
                  setShowDate(true);
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default registrationDeatil;
