import axios from "axios";
import Preference from 'react-native-preference';
import preferenceKeys from '../utils/preferenceKeys';

export const STRIPE_TEST_KEY = ''

const BASE_URL = ''
const imageUrl = ''
const voiceUrl = ''
const categoryUrl = ''

const ROUTE = '/api'

const API_URL = BASE_URL + ROUTE
export const BUILD_VERSION = Platform.select({
    ios: '4.8',
    android: '4.8',
})

export const API = {
    IMAGE_URL: imageUrl,
    VOICE_URL: voiceUrl,
    CATEGORY_URL: categoryUrl,
    //POST 
    SIGN_UP: API_URL + '/signup',
    GETLEGER: API_URL + '/get_ledger',
    WITHDRAW_FUNDS: API_URL + '/withdraw_funds',
    DEVICE_INFO: API_URL + '/store_device_info',

    //GET
    GET_SERVICE_LIST: API_URL + '/get_category_list',
    GET_VERSION: API_URL + '/get_latest_app_version',

}

export const requestPost = (url, data, extraHeaders = {}, extraOpptions = {}) => {
    const CancelToken = axios.CancelToken;
    return new Promise((resolve, reject) => {
        axios.post(url,
            data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": 'multipart/form-data',
                ...extraHeaders
            },
            ...extraOpptions
        }).then(response => {
            console.log('API', 'requestPost-response.status', response.status);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPost-error', error);
            reject(error);
        });
    });
}

export const requestPostWithToken = (url, data, extraHeaders = {}, extraOpptions = {}) => {
    const AUTH_TOKEN = Preference.get(preferenceKeys.AUTH_TOKEN)
    return new Promise((resolve, reject) => {
        axios.post(url,
            data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": 'multipart/form-data',
                "Authorization": AUTH_TOKEN,
                ...extraHeaders
            },
            ...extraOpptions
        }).then(response => {
            console.log('API', 'requestPostWithToken-response.status', response.status);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestPostWithToken-error', error);
            reject(error);
        });
    });
}

export const requestGet = (url, extraHeaders = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                "Accept": "application/json",
                ...extraHeaders
            }
        }).then(response => {
            console.log('API', 'requestGet-response.status', response.status);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestGet-error', error);
            reject(error);
        });
    });
}

export const requestGetWithToken = (url, extraHeaders = {}) => {
    const AUTH_TOKEN = Preference.get(preferenceKeys.AUTH_TOKEN)
    // console.log('API', 'requestGetWithToken-token', AUTH_TOKEN);
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                "Accept": "application/json",
                "Authorization": AUTH_TOKEN,
                ...extraHeaders
            }
        }).then(response => {
            console.log('API', 'requestGetWithToken-response.status', response.status);
            resolve(response.data);
        }).catch(error => {
            console.log('API', 'requestGetWithToken-error', error);
            reject(error);
        });
    });
}
