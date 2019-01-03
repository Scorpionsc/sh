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
import Navigation from "../../navigation/Navigation";
import SocialSettingsContainer from "../../settings/containers/SocialSettingsContainer";
import palette from "../../palette";
import AuthLoadingScreenContainer from "../containers/AuthLoadingScreenContainer";

class AuthLoadingScreen extends React.Component {

    static propTypes = {
        userUpdatedAt: PropTypes.number,

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

    }

    componentDidMount() {

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

        this.checkAuth();

    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidUpdate() {
        this.checkAuth();
    }


    checkAuth = () => {

        const {userUpdatedAt} = this.props;

        if( userUpdatedAt ) this.props.navigation.navigate('App');

    };

    handleConnectivityChange = (isConnected) => {
        this.setState({isConnected});
    };

    renderOfflineMessage = () => {
        const {userUpdatedAt} = this.props;
        const {isConnected} = this.state;

        return !isConnected && !userUpdatedAt
            ? <OfflineNotification/>
            : null;
    };


    render() {

        return (<View style={[styles.main]}>

            {this.renderOfflineMessage()}

            <MainPreLoader/>

        </View>);

    }

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});


export default AuthLoadingScreen;
