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

import Icons from './../../../assets/icons/'
const HomeCategoryScreen = ({ navigation }) => {
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
            <KeyboardAwareScrollView>
             <Text style={styles.independentTxtStyle}>{'Home Category Detail'.toUpperCase()}</Text>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
export default HomeCategoryScreen;
