import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import palette from "../palette";
import PropTypes from "prop-types";

class MenuItem extends React.PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,

        onClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {},
    };

    onPress = () => {
        const {data, onClick} = this.props;

        onClick(data);
    };

    render() {
        const {data, onClick} = this.props;

        return (
            <TouchableNativeFeedback onPress={this.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={[styles.menuItem]}>
                    <Text style={[styles.menuItemTitle]}>{ data.title }</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    menuItem: {
        alignSelf: 'stretch',
    },
    menuItemTitle: {
        fontSize: 20,
        color: palette.color2,
        borderBottomWidth: 1,
        borderColor: palette.color5,
        paddingTop: 15,
        paddingBottom: 15,
    }

});

export default MenuItem;