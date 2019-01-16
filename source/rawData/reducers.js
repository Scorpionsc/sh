import {SET_RAW_DATA, SET_RAW_DATA_REF} from "./actions";

const initialState = {
    data: null,
    ref: null,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_RAW_DATA_REF:
            return {...state, ref: action.payload};
        case SET_RAW_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
}