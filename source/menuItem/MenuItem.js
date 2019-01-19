import React from "react";
import {View, Text, StyleSheet,TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import palette from "../palette";
import PropTypes from "prop-types";

class MenuItem extends React.PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,

        onClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {
        },
    };

    onPress = () => {
        const {data, onClick} = this.props;

        onClick(data);
    };

    render() {
        const {data} = this.props;

        return Platform.OS === 'ios'
            ? (
                <TouchableOpacity onPress={this.onPress}>
                    <View style={[styles.menuItem]}>
                        <Text style={[styles.menuItemTitle]}>{data.title}</Text>
                    </View>
                </TouchableOpacity>
            )
            : (
                <TouchableNativeFeedback onPress={this.onPress}
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={[styles.menuItem]}>
                        <Text style={[styles.menuItemTitle]}>{data.title}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
    }
}

const styles = StyleSheet.create({
    menuItem: {
        alignSelf: 'stretch',
        borderColor: palette.color5,
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
    },
    menuItemTitle: {
        fontSize: 20,
        color: palette.color2,
    }

});

export default MenuItem;