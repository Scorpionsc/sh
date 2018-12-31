import React from 'react';
import palette from '../../palette';

import {
    Text,
    StyleSheet,
    View,
} from 'react-native'

const offlineNotification = () => {
    return (
        <View style={[styles.notification]}>
            <Text style={[styles.notificationText]}>No internet connection</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    notification: {
        height: 40,
        backgroundColor: palette.color4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: palette.color1,
        fontSize: 20,
    }
});


export default offlineNotification;
