import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import palette from '../../palette/index';

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
  },
});

const offlineNotification = () => (
        <View style={[styles.notification]}>
            <Text style={[styles.notificationText]}>No internet connection</Text>
        </View>
);

export default offlineNotification;
