import { combineReducers } from 'redux';
import userReducers from '../user/store/reducers'

export const rootReducer = combineReducers({
    userData: userReducers,
});
