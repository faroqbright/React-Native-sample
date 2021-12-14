import {
    MAAHIR_DETAIL_RESPONSE,
    MAAHIR_DETAIL_REQUEST,
    MAAHIR_DETAIL_FAILED,
    MAAHIR_BOOK_REQUEST,
    MAAHIR_BOOK_RESPONSE,
    MAAHIR_BOOK_FAILED
} from './types'

export const maarhirDetailRequets =(id)=>{
    return async dispatch => {
        dispatch({
            type: MAAHIR_DETAIL_REQUEST,
            payload: {id}
        })
    }
}

export const maarhirDetailResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_DETAIL_RESPONSE,
            payload: { response }
        })
    }
}

export const maarhirDetailError = (error) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_DETAIL_FAILED,
            payload: { error }
        })
    }
}

export const maahirBookRequets =(custId,mahirId,catId,custName,detail,date,time,token)=>{
    return async dispatch => {
        dispatch({
            type: MAAHIR_BOOK_REQUEST,
            payload: {custId,mahirId,catId,custName,detail,date,time,token}
        })
    }
}

export const maahirBookResponse = (response) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_BOOK_RESPONSE,
            payload: { response }
        })
    }
}

export const maahirBookError = (error) => {
    return async dispatch => {
        dispatch({
            type: MAAHIR_BOOK_FAILED,
            payload: { error }
        })
    }
}