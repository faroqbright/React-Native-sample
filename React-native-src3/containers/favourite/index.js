import React, { useEffect, useState, FunctionComponent } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './style';
import { images } from '../../assets/images';
import Loader from '../../components/loader1';

import { isRTL, strings } from '../../i18n';
import { viewCatogryAPI } from '../../API/methods/catogries';
import { AllsavedVideosAPI, AllFavoriteProductsAPI } from '../../API/methods/video';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const favourite = props => {
  const [loading, setLoading] = useState(false);
  const [caetgoryDetail, setCaetgoryDetail] = useState([]);
  const [getAllSavedVideos, setAllSavedVideos] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      getSavedProducts();
    } else {
      setAllSavedVideos([])
    }
  }, [focused]);
  const getSavedProducts = async () => {
    setLoading(true);
    try {
      const response = await AllFavoriteProductsAPI();
      setLoading(false);
      setAllSavedVideos(response.data.data);
      console.log('AllFavoriteProductsAPI-response', response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('AllFavoriteProductsAPI-error', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>

        <ImageBackground
          style={styles.ImageBackground}
          source={images.backgroundCategoryDetail}>
          <Pressable
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.header}>
            <Image style={styles.backIcon} source={images.back} />
            <Text style={styles.headerText}>{strings('menu.favorite')}</Text>
          </Pressable>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View>
              {getAllSavedVideos.length != 0 ? <FlatList
                data={getAllSavedVideos}
                numColumns={2}
                contentContainerStyle={{ width: '100%' }}
                style={{ width: '100%' }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        props.navigation.navigate('Ad', { id: item.planId?._id });
                      }}>
                      <Image
                        style={{
                          width: windowWidth / 2 - 40,
                          height: windowHeight / 4,
                          marginHorizontal: 20,
                          borderRadius: 20,
                          marginTop: 20
                        }}
                        source={{ uri: item.planId?.thumbnail }}
                      />
                    </Pressable>
                  );
                }}
              /> :
                <View style={styles.centeredDiv}>
                  <Text style={{ fontSize: 22, textAlign: "center" }}>
                    {strings('menu.no_favorites')}</Text>
                </View>
              }
            </View>
            <View style={{ marginBottom: Platform.OS == 'ios' ? 120 : 70 }} />
          </ScrollView>
        </ImageBackground>
        <Loader showLoading={loading} />
      </SafeAreaView>
    </View>
  );
};

export default favourite;
