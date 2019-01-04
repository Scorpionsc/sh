import {GoogleSignin} from "react-native-google-signin";
import firebase from "react-native-firebase";
import {AsyncStorage} from "react-native";
import {setUser, setUserRef, setJustRegister} from "../../user/store/actions";

export const fetchData = () => {
    return dispatch  => {
        fetchUser().then(
            (data) => {
                const { user, fistFetch } = data;
                dispatch(setUser(user));
                if(fistFetch){
                    dispatch(setJustRegister(true));
                }

                subscribeDBUser(user, dispatch, fistFetch);
            }
        );

    }
};

const fetchUser = async () => {

    let user = await AsyncStorage.getItem(`@SHStore:user`);
    let fistFetch = false;

    if (!user) {
        fistFetch = true;
        user = await googleSignIn();
        await AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(user));
    } else {
        user = JSON.parse(user);
    }

    return {
        user,
        fistFetch
    };

};

const googleSignIn = async () => {
    try {

        await GoogleSignin.configure();

        const data = await GoogleSignin.signIn();

        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

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

const subscribeDBUser = (localUser, dispatch, fistFetch) => {

    const userRef = firebase.database().ref(`users/${localUser.uid}`);

    dispatch(setUserRef(userRef));

    userRef.on('value', (snapshot) => {
        const dbUser = snapshot.val();

        if(dbUser && fistFetch){

            AsyncStorage.setItem(`@SHStore:user`, JSON.stringify(dbUser));
            dispatch(setUser(dbUser));

        } else {
            syncUser(localUser, dbUser, userRef).then((result) => {
                if(result.isLocalUserChanged){
                    dispatch(setUser(result.user));
                }
            });
        }

    });

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

