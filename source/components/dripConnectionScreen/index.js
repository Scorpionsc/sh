import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import Styles from "./styles";

class DripConnectionScreen extends React.Component {

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
            />
            <View>
                <Text>DripConnectionStatus</Text>
            </View>
        </View>);
    }
}

const putStateToProps = state => ({
    theme: state.settings.theme
});

export default connect(putStateToProps)(DripConnectionScreen);
