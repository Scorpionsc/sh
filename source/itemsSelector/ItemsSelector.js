import React from "react";
import {
    StyleSheet,
    SafeAreaView,
} from "react-native";
import PropTypes from "prop-types";
import palette from "../palette";



class ItemsSelector extends React.Component {

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape).isRequired,
        selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    };

    render() {
        return (
            <SafeAreaView style={styles.itemsSelector}>

            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    itemsSelector: {
        flex: 1,
        backgroundColor: palette.color3,
    },
});

export default ItemsSelector;