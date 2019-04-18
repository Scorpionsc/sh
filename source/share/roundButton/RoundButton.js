import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import palette from '../../palette/index';

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.color5,
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  roundButtonIOS: {
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.color5,
    width: 40,
    height: 40,
    borderRadius: 20,
  },

});

class RoundButton extends React.Component {
  static propTypes = {
    androidName: PropTypes.string.isRequired,
    iosName: PropTypes.string.isRequired,
    size: PropTypes.number,

    onPress: PropTypes.func,
  };

  static defaultProps = {
    size: 40,

    onPress: () => {
    },
  };

  onPress = () => {
    const { onPress } = this.props;

    onPress();
  };

  render() {
    const { androidName, iosName, size } = this.props;
    return Platform.OS === 'ios'
      ? (
        <TouchableOpacity style={[styles.roundButtonIOS]}
                          onPress={this.onPress}>
          <Icon
            name={iosName}
            color={palette.color2}
            size={size}
          />
        </TouchableOpacity>
      )
      : (
        <TouchableNativeFeedback
          onPress={this.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}
          borderRadius={20}
        >
          <View style={styles.roundButton}>
            <Icon
              name={androidName}
              color={palette.color2}
              size={size}
            />
          </View>

        </TouchableNativeFeedback>
      );
  }
}

export default RoundButton;
