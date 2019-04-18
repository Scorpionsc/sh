import { fetchUser } from '../user/actions';
import { fetchProducts } from '../../screens/products/store/actions';
import { fetchDishes } from '../../screens/dishes/store/actions';
import { fetchSpeed } from '../../screens/settings/store/actions';

export const fetchData = () => (dispatch) => {
  fetchUser(dispatch)
    .then(() => {
      fetchSpeed(dispatch);
      fetchProducts(dispatch);
      fetchDishes(dispatch);
    });
};
