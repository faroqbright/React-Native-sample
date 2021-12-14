import {
    MAAHIR_SIGNUP_RESPONSE,
    MAAHIR_SIGNUP_REQUEST,
    MAAHIR_SIGNUP_FAILED
} from './types'

export const maahirSignUpRequets = (phone, password) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_SIGNUP_REQUEST,
            payload: { phone, password }
        })
    }
}
export const maahirSignUpResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_SIGNUP_RESPONSE,
            payload: { response }
        })
    }
}

export const maahirSignUpError = (error) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_SIGNUP_FAILED,
            payload: { error }
        })
    }
}