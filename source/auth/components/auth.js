import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import Styles from "./styles";

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

            <View>
                <Text>Auth</Text>
            </View>
        </View>);
    }
}


export default Auth;
