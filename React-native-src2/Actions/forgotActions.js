import {
    FORGOT_REQUEST,
    FORGOT_RESPONSE,
    FORGOT_FAILED
} from './types'

export const forgotRequets = (phone) => {
    return async dispatch => {
        dispatch({
            type: FORGOT_REQUEST,
            payload: { phone}
        })
    }
}
export const forgotResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: FORGOT_RESPONSE,
            payload: { response }
        })
    }
}

export const forgotError = (error) => {
    return async dispatch => {
        dispatch({
            type: FORGOT_FAILED,
            payload: { error }
        })
    }
}