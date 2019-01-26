import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import palette from "../../palette";
import RoundButton from "../../roundButton/RoundButton";
import TextField from "../../textField/TextField";
import MainPreLoader from "../../mainPreLoader/MainPreLoader";


class ProductFabricScreen extends React.Component {

    static propTypes = {
        addProduct: PropTypes.func.isRequired,
    };

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return options = {
            title: 'Add products',
            tabBarVisible: false,
            headerRight: (
                <RoundButton androidName="md-checkmark" iosName="ios-checkmark" onPress={() => params.handleSave()}/>),
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
        };

        this.addHeaderHandler();

    }

    addHeaderHandler = () => {
        const {navigation} = this.props;

        navigation.setParams({handleSave: () => this.saveSettings()});
    };

    getProductFromNav = () => {
        const {navigation} = this.props;

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

    onCaloriesChanged = (calories) => {
        this.setState({
            product: {
                ...this.state.product,
                calories,
            }
        });
    };

    onCaloriesSubmitEditing = () => {
        const {proteinsRef} = this.state.refs;
        proteinsRef.current.focus();
    };

    onCarbohydratesChanged = (carbohydrates) => {
        this.setState({
            product: {
                ...this.state.product,
                carbohydrates,
            }
        });
    };

    onCarbohydratesSubmitEditing = () => {
        const {giRef} = this.state.refs;
        giRef.current.focus();
    };

    onDescriptionChanged = (description) => {
        this.setState({
            product: {
                ...this.state.product,
                description,
            }
        });
    };

    onFatsChanged = (fats) => {
        this.setState({
            product: {
                ...this.state.product,
                fats,
            }
        });
    };

    onFatsSubmitEditing = () => {
        const {carbohydratesRef} = this.state.refs;
        carbohydratesRef.current.focus();
    };

    onGiChanged = (gi) => {
        this.setState({
            product: {
                ...this.state.product,
                gi,
            }
        });
    };

    onGiSubmitEditing = () => {
        const {descriptionRef} = this.state.refs;
        descriptionRef.current.focus();
    };

    onProductNameChanged = (productName) => {
        this.setState({
            product: {
                ...this.state.product,
                name: productName,
            }
        });
    };

    onProductNameSubmitEditing = () => {
        const {caloriesRef} = this.state.refs;
        caloriesRef.current.focus();
    };

    onProteinsChanged = (proteins) => {
        this.setState({
            product: {
                ...this.state.product,
                proteins,
            }
        });
    };

    onProteinsSubmitEditing = () => {
        const {fatsRef} = this.state.refs;
        fatsRef.current.focus();
    };

    saveSettings = () => {
        const {addProduct, navigation} = this.props;
        const {product} = this.state;


        if (this.validateAll()) {
            const itemId = navigation.getParam('productId', Date.now());
            const newProduct = {};

            newProduct[itemId] = product;
            newProduct[itemId].updatedAt = Date.now();

            addProduct(newProduct);
        }

    };

    validateAll = () => {
        const {refs} = this.state;
        const {product} = this.state;
        const productKeys = Object.keys(product);

        let valid = true;

        Object.keys(refs).forEach(key => {
            refs[key].current.setTouched();
        });

        for (let i = 0; i < productKeys.length; i++) {
            const key = productKeys[i];
            if (key !== 'description') {
                valid = !(product[key] === '');
                if (!valid) break;
            }
        }

        return valid;

    };


    render() {
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
            <SafeAreaView style={styles.productFabric}>
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
            </SafeAreaView>
        );
    }

}

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
});

export default ProductFabricScreen;