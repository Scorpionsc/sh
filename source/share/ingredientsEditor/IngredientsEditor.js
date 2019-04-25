import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette/index';
import TextField from '../textField/TextField';
import RoundButton from '../roundButton/RoundButton';

const styles = StyleSheet.create({
  ingredientsEditor: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ingredientField: {
    flex: 1,
  },
  ingredientFirst: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  trashButton: {
    marginLeft: 10,
    marginRight: 10,
  },
});

class IngredientsEditor extends Component {
  ingredientsRefs = {};

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape),

    onWeightChange: PropTypes.func,
    onItemUnSelect: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    onWeightChange() {},
  };


  changeIngredientsWeight = key => (weight) => {
    this.props.onWeightChange({
      key,
      value: weight,
    });
  };

  onIngredientsWeightBlur = index => (weight) => {
    if (Number.isNaN(window.parseFloat(weight))) {
      this.changeIngredientsWeight(index)('0');
    }
  };

  onItemUnSelect = ingredientKey => () => {
    this.props.onItemUnSelect(ingredientKey);
  };

  renderList = () => {
    const { items } = this.props;

    return items.map((ingredient, index) => {
      const ingredientKey = ingredient.id;
      const { ingredientsRefs } = this;

      if (!ingredientsRefs[ingredientKey]) ingredientsRefs[ingredientKey] = React.createRef();

      const ingredientRef = ingredientsRefs[ingredientKey];
      const style = [styles.ingredientField];

      if (index === 0) style.push(styles.ingredientFirst);

      return (
        <View key={ingredientKey} style={styles.ingredient}>
          <TextField
            ref={ingredientRef}
            style={style}
            label={`${ingredient.title}(g):`}
            keyboardType={'decimal-pad'}
            required={true}
            value={ingredient.weight}
            onChangeText={this.changeIngredientsWeight(ingredientKey)}
            onBlur={this.onIngredientsWeightBlur(index)}/>
          <RoundButton
            style={styles.trashButton}
            androidName={'md-trash'}
            iosName={'ios-trash'}
            size={30}
            onPress={this.onItemUnSelect(ingredientKey)}/>
        </View>
      );
    });
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
