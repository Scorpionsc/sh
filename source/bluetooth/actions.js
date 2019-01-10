import {BleManager} from 'react-native-ble-plx';
import {AsyncStorage} from "react-native";
import base64 from 'react-native-base64'

export const BLUETOOTH_SCAN = 'BLUETOOTH_SCAN';
export const ADD_BLUETOOTH_DEVICE = 'ADD_BLUETOOTH_DEVICE';
export const SET_DEVICE_ID = 'SET_DEVICE_ID';
export const SET_BLE_MANAGER = 'SET_BLE_MANAGER';

export const findDevices = (state) => {
    return (dispatch, getState) => {
        if (state) {
            dispatch(bluetoothScan(state));

            const manager = getBleManager(getState(), dispatch);

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

export const setDeviceId = (deviceId) => {
    return (dispatch, getState) => {

        dispatch({
            type: SET_DEVICE_ID,
            payload: deviceId,
        });

        AsyncStorage.setItem(`@SHStore:deviceId`, deviceId);

        const device = connectToDevice(deviceId, getState(), dispatch);

    }
};


const connectToDevice = async (deviceId, state, dispatch) => {

    const bleManager = getBleManager(state, dispatch);

    let device = await bleManager.isDeviceConnected(deviceId)

    if (!device) {
        console.log(9999);

        device = await bleManager.connectToDevice(deviceId, {autoConnect: true}).catch((err) => {
            console.log(err);

        });
    }

    await device.discoverAllServicesAndCharacteristics()
        .then((device) => {
            return device.services();
        })
        .then((services) => {
            services.forEach(service => {
                service.characteristics().then((characteristics) => {
                    characteristics.forEach(characteristic => {
                        if (characteristic.isNotifiable) {
                            characteristic.monitor((err, characteristic) => {
                                console.log(800);
                                console.log(characteristic);
                                console.log(base64.decode(characteristic.value));
                                characteristic.read().then(characteristic => {
                                    console.log(134);
                                    console.log(characteristic);

                                    console.log(base64.decode(characteristic.value));

                                })
                            }, null);
                        }
                    })
                });
            });
        });


    // device2.services().then((arr)=>{
    //     arr[3].characteristics().then((arr2)=>{
    //
    //         console.log(1234);
    //         console.log(arr2);
    //
    //         arr2.((item, index) => {
    //

    //
    //         });
    //
    //     });
    // });

    return device;
};

const getBleManager = (state, dispatch) => {
    let bleManager;

    if (state.bluetooth.bleManager) {
        bleManager = state.bluetooth.bleManager;
    } else {
        bleManager = new BleManager();

        dispatch(setBleManager(bleManager));

    }

    return bleManager


};

const bluetoothScan = (state) => ({
    type: BLUETOOTH_SCAN,
    payload: state,
});

const addBluetoothDevice = (device) => ({
    type: ADD_BLUETOOTH_DEVICE,
    payload: device,
});

const setBleManager = (bleManager) => (
    {
        type: SET_BLE_MANAGER,
        payload: bleManager,
    }
);


const scanAndConnect = (manager, dispatch) => {
    manager.startDeviceScan(null, null, (error, device) => {

        if (error) {
            dispatch(bluetoothScan(false));
            manager.stopDeviceScan();

            return;
        }

        if (device.name) {
            dispatch(addBluetoothDevice(device));
        }

    });
};