import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette';

const styles = StyleSheet.create({
  temp: {
    color: palette.color2,
  },
  calculator: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

class CalculatorScreen extends React.Component {
    static propTypes = {
      user: PropTypes.object.isRequired,
    };

    static navigationOptions = { header: null };

    render() {
      return (
            <SafeAreaView style={[styles.calculator]}>
                <Text style={[styles.temp]}>Calculator screen in progress...</Text>
            </SafeAreaView>
      );
    }
}

export default CalculatorScreen;
