import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    View
} from 'react-native';
import colors from '../utils/colors';

export default DrawerItem = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.drawerItemContainer, props.containerStyle]}
            onPress={() => {
                if (props.onPress && typeof props.onPress == 'function') props.onPress()
            }}>
            <View style={{marginStart:5,marginRight: 23, width: 32, height: 32, borderRadius: 8, backgroundColor: colors.buttonOrange, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={props.imageSource} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
            </View>
            <Text style={[{ color: colors.mediumGrey,width:'72%'}, props.titleStyle]}>{props.title}</Text>
            {props.loading &&
                <ActivityIndicator
                    animating={props.loading}
                    size={'small'}
                    color={colors.red}
                    style={[{ marginLeft: 5 }]}
                />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    drawerItemContainer: {
        width: '100%',
        // height: 40,
        // justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10,
        padding:13,
        flexDirection: 'row',
        borderBottomWidth: .5,
        borderColor:'#32566C',
    }
})