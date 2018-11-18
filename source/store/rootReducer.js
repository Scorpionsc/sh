import { combineReducers } from 'redux';
// import settings from '../components/common/reducers'
import authReducers from '../auth/store/reducers'

export const rootReducer = combineReducers({
    // settings: settings,
    auth: authReducers
});
