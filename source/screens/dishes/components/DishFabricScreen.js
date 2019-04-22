import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import RoundButton from '../../../share/roundButton/RoundButton';
import TextField from '../../../share/textField/TextField';
import ItemsSelector from '../../../share/itemsSelector/ItemsSelector';
import NutritionalValueCalculations from '../../../share/nutritionalValueCalculations/NutritionalValueCalculations';
import DishFabricView from './DishFabricView';
import SearchControl from '../../../share/searchControl/SearchControl';

const styles = StyleSheet.create({
  dishFabric: {
    flex: 1,
    backgroundColor: palette.color3,
  },
  dishFabricScroll: {
    padding: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
  dishFabricLine: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  dishFabricHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishFabricItem: {
    flex: 1,
  },
  dishFabricItemFirst: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  dishFabricEdit: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trashButton: {
    marginLeft: 10,
    marginRight: 10,
  },
});

class DishFabricScreen extends React.Component {
  ingredientsRefs = {};

  static propTypes = {
    dishes: PropTypes.arrayOf(PropTypes.shape),
    products: PropTypes.arrayOf(PropTypes.shape),
    navigation: PropTypes.any,

    addDish: PropTypes.func,
  };

  static defaultProps = {
    dishes: [],
    products: [],
    navigation: null,

    addDish: () => {
    },
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const mode = navigation.getParam('mode', 'add');
    const title = mode === 'add' ? 'Add dish' : mode === 'edit' ? 'Edit dish' : null;

    return {
      title,
      tabBarVisible: false,
      headerRight: mode === 'view'
        ? (
          <View>
            <RoundButton androidName="md-create" iosName="ios-create" size={30}
                         onPress={() => params.handleEdit()}/>
          </View>
        )
        : (
          <View style={styles.dishFabricHeaderButtons}>
            {
              mode === 'edit'
              && (
                <RoundButton androidName="md-close" iosName="ios-close"
                             onPress={() => params.handleCancel()}/>
              )
            }

            <RoundButton androidName="md-checkmark" iosName="ios-checkmark"
                         onPress={() => params.handleSave()}/>
          </View>
        ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      dish: this.getDishFromNav(),
      refs: {
        dishNameRef: React.createRef(),
        dishGIRef: React.createRef(),
        dishDescriptionRef: React.createRef(),
      },
      mode: this.getModeFromNav(),
      giEdited: false,
      searchText: '',
    };

    this.updateIngredientRefs();

    this.addHeaderHandler();
  }

  shouldComponentUpdate() {
    this.updateIngredientRefs();
    return true;
  }


  onIngredientsWeightBlur = index => (weight) => {
    if (Number.isNaN(window.parseFloat(weight))) {
      this.changeIngredientsWeight(index)('0');
    }
  };

  onItemSelect = (ingredient) => {
    const dish = JSON.parse(JSON.stringify(this.state.dish));

    dish.ingredients[ingredient.id] = {
      ...ingredient,
      weight: '0',
    };

    this.setState({
      dish,
    });
  };

  onItemUnSelect = ingredient => () => {
    const dish = JSON.parse(JSON.stringify(this.state.dish));
    delete dish.ingredients[ingredient.id];
    this.setState({
      dish,
    });
  };

  onGiChanged = (gi) => {
    const { gi: oldGi } = this.state.dish;

    if (oldGi !== gi) {
      this.setState({
        dish: {
          ...this.state.dish,
          gi,
        },
        giEdited: true,
      });
    }
  };

  onGiSubmitEditing = () => {
    const { dishDescriptionRef } = this.state.refs;
    if (dishDescriptionRef.current) {
      dishDescriptionRef.current.focus();
    }
  };

  onNameChanged = (name) => {
    const { name: oldName } = this.state.dish;

    if (oldName !== name) {
      this.setState({
        dish: {
          ...this.state.dish,
          name,
        },
      });
    }
  };

  onNameSubmitEditing = () => {
    const { dishGIRef } = this.state.refs;
    if (dishGIRef.current) {
      dishGIRef.current.focus();
    }
  };

  onDescriptionChanged = (description) => {
    const { description: oldDescription } = this.state.dish;

    if (oldDescription !== description) {
      this.setState({
        dish: {
          ...this.state.dish,
          description,
        },
      });
    }
  };

  onDescriptionSubmitEditing = () => {
    const { ingredientsRefs } = this;

    const ingredientsRefsKeys = Object.keys(ingredientsRefs);

    if (ingredientsRefsKeys.length) {
      const firstRef = ingredientsRefs[ingredientsRefsKeys[0]];

      if (firstRef.current) {
        firstRef.current.focus();
      }
    }
  };


  addHeaderHandler = () => {
    const { navigation } = this.props;

    navigation.setParams({ handleSave: () => this.saveSettings() });
    navigation.setParams({ handleEdit: () => this.toEditMode() });
    navigation.setParams({ handleCancel: () => this.toViewMode() });
  };

  calculateGI = (ingredients) => {
    const ingredientsArr = this.ingredientsArr(ingredients);
    const ingredientCarbs = ingredientsArr.reduce((calculations, ingredient) => {
      const { gi, ingredients: subIngredients, weight } = ingredient;
      let { carbohydrates } = ingredient;

      if (carbohydrates === undefined) carbohydrates = this.calculateCarbs(subIngredients);

      const calculatedCarbs = (weight / 100) * carbohydrates;

      return {
        carbohydrates: calculatedCarbs + calculations.carbohydrates,
        carbohydratesWithGI: (calculatedCarbs * (gi / 100)) + calculations.carbohydratesWithGI,
      };
    }, {
      carbohydratesWithGI: 0,
      carbohydrates: 0,
    });

    const gi = (ingredientCarbs.carbohydratesWithGI / ingredientCarbs.carbohydrates) * 100;

    return Number.isNaN(gi) ? '' : `${Math.round(gi)}`;
  };

  calculateCarbs = ingredients => ingredients.reduce((calcs, ingredient) => {
    let { carbohydrates } = ingredient;
    const { weight, ingredients: subIngredients } = ingredient;

    if (carbohydrates === undefined) carbohydrates = this.calculateCarbs(subIngredients);

    return calcs + ((weight / 100) * carbohydrates);
  }, 0);

  ingredientsArr = (ingredients) => {
    const ingredientsKeys = Object.keys(ingredients);
    const { dishes, products } = this.props;

    return ingredientsKeys.map((key) => {
      const { type, weight } = ingredients[key];
      const ingredient = type === 'product'
        ? products.find(product => product.id === key)
        : dishes.find(dish => dish.id === key);

      const { carbohydrates, gi, ingredients: subIngredients } = ingredient;

      return (carbohydrates === undefined)
        ? {
          ingredients: this.ingredientsArr(subIngredients),
          gi,
          weight,
        }
        : { carbohydrates, gi, weight };
    });
  };


  changeIngredientsWeight = index => (weight) => {
    const dish = JSON.parse(JSON.stringify(this.state.dish));
    const ingredientsKeys = Object.keys(dish.ingredients);

    dish.ingredients[ingredientsKeys[index]].weight = weight;

    this.setState({
      dish,
    });
  };

  closeSelector = () => {
    this.setState({
      modalVisible: false,
    });
  };

  getIngredientsData = (ingredients) => {
    console.log(ingredients);

    const ingredientsKeys = Object.keys(ingredients);
    let result = {
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
    };

    if (ingredientsKeys.length === 0) return result;

    result = ingredientsKeys.reduce(this.ingredientsReducer(ingredients), result);

    const totalWeight = ingredientsKeys.reduce((weight, key) => {
      const currentWeight = Number.isNaN(ingredients[key].weight)
        ? 0
        : Number.parseFloat(ingredients[key].weight);
      return weight + currentWeight;
    }, 0);

    return totalWeight > 0 ? Object.keys(result).reduce((resultData, key) => {
      const newDataItem = {
        [key]: result[key] / (totalWeight / 100),
      };
      return { ...resultData, ...newDataItem };
    }, {}) : result;
  };

  getModeFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('mode', 'add');
  };

  getDishFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('dish', {
      name: '',
      gi: '',
      ingredients: {},
      description: '',
    });
  };

  getDishGI = () => {
    const { dish, giEdited } = this.state;
    const { gi, ingredients } = dish;

    if (giEdited) return gi;

    if (gi === '') {
      const ingredientsKeys = Object.keys(ingredients);

      if (ingredientsKeys.length) {
        return this.calculateGI(ingredients);
      }

      return gi;
    }

    return gi;
  };

  getDishIdFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('dishId', Date.now());
  };

  getSelectorItems = () => {
    const { products, dishes } = this.props;

    return [
      ...products.map(product => ({ id: product.id, title: product.name, type: 'product' })),
      ...dishes.map(dish => ({ id: dish.id, title: dish.name, type: 'dish' })),
    ].sort((a, b) => {
      if (a.title > b.title) return -1;
      if (a.title < b.title) return 1;
      return 0;
    });
  };

  getSelectedIngredientsIds =
    ingredients => Object.keys(ingredients).map(ingredientKey => ingredients[ingredientKey].id);

  goToNextIngredient = index => () => {
    const { ingredientsRefs } = this;
    const nextIngredientKey = Object.keys(ingredientsRefs)[index + 1];
    if (nextIngredientKey) {
      ingredientsRefs[nextIngredientKey].current.focus();
    }
  };

  ingredientsReducer = ingredients => (calculations, ingredientsKey) => {
    const { weight, type, id } = ingredients[ingredientsKey];

    const ingredient = (type === 'product')
      ? this.props.products.find(item => item.id === id)
      : this.getIngredientsData(this.props.dishes.find(item => item.id === id).ingredients);

    return {
      carbohydrates: calculations.carbohydrates + ((ingredient.carbohydrates / 100) * weight),
      fats: calculations.fats + ((ingredient.fats / 100) * weight),
      proteins: calculations.proteins + ((ingredient.proteins / 100) * weight),
    };
  };

  renderCalculations = () => {
    const { ingredients } = this.state.dish;

    return (<NutritionalValueCalculations {...this.getIngredientsData(ingredients)} />);
  };

  renderIngredientsSelector = () => {
    const { dish, searchText } = this.state;
    return (

      <ItemsSelector
        items={this.getSelectorItems()}
        selectedIds={this.getSelectedIngredientsIds(dish.ingredients)}
        searchText={searchText}
        onClose={this.closeSelector}
        onItemSelect={this.onItemSelect}
        onItemUnSelect={this.onItemUnSelect}
      />
    );
  };

  renderIngredients = ingredients => (Object.keys(ingredients).map((ingredientKey, index) => {
    const ingredient = ingredients[ingredientKey];
    const style = [styles.dishFabricItem];
    const ingredientRef = this.ingredientsRefs[ingredientKey];

    if (!index) style.push(styles.dishFabricItemFirst);

    return (
      <View key={ingredient.id} style={styles.ingredient}>
        <TextField
          ref={ingredientRef}
          style={style}
          label={`${ingredient.title}(g):`}
          keyboardType={'number-pad'}
          required={true}
          value={ingredient.weight}
          onSubmitEditing={this.goToNextIngredient(index)}
          onChangeText={this.changeIngredientsWeight(index)}
          onBlur={this.onIngredientsWeightBlur(index)}/>
        <RoundButton
          style={styles.trashButton}
          androidName={'md-trash'}
          iosName={'ios-trash'}
          size={30}
          onPress={this.onItemUnSelect(ingredient)}/>
      </View>
    );
  }));

  renderEditTexts() {
    const { refs, dish } = this.state;
    const {
      dishNameRef,
      dishDescriptionRef,
      dishGIRef,
    } = refs;

    return (<>
      <TextField
        style={styles.dishFabricLine}
        label={'Name:'}
        ref={dishNameRef}
        required={true}
        value={dish.name}
        onSubmitEditing={this.onNameSubmitEditing}
        onChangeText={this.onNameChanged}/>
      <TextField
        style={styles.dishFabricLine}
        label={'GI:'}
        ref={dishGIRef}
        value={this.getDishGI()}
        onSubmitEditing={this.onGiSubmitEditing}
        onChangeText={this.onGiChanged}/>
      <TextField
        style={styles.dishFabricLine}
        label={'Description:'}
        ref={dishDescriptionRef}
        required={false}
        value={dish.description}
        onSubmitEditing={this.onDescriptionSubmitEditing}
        onChangeText={this.onDescriptionChanged}/>
    </>);
  }

  renderEditMode = () => {
    const { dish } = this.state;

    return (
      <View style={styles.dishFabricEdit}>
        <ScrollView contentContainerStyle={styles.dishFabricScroll}>

          {this.renderEditTexts()}

          {this.renderCalculations()}

          {this.renderIngredients(dish.ingredients)}

          {this.renderIngredientsSelector()}

        </ScrollView>
        { this.renderSearchControl() }
      </View>
    );
  };

  renderViewMode = () => {
    const { dish } = this.state;
    return (
      <DishFabricView dish={dish}>
        {this.renderCalculations()}
      </DishFabricView>
    );
  };

  renderSearchControl = () => {
    const { searchText } = this.state;
    return <SearchControl searchText={searchText} onChangeText={this.onSearchTextChange}/>;
  };

  onSearchTextChange = (searchText) => {
    this.setState({
      searchText,
    });
  };

  saveSettings = () => {
    const { addDish } = this.props;
    const { dish } = this.state;

    if (this.validateAll()) {
      const itemId = this.getDishIdFromNav();
      const newDish = {};

      newDish[itemId] = dish;

      if (newDish[itemId].gi === '') {
        newDish[itemId].gi = this.getDishGI();
      }

      newDish[itemId].updatedAt = Date.now();

      addDish(newDish);

      this.toViewMode(itemId);
    }
  };

  toEditMode = () => {
    this.props.navigation.setParams({
      mode: 'edit',
    });

    this.setState({
      mode: 'edit',
    });
  };

  toViewMode = (dishId) => {
    const newOptions = {
      mode: 'view',
    };

    if (dishId) newOptions.dishId = dishId;

    this.props.navigation.setParams(newOptions);

    this.setState({
      mode: 'view',
    });
  };

  updateIngredientRefs = () => {
    const { dish } = this.state;
    if (dish) {
      Object.keys(dish.ingredients).forEach((ingredientKey) => {
        if (this.ingredientsRefs[ingredientKey] === undefined) {
          this.ingredientsRefs[ingredientKey] = React.createRef();
        }
      });
    }
  };

  validateAll = () => {
    const { refs } = this.state;
    const { dish } = this.state;
    const dishKeys = Object.keys(dish);

    let valid = true;

    Object.keys(refs).forEach((key) => {
      refs[key].current.setTouched();
    });

    for (let i = 0; i < dishKeys.length; i += 1) {
      const key = dishKeys[i];
      if (key !== 'description' && key !== 'gi') {
        valid = !(dish[key] === '');
        if (!valid) break;
      }
    }

    return valid;
  };

  render() {
    const { mode } = this.state;
    return (
      <SafeAreaView style={styles.dishFabric}>
        {
          mode === 'view'
            ? this.renderViewMode()
            : this.renderEditMode()
        }
      </SafeAreaView>
    );
  }
}

export default DishFabricScreen;
