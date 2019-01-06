import { BleManager } from 'react-native-ble-plx';

export const BLUETOOTH_SCAN = 'BLUETOOTH_SCAN';
export const ADD_BLUETOOTH_DEVICE = 'ADD_BLUETOOTH_DEVICE';
export const SET_DEVICE = 'SET_DEVICE';

export const findDevices = (state) => {
    return dispatch  => {
        if( state ){
            dispatch(bluetoothScan(state));

            const manager = new BleManager();

            const subscription = manager.onStateChange((state) => {

                if (state === 'PoweredOn') {
                    scanAndConnect(manager, dispatch);
                    setTimeout(function () {
                        dispatch(bluetoothScan(false));
                        manager.stopDeviceScan();
                    }, 5000);
                    subscription.remove();
                }
            }, true);
        } else {
            dispatch(bluetoothScan(state));
        }
    }
};

export const setDevice = (device) => {
    return dispatch  => {

        dispatch({
            type: SET_DEVICE,
            payload: device,
        });

    }
};

const bluetoothScan = (state) => ({
    type: BLUETOOTH_SCAN,
    payload: state,
});

const addBluetoothDevice = (device) => ({
    type: ADD_BLUETOOTH_DEVICE,
    payload: device,
});


const scanAndConnect = (manager, dispatch) => {
    manager.startDeviceScan(null, null, (error, device) => {

        if (error) {
            dispatch(bluetoothScan(false));
            manager.stopDeviceScan();

            return;
        }

        if(device.name){
            dispatch(addBluetoothDevice(device));
        }

    });
};