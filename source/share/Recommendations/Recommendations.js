import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette';
import TextField from '../textField/TextField';
import RoundButton from '../roundButton/RoundButton';

const styles = StyleSheet.create({
  recommendationsTitle: {
    color: palette.color1,
    marginBottom: 5,
  },
  recommendationsValues: {
    flex: 1,
  },
  dishCalculations: {
    flexDirection: 'row',
    backgroundColor: palette.color3,
    borderColor: palette.color6,
    borderWidth: 1,
  },
  dishCalculationsItem: {
    flex: 1,
    padding: 10,
  },
  dishCalculationsItemLook: {
    borderColor: palette.color6,
    borderLeftWidth: 1,
  },
  dishCalculationsTitle: {
    fontSize: 10,
    color: palette.color1,
  },
  textField: {
    flex: 1,
  },
  injectionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    marginLeft: 10,
    marginRight: 10,
  },
});


class Recommendations extends React.Component {
  static propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape),
    selectedIngredients: PropTypes.arrayOf(PropTypes.shape),
    iob: PropTypes.number.isRequired,
    iog: PropTypes.number.isRequired,
    bg: PropTypes.object,
    speed: PropTypes.object,
  };

  static defaultProps = {
    ingredients: [],
    selectedIngredients: [],
    bg: null,
  };


  ingredientsReducer = (calculations, selectedIngredient) => {
    const { weight, type, id } = selectedIngredient;
    const { ingredients } = this.props;
    const currentIngredient = ingredients.find(item => item.id === id);

    const ingredient = (type === 'product')
      ? currentIngredient
      : this.getIngredientsData(Object.values(currentIngredient.ingredients));

    return {
      carbohydrates: calculations.carbohydrates + ((ingredient.carbohydrates / 100) * weight),
      fats: calculations.fats + ((ingredient.fats / 100) * weight),
      proteins: calculations.proteins + ((ingredient.proteins / 100) * weight),
      gi: currentIngredient.gi,
    };
  };

  getIngredientsData = (ingredients) => {
    let result = {
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
      gi: 100,
    };

    if (ingredients.length === 0) return result;

    result = ingredients.reduce(this.ingredientsReducer, result);

    const totalWeight = ingredients.reduce((weight, ingredient) => {
      const currentWeight = Number.isNaN(ingredient.weight) || ingredient.weight === ''
        ? 0
        : Number.parseFloat(ingredient.weight);

      return weight + currentWeight;
    }, 0);

    return totalWeight > 0 ? Object.keys(result).reduce((resultData, key) => {
      const newDataItem = {
        [key]: result[key] / (totalWeight / 100),
      };
      return { ...resultData, ...newDataItem };
    }, {}) : result;
  };

  getNutritionalProps = () => {
    const { selectedIngredients } = this.props;
    const ingredients = selectedIngredients.map((selectedIngredient) => {
      const newData = this.getIngredientsData([selectedIngredient]);
      Object.keys(newData).forEach((itemKey) => {
        const weight = Number.isNaN(selectedIngredient.weight) || selectedIngredient.weight === ''
          ? 0
          : Number.parseFloat(selectedIngredient.weight);
        newData[itemKey] *= (weight / 100);
      });

      return newData;
    });

    return ingredients.length === 0
      ? [{
        carbohydrates: 0,
        fats: 0,
        proteins: 0,
        gi: 100,
      }]
      : ingredients;
  };

  renderCarbsWithGi = (nutritionalProps) => {
    const carbsWithGi = nutritionalProps.reduce((carbs, item) => (carbs + (item.carbohydrates * (item.gi / 100))), 0);

    return (
      <View style={styles.dishCalculationsItem}>
        <Text style={styles.dishCalculationsTitle}>Carbs with GI: {Math.round(carbsWithGi)}g</Text>
      </View>
    );
  };

  renderGI = (nutritionalProps) => {
    const { carbsWithGi, carbs } = nutritionalProps.reduce((result, item) => {
      const carbsWithGI = (result.carbsWithGi + (item.carbohydrates * (item.gi / 100)));
      const carbs = result.carbs + item.carbohydrates;
      return {
        carbsWithGi: carbsWithGI,
        carbs,
      };
    }, { carbs: 0, carbsWithGi: 0 });
    let gi = (carbsWithGi / carbs) * 100;

    if (Number.isNaN(gi)) gi = 0;

    return (
      <View style={styles.dishCalculationsItem}>
        <Text style={styles.dishCalculationsTitle}>GI: {Math.round(gi)}g</Text>
      </View>
    );
  };

  renderFoodInjection = (nutritionalProps) => {
    const { speed: { carbs: { power: carbsPower }, insulin: { power: insulinPower } } } = this.props;
    const carbsWithGi = nutritionalProps.reduce((carbs, item) => (carbs + (item.carbohydrates * (item.gi / 100))), 0);
    const toInject = (carbsWithGi * carbsPower) / insulinPower;

    return (
      <View style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Food injection: {toInject.toFixed(2)}u</Text>
      </View>
    );
  };


  render() {
    const {
      getNutritionalProps, renderCarbsWithGi, renderFoodInjection, renderGI,
    } = this;
    const nutritionalProps = getNutritionalProps();



    return (<View>
      <Text style={styles.recommendationsTitle}>Recommendations:</Text>
      <View style={styles.dishCalculations}>
        {renderGI(nutritionalProps)}
        {renderCarbsWithGi(nutritionalProps)}
        {renderFoodInjection(nutritionalProps)}
      </View>
      <View style={styles.injectionWrap}>
        <TextField
          style={styles.textField}
          label={'Injection(u):'}
          keyboardType={'number-pad'}
          value={'0'}/>
        <RoundButton
          style={styles.addButton}
          androidName={'md-add'}
          iosName={'ios-add'}
          size={30}/>
      </View>
    </View>);
  }
}

export default Recommendations;
