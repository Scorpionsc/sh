import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

class HomeScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    };


    constructor(props){
        super(props);

        this.checkPatient();
    }


    checkPatient = () => {
        const {user} = this.props;

        if( user.patient === null ) this.props.navigation.navigate('SettingsMain', {
            itemId: 'settingsMainProps',
            backButton: false });
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}

export default HomeScreen;