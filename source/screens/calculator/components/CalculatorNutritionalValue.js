import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from "prop-types";
// import PropTypes from 'prop-types';
// import palette from '../../palette/index';

const styles = StyleSheet.create({
  CalculatorNutritionalValue: {
    flexDirection: 'row',
  },
});

class CalculatorNutritionalValue extends React.Component {
  static propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape),
    selectedIngredients: PropTypes.arrayOf(PropTypes.shape),
};

  static defaultProps = {
  };

  render() {
    console.log(this.props);

    return (<View style={styles.CalculatorNutritionalValue}>
      <Text>The nutritional value</Text>
    </View>);
  }
}

export default CalculatorNutritionalValue;
