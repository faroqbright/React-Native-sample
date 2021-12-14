import React from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Image, Modal } from 'react-native'
import Button from './../components/Button'
import Icons from './../assets/icons/'
import Colors from './../utils/colors'
import Fonts from './../assets/fonts/'
import { strings } from './../i18n';

const AlertModal = (props) => {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
            >
                <View style={styles.modalContainer1}>
                    <ImageBackground imageStyle={{ borderRadius: 15, }} source={Icons.modalBackgroundIcon} style={styles.modalInnerCont} >
                        <Image
                            style={styles.modalImage}
                            // source={Icons.verificationModalIcon}
                            source={props.isSuccess ? Icons.verificationModalIcon : Icons.errorIcon}
                        />
                        <Text numberOfLines={3} style={styles.modalHeading}>{props.heading}</Text>
                         {props?.description ?
                         <Text numberOfLines={3} style={styles.modalDescription}>{props.description}</Text>
                         :null
                         }
                        <View style={styles.buttonContainer}>
                            {props.cancelAction &&
                                <Button
                                    text={'Cancel'}
                                    opacity={.9}
                                    textStyle={{ fontSize: 12, fontWeight: 'bold', lineHeight: 22, color: Colors.white, textAlign: 'center' }}
                                    backgroundColorStyle={{ borderRadius: 14, marginTop: 15, height: 50, width: '44%', position: 'absolute', left: 20 }}
                                    innerContainerCustomStyle={{ height: 45 }}
                                    clickAction={props.cancelAction}
                                />
                            }
                            <Button
                                text={strings('global.ok')}
                                opacity={.9}
                                textStyle={{ fontSize: 12, fontWeight: 'bold', lineHeight: 22, color: Colors.white, textAlign: 'center' }}
                                backgroundColorStyle={{ borderRadius: 14, marginTop: 15, height: 50, width: props.cancelAction ? '44%' : '100%', position: 'absolute', right: 20, }}
                                innerContainerCustomStyle={{ height: 45 }}
                                clickAction={props.okAction}
                            />
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    )
}
export default AlertModal
const styles = StyleSheet.create({
    modalContainer1: {
        flex: 1,
        backgroundColor: '#000000AA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    modalInnerCont: {
        width: "100%",
        resizeMode: 'contain',
    },
    modalImage: {
        width: 37,
        height: 37,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: 15
    },
    modalHeading: {
        marginTop: 10,
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontFamily: Fonts.Bold,
    },
    modalDescription: {
        width: '90%',
        marginTop: 15,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: Fonts.Regular,
        alignSelf: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 15,
    },
});




