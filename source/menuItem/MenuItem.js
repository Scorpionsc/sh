import React from "react";
import {View, Text, StyleSheet,TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import palette from "../palette";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";


class MenuItem extends React.PureComponent {

    static propTypes = {
        active: PropTypes.bool,
        data: PropTypes.object.isRequired,
        isConnected: PropTypes.bool,

        onClick: PropTypes.func,
    };

    static defaultProps = {
        active: false,
        isConnected: false,

        onClick: () => {
        },
    };

    onPress = () => {
        const {data, onClick, active} = this.props;

        if (!active) onClick(data);
    };

    renderSubTitle = (styles) => {
        const {data} = this.props;

        return data.subTitle
            ? (<Text style={styles}>{data.subTitle}</Text>)
            : null;
    };

    renderConnected = () => {
        const {isConnected} = this.props;

        return isConnected
            ? (<Icon
                name={Platform.OS === "ios" ? "ios-bluetooth" : "md-bluetooth"}
                color={palette.color4}
                size={35}
            />)
            : null;

    };

    render() {
        const {data, active} = this.props;
        const textStyles = [styles.menuItemTitle];

        if (active) textStyles.push(styles.menuItemActive);

        return Platform.OS === 'ios'
            ? (
                <TouchableOpacity onPress={this.onPress}>
                    <View style={[styles.menuItem]}>
                        <View>
                            <Text style={textStyles}>{data.title}</Text>
                            {this.renderSubTitle(textStyles)}
                        </View>
                        {this.renderConnected()}
                    </View>
                </TouchableOpacity>
            )
            : (
                <TouchableNativeFeedback onPress={this.onPress}
                                         background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={[styles.menuItem]}>
                        <View>
                            <Text style={textStyles}>{data.title}</Text>
                            {this.renderSubTitle(textStyles)}
                        </View>
                        {this.renderConnected()}
                    </View>
                </TouchableNativeFeedback>
            );
    }
}

const styles = StyleSheet.create({
    menuItem: {
        alignSelf: 'stretch',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: palette.color5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItemActive: {
        color: palette.color4,
    },
    menuItemTitle: {
        fontSize: 20,
        color: palette.color2,
    },
    menuItemSubTitle: {
        fontSize: 16,
        color: palette.color2,
    },
});

export default MenuItem;