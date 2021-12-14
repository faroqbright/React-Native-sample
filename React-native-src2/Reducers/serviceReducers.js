import {
    SERVICE_REQUEST,
    SERVICE_RESPONSE,
    SERVICE_FAILED,
    SERVICE_CHANGE_STATE,
} from '../Actions/types'

const INITIAL_STATE = {
    loading: false,
    serviceList:[],
    serviceSelected:-1,
    serviceSelectedName:-1
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SERVICE_CHANGE_STATE:
            return { ...state, ...action.payload };
        case SERVICE_REQUEST:
            return { ...state,  loading: true };
        case SERVICE_RESPONSE:
            return { ...state, response: action.payload.response, loading: false };
        case SERVICE_FAILED:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return state;
    }
}