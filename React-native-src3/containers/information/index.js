import React, {useState, FunctionComponent} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {CommonActions} from '@react-navigation/native';
import {isRTL, strings} from '../../i18n';
import {styles} from './styles';
import {images} from '../../assets/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{name: 'RegisterNow'}],
});

let imagesData = [
  {
    img: images.crousel1,
    title: strings('crousel_screen.whatever_on_your_mind'),
  },
  {
    img: images.crousel2,
    title: strings('crousel_screen.discover_application'),
  },
  {
    img: images.crousel3,
    title: strings('crousel_screen.free_cash'),
  },
  {
    img: images.crousel4,
    title: strings('crousel_screen.watch_more_earn_more'),
  },
];

const renderItem = ({item, index}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        resizeMode="contain"
        style={{width: '100%', height: 400}}
        source={item.img}
      />
      <Text style={styles.titleText}>{item.title}</Text>
    </View>
  );
};

const index = props => {
  const [activeTab, setactiveTab] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <Carousel
          data={imagesData}
          onSnapToItem={i => setactiveTab(i)}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
        <View>
          <Pagination
            dotStyle={styles.ww}
            dotsLength={imagesData.length}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            activeDotIndex={activeTab}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.dispatch(resetAction);
        }}
        style={styles.bottomBtn}>
        <Text>{strings('crousel_screen.skip')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
