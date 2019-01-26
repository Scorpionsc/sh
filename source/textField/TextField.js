import React from "react";
import {Text, StyleSheet, View, TextInput} from "react-native";
import PropTypes from "prop-types";
import palette from "../palette";


class TextField extends React.Component {

    static propTypes = {
        editable: PropTypes.bool,
        keyboardType: PropTypes.string,
        label: PropTypes.string,
        multiline: PropTypes.bool,
        numberOfLines: PropTypes.number,
        required: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),

        onChangeText: PropTypes.func,
        onSubmitEditing: PropTypes.func,
    };

    static defaultProps = {
        editable: true,
        keyboardType: null,
        label: null,
        multiline: false,
        numberOfLines: 1,
        style: null,

        onChangeText: () => {},
        onSubmitEditing: () => {},
    };


    constructor(props) {
        super(props);

        this.state = {
            inputRef: React.createRef(),
            touched: false,
        };

    }


    checkValidity = () => {
        const {required, value} = this.props;
        const {touched} = this.state;

        return (required && touched) ? !value : false;
    };

    focus = () => {
        const {inputRef} = this.state;
        inputRef.current.focus();
    };

    onChangeText = (text) => {
        const {onChangeText} = this.props;
        onChangeText(text);
    };

    onBlur = () => {
        this.setState({
            touched: true,
        });
    };

    onSubmitEditing = (text) => {
        const {onSubmitEditing} = this.props;
        onSubmitEditing(text);
    };

    setTouched = () => {
        this.setState({
            touched: true,
        });
    };


    render() {

        const {
            label,
            style,
            keyboardType,
            multiline,
            numberOfLines,
            value,
            editable
        } = this.props;
        const {inputRef} = this.state;
        const invalid = this.checkValidity();
        const textFieldStyles = [styles.textField];
        const labelStyles = [styles.textFieldLabel];

        if (style) textFieldStyles.push(style);

        if (invalid) labelStyles.push(styles.textFieldError);

        return (
            <View style={textFieldStyles}>
                {
                    label
                    && <Text style={labelStyles} onPress={this.focus}>{label}</Text>
                }
                <TextInput
                    style={styles.textFieldInput}
                    ref={inputRef}
                    multiline={multiline}
                    editable={editable}
                    numberOfLines={numberOfLines}
                    keyboardType={keyboardType}
                    value={value}
                    onSubmitEditing={this.onSubmitEditing}
                    onBlur={this.onBlur}
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
    textFieldError: {
        color: palette.color7,
    },
});

export default TextField;