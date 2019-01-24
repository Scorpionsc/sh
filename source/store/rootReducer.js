import { combineReducers } from 'redux';
import userReducers from './user/reducers'

export const rootReducer = combineReducers({
    userData: userReducers,
});
