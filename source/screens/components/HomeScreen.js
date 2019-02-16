import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette';

class HomeScreen extends React.Component {
    static propTypes = {
      user: PropTypes.object.isRequired,
      navigation: PropTypes.any,
    };

    static navigationOptions = { header: null };


    constructor(props) {
      super(props);

      this.checkPatient();
    }


    checkPatient = () => {
      const { user } = this.props;

      if (user.justSignIn) {
        this.props.navigation.navigate('SettingsMain', {
          itemId: 'settingsMainProps',
          backButton: false,
        });
      }
    };

    render() {
      return (
            <SafeAreaView style={styles.home}>
                <Text style={styles.temp}>Home Screen</Text>
            </SafeAreaView>
      );
    }
}


const styles = StyleSheet.create({
  temp: {
    color: palette.color2,
  },
  home: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

});

export default HomeScreen;
