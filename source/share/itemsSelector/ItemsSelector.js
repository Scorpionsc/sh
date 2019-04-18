import React, { Component } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette/index';
import MenuItem from '../menuItem/MenuItem';

const styles = StyleSheet.create({
  itemsSelector: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: palette.color3,
  },
  itemsSelectorList: {
    alignSelf: 'stretch',
  },
});

class ItemsSelector extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape),
    searchText: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),

    onClose: PropTypes.func,
    onItemSelect: PropTypes.func,
  };

  static defaultProps = {
    items: [],
    selectedIds: [],
    searchText: '',
  };

  onItemClick = (data) => {
    const { onItemSelect } = this.props;

    onItemSelect(data);
  };

  notSelectedItems = (items) => {
    const { searchText } = this.props;

    const notSelectedItems = items.filter((item) => {
      const { selectedIds } = this.props;
      return selectedIds.findIndex(id => id === item.id) < 0;
    });

    return notSelectedItems
      .filter(item => item.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
  };

  renderList = () => {
    const { items } = this.props;

    return (
      <FlatList data={this.notSelectedItems(items)}
                scrollEnabled={false}
                renderItem={this.renderListItem}
                keyExtractor={item => item.id}/>
    );
  };

  renderListItem = item => (
    <MenuItem data={item.item} onClick={this.onItemClick}/>
  );

  render() {
    return (
      <View style={styles.itemsSelector}>
        {this.renderList()}
      </View>
    );
  }
}

export default ItemsSelector;
