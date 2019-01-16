import { combineReducers } from 'redux';
import userReducers from '../user/reducers'
import bluetoothReducers from '../bluetooth/reducers'
import rawDataReducers from '../rawData/reducers'

export const rootReducer = combineReducers({
    userData: userReducers,
    bluetooth: bluetoothReducers,
    rawData: rawDataReducers,
});
