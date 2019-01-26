import { combineReducers } from 'redux';
import userReducers from './user/reducers';
import productsReducers from './products/reducers';

export const rootReducer = combineReducers({
    userData: userReducers,
    productsData: productsReducers,
});
