import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import _ from 'lodash'
import Icons from './../assets/icons'

export default class FloatingLabelInputField extends Component {
    state = {
        isFocused: false
    }
    render() {
        const {
            inputContainer,
            onParentPress,
            inputStyle,
            fieldRef,
            value,
            placeholder,
            onChangeText,
            onSubmitEditing,
            onFocus,
            onKeyPress,
            leftIcon,
            rightIcon,
            rightText,
            leftIconStyle,
            rightIconStyle,
            onRightIconPress,
            rightIconContainerStyle,
            hideLabel,
            labelStyle,
            labelContainerStyle,
            placeholderTextColor,
            leftComponent,
            isRequired,
            secureTextEntry
        } = this.props
        const { isFocused } = this.state

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (this.textInputLocalRef) this.textInputLocalRef.focus()
                    if (onParentPress && typeof onParentPress == 'function') onParentPress()
                }}
                style={[styles.inputContainer, inputContainer]}>
                {leftComponent ?
                    leftComponent
                    :
                    leftIcon &&
                    <Image
                        style={[styles.iconStyle, { marginRight: 5 }, leftIconStyle]}
                        source={leftIcon}
                    />
                }
                {!hideLabel && value.length == 0 && !isFocused && (
                    <View
                        style={[
                            {
                                position: 'absolute',
                                marginLeft: 5,
                                backgroundColor: '#F5F8FF',
                                zIndex: 99,
                                width: '91%',
                                height: 42,
                                justifyContent: 'center',
                            },
                            labelContainerStyle,
                        ]}>
                        <Text style={[{ color: placeholderTextColor ? placeholderTextColor : '#61707F', backgroundColor: '#F5F8FF', fontSize: 16 }, labelStyle]}>{placeholder}
                            {isRequired && <Text style={{ color: 'red' }}>{'  *'}</Text>}
                        </Text>
                    </View>
                )}
                <TextInput
                    {...this.props}
                    ref={ref => {
                        this.textInputLocalRef = ref
                        if (fieldRef && typeof fieldRef == 'function') fieldRef(ref)
                    }}
                    style={[styles.inputStyle, inputStyle]}
                    value={value}
                    placeholder={isFocused ? '' : placeholder}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'gray'}
                    onChangeText={(text) => {
                        if (onChangeText && typeof onChangeText == 'function') onChangeText(text)
                    }}
                    onSubmitEditing={() => {
                        if (onSubmitEditing && typeof onSubmitEditing == 'function') onSubmitEditing()
                    }}
                    onFocus={(event: Event) => {
                        this.setState({ isFocused: true })
                        if (onFocus && typeof onFocus == 'function') onFocus(event)
                    }}
                    onBlur={(event: Event) => {
                        this.setState({ isFocused: false })
                    }}
                    onKeyPress={({ nativeEvent }) => { if (onKeyPress && typeof onKeyPress == 'function') onKeyPress(nativeEvent) }}
                />
                {
                    rightIcon &&
                    <TouchableOpacity
                        disabled={_.isNil(onRightIconPress)}
                        style={[{}, rightIconContainerStyle]}
                        onPress={() => {
                            if (onRightIconPress) onRightIconPress()
                        }}>
                        {rightText ?
                            <Text style={{}}>{rightText}</Text>
                            :
                            <Image
                                // style={[styles.iconStyle, rightIconStyle]}
                                style={secureTextEntry === true ? styles.rightShow : styles.rightHide}
                                // source={rightIcon}
                                source={secureTextEntry === true ? Icons.passwordCheckIcon : Icons.hideEye}

                            />
                        }
                    </TouchableOpacity>
                }
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: 42,
        alignItems: 'center',
        // paddingHorizontal: 15,
        paddingHorizontal: 5,
        borderColor: 'gray',
        height: 55,
        backgroundColor: '#F5F8FF',
        // justifyContent: 'center',
        borderBottomWidth: .6,
        borderColor: '#031A2E',
    },
    labelContainerStyle: {

    },
    inputStyle: {
        flex: 1,
        color: '#61707F',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 22,
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    rightShow: {
        width: 26,
        height: 25,
        resizeMode: 'contain'
    },
    rightHide: {
        width: 23,
        height: 22,
        resizeMode: 'contain'
    }
})