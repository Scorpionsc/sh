import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import palette from "../../palette";

class ProductsScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    static navigationOptions = {
        title: 'Products',
        tabBarVisible: false,
    };

    render() {
        return (
            <SafeAreaView style={[styles.products]}>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    products: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default ProductsScreen;