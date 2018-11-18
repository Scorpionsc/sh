import {SET_THEME} from "./actions";

const initialState = {
    theme: 'dark'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return {...state, theme: action['payload']};
        default:
            return state;
    }
}