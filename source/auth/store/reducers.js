import {SET_AUTH_STATE} from "./actions";

const initialState = {
    authorized: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_STATE:
            return {...state, authorized: action.payload};
        default:
            return state;
    }
}