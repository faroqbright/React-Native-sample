import {
    LOGIN_REQUEST,
    LOGIN_RESPONSE,
    LOGIN_FAILED,
} from './types'

export const loginRequets = (phone, password,token) => {
    return async dispatch => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: { phone, password,token }
        })
    }
}
export const loginResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: LOGIN_RESPONSE,
            payload: { response }
        })
    }
}

export const loginError = (error) => {
    return async dispatch => {
        dispatch({
            type: LOGIN_FAILED,
            payload: { error }
        })
    }
}