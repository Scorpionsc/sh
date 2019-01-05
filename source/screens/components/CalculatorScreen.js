import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import palette from "../../palette";

class CalculatorScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    static navigationOptions = { header: null };

    render() {
        return (
            <View style={[styles.calculator]}>
                <Text style={[styles.temp]}>Calculator screen in progress...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    temp: {
        color: palette.color2,
    },
    calculator: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default CalculatorScreen;