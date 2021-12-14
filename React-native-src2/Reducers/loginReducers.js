import {
    LOGIN_REQUEST,
    LOGIN_RESPONSE,
    LOGIN_FAILED,
    LOGIN_CHANGE_STATE,
} from '../Actions/types'

const INITIAL_STATE = {
    loading: false,
    phone: '',
    password: '',
    showPassword: false,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_CHANGE_STATE:
            return { ...state, ...action.payload };
        case LOGIN_REQUEST:
            return { ...state, phone: action.payload.phone, password: action.payload.password, loading: true };
        case LOGIN_RESPONSE:
            return { ...state, response: action.payload.response, loading: false };
        case LOGIN_FAILED:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
}