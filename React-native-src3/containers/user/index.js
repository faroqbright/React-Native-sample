import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { images } from '../../assets/images';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { isRTL, strings } from '../../i18n';
import Loader from '../../components/loader1';
import Preference from 'react-native-preference';
import { AllsavedProductsAPI,AllFavoriteProductsAPI } from '../../API/methods/video';
import { getLatestViewsApi,getWatchedVideosApi } from '../../API/methods/views';
import { useIsFocused } from '@react-navigation/native';

const lang = Preference.get('language');

let Data = [
  {
    id: 1,
    Img: images.listImgUser1,
  },
  {
    id: 2,
    Img: images.listImgUser2,
  },
  {
    id: 3,
    Img: images.listImgUser3,
  },
  {
    id: 4,
    Img: images.listImgUser4,
  },
];

const index = props => {
  const [getVideos, setGetVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState(0);
  const [userData, setUserData] = useState(null);
  const [latestViews, setLatestViews] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      setUserData(Preference.get('user'));
      getSavedProducts();
      getLatestViews();
      getWatchedVideos();
    } else{
      setLatestViews([]);
      setGetVideos([])
    }
  }, [focused]);

  const getSavedProducts = async () => {
    setLoading(true);
    try {
      const response = await AllFavoriteProductsAPI();
      setLoading(false);
      setGetVideos(response.data.data);
      console.log(response.data.data);
      console.log('AllFavoriteProductsAPI-response', response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('AllFavoriteProductsAPI-error', error);
    }
  };
  const getWatchedVideos = async () => {
    let user = Preference.get('user')
    const params = new URLSearchParams();
    params.append('userId', user._id);
    setLoading(true);
    try {
      const response = await getWatchedVideosApi(params);
      setLoading(false);
      setWatchedVideos(response.data.data.viewCount);
      console.log('getWatchedVideos-response', response.data.data.viewCount);
    } catch (error) {
      setLoading(false);
      console.log('getWatchedVideos-error', error);
    }
  };
  const getLatestViews = async () => {
    let user = Preference.get('user')
    const params = new URLSearchParams();
    params.append('userId', user._id);
    setLoading(true);
    try {
      const response = await getLatestViewsApi(params);
      setLoading(false);
      setLatestViews(response.data.data);
      console.log('getLatestViewsApi-response', response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('getLatestViewsApi-error', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ImageBackground
          style={styles.backgroundImg}
          source={images.backgroundUser}>
          <ScrollView>
            <View style={styles.userDetail}>
              <Image
                style={{
                  width: 90,
                  height: 90,
                  resizeMode: 'contain',
                  marginTop: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#EE963D',
                }}
                source={userData?.appUserImage?{uri:userData.appUserImage}:require('../../assets/images/profile/dummyProfile.png')}
              />
              <View style={{ flex: 1,marginLeft:10 }} />
              <View style={styles.userDetailTextView}>
                <Text numberOfLines={1} style={styles.nameTitle}>{userData?.name}</Text>
                <View style={styles.playImageView}>
                  <Image
                    style={styles.playImage}
                    source={images.playInactive}
                  />
                  <Text
                    style={{
                      marginHorizontal: 10,
                      writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                    }}>
                    {`${watchedVideos} ${strings('user.video')}`}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 5,
                      writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                    }}>
                    {strings('user.tel_num') + ' :'}
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                    }}>
                    {` ${userData?.phoneNumber}`}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 5,
                      writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                    }}>
                    {strings('user.email') + ' :'}
                  </Text>
                  <Text
                  numberOfLines={1}
                    style={{
                      marginTop: 5,
                      writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                      width:"60%"
                    }}>
                    {` ${userData?.email}`}
                  </Text>
                </View>
              </View>
            </View>
            {/* <View style={styles.giftBox}>
              <View style={styles.giftBoxImgView}>
                <Image style={styles.giftBoxImg} source={images.giftBox} />
                <Text style={styles.giftBoxText}>
                  {'2000 Points \n= 150 SAR'}
                </Text>
              </View>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#C33628', '#FE921A']}
                style={styles.linearGradient}>
                <Text style={{ color: '#FFFFFF', writingDirection: lang == 'en' ? 'ltr' : 'rtl', }}>
                  {strings('gift_box.replace')}
                </Text>
              </LinearGradient>
            </View> */}
            {getVideos.length != 0 && (
              <View style={{ marginTop: 40 }}>
                <Text style={styles.titleText}>{strings('menu.favorite')}</Text>
                <FlatList
                  data={getVideos}
                  horizontal
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <TouchableOpacity
                         style={{paddingRight:10}}
                          onPress={() => {
                            props.navigation.navigate('Ad', { id: item?.planId._id });
                          }}>
                          <Image
                            style={{ width: 95, height: 95, borderRadius: 10 }}
                            source={{uri:item.planId?.thumbnail}}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            )}
            {latestViews.length != 0 && <View style={{ marginTop: 40, marginBottom: 60 }}>
              <Text style={styles.titleText}>
                {strings('user.latest_views')}
              </Text>
              <FlatList
                data={latestViews}
                horizontal
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <View>
                       <TouchableOpacity
                      style={{paddingRight:10}}
                        onPress={() => {
                          props.navigation.navigate('Ad', { id: item.planId?._id });
                        }}>
                        <Image
                          style={{ width: 95, height: 95, borderRadius: 10 }}
                          source={{ uri: item.planId?.thumbnail }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>}
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default index;
