import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, TouchableOpacity
} from 'react-native';

import { createStackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "../mainScreen";
import DripConnectionScreen from "../dripConnectionScreen";

const stackNav = createStackNavigator({
    Main : {
        screen: MainScreen,
        navigationOptions: ({navigation}) => ({
            title: "Main",
            headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <IOSIcon name="ios-menu" size={50} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        })
    },
    DripConnection: {
        screen: DripConnectionScreen,
        navigationOptions: ({navigation}) => ({
            title: "Drip Connection",
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#f4511e'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        })
    }
});

export default stackNav;