import { fetchUser } from '../user/actions';
import { fetchProducts } from '../../screens/products/store/actions';
import { fetchDishes } from '../../screens/dishes/store/actions';
import { fetchSpeed } from '../../screens/settings/store/actions';
import { fetchBG, fetchTreatments } from '../treatments/actions';

export const fetchData = () => (dispatch) => {
  fetchUser(dispatch)
    .then(() => {
      fetchTreatments(dispatch);
      fetchProducts(dispatch);
      fetchDishes(dispatch);
      fetchBG(dispatch);
      fetchSpeed(dispatch);
    });
};
