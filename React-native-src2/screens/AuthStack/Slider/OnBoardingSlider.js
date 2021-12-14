import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { styles } from "./Styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StackActions } from '@react-navigation/native';
import Images from './../../../assets/images/'
let deviceWidth = Math.round(Dimensions.get('window').width)
let deviceHeight = Math.round(Dimensions.get('window').height)
const OnBoardingSlider = (props) => {
    const { navigation } = props
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null)
    const [textArray, setTextArray] = useState([
        { image: Images.splashBottom },
        { image: Images.splashBottom },
        { image: Images.splashBottom },
        { image: Images.splashBottom },
        { image: Images.splashBottom }
    ]);
    const onPressedNext = () => {
        carouselRef.current.snapToNext();
        setActiveIndex(activeIndex + 1);
    }
    const onPressedPrevious = () => {
        carouselRef.current.snapToPrev();
        setActiveIndex(activeIndex - 1);
    }
    const pagination = () => {
        return (
            <Pagination
                dotsLength={textArray.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.dotInactiveStyle}
                inactiveDotOpacity={0.7}
                inactiveDotScale={0.6}
            />
        );
    }
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                height: deviceHeight,
                alignItems: "center",
            }}>
                <Image
                    style={styles.imageStyle}
                    source={item.image} />
            </View>
        )
    }
    const onPressedNextPage = () => {
        navigation.dispatch(StackActions.replace('HomeStack'));
    }
    return (
        <View style={styles.container}>
            <View style={{
                height: deviceHeight,
            }}>
                <Carousel
                    layout={"default"}
                    loop={true}
                    autoplay={true}
                    ref={carouselRef}
                    data={textArray}
                    extraData={textArray}
                    sliderWidth={deviceWidth}
                    itemWidth={deviceWidth}
                    enableSnap={true}
                    scrollEnabled={true}
                    renderItem={_renderItem}
                    onSnapToItem={index => { setActiveIndex(index) }}
                />
            </View>
            {pagination()}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { onPressedNextPage() }} style={styles.buttonStyle} >
                    <Text style={styles.buttonTxt}>Maahir</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { onPressedNextPage() }} style={styles.buttonStyle}  >
                    <Text style={styles.buttonTxt}>Customer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default OnBoardingSlider;