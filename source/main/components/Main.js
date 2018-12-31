import React from 'react';
import PropTypes from 'prop-types';
import MainPreLoader from '../../mainPreLoader/components/MainPreLoader';
import {
    View,
    NetInfo,
    StyleSheet,
} from 'react-native'
import OfflineNotification from '../../notifications/components/offlineNotification';
import {AsyncStorage} from 'react-native'
import {GoogleSignin} from "react-native-google-signin";
import firebase from "react-native-firebase";
import Navigation from "../../navigation/components/Navigation";
import SocialSettingsContainer from "../../settings/containers/SocialSettingsContainer";
import palette from "../../palette";

class Main extends React.Component {

    static propTypes = {
        userUpdatedAt: PropTypes.number,
        patient: PropTypes.bool,

        fetchData: PropTypes.func.isRequired,
    };

    static defaultProps = {
        userUpdatedAt: null,
        patient: null,
    };

    state = {
        isConnected: true
    };

    constructor(props) {
        super(props);

        this.props.fetchData();

        //
        // this.storageUser = null;
        // this.dbUser = null;
        // this.user = null;
        // this.userRef = null;
        // this.isDBUserFetched = false;
        // this.isStorageUserFetched = false;

    }

    componentDidMount() {

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (isConnected) => {
        this.setState({isConnected});
    };

    //
    //
    // auth = async () => {
    //     try {
    //         await GoogleSignin.configure();
    //
    //         const data = await GoogleSignin.signIn();
    //
    //         const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    //
    //         const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    //
    //         return currentUser.user.toJSON();
    //
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
    //
    // fetchData = (user) => {
    //     this.user = user;
    //
    //     this.fetchLocalData();
    //     this.fetchDBData();
    //
    // };
    //
    // fetchDBData = () => {
    //     this.fetchDBUser();
    // };
    //
    // fetchDBUser = () => {
    //     this.userRef = firebase.database().ref(`users/${this.user.uid}`);
    //     this.userRef.on('value', this.onUserChange);
    // };
    //
    //
    //
    // onUserChange = (snapshot) => {
    //
    //     this.dbUser = snapshot.val();
    //
    //     this.isDBUserFetched = true;
    //
    //     if(this.isStorageUserFetched){
    //
    //         this.syncUser().then(this.setUserToStore);
    //     }
    //
    // };
    //
    // renderContent = () => {
    //     console.log();
    //
    //     return this.user.patient !== undefined ? <Navigation /> : <SocialSettingsContainer />;
    // };
    //
    //
    //
    // setUserToDB(user){
    //     this.userRef.set(user);
    // }
    //
    // setUserToStore = (user) => {
    //     const { setUser, userUpdatedAt, authorized, setAuthState } = this.props;
    //
    //     if( !userUpdatedAt || userUpdatedAt < user.updatedAt ){
    //         setUser(user);
    //         if( !authorized ) {
    //             setAuthState(true);
    //         }
    //     }
    //
    // };
    //
    // setUserToStorage = async(user) => {
    //     try {
    //         await AsyncStorage.setItem(`@SHStore:${this.user.uid}`, JSON.stringify(user));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    //
    // unSubscribeDB = () => {
    //     this.userRef.of('value', this.onUserChange);
    // };

    renderOfflineMessage = () => {
        const {userUpdatedAt} = this.props;
        const {isConnected} = this.state;

        return !isConnected && !userUpdatedAt
            ? <OfflineNotification/>
            : null;
    };

    renderContent = () => {

        const {userUpdatedAt, patient} = this.props;

        return userUpdatedAt
            ? patient === null
                ? <SocialSettingsContainer/>
                : null
            : <MainPreLoader/>
    };


    render() {

        return (<View style={[styles.main]}>

            {this.renderOfflineMessage()}

            {this.renderContent()}

        </View>);

    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});


export default Main;
