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


class ProductFabricScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return options = {
            title: 'Add products',
            tabBarVisible: false,
            headerRight: (<RoundButton androidName="md-checkmark" iosName="ios-checkmark" onPress={() => params.handleSave()}/>),
        };
    };

    static getDerivedStateFromProps(props, state) {

        console.log(props, state);

        if (props.product) {
            return {
                ...state,
                product: props.product,
            }
        }
        return state;
    }


    constructor(props) {
        super(props);

        this.state = {
            product: {
                calories: '',
                carbohydrates: '',
                description: '',
                fats: '',
                gi: '',
                name: '',
                proteins: '',
            },
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

    }

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({handleSave: () => this.saveSettings()});

    }


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
        const {product} = this.state;

        const valid = this.validateAll();
        console.log(valid);
        console.log(product);
    };

    validateAll = () => {
        const {refs} = this.state;
        let invalid = false;

        Object.keys(refs).forEach(key => {
            console.log(key);

            if(!invalid) invalid = refs[key].current.checkValidity();
        });

        if(invalid){
            this.forceUpdate();
        }

        return !invalid;

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
                        multiline = {true}
                        numberOfLines = {4}
                        editable = {true}
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