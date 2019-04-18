import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette/index';

const styles = StyleSheet.create({
  ingredientsEditor: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
  },
});

class IngredientsEditor extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape),
  };

  static defaultProps = {
    items: [],
  };

  renderList = () => {

  };

  render() {
    return (
      <View style={styles.itemsSelector}>
        {this.renderList()}
      </View>
    );
  }
}

export default IngredientsEditor;
