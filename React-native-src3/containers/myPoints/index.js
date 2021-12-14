import React, {useEffect,useState, FunctionComponent} from 'react';
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
  Share
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import Preference from 'react-native-preference'
import { useIsFocused } from '@react-navigation/native';
import {styles} from './styles';
import {images} from '../../assets/images';
import Loader from '../../components/loader1';
import { RedeemPointsApi, getPointsApi, redeemPointsCheckApi, getPointsHistoryApi } from '../../API/methods/redeem';
import {isRTL, strings} from '../../i18n';
import { viewCatogryAPI } from '../../API/methods/catogries';
import { AllsavedVideosAPI } from '../../API/methods/video';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyPoints = props => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [points, setPoints] = useState({});
  const [redeemHistory, setRedeemHistory] = useState([]);
  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      setUserData(Preference.get('user'))
      getPoints();
      getRedeemHistory();
    }
  }, [focused]);
  const getPoints = async () => {
    setLoading(true);
    try {
      const response = await getPointsApi();
      setLoading(false);
      setPoints(response.data.data)
      console.log('getPoints-response', response.status);
    } catch (error) {
      setLoading(false);
      console.log('getPoints-error', error);
    }
  };
  const getRedeemHistory = async () => {
    setLoading(true);
    try {
      const response = await getPointsHistoryApi();
      setLoading(false);
      setRedeemHistory(response.data.data)
      console.log('getRedeemHistory-response', response.status);
    } catch (error) {
      setLoading(false);
      console.log('getRedeemHistory-error', error);
    }
  };
  const renderRedeemHistory = ({item,index})=>{
    return(
      <View style={styles.redeemHistoryView}>
        <View>
        {item.statusBit == "done"&&<Text>{`Qetafi Partner : ${item.branchId?.name}`}</Text>}
        <Text>{`Redeemed Points : ${item.redeemPoints}`}</Text>
        </View>
        <View>
        <Text>{`Redeem Code : ${item.redeemCode}`}</Text>
        <Text style={{color:item.statusBit == "done"?"green":"red",textAlign:"right"}}>{`${item.statusBit == "done"?'Used':'Unused'}`}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ImageBackground
          style={styles.ImageBackground}
          source={images.backgroundCategoryDetail}>
            <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.header}>
            <Image style={styles.backIcon} source={images.back} />
          <Text style={styles.headerText}>{strings('myPoints.my_points')}</Text>
        </TouchableOpacity>
        <View style={{flex:1,alignItems:"center"}}>
        <Image style={styles.profileImage} source={userData?.appUserImage ? { uri: userData.appUserImage } : require('../../assets/images/profile/dummyProfile.png')} />
        <Text style={{marginTop:20,color:"#EE963D",fontSize:22}}>{`${points.totalPoint ? points.totalPoint.toFixed(2) : '0'} points`}</Text>
        {redeemHistory.length != 0 ?<FlatList
                data={redeemHistory}
                // numColumns={2}
                contentContainerStyle={{ width: '100%' }}
                style={{ width: '100%' }}
                keyExtractor={(item, index) => item._id}
                renderItem={renderRedeemHistory}
                />:<Text>No History!</Text>}
        </View>
        </ImageBackground>
        <Loader showLoading={loading} />
      </SafeAreaView>
    </View>
  );
};

export default MyPoints;
