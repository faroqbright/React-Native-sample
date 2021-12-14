import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../assets/images';
import {styles} from './styles';
import {isRTL, strings} from '../../i18n';
import Preference from 'react-native-preference';
import {getPartnersAPI} from '../../API/methods/partners';
import Loader from '../../components/loader1';
const lang = Preference.get('language');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const searchBrands = props => {
  const [loading, setLoading] = useState(false);
  const [partnersData, setPartnersData] = useState([]);
  useEffect(() => {
    getPartners();
  }, []);

  const getPartners = async () => {
    setLoading(true);
    try {
      const response = await getPartnersAPI();
      setLoading(false);
      if (response.status == 200) {
        setPartnersData(response.data.data);
        console.log('getPartnersAPI-response', response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log('getPartnersAPI-error', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImg}
          source={images.backgroundUser}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.header}>
            <Image style={styles.headerImg} source={images.back} />
            <Text style={styles.headerText}>
              {strings('gift_box.qetafi_partners')}
            </Text>
          </TouchableOpacity>
          <View style={styles.bottomView}>
            {/* <View style={styles.searchBarView}>
              <DropDownPicker
                items={[
                  {label: 'North America', value: 'na', untouchable: true}, // North America
                  {label: 'United States', value: 'us', parent: 'na'},
                  {label: 'Canada', value: 'canada', parent: 'na'},
                  {label: 'Mexico', value: 'mexico', parent: 'na'},
                  {label: 'Europe', value: 'eu', untouchable: true}, // Europe
                  {label: 'UK', value: 'uk', parent: 'eu'},
                  {label: 'Germany', value: 'germany', parent: 'eu'},
                  {label: 'Russia', value: 'russia', parent: 'eu'},
                ]}
                containerStyle={{
                  height: 40,
                  width: '75%',
                  alignSelf: 'center',
                }}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#EE963D',
                  flexDirection: 'row-reverse',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                }}
                labelStyle={{
                  textAlign: 'right',
                }}
                arrowColor="#EE963D"
                itemStyle={{
                  justifyContent: 'flex-start',
                  writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                  fontSize: 16,
                }}
                dropDownStyle={{backgroundColor: 'white'}}
                // onChangeItem={(item) => {
                //   this.setCities(item.value);
                //   this.setState({
                //     countries: item.value,
                //   });
                // }}
                placeholder={strings('gift_box.choose_category')}
                placeholderStyle={{
                  fontSize: 16,
                  color: '#979191',
                }}
              />
              <Image style={styles.searchIcon} source={images.search} />
            </View> */}
            <View>
              <FlatList
                data={partnersData}
                numColumns={2}
                contentContainerStyle={{width: '100%'}}
                style={{width: '100%'}}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                  return (
                    <View>
                      {!!item.partnerImage && (
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('CompanyDetails',{partnerDetail:item});
                          }}>
                            {/* {console.log("ïMaage",item.partnerImage)} */}
                          <Image
                            style={{
                              width: windowWidth / 2 - 60,
                              height: windowHeight / 4,
                              resizeMode: 'cover',
                              marginHorizontal:20,
                              marginTop:20,
                            }}
                            source={{uri: item.partnerImage}}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <Loader showLoading={loading} />
    </SafeAreaView>
  );
};

export default searchBrands;
