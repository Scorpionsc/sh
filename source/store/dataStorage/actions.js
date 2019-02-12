import {fetchUser} from "../user/actions";
import {fetchProducts} from "../products/actions";
import {fetchDishes} from "../dishes/actions";

export const fetchData = () => {
    return (dispatch) => {
        fetchUser(dispatch)
            .then(() => {
                fetchProducts(dispatch);
                fetchDishes(dispatch);
            });
    }
};