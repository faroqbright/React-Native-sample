import {
    SIGNUP_REQUEST,
    SIGNUP_RESPONSE,
    SIGNUP_FAILED,
    SIGNUP_CHANGE_STATE,
} from '../Actions/types'

const INITIAL_STATE = {
    loading: false,
    confirmResult: null,
    profileImage:null,
    address:'',
    customerLat:null,
    customerLng:null,
    name: '',
    phone: '',
    password: '',
    showPassword: false,
    isFemale:false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SIGNUP_CHANGE_STATE:
            return { ...state, ...action.payload };
        case SIGNUP_REQUEST:
            return { ...state,  loading: true };
        case SIGNUP_RESPONSE:
            return { ...state, response: action.payload.response, loading: false };
        case SIGNUP_FAILED:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
}