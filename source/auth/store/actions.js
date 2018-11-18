export const SET_AUTH_STATE = 'SET_AUTH_STATE';

export const setAuthState = (authState) => {
    return {
        type: SET_THEME,
        payload: authState
    }
};