import React from "react";
import {TouchableOpacity, Platform, StyleSheet, TouchableNativeFeedback, View} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import palette from "../palette";


class RoundButton extends React.Component {

    static propTypes = {
        androidName: PropTypes.string.isRequired,
        iosName: PropTypes.string.isRequired,

        onPress: PropTypes.func,
    };

    static defaultProps = {
        onPress: () => {},
    };

    onPress = () => {
        const { onPress } = this.props;

        onPress();
    };

    render() {
        const { androidName, iosName} = this.props;
        return Platform.OS === 'ios'
            ? (
                <TouchableOpacity style={[styles.roundButtonIOS]}
                                  onPress={this.onPress}>
                    <Icon
                        name={iosName}
                        color={palette.color2}
                        size={40}
                    />
                </TouchableOpacity>
            )
            : (
                <TouchableNativeFeedback
                    onPress={this.onPress}
                    background={TouchableNativeFeedback.SelectableBackground()}
                    borderRadius={20}
                >
                    <View style={styles.roundButton}>
                        <Icon
                            name={androidName}
                            color={palette.color2}
                            size={35}
                        />
                    </View>

                </TouchableNativeFeedback>
            );
    }
}

const styles = StyleSheet.create({
    roundButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.color5,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    roundButtonIOS: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.color5,
        width: 40,
        height: 40,
        borderRadius: 20,
    },

});

export default RoundButton;