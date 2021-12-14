import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { styles } from './styles';
import { images } from '../../assets/images/index';
import LinearGradient from 'react-native-linear-gradient';
import { isRTL, strings } from '../../i18n';
import { getAllProductsApi } from '../../API/methods/video';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/loader1';

let Data = [
  {
    id: 1,
    img: images.topListImage1,
  },
  {
    id: 2,
    img: images.topListImage2,
  },
  {
    id: 3,
    img: images.topListImage3,
  },
  {
    id: 4,
    img: images.topListImage4,
  },
];
let Data2 = [
  {
    id: 1,
    img: images.video1,
  },
  {
    id: 2,
    img: images.video2,
  },
];

const index = props => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [img, setImg] = useState(null);
  const [videosData, setVideosData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [bottomData, setBottomData] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      getAllProducts();
    }
  }, [focused]);
  const getAllProducts = async () => {
    setLoading(true);
    console.log('Yes');
    try {
      const response = await getAllProductsApi();
      setLoading(false);
      console.log("HomeResponse: ", JSON.stringify(response))
      let tempArray = response.data.data;
       console.log("HomeResponse: ", JSON.stringify(tempArray))
      let MainArray = [];
      let UpperArray = [];
      let BottomArray = [];
      tempArray.map((item,index) => {
        if (item.adsPosition == 'main') {
          MainArray.push(item)
        } else if (item.adsPosition == 'upper') {
          UpperArray.push(item)
        } else if (item.adsPosition == 'bottom'){
          BottomArray.push(item)
        }
      })
      setVideosData([...UpperArray]);
      setMainData([...MainArray]);
      setBottomData([...BottomArray]);
      //console.log('Data', response.data.data);
      console.log('getAllProductsApi-response', response.status);
    } catch (error) {
      setLoading(false);
      console.log('getAllProductsApi-error', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ImageBackground
          style={styles.backgroundImg}
          resizeMode="cover"
          source={images.backgroundHome}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Text style={styles.headerText}>{strings('home.main')}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Image style={styles.searchIcon} source={images.search} />
            </TouchableOpacity> */}
          </View>
          {!active ? (
            <ScrollView
            showsVerticalScrollIndicator={false}>
              <View>
                <View>
                  <FlatList
                    data={videosData}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <TouchableOpacity
                            style={{ paddingRight: 10 }}
                            onPress={() => {
                              // setActive(true), setImg(item.img);
                              props.navigation.navigate('Ad', { id: item._id });
                            }}>
                            <Image
                              style={{ width: 95, height: 150, borderRadius: 10 }}
                              source={{ uri: item.thumbnail }}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
                {mainData.length != 0 && <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Ad', { id: mainData[0]._id });
                  }}>
                  <Image
                    style={{ width: '100%', height: 300, borderRadius: 30, marginVertical: 30 }}
                    source={{ uri: mainData[0]?.thumbnail }}
                  />
                </TouchableOpacity>}
                <View style={{ marginBottom: 80 }}>
                  <FlatList
                    data={bottomData}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <TouchableOpacity
                            style={{ paddingRight: 10 }}
                            onPress={() => {
                              props.navigation.navigate('Ad', { id: item._id });
                            }}>
                            <Image
                              style={{ width: 200, height: 180, borderRadius: 20 }}
                              source={{ uri: item.thumbnail }}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          ) : (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#C33628', '#FE921A']}
              style={[
                styles.linearGradient,
                { marginBottom: Platform.OS == 'ios' ? 120 : 70 },
              ]}>
              <View style={styles.linearGradientHeader}>
                <TouchableOpacity style={{ padding: 10 }}>
                  <Text style={styles.linearGradientHeaderText}>
                    {strings('home.latest_products')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setActive(false);
                    setImg(null);
                  }}
                  style={{ padding: 10 }}>
                  <Text style={styles.linearGradientHeaderText}>x</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Image source={img} />
              </View>
            </LinearGradient>
          )}
        </ImageBackground>
        <Loader showLoading={loading} />
      </SafeAreaView>
    </View>
  );
};

export default index;
