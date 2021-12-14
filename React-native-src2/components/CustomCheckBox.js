import React, { Component, useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import _ from 'lodash';
import Icons from './../assets/icons/'
import colors from './../utils/colors'
import {strings} from './../i18n';
const CustomCheckBox = props => {
    return ( 
        <View style={[{
            width: '100%', /* height: 50, */
            alignItems: 'center', flexDirection: 'row',
            marginBottom: 20,
        }, props.containerStyle]} >
            <TouchableOpacity 
                onPress={props.onChange}
                disabled={props.isDisabled ? props.isDisabled : false}
                style={[styles.checkBoxContainer, { backgroundColor: props.isChecked ? props.checkedColor : props.uncheckedColor }, props.checkstyle]}>
                {props.isChecked &&
                    <Image
                        style={{ width: '60%', height: '60%', resizeMode: "contain", tintColor: !_.isNil(props.tintColor) ? props.tintColor : 'white' }}
                        source={Icons.checkBoxIconTwo}
                    />
                }
            </TouchableOpacity>
            <TouchableOpacity  onPress={props.onChangeTerm}>
            {props.customTxt ?
             <Text style={styles.errorTxt}>{props.customTxt}</Text>
             :
            <Text style={styles.errorTxt}>{strings("terms_and_conditions.i_agree_with_our")}<Text style={{ color: colors.secondary }}>
                {strings("terms_and_conditions.terms")}</Text> {strings("terms_and_conditions.and")}
                        <Text style={{ color: colors.secondary }}> {strings("terms_and_conditions.condition")}</Text>
            </Text>
            }
            </TouchableOpacity>
            {/* <View style={{ flex: 1, marginLeft: 10, }}>
                <Text style={[{
                    width: '100%',
                    fontSize: 18,
                    color: 'black',
                }, props.labelStyle]}>{props.label}</Text>
                {!_.isNil(props.label2) &&
                <Text style={[{
                    width: '100%',
                    fontSize: 14,
                    color: '#999999',
                }, props.labelStyle2]}>{props.label2}</Text>
            }
            </View> */}
        </View>
    )
}

export default CustomCheckBox;
const styles = StyleSheet.create(
    {
        checkBoxContainer: {
            width: 20,
            height: 20,
            borderRadius: 3,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
        },
        errorContainer:{
            flexDirection:'row',
            marginTop:20,
            alignItems:'center',
          },
          errorTxt:{
            color:colors.grey,
            fontSize:13,
            fontWeight:'400',
            lineHeight:18,
            marginLeft:10
          },
          errorImageStyle:{
            width:16,
            height:16,
            marginRight:10,
            resizeMode:'cover'
          },
    }
)
