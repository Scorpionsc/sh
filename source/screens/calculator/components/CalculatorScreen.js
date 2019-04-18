import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import ItemsSelector from '../../../share/itemsSelector/ItemsSelector';
import CalculatorNutritionalValue from './CalculatorNutritionalValue';

const styles = StyleSheet.create({
  temp: {
    color: palette.color2,
  },
  calculator: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  calculatorSelectorList: {
    alignSelf: 'stretch',
  },
});

class CalculatorScreen extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dishes: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
  };

  static navigationOptions = { header: null };

  state = {
    selectedItems: [],
  };


  itemsSelectorProps = () => {
    const {
      itemsToArray,
      props,
      state,
      onItemSelect,
      onItemUnSelect,
    } = this;
    const { dishes, products } = props;
    const { selectedItems } = state;

    return {
      items: itemsToArray(dishes, 'dish').concat(itemsToArray(products, 'product')),
      noHeader: true,
      selectedIds: selectedItems.map(item => item.id),
      onItemSelect,
      onItemUnSelect,
    };
  };

  itemsToArray = (items, type) => Object.keys(items).map(itemKey => ({
    title: items[itemKey].name,
    id: itemKey,
    type,
  }));

  onItemSelect = (itemToAdd) => {
    const { selectedItems } = this.state;

    this.setState({
      selectedItems: selectedItems.concat([itemToAdd]).slice(),
    });
  };

  onItemUnSelect = (itemToAdd) => {
    const { selectedItems: stateSelectedItems } = this.state;
    const selectedItems = stateSelectedItems.slice();
    const itemIndex = selectedItems.findIndex(item => item.id === itemToAdd.id);

    selectedItems.splice(itemIndex, 1);

    this.setState({
      selectedItems,
    });
  };

  renderItemsSelector = () => {
    const { itemsSelectorProps } = this;
    return (<ItemsSelector style={[styles.calculatorSelectorList]} {...itemsSelectorProps()}/>);
  };

  renderNutritionalValue = () => <CalculatorNutritionalValue />;


  render() {
    const { renderItemsSelector, renderNutritionalValue } = this;
    return (
      <SafeAreaView style={[styles.calculator]}>
        {renderNutritionalValue()}
        {renderItemsSelector()}
      </SafeAreaView>
    );
  }
}

export default CalculatorScreen;
