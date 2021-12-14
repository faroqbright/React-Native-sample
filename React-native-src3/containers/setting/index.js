import React, { useEffect, useState } from 'react';
import ReactNative, {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Switch,
  Modal,
  Platform,
  PermissionsAndroid
} from 'react-native';
import moment from 'moment';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { images } from '../../assets/images';
import Entypo from 'react-native-vector-icons/Entypo'
import { styles } from './styles';
import Bar from '../../components/Bar';
import Preference from 'react-native-preference';
import RNRestart from 'react-native-restart';
import { isRTL, strings } from '../../i18n';
import { userProfileAPI } from '../../API/methods/profile';
import { updateProfileApi } from '../../API/methods/auth';
import Loader from '../../components/loader1';
import UpdateValueModal from '../../components/UpdateValueModal';
import { showWarningMsg } from '../../utils';
const lang = Preference.get('language');

const setting = props => {
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisibleLang, setIsVisibleLang] = useState(false);
  const [radio, setRadio] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [modalValue, setModalValue] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [profileUrl, setProfileUrl] = useState(null);
  const [userData, setUserData] = useState(null);
  const EmailVerificationRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        chooseCamera()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  const chooseCamera = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality:0.1
    };
    ImagePicker.launchCamera(options, (response) => {
      setModalValue(0);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        console.log("asdfg",response)
        const source = {
          uri:
            Platform.OS === 'ios'
              ? 'File:///' + response.assets[0].uri.split('file:/').join('')
              : response.assets[0].uri,
          name: moment().format('x') + '.jpeg',
          type: 'image/jpeg',
        };
        setProfilePic(source)
       UpdateProfile(source);
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        // setFilePath(source);
      }
    });
  }
  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality:0.1
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      setModalValue(0);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        const source = {
          uri:
            Platform.OS === 'ios'
              ? 'File:///' + response.assets[0].uri.split('file:/').join('')
              : response.assets[0].uri,
          name: moment().format('x') + '.jpeg',
          type: 'image/jpeg',
        };
        setProfilePic(source)
        UpdateProfile(source);
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        // setFilePath(source);
      }
    });
  };
  const verifyFields = () => {
    const reg = /^(\+92|0|92)[0-9]{10}$/;
    if (name.length < 3) {
      showWarningMsg(strings('log_in.name_enter'));
      return false;
    } else if (EmailVerificationRegex.test(email) === false) {
      showWarningMsg(strings('log_in.email_invalid'));
      return false;
    } else {
      return true;
    }
  };
  const UpdateProfile = async (pic) => {
    if (verifyFields()) {
      setLoading(true);
      try {
        const params = new FormData();
        params.append('email', email);
        params.append('name', name);
        params.append('phoneNumber', phoneNumber);
        pic && params.append('appUserImage', pic)
        console.log('body', params);
        const response = await updateProfileApi(params, userData?._id);
        setLoading(false);
        if (response.status == 200) {

          setProfileUrl(response.data.data.appUserImage);
          console.log("USERDATA:", JSON.stringify(response) )
          Preference.set('user', response.data.data)
         
        }

      } catch (error) {
        setLoading(false);
        console.log('updateProfileApi-error', error);
      }
    }
  };

  useEffect(() => {
    lang == 'en' ? setRadio(false) : setRadio(true);
    console.log("FETCHDATAUserId: ", JSON.stringify(Preference.get('user')))
    setUserData(Preference.get('user'))
    let userInfo=Preference.get('user')
    console.log("FETCHDATAUserId: ", JSON.stringify(userInfo?._id)) 
    userProfile(userInfo?._id);
  }, []);


  const userProfile = async (id) => {
    setLoading(true);
    try {
      //const params = new URLSearchParams();
      //params.append('userId', userData?._id);
      //console.log('body', params);
      const response = await userProfileAPI(id);
      setLoading(false);
      setProfileUrl(response.data.data.appUserImage);
      setEmail(response.data.data.email);
      setphoneNumber(response.data.data.phoneNumber);
      setName(response.data.data.name);
      console.log("USERDATA:", JSON.stringify(response) )
      Preference.set('user', response.data.data)
      console.log('userProfile-response', response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('userProfile-error', error);
    }
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const inAppLanguageChange = () => {
    if (radio == true) {
      ReactNative.I18nManager.forceRTL(true);
      Preference.set('language', 'ar');
      RNRestart.Restart();
      console.log(Preference.get('language'));
    } else {
      Preference.set('language', 'en');
      ReactNative.I18nManager.forceRTL(false);
      RNRestart.Restart();
      console.log(Preference.get('language'));
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={images.backgroundMenu}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.header}>
          <Image style={styles.headerImg} source={images.back} />
          <Text style={styles.headerText}>{strings('menu.settings')}</Text>
        </TouchableOpacity>
        <ScrollView style={styles.scroll}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.title}>{strings('setting.personal_acc')}</Text>
            <Bar
              titleText={strings('setting.personal_pic')}
              Img={images.back}
              descText={profileUrl?'Uploded':'Not Uploaded Yet!'}
              ImgStyle={styles.forwardImg}
              descTextStyle={styles.barDesc}
              onPress={() => {
                setModalValue(1);
              }}
            />
            <Bar
              titleText={strings('setting.name')}
              Img={images.back}
              ImgStyle={styles.forwardImg}
              descText={name}
              descTextStyle={styles.barDesc}
              onPress={() => {
                setModalValue(2);
              }}
            />
            <Bar
              titleText={strings('setting.tel_num')}
              Img={images.back}
              ImgStyle={styles.forwardImg}
              descText={phoneNumber}
              descTextStyle={styles.barDesc}
              // onPress={() => {
              //   setModalValue(3);
              // }}
            />
            <Bar
              titleText={strings('setting.email')}
              Img={images.back}
              ImgStyle={styles.forwardImg}
              descText={email}
              descTextStyle={styles.barDesc}
              onPress={() => {
                setModalValue(4);
              }}
            />
            <View style={styles.line} />
            <Text style={styles.bottomTitle}>
              {strings('setting.application')}
            </Text>
            <Bar
              titleText={strings('setting.country')}
              Img={images.back}
              ImgStyle={styles.forwardImg}
              descText={'السعودية'}
              descTextStyle={styles.barDesc}
            />
            <Bar
              titleText={strings('setting.city')}
              Img={images.back}
              ImgStyle={styles.forwardImg}
              descText={'جدة'}
              descTextStyle={styles.barDesc}
            />
            <Bar
              onPress={() => {
                setIsVisibleLang(true);
              }}
              titleText={strings('setting.language')}
              Img={images.back}
              ImgStyle={styles.forwardImg}
              descText={'العربية'}
              descTextStyle={styles.barDesc}
            />
            <View style={styles.switch}>
              <Text>{strings('setting.notifications')}</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#77B800' }}
                thumbColor={isEnabled ? '#767577' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isVisibleLang}>
              <View
                style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitleText}>Choose Language</Text>
                  <TouchableOpacity
                    onPress={() => setRadio(true)}
                    style={styles.radioBar}>
                    <Text>Arabic</Text>
                    <View
                      style={[
                        styles.radio,
                        { backgroundColor: radio ? 'red' : 'white' },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setRadio(false)}
                    style={styles.radioBar}>
                    <Text>English</Text>
                    <View
                      style={[
                        styles.radio,
                        { backgroundColor: radio ? 'white' : 'red' },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisibleLang(false);
                      inAppLanguageChange();
                    }}>
                    <Text style={styles.modalOk}>OK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setIsVisibleLang(false);
                  }} style={styles.closeButton}>
                    <Entypo name={"cross"} color={"black"} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
        <Loader showLoading={loading} />
        <UpdateValueModal
          onPressModalClose={() => {
            setModalValue(0);
          }}
          onPressSubmit={() => {
            setModalValue(0);
            UpdateProfile();
          }}
          visible={modalValue == 2 ? true : false}
          Name={'Update User Name'}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <UpdateValueModal
          onPressModalClose={() => {
            setModalValue(0);
          }}
          onPressSubmit={() => {
            setModalValue(0);
            UpdateProfile();
          }}
          visible={modalValue == 4 ? true : false}
          Name={'Update User Email'}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <UpdateValueModal
          onPressModalClose={() => {
            setModalValue(0);
          }}
          onPressSubmit={() => {
            setModalValue(0);
            UpdateProfile();
          }}
          visible={modalValue == 3 ? true : false}
          Name={strings('setting.update_name')}
          value={phoneNumber.toString()}
          keyboardType="phone-pad"
          onChangeText={text => {
            setphoneNumber(text);
          }}
        />
        <UpdateValueModal
          onPressModalClose={() => {
            setModalValue(0);
          }}
          onPressCamera={requestCameraPermission}
          onPressLibrary={chooseFile}
          visible={modalValue == 1 ? true : false}
          Name={strings('setting.update_profile_pic')}
          ProfilePictureModal={true}
        />
      </ImageBackground>
    </View>
  );
};

export default setting;
