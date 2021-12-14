import React, { useEffect, useState, FunctionComponent } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import { StackActions, useIsFocused } from '@react-navigation/native';
import { styles } from './styles';
import Loader from '../../components/loader1';
import { images } from '../../assets/images';
import { isRTL, strings } from '../../i18n';
import { viewCatogryAPI } from '../../API/methods/catogries';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let Data = [
  { id: 1, img: images.categoryDetail1 },
  { id: 2, img: images.categoryDetail2 },
  { id: 3, img: images.categoryDetail3 },
  { id: 4, img: images.categoryDetail4 },
  { id: 5, img: images.categoryDetail5 },
  { id: 6, img: images.categoryDetail6 },
  { id: 7, img: images.categoryDetail7 },
  { id: 8, img: images.categoryDetail3 },
];

const index = props => {
  const [loading, setLoading] = useState(false);
  const [caetgoryDetail, setCaetgoryDetail] = useState([]);
  const [headerName, setHeaderName] = useState('');
  // const headerNmae = props?.route?.params?.categoryName;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      let id = props?.route?.params?.id;
      let header = props?.route?.params?.categoryName;
      setHeaderName(header)
      viewcatogryDetail(id);
    } else {
      setCaetgoryDetail([]);
      setHeaderName("")
    }
  }, [isFocused]);
  const viewcatogryDetail = async id => {
    const params = new URLSearchParams();
    params.append("categoryId", id)
    console.log('Yes!', params);
    setLoading(true);
    try {
      const response = await viewCatogryAPI(params);
      setLoading(false);
      setCaetgoryDetail(response.data.data);
      console.log('viewCatogryAPI-response', response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('viewCatogryAPI-error', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.header}>
          <Image style={styles.backIcon} source={images.back} />
          <Text style={styles.headerText}>{headerName}</Text>
        </TouchableOpacity>
        <ImageBackground
          style={styles.ImageBackground}
          source={images.backgroundCategoryDetail}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View>
              <FlatList
                data={caetgoryDetail}
                numColumns={2}
                contentContainerStyle={{ width: '100%' }}
                style={{ width: '100%' }}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Ad',{id:item._id});
                        // console.log("item",item._id)
                      }}>
                      <Image
                        style={{
                          width: windowWidth / 2 - 40,
                          height: windowHeight / 4,
                          marginHorizontal: 20,
                          marginTop: 20,
                          borderRadius: 20
                        }}
                        source={{ uri: item.thumbnail }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={{ marginBottom: Platform.OS == 'ios' ? 120 : 70 }} />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

export default index;
