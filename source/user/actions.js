export const SET_USER = 'SET_USER';
export const SET_USER_REF = 'SET_USER_REF';
export const SET_JUST_REGISTER = 'SET_JUST_REGISTER';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

export const setUserRef = (userRef) => {
    return {
        type: SET_USER_REF,
        payload: userRef
    }
};

export const setJustRegister = (state) => {
    return {
        type: SET_JUST_REGISTER,
        payload: state
    }
};