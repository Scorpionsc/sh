import {BLUETOOTH_SCAN, ADD_BLUETOOTH_DEVICE} from "./actions";

const initialState = {
    isScanning: false,
    devices: [],
    device: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BLUETOOTH_SCAN:
            return {...state, isScanning: action.payload };
        case ADD_BLUETOOTH_DEVICE:
            const device = action.payload;

            return ( state.devices.find((item)=>item.id === device.id) === undefined )
                ? {...state, devices: [ ...state.devices, device] }
                : state;
        default:
            return state;
    }
}