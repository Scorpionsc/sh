import React from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette';
import RoundButton from '../../roundButton/RoundButton';
import TextField from '../../textField/TextField';
import ItemsSelector from '../../itemsSelector/ItemsSelector';

const styles = StyleSheet.create({
  dishFabric: {
    flex: 1,
    backgroundColor: palette.color3,
  },
  dishFabricScroll: {
    padding: 20,
  },
  dishFabricLine: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  dishFabricHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  dishFabricDescription: {
    borderColor: palette.color5,
    borderTopWidth: 1,
    paddingTop: 20,
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

class DishFabricScreen extends React.Component {
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
        caloriesRef: React.createRef(),
        carbohydratesRef: React.createRef(),
        descriptionRef: React.createRef(),
        fatsRef: React.createRef(),
        giRef: React.createRef(),
        dishNameRef: React.createRef(),
        proteinsRef: React.createRef(),
      },
      mode: this.getModeFromNav(),
      modalVisible: false,
    };

    this.addHeaderHandler();
  }


  onItemSelect = (ingredient) => {
    const dish = JSON.parse(JSON.stringify(this.state.dish));

    dish.ingredients.push(ingredient);

    this.setState({
      dish,
    });
  };

  onItemUnSelect = (ingredient) => {
    const dish = JSON.parse(JSON.stringify(this.state.dish));
    dish.ingredients.splice(dish.ingredients.findIndex(item => ingredient.id === item.id), 1);
    this.setState({
      dish,
    });
  };


  addHeaderHandler = () => {
    const { navigation } = this.props;

    navigation.setParams({ handleSave: () => this.saveSettings() });
    navigation.setParams({ handleEdit: () => this.toEditMode() });
    navigation.setParams({ handleCancel: () => this.toViewMode() });
  };

  closeSelector = () => {
    this.setState({
      modalVisible: false,
    });
  };

  getModeFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('mode', 'add');
  };

  getDishFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('dish', {
      name: '',
      ingredients: [],
    });
  };

  getDishIdFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('dishId', Date.now());
  };

  getSelectorItems = () => {
    const { products, dishes } = this.props;

    return [
      ...products.map(product => ({ id: product.id, title: product.name })),
      ...dishes.map(dish => ({ id: dish.id, title: dish.name })),
    ].sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  };

  renderModal = () => {
    const { modalVisible, dish } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>
        <ItemsSelector
          items={this.getSelectorItems()}
          selectedIds={dish.ingredients.map(ingredient => ingredient.id)}
          onClose={this.closeSelector}
          onItemSelect={this.onItemSelect}
          onItemUnSelect={this.onItemUnSelect}
        />
      </Modal>
    );
  };

  renderEditMode = () => {
    const {
      refs,
      dish,
    } = this.state;

    const {
      dishNameRef,
    } = refs;

    return (
      <ScrollView contentContainerStyle={styles.dishFabricScroll}>
        <TextField
          style={styles.dishFabricLine}
          label={'Dish name:'}
          ref={dishNameRef}
          required={true}
          value={dish.name}
          onSubmitEditing={this.onDishNameSubmitEditing}
          onChangeText={this.onDishNameChanged}/>
        <View>
          <Button
            onPress={this.showProductSelector}
            title="Add ingredients"
            color={palette.color4}
            accessibilityLabel="Add ingredients"
          />
        </View>

        {this.renderModal()}

      </ScrollView>
    );
  };

  renderViewMode = () => {
    const { dish } = this.state;

    return (
      <View style={styles.dishFabricView}>
        <Text style={styles.dishFabricViewTitle}>{dish.name}</Text>
        {
          dish.description
          && (
            <View style={styles.dishFabricDescription}>
              <Text style={styles.dishFabricDescriptionTitle}>Description:</Text>
              <Text style={styles.dishFabricDescriptionValue}>{dish.description}</Text>
            </View>
          )
        }
      </View>
    );
  };

  saveSettings = () => {
    const { addDish } = this.props;
    const { dish } = this.state;

    if (this.validateAll()) {
      const itemId = this.getDishIdFromNav();
      const newDish = {};

      newDish[itemId] = dish;
      newDish[itemId].updatedAt = Date.now();

      addDish(newDish);

      this.toViewMode(itemId);
    }
  };

  showProductSelector = () => {
    this.setState({
      modalVisible: true,
    });
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
      if (key !== 'description') {
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
