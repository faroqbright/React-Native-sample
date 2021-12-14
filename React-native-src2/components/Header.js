import React, { Component, useState, useEffect } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar
} from 'react-native';
import Fonts from './../../src/assets/fonts/'
import _ from 'lodash'

export default Header = (props) => {
    const { setaa } = props
    const [isRadio, setRadio] = useState(false);
    useEffect(() => {
        setRadio(setaa)
    }, [setaa]);

    return (
        <SafeAreaView>
            <View style={[styles.container, props.containerStyle]} >
                {/* <TouchableOpacity
                    disabled={_.isNil(props.onLeftAction)}
                    onPress={() => {
                        if (props.onLeftAction && typeof props.onLeftAction) {
                            props.onLeftAction()
                        }
                    }}
                    style={[styles.buttonLeftContainer, props.leftButtonContainerStyle]}>
                    {props.leftIconChildren ?
                        props.leftIconChildren
                        :
                        props.leftIcon &&
                        <Image
                            style={[styles.buttonIcon, props.leftButtonIconStyle]}
                            source={props.leftIcon}
                        />
                    }
                    {props.leftText &&
                        <Text style={[styles.buttonText, props.leftButtonTextStyle]}>
                            {props.leftText}
                        </Text>
                    }
                </TouchableOpacity> */}
                <View style={[styles.centerComponentStyle, props.centerComponentExtraStyle]}>
                    {props.centerComponent}
                    {props.hearderText &&
                        <Text style={[styles.hearderText, props.hearderTextStyle]}>
                            {props.hearderText}
                        </Text>
                    }
                </View>
                <View style={{flexDirection:'row',alignItems:'center',position:'absolute',right:10}}>
                {props.rightSecIcon &&
                    <TouchableOpacity
                        disabled={_.isNil(props.onSecRightAction)}
                        onPress={() => {
                            if (props.onSecRightAction && typeof props.onSecRightAction) {
                                props.onSecRightAction()
                            }
                        }}
                        style={[styles.buttonSecRightContainer, props.rightSecContainerStyle]}>
                        {props.rightSecIcon &&
                            <Image
                                style={[styles.buttonSecIcon, props.rightSecIconStyle]}
                                source={props.rightSecIcon}
                            />
                        }
                    </TouchableOpacity>
                }
                {props.radioIcon &&
                    <TouchableOpacity
                        disabled={_.isNil(props.radioIconAction)}
                        onPress={() => {
                            // setRadio(!isRadio)
                            if (props.radioIconAction && typeof props.radioIconAction) {
                                props.radioIconAction()
                            }
                        }}
                        style={[styles.radioIconContainer, { backgroundColor: isRadio === true ? 'green' : '#C53E21' }, props.radioIconStyle]}>
                        <View
                            style={[styles.radioCircle, {
                                left: isRadio === false ? 1 : null,
                                right: isRadio === true ? 1 : null
                            }]}
                        />
                    </TouchableOpacity>
                }
                {props.rightIcon &&
                    <TouchableOpacity
                        disabled={_.isNil(props.onRightAction)}
                        onPress={() => {
                            if (props.onRightAction && typeof props.onRightAction) {
                                props.onRightAction()
                            }
                        }}
                        style={[styles.buttonRightContainer, props.rightButtonContainerStyle]}>
                        {props.rightIcon &&
                            <Image
                                style={[styles.buttonIcon, props.rightButtonIconStyle]}
                                source={props.rightIcon}
                            />
                        }
                        {props.rightText &&
                            <Text style={[styles.buttonText, props.rightButtonTextStyle]}>
                                {props.rightText}
                            </Text>
                        }
                    </TouchableOpacity>
                }
                </View>
                <TouchableOpacity
                    disabled={_.isNil(props.onLeftAction)}
                    onPress={() => {
                        if (props.onLeftAction && typeof props.onLeftAction) {
                            props.onLeftAction()
                        }
                    }}
                    style={[styles.buttonLeftContainer, props.leftButtonContainerStyle]}>
                    {props.leftIconChildren ?
                        props.leftIconChildren
                        :
                        props.leftIcon &&
                        <Image
                            style={[styles.buttonIcon, props.leftButtonIconStyle]}
                            source={props.leftIcon}
                        />
                    }
                    {props.leftText &&
                        <Text style={[styles.buttonText, props.leftButtonTextStyle]}>
                            {props.leftText}
                        </Text>
                    }
                </TouchableOpacity>
            </ View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#00000000',
        alignItems: 'center',
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,
        // elevation: 24,
    },
    buttonLeftContainer: {
        width: 80,
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        flexDirection: 'row',
        position: 'absolute',
        left: 0
    },
    buttonRightContainer: {
        width: 40,
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 20,
        flexDirection: 'row',
        // backgroundColor:'red'
    },
    radioIconContainer: {
        backgroundColor: 'gray',
        borderRadius: 20,
        width: 50,
        height: 23,
        marginRight: 10,
    },
    radioCircle: {
        width: 23,
        height: 23,
        borderRadius: 25,
        backgroundColor: '#FDFDFD',
        position: 'absolute',
    },
    buttonSecRightContainer: {
        width: 40,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor:'green'
    },
    centerComponentStyle: {
        flex: 1,
        height: '100%',
        // width:'100%',
        // position:'absolute',
        // backgroundColor: 'red',
        // marginLeft:30,
        justifyContent: 'center',
    },
    buttonIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    buttonSecIcon: {
        width: 17,
        height: 20,
        resizeMode: 'contain',
    },
    buttonText: {

    },
    hearderText: {
        fontSize: 16,
        fontFamily: Fonts.Bold,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    }
})
