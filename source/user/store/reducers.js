import {SET_USER, SET_USER_REF, SET_JUST_REGISTER} from "./actions";
import {AsyncStorage} from "react-native";

const initialState = {
    user: null,
    userRef: null,
    justRegister: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_JUST_REGISTER:
            return {...state, justRegister: action.payload };
        case SET_USER_REF:
            return {...state, userRef: action.payload };
        case SET_USER:
            if(state.userRef){
                state.userRef.set(action.payload);
            }
            AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(action.payload));
            return {...state, user: { ...state.user, ...action.payload } };
        default:
            return state;
    }
}