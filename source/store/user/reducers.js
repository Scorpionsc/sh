import {
    SET_USER,
    SET_USER_REF,
    SET_USERS_REF,
    SET_USERS,
    SET_USERS_LOADING,
    SET_JUST_REGISTER,
} from "./actions";
import {AsyncStorage} from "react-native";

const initialState = {
    user: null,
    userRef: null,
    users: [],
    usersLoading: false,
    justRegister: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_JUST_REGISTER:
            return {...state, justRegister: action.payload };
        case SET_USER:
            console.log(state.userRef);

            if(state.userRef){
                state.userRef.set(action.payload);
            }
            AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(action.payload));
            return {...state, user: { ...state.user, ...action.payload } };
        case SET_USERS:
            return {...state, users: action.payload };
        case SET_USER_REF:
            return {...state, userRef: action.payload };
        case SET_USERS_REF:
            return {...state, userRef: action.payload };
        case SET_USERS_LOADING:
            return {...state, usersLoading: action.payload };
        default:
            return state;
    }
}