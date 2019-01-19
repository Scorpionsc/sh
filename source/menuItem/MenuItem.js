import React from "react";
import {View, Text, StyleSheet,TouchableHighlight, TouchableNativeFeedback, Platform} from "react-native";
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
        console.log(300);

        const {data, onClick} = this.props;
        console.log(500);

        onClick(data);
    };

    render() {
        const {data} = this.props;

        return Platform.OS === 'ios'
            ? (
                <TouchableHighlight style={[styles.menuItem]} onPress={this.onPress} underlayColor={palette.color5}>
                    <Text style={[styles.menuItemTitle]}>{data.title}</Text>
                </TouchableHighlight>
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