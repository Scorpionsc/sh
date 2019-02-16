import React from 'react';
import {
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

const styles = StyleSheet.create({
  productFabric: {
    flex: 1,
    backgroundColor: palette.color3,
  },
  productFabricScroll: {
    padding: 20,
  },
  productFabricLine: {
    borderTopWidth: 1,
    alignSelf: 'stretch',
  },
  productFabricHeaderButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productFabricView: {
    marginRight: 20,
    marginLeft: 20,
  },
  productFabricViewTitle: {
    color: palette.color2,
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,

  },
  productFabricViewRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: palette.color5,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  productFabricViewRowTitle: {
    color: palette.color2,
    fontSize: 18,
    flex: 2,
  },
  productFabricViewValues: {
    alignSelf: 'stretch',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  productFabricViewValue: {
    color: palette.color2,
    fontSize: 20,
  },
  productFabricViewUnit: {
    color: palette.color2,
    fontSize: 16,
  },
  productFabricDescription: {
    borderColor: palette.color5,
    borderTopWidth: 1,
    paddingTop: 20,
  },
  productFabricDescriptionTitle: {
    fontSize: 18,
    color: palette.color2,
    marginBottom: 10,
  },
  productFabricDescriptionValue: {
    color: palette.color2,
    fontSize: 16,
  },
});

class ProductFabricScreen extends React.Component {
  static propTypes = {
    addProduct: PropTypes.func,
    navigation: PropTypes.any,
  };

  static defaultProps = {
    navigation: null,

    addProduct: () => {
    },
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const mode = navigation.getParam('mode', 'add');
    const title = mode === 'add' ? 'Add product' : mode === 'edit' ? 'Edit product' : null;

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
          <View style={styles.productFabricHeaderButtons}>
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
      product: this.getProductFromNav(),
      refs: {
        caloriesRef: React.createRef(),
        carbohydratesRef: React.createRef(),
        descriptionRef: React.createRef(),
        fatsRef: React.createRef(),
        giRef: React.createRef(),
        productNameRef: React.createRef(),
        proteinsRef: React.createRef(),
      },
      mode: this.getModeFromNav(),
    };

    this.addHeaderHandler();
  }


  addHeaderHandler = () => {
    const { navigation } = this.props;

    navigation.setParams({ handleSave: () => this.saveSettings() });
    navigation.setParams({ handleEdit: () => this.toEditMode() });
    navigation.setParams({ handleCancel: () => this.toViewMode() });
  };

  getModeFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('mode', 'add');
  };

  getProductFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('product', {
      calories: '',
      carbohydrates: '',
      description: '',
      fats: '',
      gi: '',
      name: '',
      proteins: '',
    });
  };

  getProductIdFromNav = () => {
    const { navigation } = this.props;

    return navigation.getParam('productId', Date.now());
  };

  onCaloriesChanged = (calories) => {
    this.setState({
      product: {
        ...this.state.product,
        calories,
      },
    });
  };

  onCaloriesSubmitEditing = () => {
    const { proteinsRef } = this.state.refs;
    proteinsRef.current.focus();
  };

  onCarbohydratesChanged = (carbohydrates) => {
    this.setState({
      product: {
        ...this.state.product,
        carbohydrates,
      },
    });
  };

  onCarbohydratesSubmitEditing = () => {
    const { giRef } = this.state.refs;
    giRef.current.focus();
  };

  onDescriptionChanged = (description) => {
    this.setState({
      product: {
        ...this.state.product,
        description,
      },
    });
  };

  onFatsChanged = (fats) => {
    this.setState({
      product: {
        ...this.state.product,
        fats,
      },
    });
  };

  onFatsSubmitEditing = () => {
    const { carbohydratesRef } = this.state.refs;
    carbohydratesRef.current.focus();
  };

  onGiChanged = (gi) => {
    this.setState({
      product: {
        ...this.state.product,
        gi,
      },
    });
  };

  onGiSubmitEditing = () => {
    const { descriptionRef } = this.state.refs;
    descriptionRef.current.focus();
  };

  onProductNameChanged = (productName) => {
    this.setState({
      product: {
        ...this.state.product,
        name: productName,
      },
    });
  };

  onProductNameSubmitEditing = () => {
    const { caloriesRef } = this.state.refs;
    caloriesRef.current.focus();
  };

  onProteinsChanged = (proteins) => {
    this.setState({
      product: {
        ...this.state.product,
        proteins,
      },
    });
  };

  onProteinsSubmitEditing = () => {
    const { fatsRef } = this.state.refs;
    fatsRef.current.focus();
  };

  renderEditMode = () => {
    const {
      refs,
      product,
    } = this.state;

    const {
      productNameRef,
      proteinsRef,
      carbohydratesRef,
      caloriesRef,
      descriptionRef,
      fatsRef,
      giRef,
    } = refs;

    return (
      <ScrollView contentContainerStyle={styles.productFabricScroll}>
        <TextField
          style={styles.productFabricLine}
          label={'Product name:'}
          ref={productNameRef}
          required={true}
          value={product.name}
          onSubmitEditing={this.onProductNameSubmitEditing}
          onChangeText={this.onProductNameChanged}/>
        <TextField
          label={'Calories(kcal):'}
          ref={caloriesRef}
          value={product.calories}
          required={true}
          keyboardType={'number-pad'}
          onSubmitEditing={this.onCaloriesSubmitEditing}
          onChangeText={this.onCaloriesChanged}/>
        <TextField
          label={'Proteins(g):'}
          ref={proteinsRef}
          value={product.proteins}
          required={true}
          keyboardType={'number-pad'}
          onSubmitEditing={this.onProteinsSubmitEditing}
          onChangeText={this.onProteinsChanged}/>
        <TextField
          label={'Fats(g):'}
          ref={fatsRef}
          value={product.fats}
          required={true}
          keyboardType={'number-pad'}
          onSubmitEditing={this.onFatsSubmitEditing}
          onChangeText={this.onFatsChanged}/>
        <TextField
          label={'Carbohydrates(g):'}
          ref={carbohydratesRef}
          value={product.carbohydrates}
          required={true}
          keyboardType={'number-pad'}
          onSubmitEditing={this.onCarbohydratesSubmitEditing}
          onChangeText={this.onCarbohydratesChanged}/>
        <TextField
          label={'GI:'}
          ref={giRef}
          value={product.gi}
          required={true}
          keyboardType={'number-pad'}
          onSubmitEditing={this.onGiSubmitEditing}
          onChangeText={this.onGiChanged}/>
        <TextField
          label={'Description:'}
          ref={descriptionRef}
          value={product.description}
          multiline={true}
          numberOfLines={4}
          editable={true}
          onChangeText={this.onDescriptionChanged}/>
      </ScrollView>
    );
  };

  renderViewMode = () => {
    const { product } = this.state;

    return (
      <View style={styles.productFabricView}>
        <Text style={styles.productFabricViewTitle}>{product.name}</Text>
        <View style={styles.productFabricViewRow}>
          <Text style={styles.productFabricViewRowTitle}>Calories:</Text>
          <View style={styles.productFabricViewValues}>
            <Text style={styles.productFabricViewValue}>{product.calories}</Text>
            <Text style={styles.productFabricViewUnit}> kcal</Text>
          </View>
        </View>
        <View style={styles.productFabricViewRow}>
          <Text style={styles.productFabricViewRowTitle}>Proteins:</Text>
          <View style={styles.productFabricViewValues}>
            <Text style={styles.productFabricViewValue}>{product.proteins}</Text>
            <Text style={styles.productFabricViewUnit}> g</Text>
          </View>
        </View>
        <View style={styles.productFabricViewRow}>
          <Text style={styles.productFabricViewRowTitle}>Fats:</Text>
          <View style={styles.productFabricViewValues}>
            <Text style={styles.productFabricViewValue}>{product.fats}</Text>
            <Text style={styles.productFabricViewUnit}> g</Text>
          </View>
        </View>
        <View style={styles.productFabricViewRow}>
          <Text style={styles.productFabricViewRowTitle}>Carbohydrates:</Text>
          <View style={styles.productFabricViewValues}>
            <Text style={styles.productFabricViewValue}>{product.carbohydrates}</Text>
            <Text style={styles.productFabricViewUnit}> g</Text>
          </View>
        </View>
        <View style={styles.productFabricViewRow}>
          <Text style={styles.productFabricViewRowTitle}>GI:</Text>
          <View style={styles.productFabricViewValues}>
            <Text style={styles.productFabricViewValue}>{product.gi}</Text>
            <Text style={styles.productFabricViewUnit}> %</Text>
          </View>
        </View>
        {
          product.description
          && (
            <View style={styles.productFabricDescription}>
              <Text style={styles.productFabricDescriptionTitle}>Description:</Text>
              <Text style={styles.productFabricDescriptionValue}>{product.description}</Text>
            </View>
          )
        }
      </View>
    );
  };

  saveSettings = () => {
    const { addProduct } = this.props;
    const { product } = this.state;

    if (this.validateAll()) {
      const itemId = this.getProductIdFromNav();
      const newProduct = {};

      newProduct[itemId] = product;
      newProduct[itemId].updatedAt = Date.now();

      addProduct(newProduct);

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

  toViewMode = (productId) => {
    const newOptions = {
      mode: 'view',
    };

    if (productId) newOptions.productId = productId;

    this.props.navigation.setParams(newOptions);

    this.setState({
      mode: 'view',
    });
  };

  validateAll = () => {
    const { refs } = this.state;
    const { product } = this.state;
    const productKeys = Object.keys(product);

    let valid = true;

    Object.keys(refs).forEach((key) => {
      refs[key].current.setTouched();
    });

    for (let i = 0; i < productKeys.length; i += 1) {
      const key = productKeys[i];
      if (key !== 'description') {
        valid = !(product[key] === '');
        if (!valid) break;
      }
    }

    return valid;
  };


  render() {
    const { mode } = this.state;

    return (
      <SafeAreaView style={styles.productFabric}>
        {
          mode === 'view'
            ? this.renderViewMode()
            : this.renderEditMode()
        }
      </SafeAreaView>
    );
  }
}


export default ProductFabricScreen;
