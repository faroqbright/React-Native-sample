import { ReactNative, I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import Preference from 'react-native-preference';
import I18n from 'react-native-i18n';
import AsyncStorage from "@react-native-async-storage/async-storage"

// Import all locales
import en from '../locales/en.json';
import urdu from '../locales/urdu.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
    urdu,
    en,
};


const currentLocale = I18n.currentLocale();
StoreLanguage()
export async function StoreLanguage() {
    // let lang = Preference.get('language');
    let lang = await AsyncStorage.getItem('language');
    I18n.locale = lang;
};
//

export async function ChangeLanguage(language) {
    let lang = await AsyncStorage.getItem('language');
    // let lang = Preference.get('language');

    console.log("lang", lang);
    console.log(language);
    if (language === "urdu") {
        I18nManager.forceRTL(true);
        RNRestart.Restart();
    } else {
        I18nManager.forceRTL(false);
        RNRestart.Restart();
    }


};
export function strings(name, params = {}) {

    return I18n.t(name, params);
};

export default I18n;
