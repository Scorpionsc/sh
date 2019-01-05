import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import palette from "../../palette";

class FoodScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    static navigationOptions = { header: null };

    render() {
        return (
            <View style={[styles.food]}>
                <Text style={[styles.temp]}>Food screen in progress...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    temp: {
        color: palette.color2,
    },
    food: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

});

export default FoodScreen;