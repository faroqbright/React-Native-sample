import axios from 'axios';
import Preference from 'react-native-preference';

import { showErrorMsg } from '../utils'

const ROOT_URL = __DEV__
  ? 'dev'//dev url
  : 'live'; // prod url
  
const BASE_URL = `${ROOT_URL}/api/app`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
const clientMultiPart = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    let authToken = Preference.get('token')

    console.log("Token",authToken)
    if (authToken) {
      requestConfig.headers = {
        'Authorization': `Bearer ${authToken}`,
      };
    }
    requestConfig.paramsSerializer = params => {
      return Qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false
      });
    };
    return requestConfig;
  },
  (err) => {
    showErrorMsg(err);
    return Promise.reject(err);
  },
);
clientMultiPart.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    let authToken = Preference.get('token')
    console.log("Token",config)
    if (authToken) {
      requestConfig.headers = {
        'Authorization': `Bearer ${authToken}`,
      };
    }
    requestConfig.paramsSerializer = params => {
      return Qs.stringify(params, {
        arrayFormat: "brackets",
        encode: false
      });
    };
    return requestConfig;
  },
  (err) => {
    showErrorMsg(err);
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
  clientMultiPart
};
