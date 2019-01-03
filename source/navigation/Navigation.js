import {createSwitchNavigator, createStackNavigator} from "react-navigation";
import HomeScreenContainer from '../screens/containers/HomeScreenContainer';
import SettingsScreen from "../screens/components/SettingsScreen";
import AuthLoadingScreenContainer from '../screens/containers/AuthLoadingScreenContainer';
import SettingsMainScreenContainer from "../screens/containers/SettingsMainScreenContainer";
import palette from "../palette";

const AppStack = createStackNavigator({
        Home: HomeScreenContainer,
        Settings: SettingsScreen,
        SettingsMain: SettingsMainScreenContainer,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: palette.color5,
            },
            headerTintColor: palette.color2,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreenContainer,
        App: AppStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);


export default AppNavigator;
