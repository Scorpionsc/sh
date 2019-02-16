import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  NetInfo,
  StyleSheet,
} from 'react-native';
import MainPreLoader from '../../mainPreLoader/MainPreLoader';
import OfflineNotification from '../../notifications/offlineNotification';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

class AuthLoadingScreen extends React.Component {
    static propTypes = {
      userUpdatedAt: PropTypes.number,
      navigation: PropTypes.any,

      fetchData: PropTypes.func.isRequired,
    };

    static defaultProps = {
      userUpdatedAt: null,
      patient: null,
    };

    state = {
      isConnected: true,
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
      const { userUpdatedAt } = this.props;

      if (userUpdatedAt) this.props.navigation.navigate('App');
    };

    handleConnectivityChange = (isConnected) => {
      this.setState({ isConnected });
    };

    renderOfflineMessage = () => {
      const { userUpdatedAt } = this.props;
      const { isConnected } = this.state;

      return !isConnected && !userUpdatedAt
        ? <OfflineNotification/>
        : null;
    };


    render() {
      return (<SafeAreaView style={[styles.main]}>

            {this.renderOfflineMessage()}

            <MainPreLoader/>

        </SafeAreaView>);
    }
}

export default AuthLoadingScreen;
