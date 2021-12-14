import {
    MAAHIR_APPOINTMENT_DETAIL_REQUEST,
    MAAHIR_APPOINTMENT_DETAIL_RESPONSE,
    MAAHIR_APPOINTMENT_DETAIL_FAILED,
    REJECT_APPOINTMENT_REQUEST,
    REJECT_APPOINTMENT_RESPONSE,
    REJECT_APPOINTMENT_FAILED,
    APPROVE_APPOINTMENT_REQUEST,
    APPROVE_APPOINTMENT_RESPONSE,
    APPROVE_APPOINTMENT_FAILED
} from './types'

export const appointmentDetailRequets = (phone, password) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_APPOINTMENT_DETAIL_REQUEST,
            payload: { phone, password }
        })
    }
}
export const appointmentDetailResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_APPOINTMENT_DETAIL_RESPONSE,
            payload: { response }
        })
    }
}

export const appointmentDetailError = (error) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_APPOINTMENT_DETAIL_FAILED,
            payload: { error }
        })
    }
}

export const approveRequets = (phone, password) => {
    return async dispatch => {
        dispatch({
            type: APPROVE_APPOINTMENT_REQUEST,
            payload: { phone, password }
        })
    }
}
export const approveResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: APPROVE_APPOINTMENT_RESPONSE,
            payload: { response }
        })
    }
}

export const approveError = (error) => {
    return async dispatch => {
        dispatch({
            type: APPROVE_APPOINTMENT_FAILED,
            payload: { error }
        })
    }
}

export const rejectRequets = (phone, password) => {
    return async dispatch => {
        dispatch({
            type: REJECT_APPOINTMENT_REQUEST,
            payload: { phone, password }
        })
    }
}
export const rejectResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: REJECT_APPOINTMENT_RESPONSE,
            payload: { response }
        })
    }
}

export const rejectError = (error) => {
    return async dispatch => {
        dispatch({
            type: REJECT_APPOINTMENT_FAILED,
            payload: { error }
        })
    }
}