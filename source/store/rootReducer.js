import { combineReducers } from 'redux';
import userReducers from '../user/reducers'
import bluetoothReducers from '../bluetooth/reducers'

export const rootReducer = combineReducers({
    userData: userReducers,
    bluetooth: bluetoothReducers,
});
