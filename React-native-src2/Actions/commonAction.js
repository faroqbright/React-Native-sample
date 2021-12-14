export const stateChange = (action, state) => {
    return async dispatch => {
        dispatch({
            type: action,
            payload: state
        })
    }
}