import {fetchUser} from "../user/actions";
import {fetchProducts} from "../products/actions";

export const fetchData = () => {
    return (dispatch) => {
        fetchUser(dispatch)
            .then(() => {
                fetchProducts(dispatch);
            });
    }
};