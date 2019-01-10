import { connect } from 'react-redux';
import BluetoothScreen from "../components/BluetoothScreen";
import {findDevices, setDeviceId} from "../../bluetooth/actions";
import {bindActionCreators} from "redux";

const mapStateToProps = state => ({
    isScanning: state.bluetooth.isScanning,
    devices: state.bluetooth.devices,
    deviceId: state.bluetooth.deviceId,
    isConnected: state.bluetooth.isConnected,
});


const mapActionsToProps = (dispatch) => ({
    findDevices: bindActionCreators(findDevices, dispatch),
    setDeviceId: bindActionCreators(setDeviceId, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(BluetoothScreen);
