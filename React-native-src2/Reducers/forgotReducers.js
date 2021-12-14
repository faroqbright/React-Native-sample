import {
    FORGOT_CHANGE_STATE,
    FORGOT_RESPONSE,
    FORGOT_REQUEST,
    FORGOT_FAILED
} from '../Actions/types'

const INITIAL_STATE = {
    loading: false,
    phone: '92',
    confirmResult: null,
    tokenForReset: null,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FORGOT_CHANGE_STATE:
            return { ...state, ...action.payload };
        case FORGOT_REQUEST:
            return { ...state, loading: true };
        case FORGOT_RESPONSE:
            return { ...state, response: action.payload.response, loading: false };
        case FORGOT_FAILED:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
}