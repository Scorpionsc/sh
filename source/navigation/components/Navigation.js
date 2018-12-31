import React from 'react';
import PropTypes from 'prop-types';
import palette from '../../palette';
import { StyleSheet } from 'react-native'

class Navigation extends React.Component {
    static propTypes = {
        authorized: PropTypes.bool.isRequired,
    };

    render() {


        return (<View style={[styles.container]}>
           Sis
        </View>);

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
