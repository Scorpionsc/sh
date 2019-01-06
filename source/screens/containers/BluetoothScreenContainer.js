import { connect } from 'react-redux';
import BluetoothScreen from "../components/BluetoothScreen";
import {findDevices, setDevice} from "../../bluetooth/actions";
import {bindActionCreators} from "redux";

const mapStateToProps = state => ({
    isScanning: state.bluetooth.isScanning,
    devices: state.bluetooth.devices,
});


const mapActionsToProps = (dispatch) => ({
    findDevices: bindActionCreators(findDevices, dispatch),
    setDevice: bindActionCreators(setDevice, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(BluetoothScreen);
