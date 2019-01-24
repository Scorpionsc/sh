import React from "react";
import {SafeAreaView, TextInput, StyleSheet, BackHandler} from "react-native";
import palette from "../../palette";

class SearchFilterScreen extends React.Component {

    onSearchTextChange = (text) => {
        console.log(text);
    };



    render() {
        const {searchText} = this.props;
        return (
            <SafeAreaView style={[styles.products]}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={this.onSearchTextChange}
                    value={searchText}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    products: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default SearchFilterScreen;