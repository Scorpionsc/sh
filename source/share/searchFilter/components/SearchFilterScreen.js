import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import MenuItem from '../../menuItem/MenuItem';
import SearchControl from '../../searchControl/SearchControl';

const styles = StyleSheet.create({
  searchFilter: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchMenuList: {
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
  },
});

class SearchFilterScreen extends React.Component {
  static propTypes = {
    menuItems: PropTypes.array,

    deleteItem: PropTypes.func,
  };

  static defaultProps = {
    menuItems: [],

    deleteItem: () => {
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      filteredItems: SearchFilterScreen.getFilteredItems(prevState.searchText, nextProps.menuItems),
    };
  }

  static getFilteredItems = (text, items) => items
    .filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0)
    .map(item => ({
      id: item.id,
      title: item.name,
    })).sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });


  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filteredItems: [],
    };
  }


  onDelete = (id) => {
    const { deleteItem } = this.props;
    deleteItem(id);
  };

  onItemClick = () => {
  };

  onSearchTextChange = (text) => {
    const { menuItems } = this.props;
    this.setState({
      searchText: text,
      filteredItems: SearchFilterScreen.getFilteredItems(text, menuItems),
    });
  };

  renderMenuItem = ({ item, index }) => (
    <MenuItem
      key={index}
      data={item}
      deleteMode={true}
      onClick={this.onItemClick}
      onDelete={this.onDelete}/>
  );

  renderContent = () => {
    const { filteredItems } = this.state;

    return (
      <FlatList style={[styles.searchMenuList]}
                data={filteredItems}
                renderItem={this.renderMenuItem}
                keyExtractor={item => item.id}/>
    );
  };

  renderControl = () => {
    const { searchText } = this.state;

    return (
      <SearchControl
        searchText={searchText}
        onChangeText={this.onSearchTextChange} />
    );
  };


  render() {
    return (
      <SafeAreaView style={[styles.searchFilter]}>
        {this.renderContent()}
        {this.renderControl()}
      </SafeAreaView>
    );
  }
}

export default SearchFilterScreen;
