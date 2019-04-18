import React from 'react';
import {
  StyleSheet, SectionList, SafeAreaView, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../../palette/index';
import MenuItem from '../../../share/menuItem/MenuItem';

class MenuScreen extends React.Component {
    static propTypes = {
      user: PropTypes.object.isRequired,
    };

    static navigationOptions = { header: null };


    onItemClick = (itemData) => {
      const { navigation } = this.props;

      navigation.navigate(itemData.route, { backButton: true });
    };

    renderTitle = ({ section: { title } }) => (
            <View style={[styles.menuTitleWrap]}>
                <Text style={[styles.menuTitle]}>{title}</Text>
            </View>
    );


    render() {
      const { menuSections } = this.state;

      return (
            <SafeAreaView style={[styles.menu]}>
                <SectionList style={[styles.menuList]} sections={menuSections}
                             renderItem={({ item, index }) => <MenuItem key={index} data={item} onClick={this.onItemClick}/>}
                             renderSectionHeader={this.renderTitle}
                             keyExtractor={(item, index) => item + index}/>
            </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    paddingTop: 20,
    alignItems: 'center',
  },
  menuList: {
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'stretch',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: palette.color2,
  },
  menuTitleWrap: {
    borderBottomWidth: 3,
    borderColor: palette.color5,
    paddingTop: 5,
    paddingBottom: 5,
  },

});

export default MenuScreen;
