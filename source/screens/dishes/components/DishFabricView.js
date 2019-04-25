import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';

const styles = StyleSheet.create({
  dishFabricView: {
    marginRight: 20,
    marginLeft: 20,
  },
  dishFabricViewTitle: {
    color: palette.color2,
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,

  },
  dishFabricViewRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: palette.color5,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dishFabricViewRowTitle: {
    color: palette.color2,
    fontSize: 18,
    flex: 2,
  },
  dishFabricViewValues: {
    alignSelf: 'stretch',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dishFabricViewValue: {
    color: palette.color2,
    fontSize: 20,
  },
  dishFabricViewUnit: {
    color: palette.color2,
    fontSize: 16,
  },
  dishFabricDescription: {
    borderColor: palette.color5,
    borderTopWidth: 1,
    paddingTop: 20,
    marginBottom: 20,
  },
  dishFabricDescriptionTitle: {
    fontSize: 18,
    color: palette.color2,
    marginBottom: 10,
  },
  dishFabricDescriptionValue: {
    color: palette.color2,
    fontSize: 16,
  },
});

class DishFabricView extends React.Component {
  static propTypes = {
    dish: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  renderDescription = description => (description !== ''
    ? (
        <View style={styles.dishFabricDescription}>
          <Text style={styles.dishFabricDescriptionTitle}>Description:</Text>
          <Text style={styles.dishFabricDescriptionValue}>{description}</Text>
        </View>
    )
    : null);

  renderLine = ({
    title,
    value,
    unit = null,
    key = null,
  }) => (
      <View style={styles.dishFabricViewRow} key={key}>
        <Text style={styles.dishFabricViewRowTitle}>{title}:</Text>
        <View style={styles.dishFabricViewValues}>
          <Text style={styles.dishFabricViewValue}>{Math.round(value)}</Text>
          {
            unit
            && <Text style={styles.dishFabricViewUnit}>{unit}</Text>
          }
        </View>
      </View>
  );

  renderIngredients = ingredients => Object.keys(ingredients).map((ingredientKey) => {
    const ingredient = ingredients[ingredientKey];
    const lineData = {
      title: ingredient.title,
      value: ingredient.weight,
      unit: 'g',
      key: ingredientKey,
    };

    return this.renderLine(lineData);
  });

  render() {
    const { dish, children } = this.props;
    const giLineData = {
      title: 'GI',
      value: dish.gi,
      unit: ' %',
    };

    return (
      <View style={styles.dishFabricView}>
        <Text style={styles.dishFabricViewTitle}>{dish.name}</Text>
        {this.renderLine(giLineData)}
        { this.renderDescription(dish.description) }
        { children }
        { this.renderIngredients(dish.ingredients) }
      </View>
    );
  }
}

export default DishFabricView;
