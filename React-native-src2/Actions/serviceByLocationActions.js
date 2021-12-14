import {
    SERVICE_BY_LOCATION_RESPONSE,
    SERVICE_BY_LOCATION_REQUEST,
    SERVICE_BY_LOCATION_FAILED,
} from './types'

export const serviceByLocationRequets =(lat,lng,rad,category)=>{
    return async dispatch => {
        dispatch({
            type: SERVICE_BY_LOCATION_REQUEST,
            payload: { lat,lng,rad,category }
        })
    }
}

export const serviceByLocationResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: SERVICE_BY_LOCATION_RESPONSE,
            payload: { response }
        })
    }
}

export const serviceByLocationError = (error) => {
    return async dispatch => {
        dispatch({
            type: SERVICE_BY_LOCATION_FAILED,
            payload: { error }
        })
    }
}