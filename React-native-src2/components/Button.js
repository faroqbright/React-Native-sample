import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image,ActivityIndicator } from 'react-native'
import colors from './../utils/colors'
import Fonts from './../assets/fonts/'
const Button = (props) => {
    const { loading, color, size} = props
    return (
        <View style={[style.mainContainer, props.backgroundColorStyle]} >
            <TouchableOpacity onPress={props.clickAction} activeOpacity={props.opacity} style={[style.innerContainer, props.innerContainerCustomStyle]}>
                {loading &&
                    <ActivityIndicator
                        animating={loading}
                        size={size ? size : 'small'}
                        color={color ? color : colors.white}
                        style={[{ marginRight: 15 }]}
                        // style={[{ marginLeft: 5 }, style ? style : {}]}
                    />
                }
                <Image style={props.imageStyle} resizeMode={'contain'} source={props.img} />
                <Text style={[style.txt, props.textStyle]}>{props.text}</Text>
                <Image style={props.imageStyleRight} resizeMode={'contain'} source={props.imgRight} />
            </TouchableOpacity>
        </View>
    )
}
export default Button
const style = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        height: 61,
        overflow: 'hidden'
    },
    innerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: colors.secondary,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    txt: {
        color: '#2F3034',
        fontWeight: '600',
        fontFamily: Fonts.Medium,
        textAlign: 'center'
    }
});




