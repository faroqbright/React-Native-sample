import {
    LANDING_CHANGE_STATE
} from '../Actions/types'

const INITIAL_STATE = {
    isMaahirSelect: false,
    isCustomerSelect:false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LANDING_CHANGE_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}