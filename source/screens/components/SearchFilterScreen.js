import React from "react";
import {
    FlatList,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import palette from "../../palette";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import MenuItem from "../../menuItem/MenuItem";

class SearchFilterScreen extends React.Component {

    static propTypes = {
        menuItems: PropTypes.array,

        deleteItem: PropTypes.func,
    };

    static defaultProps = {
        menuItems: [],

        deleteItem: ()=>{},
    };

    static getDerivedStateFromProps (nextProps, prevState){

        return {
            ...prevState,
            filteredItems: SearchFilterScreen.getFilteredItems(prevState.searchText, nextProps.menuItems)
        };
    }

    static getFilteredItems = (text, items) => items
        .filter(item => {
            return ~item.name.toLowerCase().indexOf(text.toLowerCase());
        })
        .map(item => ({
            id: item.id,
            title: item.name,
        })).sort((a, b) => {
            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        });


    constructor(props) {
        super(props);
        this.state = {
            searchInputRef: React.createRef(),
            searchText: '',
            filteredItems: [],
        };
    }


    onDelete = (id) => {
        const {deleteItem} = this.props;
        deleteItem(id);
    };

    onSearchTextChange = (text) => {
        const {menuItems} = this.props;
        this.setState({
            searchText: text,
            filteredItems: SearchFilterScreen.getFilteredItems(text, menuItems),
        });
    };

    onSearchControlPress = () => {
        const {searchInputRef} = this.state;
        searchInputRef.current.focus();
    };

    renderMenuItem = ({item, index}) => <MenuItem key={index} data={item} deleteMode={true} onClick={this.onItemClick} onDelete={this.onDelete}/>;

    renderContent = () => {
        const {filteredItems} = this.state;

        return (
            <FlatList style={[styles.searchMenuList]}
                      data={filteredItems}
                      renderItem={this.renderMenuItem}
                      keyExtractor={item => item.id}/>
        );
    };

    renderControl = () => {
        const {searchText, searchInputRef} = this.state;

        return (
            <View style={[styles.searchFilterItemWrap]}>
                <Icon
                    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                    color={palette.color2}
                    onPress={this.onSearchControlPress}
                    style={[styles.searchFilterIcon]}
                    size={25}
                />
                <TextInput
                    style={[styles.searchFilterItem]}
                    onChangeText={this.onSearchTextChange}
                    ref={searchInputRef}
                    value={searchText}
                />
            </View>
        );
    };


    render() {

        return (
            <SafeAreaView style={[styles.searchFilter]}>
                {this.renderControl()}
                {this.renderContent()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    searchFilter: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchFilterItemWrap: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: palette.color5,
        paddingRight: 20,
        paddingLeft: 20,
    },
    searchFilterItem: {
        backgroundColor: palette.color5,
        height: 40,
        alignSelf: 'stretch',
        color: palette.color2,
        flex: 1,
    },
    searchFilterIcon: {
        marginRight: 5
    },
    searchMenuList: {
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'stretch',
    }
});

export default SearchFilterScreen;