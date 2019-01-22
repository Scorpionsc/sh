import {fetchDeviceId} from '../bluetooth/actions';
import {fetchUser} from "../user/actions";
import {fetchRawData} from "../rawData/actions";

export const fetchData = () => {
    return (dispatch, getState) => {
        fetchUser(dispatch)
            .then((user) => {
                if (user) {
                    fetchDeviceId(dispatch);
                    fetchLastTwoDays(dispatch, getState, user);
                }
            });
    }
};

const getMonthMinus1 = (monthKey) => {
    const arr = monthKey.split('.');

    arr[1] = parseInt(arr[1]) - 1;

    if(!arr[1]){
        arr[0] = parseInt(arr[0]) - 1;
        arr[1] = 12;
    }

    return arr.join('.');
};

const fetchLastTwoDays = (dispatch, getState, user) => {
    const today = new Date();
    const day = today.getUTCDate();

    const monthsKeys = [
        `${today.getUTCFullYear()}.${today.getUTCMonth()+1}`,
    ];
    if(day === 1) {
        monthsKeys.push(getMonthMinus1(`${today.getUTCFullYear()}.${today.getUTCMonth()+1}`));
    }

    monthsKeys.forEach(month => fetchRawData(dispatch, getState, month, user));

};
