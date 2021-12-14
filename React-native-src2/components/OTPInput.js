import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
} from 'react-native';
import FloatingLabelInputField from './FloatingLabelInputField'
import Fonts from './../assets/fonts/'
const inputAccessoryViewID = 'OTPInput'
export default class OTPInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeDigOne: '',
            codeDigOneFocus: false,
            codeDigTwo: '',
            codeDigTwoFocus: false,
            codeDigThree: '',
            codeDigThreeFocus: false,
            codeDigFour: '',
            codeDigFourFocus: false,
            codeDigFive: '',
            codeDigFiveFocus: false,
            codeDigSix: '',
            codeDigSixFocus: false
        }
    }

    componentDidMount() {
        // if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus()
    }

    getCode = () => {
        const { codeDigOne, codeDigTwo, codeDigThree, codeDigFour, codeDigFive, codeDigSix } = this.state
        return codeDigOne + codeDigTwo + codeDigThree + codeDigFour + codeDigFive + codeDigSix
    }

    render() {

        const { codeDigOne, codeDigTwo, codeDigThree, codeDigFour, codeDigFive, codeDigSix, codeDigOneFocus, codeDigTwoFocus, codeDigThreeFocus, codeDigFourFocus, codeDigFiveFocus, codeDigSixFocus } = this.state
        const { onComplete } = this.props
        return (
            <View style={{ flexDirection: 'row', justifyContent: "space-evenly", width: '100%' }}>
                <FloatingLabelInputField

                    fieldRef={ref => this.fieldCodeDigOne = ref}
                    hideLabel={true}
                    onParentPress={() => { if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus() }}
                    value={codeDigOne}
                    inputContainer={{ width: 50, paddingHorizontal: 0,backgroundColor:'white' }}
                    inputStyle={{ fontSize: 23,height:55,fontFamily: Fonts.Regular, color: '#61707F', textAlign: 'center', }}
                    autoCapitalize={'none'}
                    placeholder={'0'}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length <= 1) this.setState({ codeDigOne: text }, () => {
                            if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        })
                    }}
                    onFocus={(event) => {
                        this.setState({ codeDigOne: '', codeDigTwo: '', codeDigThree: '', codeDigFour: '', codeDigFive: '', codeDigSix: '', codeDigOneFocus: true })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigOne: '' })
                        } else if (/^[0-9]/g.test(event.key)) {
                            // if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingLabelInputField
                    fieldRef={ref => this.fieldCodeDigTwo = ref}
                    onParentPress={() => { if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus() }}
                    value={codeDigTwo}
                    hideLabel={true}
                    inputContainer={{ width: 50, paddingHorizontal: 0,backgroundColor:'white' }}
                    inputStyle={{ fontSize: 23,height:55,color: '#61707F', textAlign: 'center', fontFamily: Fonts.Regular }}
                    autoCapitalize={'none'}
                    placeholder={'0'}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigTwo: text }, () => {
                            if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigOne == '') if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus()
                        this.setState({ codeDigTwo: '', codeDigThree: '', codeDigFour: '', codeDigFive: '', codeDigSix: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigTwo: '' })
                            if (this.fieldCodeDigOne) this.fieldCodeDigOne.focus()
                        } else if (/^[0-9]/g.test(event.key)) {
                            // if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingLabelInputField
                    fieldRef={ref => this.fieldCodeDigThree = ref}
                    onParentPress={() => { if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus() }}
                    value={codeDigThree}
                    hideLabel={true}
                    inputContainer={{ width: 50,paddingHorizontal: 0,backgroundColor:'white' }}
                    inputStyle={{ fontSize: 23,height:55,color: '#61707F', textAlign: 'center', fontFamily: Fonts.Regular }}
                    autoCapitalize={'none'}
                    placeholder={'0'}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigThree: text }, () => {
                            if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigTwo == '') if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        this.setState({ codeDigThree: '', codeDigFour: '', codeDigFive: '', codeDigSix: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigThree: '' })
                            if (this.fieldCodeDigTwo) this.fieldCodeDigTwo.focus()
                        } else if (/^[0-9]/g.test(event.key)) {
                            // if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingLabelInputField
                    fieldRef={ref => this.fieldCodeDigFour = ref}
                    onParentPress={() => { if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus() }}
                    value={codeDigFour}
                    hideLabel={true}
                    inputContainer={{ width: 50, paddingHorizontal: 0,backgroundColor:'white' }}
                    inputStyle={{ fontSize: 23,height:55, color: '#61707F', textAlign: 'center', fontFamily: Fonts.Regular }}
                    autoCapitalize={'none'}
                    placeholder={'0'}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigFour: text }, () => {
                            if (this.fieldCodeDigFive) this.fieldCodeDigFive.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigThree == '') if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        this.setState({ codeDigFour: '', codeDigFive: '', codeDigSix: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigFour: '' })
                            if (this.fieldCodeDigThree) this.fieldCodeDigThree.focus()
                        } else if (/^[0-9]/g.test(event.key)) {
                            // Keyboard.dismiss()
                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingLabelInputField
                    fieldRef={ref => this.fieldCodeDigFive = ref}
                    onParentPress={() => { if (this.fieldCodeDigFive) this.fieldCodeDigFive.focus() }}
                    value={codeDigFive}
                    hideLabel={true}
                    inputContainer={{ width: 50,paddingHorizontal: 0,backgroundColor:'white' }}
                    inputStyle={{ fontSize: 23, height:55,color: '#61707F', textAlign: 'center', fontFamily: Fonts.Regular }}
                    autoCapitalize={'none'}
                    placeholder={'0'}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigFive: text }, () => {
                            if (this.fieldCodeDigSix) this.fieldCodeDigSix.focus()
                        })
                    }}
                    onFocus={() => {
                        if (codeDigFour == '') if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus()
                        this.setState({ codeDigFive: '', codeDigSix: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigFive: '' })
                            if (this.fieldCodeDigFour) this.fieldCodeDigFour.focus()
                        } else if (/^[0-9]/g.test(event.key)) {

                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
                <FloatingLabelInputField
                    fieldRef={ref => this.fieldCodeDigSix = ref}
                    onParentPress={() => { if (this.fieldCodeDigSix) this.fieldCodeDigSix.focus() }}
                    value={codeDigSix}
                    hideLabel={true}
                    inputContainer={{ width: 50, paddingHorizontal: 0,backgroundColor:'white' }}
                    inputStyle={{ fontSize: 23,height:55, color: '#61707F', textAlign: 'center', fontFamily: Fonts.Regular }}
                    autoCapitalize={'none'}
                    placeholder={'0'}
                    caretHidden={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        if (text.length < 2) this.setState({ codeDigSix: text }, () => {
                            // Keyboard.dismiss()
                            if (onComplete && typeof onComplete == 'function') onComplete(this.getCode())
                        })
                    }}
                    onFocus={() => {
                        if (codeDigFive == '') if (this.fieldCodeDigFive) this.fieldCodeDigFive.focus()
                        this.setState({ codeDigSix: '' })
                    }}
                    onKeyPress={(event) => {
                        if (event.key == 'Backspace') {
                            this.setState({ codeDigSix: '' })
                            if (this.fieldCodeDigFive) this.fieldCodeDigFive.focus()
                        } else if (/^[0-9]/g.test(event.key)) {

                        }
                    }}
                    inputAccessoryViewID={inputAccessoryViewID}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

