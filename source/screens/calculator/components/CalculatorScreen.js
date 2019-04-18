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

  getSelectedIngredients = () => {
    const { selectedItems } = this.state;
    console.log(selectedItems);

    return [];
  };

  tt = ingredients => (Object.keys(ingredients).map((ingredientKey, index) => {
    const ingredient = ingredients[ingredientKey];
    const style = [styles.dishFabricItem];
    const ingredientRef = this.ingredientsRefs[ingredientKey];

    if (!index) style.push(styles.dishFabricItemFirst);

    return null;
  }));

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

  onSearchTextChange = (searchText) => {
    this.setState({
      searchText,
    });
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

  getIngredientsEditorProps = () => {
    const { getSelectedItems, props } = this;
    const { dishes: dishesSource, products: productsSource } = props;
    const dishes = getSelectedItems(dishesSource);
    const products = getSelectedItems(productsSource);

    return {
      items: dishes.concat(products),
    };
  };

  renderIngredientsEditor = () => <IngredientsEditor {...this.getIngredientsEditorProps()}/>;

  renderItemsSelector = () => {
    const { itemsSelectorProps } = this;
    return (
      <ItemsSelector {...itemsSelectorProps()}/>
    );
  };

  renderNutritionalValue = () => <CalculatorNutritionalValue />;

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
