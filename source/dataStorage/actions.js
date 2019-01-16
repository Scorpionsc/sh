import {fetchDeviceId} from '../bluetooth/actions';
import {fetchUser} from "../user/actions";
import {fetchRawData} from "../rawData/actions";

export const fetchData = () => {
    return (dispatch, getState) => {
        fetchUser(dispatch)
            .then((user) => {
                if (user) {
                    fetchDeviceId(dispatch);
                    fetchRawData(dispatch, getState);
                }
            });
    }
};
