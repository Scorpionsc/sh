import {Dimensions} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import AuthContainer from '../../auth/containers/authContainer'

import SideMenu from '../sideMenu'
import stackNav from '../stackNav';

class DrawerNav extends React.Component{

    render (){
        const Layout =  createDrawerNavigator(
            {
                Auth: {
                    screen: AuthContainer,
                },
                Home: {
                    screen: stackNav,
                }
            },
            {
                initialRouteName: 'Auth',
                contentComponent: SideMenu,
                drawerWidth: Dimensions.get('window').width - 120,
            }
        );

        return <Layout />;
    }
}

// const DrawerNav = ;

export default DrawerNav;

