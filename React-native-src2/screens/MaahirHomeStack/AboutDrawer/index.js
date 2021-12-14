import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    SafeAreaView, ScrollView, View
} from "react-native";
import Preference from 'react-native-preference';
import fonts from "../../../assets/fonts";
import Header from '../../../components/Header';
import colors from "../../../utils/colors";
import Icons from './../../../assets/icons/';
import Button from './../../../components/Button';
import Loader from './../../../components/Loader';
import { strings } from './../../../i18n';
import { styles } from "./Styles";


const AboutDrawer = (props) => {
    const { navigation } = props
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loadingInteral, setLoading] = useState(false);
    const [languageBit, setLanguage] = useState('en')

    useEffect(() => {
        checkingLanguageBit()
    }, []);
    const checkingLanguageBit = async () => {
        let lang = await AsyncStorage.getItem("language");
        setLanguage(lang)
        console.log(lang)
    }
    const walletBtn =()=>{
        navigation.navigate('WalletOption',{token: Preference.get('maahirUserObject')?.token})
    }
    const helpCenterBtn =()=>{
        navigation.navigate('HelpCenter')
    }

    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                containerStyle={{ backgroundColor: colors.buttonOrange }}
                onLeftAction={() => { navigation.goBack() }}
                leftIcon={Icons.leftIcon}
                hearderText={strings("my_account.my_account")}
                // centerComponentExtraStyle={{ paddingRight: 20 }}
                leftButtonIconStyle={{ width: 18, height: 18, transform: languageBit==='en' ?  [{ rotate: '0deg' }] : [{ rotate: '180deg' }]  }}
            />
            <ScrollView>
                <View style={{ width: "100%", height: "100%",alignItems:'center',marginBottom:50}}>
                <Button
                        text={strings("my_account.wallet_option")}
                        textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                        backgroundColorStyle={{ width: '90%', borderRadius: 14, marginTop: 24, height: 51 }}
                        innerContainerCustomStyle={{ height: 46, borderRadius: 14,backgroundColor:colors.buttonOrange }}
                        clickAction={walletBtn}
                    />
                       <Button
                        text={strings("my_account.help_center")}
                        textStyle={{ fontSize: 16, fontFamily: fonts.Medium, lineHeight: 20, fontWeight: '500', color: colors.white }}
                        backgroundColorStyle={{ width: '90%', borderRadius: 14, marginTop: 10, height: 51 }}
                        innerContainerCustomStyle={{ height: 46, borderRadius: 14,backgroundColor:colors.buttonOrange }}
                        clickAction={helpCenterBtn}
                    />
                </View>
            </ScrollView>
            <Loader loading={loadingInteral} />

        </SafeAreaView>
    );
};

export default AboutDrawer