import { combineReducers } from 'redux';
import userReducers from './user/reducers';
import productsReducers from './products/reducers';
import dishesReducers from './dishes/reducers';

export const rootReducer = combineReducers({
    userData: userReducers,
    productsData: productsReducers,
    dishesData: dishesReducers,
});
