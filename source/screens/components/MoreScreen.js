import React from "react";
import { View, Text, StyleSheet } from "react-native";
import palette from "../../palette";

class MoreScreen extends React.Component {

    static navigationOptions = { header: null };

    render() {
        return (
            <View style={[styles.more]}>
                <Text style={[styles.temp]}>More screen in progress...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    temp: {
        color: palette.color2,
    },
    more: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

});

export default MoreScreen;