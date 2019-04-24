import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import NutritionalValueCalculations from '../../../share/nutritionalValueCalculations/NutritionalValueCalculations';
import palette from '../../../palette';

const styles = StyleSheet.create({
  nutritionalTitle: {
    color: palette.color1,
    marginBottom: 5,
  },
  nutritionalValues: {
    flex: 1,
  },
});

class CalculatorNutritionalValue extends React.Component {
  static propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape),
    selectedIngredients: PropTypes.arrayOf(PropTypes.shape),
  };

  static defaultProps = {
    ingredients: [],
    selectedIngredients: [],
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
    };
  };

  getIngredientsData = (ingredients) => {
    let result = {
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
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

    const ingredientsSum = ingredients.reduce((accum, ingredient) => {
      if (accum === null) return ingredient;
      const newData = {};

      Object.keys(accum).forEach((key) => {
        newData[key] = accum[key] + ingredient[key];
      });
      return newData;
    }, null);

    return ingredientsSum || {
      carbohydrates: 0,
      fats: 0,
      proteins: 0,
    };
  };


  render() {
    const { getNutritionalProps } = this;


    return (<View>
      <Text style={styles.nutritionalTitle}>The nutritional value</Text>
      <NutritionalValueCalculations {...getNutritionalProps()} style={styles.nutritionalValues}/>
    </View>);
  }
}

export default CalculatorNutritionalValue;
