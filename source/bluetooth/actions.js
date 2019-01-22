import {BleManager} from 'react-native-ble-plx';
import {AsyncStorage} from "react-native";
import base64 from 'react-native-base64'
import {setRawData} from "../rawData/actions";
import {updateLocalRawData} from "../rawData/actions";

export const BLUETOOTH_SCAN = 'BLUETOOTH_SCAN';
export const ADD_BLUETOOTH_DEVICE = 'ADD_BLUETOOTH_DEVICE';
export const SET_DEVICE_ID = 'SET_DEVICE_ID';
export const SET_BLE_MANAGER = 'SET_BLE_MANAGER';


export const fetchDeviceId = (dispatch) => {
    AsyncStorage.getItem(`@SHStore:deviceId`).then(deviceId => {
        if (deviceId) {
            dispatch(setDeviceId(deviceId));
        }
    });
};

export const findDevices = (state) => {
    return (dispatch, getState) => {
        if (state) {
            dispatch(bluetoothScan(state));
            const manager = getBleManager(getState, dispatch);
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

        connectToDevice(deviceId, getState, dispatch).then((device) => {
            device.onDisconnected((error, device) => {
                connectToDevice(device.id, getState, dispatch);
            });
        });

    }
};


const addBluetoothDevice = (device) => ({
    type: ADD_BLUETOOTH_DEVICE,
    payload: device,
});

const bluetoothScan = (state) => ({
    type: BLUETOOTH_SCAN,
    payload: state,
});

const connectToDevice = async (deviceId, getState, dispatch) => {

    const bleManager = getBleManager(getState, dispatch);

    let device = await bleManager.isDeviceConnected(deviceId);

    if (!device) {
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
                                const data = base64.decode(characteristic.value);

                                if (data.length > 5) {

                                    const dataArr = data.split(' ');

                                    if (dataArr.length === 3) {
                                        const state = getState();
                                        const rawData = convertRawData(dataArr.map(item => parseInt(item)), state);

                                        if (rawData) {

                                            updateLocalRawData(rawData).then(() => {
                                                dispatch(setRawData(rawData));
                                                if (state.rawData.ref) state.rawData.ref.update(rawData);
                                            });

                                        }

                                    }

                                }

                            }, null);

                        }

                    })

                });

            });

        });

    return device;
};

const convertRawData = (data, state) => {

    if (data[0] < 1000) return null;

    const now = Date.now();

    if (state.rawData.data) {
        const maxStateRawDate = Math.max.apply(null, Object.keys(state.rawData.data));

        console.log(888);
        console.log(maxStateRawDate);

        if (Math.abs(maxStateRawDate - now) < 10000) return null;

    }

    const nextData = {};

    nextData[now] = {
        raw: parseInt(data[0]),
        sensorBatteryLevel: parseInt(data[1]),
        thirdVal: parseInt(data[2]),
    };

    return nextData;

};

const getBleManager = (getState, dispatch) => {
    const state = getState();

    let bleManager = null;

    if (state.bluetooth.bleManager) {
        bleManager = state.bluetooth.bleManager;
    } else {
        bleManager = new BleManager({
            restoreStateIdentifier: 'bleBackgroundMode',
            restoreStateFunction: bleRestoredState => {
                console.log(bleRestoredState);
            }
        });
        dispatch(setBleManager(bleManager));
    }

    return bleManager
};

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

const setBleManager = (bleManager) => (
    {
        type: SET_BLE_MANAGER,
        payload: bleManager,
    }
);
