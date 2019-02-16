import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import palette from '../../palette';

class MenusScreen extends React.Component {
    static propTypes = {
      menuItems: PropTypes.object,
    };

    static defaultProps = {
      menuItems: null,
    };

    static navigationOptions = {
      title: 'Menus',
      tabBarVisible: false,
    };

    render() {
      return (
            <SafeAreaView style={[styles.menus]}>
            </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  menus: {
    flex: 1,
    backgroundColor: palette.color3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default MenusScreen;
