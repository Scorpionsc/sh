export const SET_USER = 'SET_USER';
export const SET_USER_REF = 'SET_USER_REF';

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