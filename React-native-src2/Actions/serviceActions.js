import {
    SERVICE_REQUEST,
    SERVICE_RESPONSE,
    SERVICE_FAILED,
} from './types'

export const serviceRequets =()=>{
    return async dispatch => {
        dispatch({
            type: SERVICE_REQUEST,
        })
    }
}

export const serviceResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: SERVICE_RESPONSE,
            payload: { response }
        })
    }
}

export const serviceError = (error) => {
    return async dispatch => {
        dispatch({
            type: SERVICE_FAILED,
            payload: { error }
        })
    }
}