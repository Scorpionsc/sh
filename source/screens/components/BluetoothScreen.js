import React from "react";
import { View, Text, StyleSheet, FlatList, PermissionsAndroid } from "react-native";
import PropTypes from "prop-types";
import palette from "../../palette";
import MenuItem from "../../menuItem/MenuItem";


class BluetoothScreen extends React.Component {

    static propTypes = {
        deviceId: PropTypes.string,
        devices: PropTypes.array.isRequired,
        isConnected: PropTypes.bool.isRequired,
        isScanning: PropTypes.bool.isRequired,

        findDevices: PropTypes.func.isRequired,
        setDeviceId: PropTypes.func.isRequired,
    };

    static defaultProps = {
        deviceId: null,
    };

    static navigationOptions = { headerTitle: 'Bluetooth connection' };


    constructor(props){
        super(props);

        this.requestLocationPermission();
    }

    componentWillUnmount(){
        this.stopDeviceSearch();
    }


    keyExtractor = (item) => item.subTitle;

    onItemClick = (data)=>{
        const {setDeviceId} = this.props;

        setDeviceId(data.device.id);
    };

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                {
                    'title': 'Please Allow Permission',
                    'message': 'Without Location permission ' +
                    'Android bluetooth scan doesn\'t work'
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    };

    renderEmptyState = () => (
        <View style={[styles.bluetoothEmpty]}>
            <Text style={[styles.bluetoothEmptyText]}>No devices found</Text>
            <Text style={[styles.bluetoothEmptyText]}>Swipe down to refresh</Text>
        </View>
    );

    renderItem = ({item}) => {
        const { deviceId, isConnected } = this.props;

        return (<MenuItem data={item} active={item.device.id === deviceId} conected={isConnected} onClick={this.onItemClick}/>);
    };

    scanDevices = () => {
        const {findDevices} = this.props;

        findDevices(true);
    };

    stopDeviceSearch = () => {
        const {findDevices} = this.props;

        findDevices(false);
    };

    formatDevices = (devices) => devices.map( (device, index) => ({title: device.name, subTitle: device.id, device: device }) );


    render() {
        const {devices, isScanning} = this.props;

        return (
            <View style={[styles.bluetooth]}>
                <FlatList
                    style={[styles.bluetoothList]}
                    data={this.formatDevices(devices)}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmptyState}
                    refreshing={isScanning}
                    contentContainerStyle={{ flexGrow: 1, alignSelf: 'stretch' }}
                    onRefresh={this.scanDevices}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bluetooth: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bluetoothList: {
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'stretch',
    },
    bluetoothEmpty: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bluetoothEmptyText: {
        color: palette.color2,
        fontSize: 20,
    }
});

export default BluetoothScreen;