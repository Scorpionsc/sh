import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import palette from '../../palette/index';

const styles = StyleSheet.create({
  searchControl: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.color5,
    paddingRight: 20,
    paddingLeft: 20,
  },
  searchControlItem: {
    backgroundColor: palette.color5,
    height: 40,
    alignSelf: 'stretch',
    color: palette.color2,
    flex: 1,
  },
  searchControlIcon: {
    marginRight: 5,
  },
});

class SearchControl extends React.Component {
  static propTypes = {
    searchText: PropTypes.string,

    onChangeText: PropTypes.func,
  };

  static defaultProps = {
    searchText: '',

    onChangeText: () => {},
  };

  state = {
    searchInputRef: React.createRef(),
  };


  onSearchControlPress = () => {
    const { searchInputRef } = this.state;
    searchInputRef.current.focus();
  };

  onSearchTextChange = (value) => {
    const { onChangeText } = this.props;

    onChangeText(value);
  };


  render() {
    const { searchInputRef } = this.state;
    const { searchText } = this.props;

    return (
      <View style={[styles.searchControl]}>
        <Icon
          name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
          color={palette.color2}
          onPress={this.onSearchControlPress}
          style={[styles.searchControlIcon]}
          size={25}
        />
        <TextInput
          style={[styles.searchControlItem]}
          onChangeText={this.onSearchTextChange}
          ref={searchInputRef}
          value={searchText}
        />
      </View>
    );
  }
}

export default SearchControl;
