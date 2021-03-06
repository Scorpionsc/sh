import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import ItemsSelector from '../../../share/itemsSelector/ItemsSelector';
import CalculatorNutritionalValue from './CalculatorNutritionalValue';
import SearchControl from '../../../share/searchControl/SearchControl';
import IngredientsEditor from '../../../share/ingredientsEditor/IngredientsEditor';
import TreatmentInfo from '../../../share/treatmentInfo/TreatmentInfo';
import Recommendations from '../../../share/Recommendations/Recommendations';
import CalculatorBGModal from "./CalculatorBGModal";

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
  },
  calculatorNutritionalValue: {
    marginBottom: 10,
  },
});

class CalculatorScreen extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dishes: PropTypes.object,
    products: PropTypes.object,
    bg: PropTypes.object,
    treatments: PropTypes.array,
    treatmentsToAdd: PropTypes.array.isRequired,
    isTreatmentsRefresh: PropTypes.bool.isRequired,
    speed: PropTypes.object.isRequired,
    iob: PropTypes.number.isRequired,
    iog: PropTypes.number.isRequired,

    refreshTreatments: PropTypes.func.isRequired,
    addTreatments: PropTypes.func.isRequired,
    updateBG: PropTypes.func.isRequired,
  };

  static defaultProps = {
    bg: null,
    dishes: null,
    products: null,
    treatments: null,
  };

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      searchText: '',
      refreshing: false,
      modalVisible: false,
    };
  }

  getCalculatorNutritionalProps = () => {
    const { getSelectedItemsData, props, state } = this;
    const { selectedItems } = state;
    const { dishes: dishesSource, products: productsSource } = props;
    const result = getSelectedItemsData({ ...dishesSource, ...productsSource }, selectedItems);

    return {
      ingredients: Object.values(result),
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

  getSelectedItemsData = (items, selectedItems) => selectedItems
    .reduce((accumulator, selectedItem) => {
      const itemData = items[selectedItem.id];
      let newItem = {};
      const { ingredients } = itemData;

      if (itemData !== undefined) {
        newItem[selectedItem.id] = {
          ...itemData,
          id: selectedItem.id,
        };

        if (ingredients !== undefined) {
          newItem = {
            ...newItem,
            ...this.getSelectedItemsData(items, Object.values(ingredients)),
          };
        }

        return {
          ...accumulator,
          ...newItem,
        };
      }

      return accumulator;
    }, {});

  itemsSelectorProps = () => {
    const {
      itemsToArray,
      props,
      state,
      onItemSelect,
    } = this;

    const { dishes, products } = props;
    const { selectedItems, searchText } = state;

    if(!dishes || products) return null;
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

  onAddRemains = (remains) => {
    const { addTreatments, treatmentsToAdd } = this.props;
    const timeInMs = Date.now() - 14400000;
    const newTreatments = treatmentsToAdd.filter(treatment => treatment.timestamp > timeInMs);

    newTreatments.push(remains);

    addTreatments(newTreatments);
  };

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

  onRefresh = () => {
    const { refreshTreatments } = this.props;

    this.setState({ refreshing: true });

    refreshTreatments();
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

  renderIngredientsEditor = () => (<View style={styles.calculatorNutritionalValue}>
    <IngredientsEditor {...this.getIngredientsEditorProps() } />
  </View>);

  renderItemsSelector = () => {
    const { itemsSelectorProps } = this;

    return (
      <ItemsSelector {...itemsSelectorProps()}/>
    );
  };

  renderNutritionalValue =
    () => (
      <View style={styles.calculatorNutritionalValue}>
        <CalculatorNutritionalValue {...this.getCalculatorNutritionalProps()}/>
      </View>
    );

  renderRecommendations = () => {
    const { getCalculatorNutritionalProps, props, onAddRemains } = this;
    const {
      bg, iob, iog, speed,
    } = props;
    const calculatorNutritionalProps = getCalculatorNutritionalProps();
    const recommendationsProps = {
      bg,
      iob,
      iog,
      speed,
      onAddTreatments: onAddRemains,
      ...calculatorNutritionalProps,
    };

    return (
      <View style={styles.calculatorNutritionalValue}>
        <Recommendations {...recommendationsProps}/>
      </View>
    );
  };

  renderSearchControl = () => {
    const { searchText } = this.state;

    return <SearchControl searchText={searchText} onChangeText={this.onSearchTextChange}/>;
  };

  renderTreatmentInfo = () => {
    const { bg, iob, iog } = this.props;
    const treatmentInfoProps = {
      onSetBG: this.setBG,
      bg,
      iob,
      iog,
    };
    return <TreatmentInfo
      {...treatmentInfoProps}

    />;
  };

  setBG = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  saveBg = (bg) => {
    this.props.updateBG(bg);

    this.setState({
      modalVisible: false,
    });
  };


  render() {
    const {
      renderIngredientsEditor,
      renderItemsSelector,
      renderNutritionalValue,
      renderSearchControl,
      renderTreatmentInfo,
      renderRecommendations,
      props,
      state,
    } = this;
    const { isTreatmentsRefresh } = props;
    const { modalVisible } = state;

    return (
      <SafeAreaView style={[styles.calculator]}>
        {renderTreatmentInfo()}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isTreatmentsRefresh}
              onRefresh={this.onRefresh}
            />
          }
          contentContainerStyle={styles.calculatorScroll}>
          {renderRecommendations()}
          {renderNutritionalValue()}
          {renderIngredientsEditor()}
          {renderItemsSelector()}
        </ScrollView>
        {renderSearchControl()}
        <CalculatorBGModal
          modalVisible={modalVisible}
          closeModal={this.closeModal}
          saveBg={this.saveBg}/>
      </SafeAreaView>
    );
  }
}

export default CalculatorScreen;
