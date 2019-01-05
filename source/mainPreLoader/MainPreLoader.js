import React from 'react';
import palette from '../palette/index';

import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'

const MainPreLoader = () => {
    return (
        <View style={[styles.container]}>
            <ActivityIndicator
                size="large"
                color={palette.color4}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default MainPreLoader;
