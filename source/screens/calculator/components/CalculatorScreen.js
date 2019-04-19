import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import ItemsSelector from '../../../share/itemsSelector/ItemsSelector';
import CalculatorNutritionalValue from './CalculatorNutritionalValue';
import SearchControl from '../../../share/searchControl/SearchControl';
import IngredientsEditor from '../../../share/ingredientsEditor/IngredientsEditor';

const styles = StyleSheet.create({
  calculator: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
  },
  calculatorSelectorList: {
    alignSelf: 'stretch',
  },
  calculatorScroll: {
    padding: 20,
    flex: 1,
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
    searchText: '',
  };

  getCalculatorNutritionalValue = () => {
    const { getSelectedItems, props, state } = this;
    const { selectedItems } = state;
    const { dishes: dishesSource, products: productsSource } = props;
    const dishes = getSelectedItems(dishesSource);
    const products = getSelectedItems(productsSource);

    return {
      ingredients: dishes.concat(products),
      selectedIngredients: selectedItems,
    };
  };

  getIngredientsEditorProps = () => {
    const { selectedItems } = this.state;

    return {
      items: selectedItems,
      onWeightChange: this.onWeightChange,
      onItemUnSelect: this.onItemUnSelect,
    };
  };

  getSelectedItems = (items) => {
    const { selectedItems } = this.state;

    return selectedItems.reduce((result, selectedItem) => {
      if (items[selectedItem.id]) {
        return [
          ...result,
          ...[
            {
              ...items[selectedItem.id],
              id: selectedItem.id,
            },
          ],
        ];
      }
      return result;
    }, []);
  };

  itemsSelectorProps = () => {
    const {
      itemsToArray,
      props,
      state,
      onItemSelect,
    } = this;

    const { dishes, products } = props;
    const { selectedItems, searchText } = state;

    return {
      items: itemsToArray(dishes, 'dish').concat(itemsToArray(products, 'product')),
      selectedIds: selectedItems.map(item => item.id),
      searchText,
      onItemSelect,
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
      selectedItems: selectedItems.concat([{ ...itemToAdd, ...{ weight: '0' } }]).slice(),
    });
  };

  onItemUnSelect = (ingredientKey) => {
    const { selectedItems } = this.state;

    this.setState({
      selectedItems: selectedItems.filter(item => item.id !== ingredientKey),
    });
  };

  onSearchTextChange = (searchText) => {
    this.setState({
      searchText,
    });
  };

  onWeightChange = (data) => {
    const { selectedItems } = this.state;

    this.setState({
      selectedItems: selectedItems.map((item) => {
        if (item.id === data.key) {
          return Object.assign(item, { weight: data.value });
        }
        return item;
      }),
    });
  };

  renderIngredientsEditor = () => (<IngredientsEditor {...this.getIngredientsEditorProps() } />);

  renderItemsSelector = () => {
    const { itemsSelectorProps } = this;
    return (
      <ItemsSelector {...itemsSelectorProps()}/>
    );
  };

  renderNutritionalValue = () => <CalculatorNutritionalValue {...this.getCalculatorNutritionalValue()}/>;

  renderSearchControl = () => {
    const { searchText } = this.state;
    return <SearchControl searchText={searchText} onChangeText={this.onSearchTextChange}/>;
  };


  render() {
    const {
      renderIngredientsEditor,
      renderItemsSelector,
      renderNutritionalValue,
      renderSearchControl,
    } = this;

    return (
      <SafeAreaView style={[styles.calculator]}>
        <ScrollView contentContainerStyle={styles.calculatorScroll}>
          {renderNutritionalValue()}
          {renderIngredientsEditor()}
          {renderItemsSelector()}
        </ScrollView>
        {renderSearchControl()}
      </SafeAreaView>
    );
  }
}

export default CalculatorScreen;
