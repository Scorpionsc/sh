import { combineReducers } from 'redux';
import userReducers from './user/reducers';
import productsReducers from '../screens/products/store/reducers';
import dishesReducers from '../screens/dishes/store/reducers';
import speedReducers from '../screens/settings/store/reducers';
import treatmentsReducer from './treatments/reducers';

export const rootReducer = combineReducers({
  userData: userReducers,
  productsData: productsReducers,
  treatments: treatmentsReducer,
  dishesData: dishesReducers,
  speedData: speedReducers,
});
