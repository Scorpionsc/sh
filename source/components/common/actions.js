export const SET_THEME = 'SET_THEME';

export const setTheme = (themeState) => {
    return {
        type: SET_THEME,
        payload: themeState
    }
};