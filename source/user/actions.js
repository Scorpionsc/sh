import {AsyncStorage} from "react-native";
import {GoogleSignin} from "react-native-google-signin";
import firebase from "react-native-firebase";

export const SET_USER = 'SET_USER';
export const SET_USER_REF = 'SET_USER_REF';
export const SET_JUST_REGISTER = 'SET_JUST_REGISTER';


export const fetchUser = async (dispatch) => {
    const localUser = await fetchLocalUser();


    if(!localUser.justSignIn){
        dispatch(setUser(user));
    }

    // subscribeDBUser(user, dispatch, fistFetch);

    return null;
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};


const fetchLocalUser = async () => {

    await AsyncStorage.removeItem(`@SHStore:user`);
    let user = await AsyncStorage.getItem(`@SHStore:user`);

    if (!user) {
        user = await googleSignIn();
        user.justSignIn = true;
        await AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(user));
    } else {
        user = JSON.parse(user);
    }

    return user;
};

const googleSignIn = async () => {
    try {

        await GoogleSignin.configure();

        const data = await GoogleSignin.signIn();

        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

        const currentUser = await firebase.auth().signInWithCredential(credential);

        if (currentUser) {
            const {displayName, email, photoURL, uid} = currentUser.user.toJSON();

            return {
                displayName,
                email,
                photoURL,
                uid,
                updatedAt: Date.now(),
                patient: null,
            };
        } else {
            return null;
        }


    } catch (e) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('user cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('operation (f.e. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('play services not available or outdated');
        } else {
            console.log('some other sign in error happened');
        }
    }
};

const onUserSnapshot = (fistFetch, localUser, userRef, dispatch) => snapshot => {
    const dbUser = snapshot.val();

    if(dbUser && fistFetch){
        AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(dbUser));
        dispatch(setUser(dbUser));
    } else if (!dbUser && fistFetch){
        dispatch(setUser(localUser));
    } else {
        syncUser(localUser, dbUser, userRef).then((result) => {
            if(result.isLocalUserChanged){
                dispatch(setUser(result.user));
            }
        });
    }
};


const setUserRef = (userRef) => {
    return {
        type: SET_USER_REF,
        payload: userRef
    }
};

const subscribeDBUser = (localUser, dispatch, fistFetch) => {

    const userRef = firebase.database().ref(`users/${localUser.uid}`);

    dispatch(setUserRef(userRef));

    userRef.on('value', onUserSnapshot(fistFetch, localUser, userRef, dispatch));

};

const syncUser = async (localUser, dbUser, userRef) => {

    let user = localUser;
    let isDbUserChanged = false;
    let isLocalUserChanged = false;

    if (!dbUser) {
        user = localUser;
        isDbUserChanged = true;
    } else {
        if (localUser.updatedAt > dbUser.updatedAt) {
            isDbUserChanged = true;
            user = localUser;
        } else if (localUser.updatedAt < dbUser.updatedAt) {
            isLocalUserChanged = true;
            user = dbUser;
        }
    }

    if (isDbUserChanged) userRef.set(user);

    if (isLocalUserChanged) await AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(user));

    return {
        user: user,
        isLocalUserChanged,
    };

};