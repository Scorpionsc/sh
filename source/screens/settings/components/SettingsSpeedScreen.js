import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  Switch,
  BackHandler,
  Picker,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import palette from '../../../palette/index';
import RoundButton from '../../../share/roundButton/RoundButton';
import Recommendations from '../../../share/Recommendations/Recommendations';
import TextField from '../../../share/textField/TextField';

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  settingsWrap: {
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
  },
  group: {
    marginTop: 20,
  },
  title: {
    color: palette.color2,
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 10,
  },
  textFieldFirst: {
    borderWidth: 1,
  },
});

class SettingsSpeedScreen extends React.Component {
  static propTypes = {
    speed: PropTypes.object.isRequired,

    updateSpeed: PropTypes.func.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const options = {
      title: 'Speed Settings',
      tabBarVisible: false,
      headerRight: (
        <RoundButton androidName="md-checkmark" iosName="ios-checkmark" onPress={() => params.handleSave()}/>),
    };

    if (params) {
      return params && params.backButton
        ? options
        : {
          ...options,
          headerLeft: null,
        };
    }
    return options;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.carbs === null) {
      return {
        ...prevState,
        carbs: nextProps.speed.carbs,
        insulin: nextProps.speed.insulin,
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      carbs: null,
      insulin: null,
    };
    this.props.navigation.setParams({
      handleSave: this.saveSettings,
      backButton: true,
    });
  }


  resetNavigation = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'More' })],
    });

    this.props.navigation.dispatch(resetAction);
  };

  saveSettings = () => {
    const { updateSpeed } = this.props;
    const validVal = this.validateSpeed(this.state);

    if(validVal !== null){
      updateSpeed({ common: this.validateSpeed(this.state) });

      this.resetNavigation();

      this.props.navigation.navigate('Home');
    }

  };

  validateSpeed = (speed) => {
    let valid = true;

    Object.keys(speed).forEach((key) => {
      const innerObj = speed[key];
      Object.keys(innerObj).forEach((innerKey) => {
        const value = innerObj[innerKey];
        if (Number.isNaN(window.parseInt(value))) {
          valid = false;
        } else {
          speed[key][innerKey] = window.parseInt(value);
        }
      });
    });

    return valid ? speed : null;
  };

  onValueChange = (key, innerKey) => (text) => {
    this.setState({
      [key]: {
        ...this.state[key],
        [innerKey]: text,
      },
    });
  };


  render() {
    const { insulin: { top: insulinTop, total: insulinTotal, power: insulinPower }, carbs: { top: carbsTop, total: carbsTotal, power: carbsPower } } = this.state;

    return (<SafeAreaView style={[styles.settings]}>

      <ScrollView style={[styles.settingsWrap]}>

        <View style={[styles.group]}>
          <Text style={[styles.title]}>Insulin Settings:</Text>
          <View style={[styles.controlWrap]}>
            <TextField
              style={[styles.textField, styles.textFieldFirst]}
              label={'Insulin power:'}
              keyboardType={'decimal-pad'}
              value={insulinPower.toString()}
              onChangeText={this.onValueChange('insulin', 'power')}/>
          </View>
          <View style={[styles.controlWrap]}>
            <TextField
              style={styles.textField}
              label={'Insulin length:'}
              keyboardType={'decimal-pad'}
              value={insulinTotal.toString()}
              onChangeText={this.onValueChange('insulin', 'total')}/>
          </View>
          <View style={[styles.controlWrap]}>
            <TextField
              style={styles.textField}
              label={'Insulin top:'}
              keyboardType={'decimal-pad'}
              value={insulinTop.toString()}
              onChangeText={this.onValueChange('insulin', 'top')}/>
          </View>
        </View>
        <View style={[styles.group]}>
          <Text style={[styles.title]}>Carbs Settings:</Text>
          <View style={[styles.controlWrap]}>
            <TextField
              style={[styles.textField, styles.textFieldFirst]}
              label={'Carbs power:'}
              keyboardType={'decimal-pad'}
              value={carbsPower.toString()}
              onChangeText={this.onValueChange('carbs', 'power')}/>
          </View>
          <View style={[styles.controlWrap]}>
            <TextField
              style={styles.textField}
              label={'Carbs length:'}
              keyboardType={'decimal-pad'}
              value={carbsTotal.toString()}
              onChangeText={this.onValueChange('carbs', 'total')}/>
          </View>
          <View style={[styles.controlWrap]}>
            <TextField
              style={styles.textField}
              label={'Carbs top:'}
              keyboardType={'decimal-pad'}
              value={carbsTop.toString()}
              onChangeText={this.onValueChange('carbs', 'top')}/>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>);
  }
}


export default SettingsSpeedScreen;
