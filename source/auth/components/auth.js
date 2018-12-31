import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import Styles from "./styles";
import palette from "../../palette";
import { GoogleSigninButton } from 'react-native-google-signin';

class Auth extends React.Component {

    constructor(props){
        super(props);

        this.createStyles();
    }

    createStyles(){

        this.state = {
            styles: StyleSheet.create(Styles)
        };

    }

    render (){
        const { styles } = this.state;

        return (<View style={styles.container}>
            <StatusBar
                backgroundColor={'#000'}
                translucent
            />

            <GoogleSigninButton
                style={{ width: 48, height: 48 }}
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
                disabled={this.state.isSigninInProgress} />

        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Auth;
