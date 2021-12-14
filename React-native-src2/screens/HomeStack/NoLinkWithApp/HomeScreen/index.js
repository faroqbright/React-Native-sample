import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../../components/Header'
import Colors from './../../../utils/colors'
import Icons from './../../../assets/icons/'
import Images from './../../../assets/images/'
const LoginScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");

    const inputcheck = () => {
        if (email === "") {
            alert("User name is required");
        } else if (password === "") {
            alert("Enter Password");
        }
        else {
        }
    };
    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                onLeftAction={() => {navigation.toggleDrawer() }}
                leftButtonContainerStyle={{ padding: 0, paddingLeft: 20 }}
                leftIcon={Icons.hamburgerIcon}
                leftButtonIconStyle={[styles.userProfileContainer]}
                centerComponent={
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, color: Colors.black, fontWeight: 'bold' }}>{'Dashboard'}</Text>
                    </View>
                }
            />
            <KeyboardAwareScrollView>
                <TouchableOpacity onPress={()=>{navigation.navigate('HomeCategoryDetail')}}>
                <Text style={styles.independentTxtStyle}>{'Go To Detail'.toUpperCase()}</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
export default LoginScreen;
