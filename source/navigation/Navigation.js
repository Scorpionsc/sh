import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import palette from '../palette';

import AuthLoadingScreenContainer from '../screens/auth/containers/AuthLoadingScreenContainer';
import CalculatorScreenContainer from '../screens/calculator/containers/CalculatorScreenContainer';
import HomeScreenContainer from '../screens/home/containers/HomeScreenContainer';
import FoodScreenContainer from '../screens/food/containers/FoodScreenContainer';
import MoreScreenContainer from '../screens/settings/containers/MoreScreenContainer';
import SettingsMainScreenContainer from '../screens/settings/containers/SettingsMainScreenContainer';
import ProductsScreenContainer from '../screens/products/containers/ProductsScreenContainer';
import DishesScreenContainer from '../screens/dishes/containers/DishesScreenContainer';
import MenusScreenContainer from '../screens/menu/containers/MenusScreenContainer';
import ProductFabricScreenContainer from '../screens/products/containers/ProductFabricScreenContainer';
import DishFabricScreenContainer from '../screens/dishes/containers/DishFabricScreenContainer';
import SettingsSpeedScreenContainer from '../screens/settings/containers/SettingsSpeedScreenContainer';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: palette.color5,
  },
  headerTintColor: palette.color2,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = Icon;

  let iconName;

  switch (routeName) {
    case 'Home':
      iconName = Platform.OS === 'ios' ? 'ios-home' : 'md-home';
      break;
    case 'Calculator':
      iconName = Platform.OS === 'ios' ? 'ios-calculator' : 'md-calculator';
      break;
    case 'Food':
      iconName = Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant';
      break;
    default:
      iconName = Platform.OS === 'ios' ? 'ios-more' : 'md-more';
      break;
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const hideTabBar = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeStack = createStackNavigator({
  Home: HomeScreenContainer,
},
{
  defaultNavigationOptions,
});
HomeStack.navigationOptions = hideTabBar;

const CalculatorStack = createStackNavigator({
  Calculator: CalculatorScreenContainer,
},
{
  defaultNavigationOptions,
});
CalculatorStack.navigationOptions = hideTabBar;

const FoodStack = createStackNavigator({
  Food: FoodScreenContainer,
  Products: ProductsScreenContainer,
  Dishes: DishesScreenContainer,
  Menus: MenusScreenContainer,
  ProductFabric: ProductFabricScreenContainer,
  DishFabric: DishFabricScreenContainer,
},
{
  defaultNavigationOptions,
});
FoodStack.navigationOptions = hideTabBar;

const MoreStack = createStackNavigator({
  More: MoreScreenContainer,
  SettingsMain: SettingsMainScreenContainer,
  SettingsSpeed: SettingsSpeedScreenContainer,
},
{
  defaultNavigationOptions,
});
MoreStack.navigationOptions = hideTabBar;


const BottomNavTabs = createBottomTabNavigator({
  Home: HomeStack,
  Calculator: CalculatorStack,
  Food: FoodStack,
  More: MoreStack,
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: palette.color4,
    inactiveTintColor: palette.color2,
    style: {
      backgroundColor: palette.color5,
    },
  },
});

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreenContainer,
    App: BottomNavTabs,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);


export default AppNavigator;
