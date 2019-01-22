import {fetchUser} from "../user/actions";

export const fetchData = () => {
    return (dispatch) => {
        fetchUser(dispatch)
            .then((user) => {
                if (user) {

                }
            });
    }
};