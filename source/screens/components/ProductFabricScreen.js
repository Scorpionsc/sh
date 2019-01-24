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


    constructor(props) {
        super(props);

        this.state = {
            productNameRef: React.createRef(),
            caloriesRef: React.createRef(),
            proteinsRef: React.createRef(),
        };

    }

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({handleSave: () => this.saveSettings()});

    }


    onCaloriesChanged = (calories) => {
        console.log(calories);
    };

    onCaloriesSubmitEditing = () => {
        const {proteinsRef} = this.state;
        proteinsRef.current.focus();
    };

    onProductNameChanged = (productName) => {
        console.log(productName);
    };

    onProductNameSubmitEditing = () => {
        const {caloriesRef} = this.state;
        caloriesRef.current.focus();
    };

    onProteinsChanged = (proteins) => {
        console.log(proteins);
    };

    onProteinsSubmitEditing = () => {
        console.log('onProteinsSubmitEditing');
    };

    saveSettings = () => {
        console.log(889);

    };


    render() {
        const {productNameRef, caloriesRef, proteinsRef} = this.state;

        return (
            <SafeAreaView style={styles.productFabric}>
                <ScrollView contentContainerStyle={styles.productFabricScroll}>
                    <TextField
                        style={styles.productFabricLine}
                        label={'Product name:'}
                        ref={productNameRef}
                        onSubmitEditing={this.onProductNameSubmitEditing}
                        onChangeText={this.onProductNameChanged}/>
                    <TextField
                        label={'Calories(kcal):'}
                        ref={caloriesRef}
                        keyboardType={'number-pad'}
                        onSubmitEditing={this.onCaloriesSubmitEditing}
                        onChangeText={this.onCaloriesChanged}/>
                    <TextField
                        label={'Proteins(g):'}
                        ref={proteinsRef}
                        keyboardType={'number-pad'}
                        onSubmitEditing={this.onProteinsSubmitEditing}
                        onChangeText={this.onProteinsChanged}/>
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