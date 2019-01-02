import {createStackNavigator} from "react-navigation";
import HomeScreen from '../../screens/components/HomeScreen';
import SettingsScreen from "../../screens/components/SettingsScreen";

const AppNavigator = createStackNavigator({
        Home: {
            screen: HomeScreen,
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        initialRouteName: 'Home',
    }
);


export default AppNavigator;
