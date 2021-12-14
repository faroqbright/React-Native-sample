import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import colors from '../utils/colors';
import { StatusBarHeight } from '../utils/Dimensions';
import Icons from './../assets/icons/'
export default HomeBackGround = (props) => {
    const { upperContainerChild, lowerContainerChild, containerStyle, upperContainerChildStyle, lowerContainerChildStyle } = props

    return (
        <View style={[styles.container, containerStyle]}>
            <ImageBackground
                source={Icons.profileBackgroundIcon}
                style={[styles.upperContainer, { height: props.blueView }, upperContainerChildStyle]}>
                {upperContainerChild && upperContainerChild}
            </ImageBackground>
            <View style={[styles.lowerContainer, { height: props.whiteView }, lowerContainerChildStyle]} >
                {lowerContainerChild && lowerContainerChild}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingTop: 0,//StatusBarHeight,
        flexDirection: 'column',
        height: "100%",
        width: '100%',
        backgroundColor: 'white',
    },
    upperContainer: {
        width: "100%",
        backgroundColor: colors.buttonOrange
    },
    lowerContainer: {
        width: "100%",
        backgroundColor: colors.background
    }
})
