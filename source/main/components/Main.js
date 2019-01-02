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
                : <Navigation/>
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
