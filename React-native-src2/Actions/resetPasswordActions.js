import {
    RESET_RESPONSE,
    RESET_REQUEST,
    RESET_FAILED
} from './types'

export const resetRequets = (password,token) => {
    return async dispatch => {
        dispatch({
            type: RESET_REQUEST,
            payload: {password,token}
        })
    }
}
export const resetResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: RESET_RESPONSE,
            payload: { response }
        })
    }
}

export const resetError = (error) => {
    return async dispatch => {
        dispatch({
            type: RESET_FAILED,
            payload: { error }
        })
    }
}