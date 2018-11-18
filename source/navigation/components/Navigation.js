import React, {Component} from 'react';
import PropTypes from 'prop-types';
import palette from '../../palette';
import firebase from 'react-native-firebase';

import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'

class Navigation extends Component {
    static propTypes = {
        authorized: PropTypes.bool.isRequired,
    };

    constructor() {
        super();

        this.state = {
            isLoading: true,
        };



    }

    componentDidMount(){
        console.log(300);
    }

    render() {

        const { isLoading } = this.state;

        if(isLoading){
            return <View style={[styles.preLoader]}>
                <ActivityIndicator
                    size="large"
                    color={palette.color4} />
            </View>;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    preLoader: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Navigation;
