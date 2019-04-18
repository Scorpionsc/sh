import React from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import palette from '../../palette/index';
import SearchControl from '../searchControl/SearchControl';
import MenuItem from '../menuItem/MenuItem';

const styles = StyleSheet.create({
  itemsSelector: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
  },
  itemsSelectorHeader: {
    backgroundColor: palette.color3,
    borderBottomWidth: 1,
    borderBottomColor: palette.color2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemsSelectorList: {
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
  },
});

class ItemsSelector extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape),
    noHeader: PropTypes.bool,
    selectedIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    onClose: PropTypes.func,
    onItemSelect: PropTypes.func,
    onItemUnSelect: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    selectedIds: [],
    noHeader: false,
  };

  state = {
    searchText: '',
  };

  onSearchTextChange = (text) => {
    this.setState({
      searchText: text,
    });
  };

  onItemClick = active => (data) => {
    const { onItemSelect, onItemUnSelect } = this.props;
    if (active) {
      onItemUnSelect(data);
    } else {
      onItemSelect(data);
    }
  };

  close = () => {
    const { onClose } = this.props;

    onClose();
  };

  notSelectedItems = (items) => {
    const { searchText } = this.state;

    const notSelectedItems = items.filter((item) => {
      const { selectedIds } = this.props;
      return selectedIds.findIndex(id => id === item.id) < 0;
    });

    return notSelectedItems
      .filter(item => item.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
  };

  selectedItems = items => items.filter((item) => {
    const { selectedIds } = this.props;
    return selectedIds.findIndex(id => id === item.id) >= 0;
  });

  renderControl = () => {
    const { searchText } = this.state;

    return (
      <SearchControl
        searchText={searchText}
        onChangeText={this.onSearchTextChange}/>
    );
  };

  renderHeader = () => {
    const { noHeader } = this.props;

    return noHeader
      ? null
      : (<View style={styles.itemsSelectorHeader}>
      <TouchableWithoutFeedback onPress={this.close}>
        <View>
          <Icon
            name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
            color={palette.color2}
            size={35}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>);
  };

  renderList = (items, active = false) => (
    <FlatList data={items}
              scrollEnabled={false}
              renderItem={this.renderListItem(active)}
              keyExtractor={item => item.id}/>
  );

  renderListItem = active => item => (
    <MenuItem data={item.item} onClick={this.onItemClick(active)} active={active}/>
  );

  renderSelectedItems = () => (null);


  render() {
    const { items } = this.props;

    return (
      <SafeAreaView style={styles.itemsSelector}>

        {this.renderHeader()}

        {this.renderSelectedItems()}

        <ScrollView style={[styles.itemsSelectorList]}>
          {this.renderList(this.selectedItems(items), true)}
          {this.renderList(this.notSelectedItems(items))}
        </ScrollView>

        {this.renderControl()}

      </SafeAreaView>
    );
  }
}

export default ItemsSelector;
