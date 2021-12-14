import {
    SIGNUP_REQUEST,
    SIGNUP_RESPONSE,
    SIGNUP_FAILED,
} from './types'

export const signUpRequets = (name, phone, password) => {
    return async dispatch => {
        dispatch({
            type: SIGNUP_REQUEST,
            payload: { name, phone, password }
        })
    }
}
// export const loginResponse = (response) => {
//     dispatch({ type: CHANGE_STATE, payload: { key: 'phone', value: "test" } })
//     fetch('urlaj', {}).then((res) => {
//         return async dispatch => dispatch({ type: SIGNUP_RESPONSE, payload: { response } })
//     }).catch((error) => {
//         return async dispatch => dispatch({ type: SIGNUP_FAILED, payload: { error } })
//     })
// }
export const signUpResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: SIGNUP_RESPONSE,
            payload: { response }
        })
    }
}

export const signUpError = (error) => {
    return async dispatch => {
        dispatch({
            type: SIGNUP_FAILED,
            payload: { error }
        })
    }
}