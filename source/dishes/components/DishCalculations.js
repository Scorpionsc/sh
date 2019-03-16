import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette/index';

const styles = StyleSheet.create({
  dishCalculations: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: palette.color3,
    borderColor: palette.color5,
    borderWidth: 1,
  },
  dishCalculationsItem: {
    flex: 1,
    padding: 10,
  },
  dishCalculationsItemLook: {
    borderColor: palette.color5,
    borderLeftWidth: 1,
  },
  dishCalculationsTitle: {
    fontSize: 10,
    color: palette.color1,
  },
  dishCalculationsValue: {
    fontSize: 18,
    color: palette.color1,
  },
  dishCalculationsUnit: {
    fontSize: 12,
    color: palette.color1,
  },
  dishCalculationsLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

class DishCalculations extends React.Component {
  static propTypes = {
    proteins: PropTypes.number.isRequired,
    fats: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  };

  state = {
    foodForce: {
      proteins: 4,
      carbohydrates: 4,
      fats: 9,
    },
  };

  calculateCalories = (proteins, fats, carbohydrates) => {
    const { foodForce } = this.state;
    const proteinsCalories = proteins * foodForce.proteins;
    const fatsCalories = fats * foodForce.fats;
    const carbohydratesCalories = carbohydrates * foodForce.carbohydrates;

    return (proteinsCalories + fatsCalories + carbohydratesCalories);
  };

  render() {
    const { proteins, fats, carbohydrates } = this.props;
    const calories = this.calculateCalories(proteins, fats, carbohydrates);

    return (<View style={styles.dishCalculations}>
      <View style={styles.dishCalculationsItem}>
        <Text style={styles.dishCalculationsTitle}>Proteins:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>{Math.round(proteins)}</Text>
          <Text style={styles.dishCalculationsUnit}>g</Text>
        </View>
      </View>
      <View style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Fats:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>{Math.round(fats)}</Text>
          <Text style={styles.dishCalculationsUnit}>g</Text>
        </View>
      </View>
      <View style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Carbs:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>{Math.round(carbohydrates)}</Text>
          <Text style={styles.dishCalculationsUnit}>g</Text>
        </View>
      </View>
      <View style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Calories:</Text>
        <View style={styles.dishCalculationsLine}>
          <Text style={styles.dishCalculationsValue}>{Math.round(calories)}</Text>
          <Text style={styles.dishCalculationsUnit}>kKal</Text>
        </View>
      </View>
    </View>);
  }
}

export default DishCalculations;
