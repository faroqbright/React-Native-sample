// @flow
import { Linking } from 'react-native'
import Preference from 'react-native-preference'
import Sound from 'react-native-sound';

const bgMessaging = (message) => {
    const { data, notification } = message
    // const bellSoundThirty = new Sound(require("./assets/sounds/offer_thirty.mp3"), null, null)
    console.log('bgMessaging-BackgroundMessage', JSON.stringify(message))
    if (notification?.title == "New Offer") {
        Linking.canOpenURL("maahir://app").then(supported => {
            if (supported) {
                Preference.set('jobId', data.appointment_id)
                Linking.openURL(`maahir://app`);
                // bellSoundThirty.play();

            } else {
                console.log('bgMessaging-error while opening linking');
            }
        });
    }
    return Promise.resolve();
}

export default bgMessaging