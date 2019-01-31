import React from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
} from "react-native";
import palette from "../palette";
import PropTypes from "prop-types";
import Swipeout from 'react-native-swipeout';
import Icon from "react-native-vector-icons/Ionicons";

class MenuItem extends React.PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,
        deleteMode: PropTypes.bool,

        onClick: PropTypes.func,
        onDelete: PropTypes.func,
    };

    static defaultProps = {
        deleteMode: false,

        onClick: () => {},
        onDelete: () => {},
    };

    onPress = () => {
        const {data, onClick} = this.props;

        onClick(data);
    };

    renderAndroid = (data) => (
        <TouchableNativeFeedback onPress={this.onPress}
                                 background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={[styles.menuItem]}>
                <Text style={[styles.menuItemTitle]}>{data.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );

    renderIOs = (data) => (
        <TouchableOpacity onPress={this.onPress}>
            <View style={[styles.menuItem]}>
                <Text style={[styles.menuItemTitle]}>{data.title}</Text>
            </View>
        </TouchableOpacity>
    );

    renderDeleteButton = () => {
        return (
            <View style={styles.menuItemDeleteButton}>
                <Icon
                    name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    color={palette.color1}
                    size={30}
                />
            </View>
        )
    };

    renderWithDelete = () => {
        const {data, onDelete} = this.props;

        const swipeOutBtn = [
            {
                component: this.renderDeleteButton(),
                backgroundColor: palette.color7,
                onPress: () => {
                    Alert.alert(
                        'Delete',
                        data.title,
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => {onDelete(data.id)}
                            },
                        ],
                        {cancelable: false},
                    )
                }
            }
        ];

        return (<Swipeout right={swipeOutBtn} backgroundColor={palette.color3}>
            {
                Platform.OS === 'ios'
                    ? this.renderIOs(data)
                    : this.renderAndroid(data)
            }
        </Swipeout>);

    };

    renderWithOutDelete = () => {
        const {data} = this.props;

        return Platform.OS === 'ios'
            ? this.renderIOs(data)
            : this.renderAndroid(data);

    };

    render() {
        const {deleteMode} = this.props;

        return deleteMode
            ? this.renderWithDelete()
            : this.renderWithOutDelete();
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
    },
    menuItemDeleteButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

});

export default MenuItem;