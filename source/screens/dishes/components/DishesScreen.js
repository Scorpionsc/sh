import React from 'react';
import SearchFilterScreen from '../../../share/searchFilter/components/SearchFilterScreen';
import RoundButton from '../../../share/roundButton/RoundButton';

class DishesScreen extends SearchFilterScreen {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Dishes',
      tabBarVisible: false,
      headerRight: (<RoundButton androidName="md-add" iosName="ios-add" onPress={() => params.handleHeaderButton()}/>),
    };
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ handleHeaderButton: () => this.addDish() });
  }


  addDish = () => {
    const { navigation } = this.props;
    navigation.navigate('DishFabric', {
      mode: 'add',
    });
  };

  onItemClick = (data) => {
    const { navigation, menuItems } = this.props;
    const dish = { ...menuItems.find(item => item.id === data.id) };
    delete dish.id;

    navigation.navigate('DishFabric', {
      mode: 'view',
      dish,
      dishId: data.id,
    });
  };
}

export default DishesScreen;
