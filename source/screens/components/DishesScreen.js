import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import palette from "../../palette";

class DishesScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    static navigationOptions = {
        title: 'Dishes',
        tabBarVisible: false,
    };

    render() {
        return (
            <SafeAreaView style={[styles.dishes]}>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    dishes: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default DishesScreen;