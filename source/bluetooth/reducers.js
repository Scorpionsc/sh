import {BLUETOOTH_SCAN, ADD_BLUETOOTH_DEVICE, SET_DEVICE_ID, SET_BLE_MANAGER} from "./actions";

const initialState = {
    isScanning: false,
    devices: [],
    deviceId: null,
    bleManager: null,
    isConnected: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BLUETOOTH_DEVICE:
            const device = action.payload;

            return ( state.devices.find((item)=>item.id === device.id) === undefined )
                ? {...state, devices: [ ...state.devices, device] }
                : state;
        case BLUETOOTH_SCAN:
            return {...state, isScanning: action.payload };
        case SET_DEVICE_ID:
            return {...state, deviceId: action.payload };
        case SET_BLE_MANAGER:
            return {...state, bleManager: action.payload };
        default:
            return state;
    }
}