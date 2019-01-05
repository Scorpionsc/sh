import {createSwitchNavigator, createStackNavigator, createBottomTabNavigator} from "react-navigation";
import {Platform} from "react-native";
import palette from "../palette";
import Icon from "react-native-vector-icons/Ionicons";
import React from 'react';

import AuthLoadingScreenContainer from '../screens/containers/AuthLoadingScreenContainer';
import CalculatorScreenContainer from "../screens/containers/CalculatorScreenContainer";
import HomeScreenContainer from '../screens/containers/HomeScreenContainer';
import FoodScreenContainer from "../screens/containers/FoodScreenContainer";
import SettingsMainScreenContainer from "../screens/containers/SettingsMainScreenContainer";

import MoreScreen from "../screens/components/MoreScreen";
import SettingsScreen from "../screens/components/SettingsScreen";

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

    switch(routeName){
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
            break

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
    },
);
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
    },
    {
        defaultNavigationOptions,
    });
FoodStack.navigationOptions = hideTabBar;

const MoreStack = createStackNavigator({
        More: MoreScreen,
        Settings: SettingsScreen,
        SettingsMain: SettingsMainScreenContainer,
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
            tabBarIcon: ({ focused, horizontal, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: palette.color4,
            inactiveTintColor: palette.color2,
            style: {
                backgroundColor: palette.color5
            }
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
