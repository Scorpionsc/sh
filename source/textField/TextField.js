import React from "react";
import {Text, StyleSheet, View, TextInput} from "react-native";
import PropTypes from "prop-types";
import palette from "../palette";


class TextField extends React.Component {

    static propTypes = {
        keyboardType: PropTypes.string,
        label: PropTypes.string,
        style: PropTypes.object,

        onChangeText: PropTypes.func,
        onSubmitEditing: PropTypes.func,
    };

    static defaultProps = {
        keyboardType: null,
        label: null,
        style: null,

        onChangeText: () => {},
        onSubmitEditing: () => {},
    };


    constructor(props) {
        super(props);

        this.state = {
            inputRef: React.createRef(),
        };

    }


    onChangeText = (text) => {
        const {onChangeText} = this.props;
        onChangeText(text);
    };

    onSubmitEditing = (text) => {
        const {onSubmitEditing} = this.props;
        onSubmitEditing(text);
    };

    focus = () => {
        const {inputRef} = this.state;
        inputRef.current.focus();
    };


    render() {

        const {label, style, keyboardType} = this.props;
        const {inputRef} = this.state;

        const textFieldStyles = [styles.textField];

        if (style) textFieldStyles.push(style);

        return (
            <View style={textFieldStyles}>
                {
                    label
                    && <Text style={styles.textFieldLabel} onPress={this.focus}>{label}</Text>
                }
                <TextInput
                    style={styles.textFieldInput}
                    ref={inputRef}
                    keyboardType={keyboardType}
                    onSubmitEditing={this.onSubmitEditing}
                    onChangeText={this.onChangeText}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        backgroundColor: palette.color5,
        borderColor: palette.color6,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        padding: 5,
    },
    textFieldLabel: {
        fontSize: 16,
        color: palette.color2,
    },
    textFieldInput: {
        fontSize: 16,
        color: palette.color2,
        padding: 0,

    },
});

export default TextField;