import React from 'react';
import {
  StyleSheet, Text, View, Alert,
} from 'react-native';
import uuidv1 from 'uuid/v1';

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

    onAddTreatments: PropTypes.func,
  };

  static defaultProps = {
    ingredients: [],
    selectedIngredients: [],
    bg: null,

    onAddTreatments: () => {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      ...Recommendations.getFormattedState(nextProps, prevState),
    };
  }

  static getFormattedState = (nextProps, prevState) => {
    const nutritionalData = Recommendations.getNutritionalData(nextProps);
    const carbsWithGi = Recommendations.getCarbsWithGi(nutritionalData);
    const gi = Recommendations.getGi(nutritionalData, carbsWithGi);
    const foodInjection = Recommendations.getFoodInjection(nextProps.speed, carbsWithGi);
    const toInjectCalculated = Recommendations.getInjectionRecommendations(
      prevState.toInject,
      foodInjection,
      nextProps.iob,
      nextProps.bg,
      nextProps.speed,
      nextProps.iog,
    );

    return {
      gi,
      carbsWithGi,
      foodInjection,
      toInjectCalculated,
    };
  };

  static ingredientsReducer = ingredients => (calculations, selectedIngredient) => {
    const { weight, type, id } = selectedIngredient;
    const currentIngredient = ingredients.find(item => item.id === id);

    const ingredient = (type === 'product')
      ? currentIngredient
      : Recommendations.getIngredientsData(
        Object.values(currentIngredient.ingredients),
        ingredients,
      );

    return {
      carbohydrates: calculations.carbohydrates + ((ingredient.carbohydrates / 100) * weight),
      fats: calculations.fats + ((ingredient.fats / 100) * weight),
      proteins: calculations.proteins + ((ingredient.proteins / 100) * weight),
      gi: currentIngredient.gi,
    };
  };

  static getIngredientsData = (ingredients, ingredientsSource) => {
    let result = {
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
      gi: 100,
    };

    if (ingredients.length === 0) return result;

    result = ingredients.reduce(Recommendations.ingredientsReducer(ingredientsSource), result);

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

  static getInjectionRecommendations = (toInject, foodInjection, iob, bg, speed, iog) => {
    const { carbs: { power: carbsPower }, insulin: { power: insulinPower } } = speed;
    const point = 90;

    if (bg === null) return '';
    const neededInsulin = ((bg.sgv - point) / insulinPower);
    // const neededInsulin = ((bg.sgv - point) / insulinPower) + ((iog * carbsPower) / insulinPower);

    return (foodInjection - (iob - neededInsulin)).toFixed(2).toString();
  };

  static getNutritionalData = (props) => {
    const { selectedIngredients, ingredients: ingredientsSource } = props;
    const ingredients = selectedIngredients.map((selectedIngredient) => {
      const newData = Recommendations.getIngredientsData([selectedIngredient], ingredientsSource);
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

  static getGi = (nutritionalData, carbsWithGi) => {
    const carbs = nutritionalData.reduce((result, item) => (result + item.carbohydrates), 0);
    let gi = (carbsWithGi / carbs) * 100;

    if (Number.isNaN(gi)) gi = 0;

    return gi;
  };

  static getFoodInjection = (speed, carbsWithGi) => {
    const { carbs: { power: carbsPower }, insulin: { power: insulinPower } } = speed;
    return (carbsWithGi * carbsPower) / insulinPower;
  };

  static getCarbsWithGi = nutritionalData => nutritionalData
    .reduce((carbs, item) => (carbs + (item.carbohydrates * (item.gi / 100))), 0);


  constructor(props) {
    super(props);

    this.state = {
      toInjectCalculated: '',
      toInjectTyped: null,
    };
  }


  onValChange = (text) => {
    this.setState({
      toInjectTyped: text,
    });
  };

  renderCarbsWithGi = () => {
    const { carbsWithGi } = this.state;

    return (
      <View style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>Carbs with GI: {Math.round(carbsWithGi)}g</Text>
      </View>
    );
  };

  renderGI = () => {
    const { gi } = this.state;

    return (
      <View style={styles.dishCalculationsItem}>
        <Text style={styles.dishCalculationsTitle}>GI: {Math.round(gi)}g</Text>
      </View>
    );
  };

  renderFoodInjection = () => {
    const { foodInjection } = this.state;

    return (
      <View style={[styles.dishCalculationsItem, styles.dishCalculationsItemLook]}>
        <Text style={styles.dishCalculationsTitle}>
          Food injection: {foodInjection.toFixed(2)}u
        </Text>
      </View>
    );
  };

  renderControl = () => {
    const { toInjectCalculated, toInjectTyped } = this.state;
    const val = toInjectTyped !== null ? toInjectTyped : toInjectCalculated;

    return (
      <View style={styles.injectionWrap}>
        <TextField
          style={styles.textField}
          label={'Injection(u):'}
          keyboardType={'decimal-pad'}
          value={val}
          onChangeText={this.onValChange}/>
        <RoundButton
          style={styles.addButton}
          androidName={'md-add'}
          iosName={'ios-add'}
          size={30}
          onPress={this.setRemains}/>
      </View>
    );
  };

  checkTypedVal = (val) => {
    if (Number.isNaN(val)) return null;
    return Number.parseFloat(val);
  };

  setRemains = () => {
    const { onAddTreatments } = this.props;

    Alert.alert(
      'New Remains',
      'Do you want to add new remains?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const { carbsWithGi, toInjectCalculated, toInjectTyped } = this.state;

            let val = this.checkTypedVal(toInjectTyped !== null ? toInjectTyped : toInjectCalculated);

            if (val !== null) {
              const now = Date.now();
              if (val < 0) val = 0;
              const carbs = Number.parseFloat(carbsWithGi.toFixed(2));

              if (val !== 0 || carbs !== 0) {
                const result = {
                  timestamp: now,
                  eventType: '<none>',
                  enteredBy: 'xdrip',
                  uuid: uuidv1(),
                  carbs,
                  insulin: val,
                  created_at: new Date(now).toISOString(),
                };

                onAddTreatments(result);
              }
            }
          },
        },
      ],
      {
        cancelable: false,
      },
    );

  };

  render() {
    const {
      renderCarbsWithGi,
      renderFoodInjection,
      renderGI,
      renderControl,
    } = this;

    return (<View>
      <Text style={styles.recommendationsTitle}>Recommendations:</Text>
      <View style={styles.dishCalculations}>
        {renderGI()}
        {renderCarbsWithGi()}
        {renderFoodInjection()}
      </View>
      {renderControl()}

    </View>);
  }
}

export default Recommendations;
