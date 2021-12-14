import React from 'react';
import { View, StyleSheet, TextInput, Text, Image, TouchableOpacity, Platform } from 'react-native'
import Icons from './../assets/icons'
var isFocus = false
const InputBox = (props) => {
    return (
        <View style={[style.mainContainer, props.customStyle]}>
            {props.isShowTitle === true ?
                null :
                <Text style={style.titleStyle}>{props.title}</Text>
            }
            <View style={[{ height: 38, marginLeft: 4, flexDirection: 'row', alignItems: 'center' }, props.inputCont]}>
                <TextInput
                    editable={props.editable}
                    autoCapitalize={props.autoCapitalizes}
                    inputAccessoryViewID={props.inputAccessoryViewID}
                    placeholderTextColor={'#61707F'}
                    maxLength={props.maxLength}
                    placeholder={props.txtPlacHolder}
                    keyboardType={props.tholder}
                    style={[style.inputField, props.customInputStyle]}
                    onFocus={() => {
                        isFocus = true
                        if (typeof props.onFocus == 'function') {
                            props.onFocus()
                        }
                    }}
                    onChangeText={(text) => {
                        if (typeof props.onChangeText == 'function') {
                            props.onChangeText(text)
                        }
                    }}
                    value={props.val}
                    multiline={props.multiline}
                    secureTextEntry={props.secureType}
                  
                />
                {props.isRight === true &&
                    <TouchableOpacity onPress={props.clickAction} >
                        <Image
                            source={props.secureType === true ? Icons.passwordCheckIcon : Icons.hideEye}
                            style={props.secureType === true ? style.rightShow : style.rightHide}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
export default InputBox
const style = StyleSheet.create({
    mainContainer: {
        height: 55,
        backgroundColor: '#F5F8FF',
        justifyContent: 'center',
        borderBottomWidth: .5,
        borderColor: '#031A2E',
        marginRight: Platform.OS === 'ios' ? 0 : 15
    },
    titleStyle: {
        fontSize: 12,
        color: '#61707F',
        marginTop: 8,
        marginLeft: 3,
        position:'absolute',

        fontWeight: '400',
        fontSize: 16,
        lineHeight: 22,
    },
    inputField: {
        fontWeight: '400',
        height: 25,
        width: '89%',
        height: 43,
        marginEnd: 10,
        fontSize: 16,
        lineHeight: 22,
        color: '#61707F'
    },
    rightShow: {
        width: 30,
        height: 25,
        resizeMode: 'contain'
    },
    rightHide: {
        width: 25,
        height: 22,
        resizeMode: 'contain'
    }
});




