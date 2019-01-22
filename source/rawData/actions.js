import {AsyncStorage} from "react-native";
import firebase from "react-native-firebase";

export const SET_RAW_DATA = 'SET_RAW_DATA';
export const SET_RAW_DATA_REF = 'SET_RAW_DATA_REF';

export const setRawData = (rawDataItem) => {
    return {
        type: SET_RAW_DATA,
        payload: rawDataItem
    }
};

export const setRawDataRef = (rawDataRef) => {
    return {
        type: SET_RAW_DATA_REF,
        payload: rawDataRef
    }
};

export const updateLocalRawData = async (newDataItem) => {

    return AsyncStorage.getItem(`@SHStore:rawData`).then((rawDataString) => {
        let newData = {...newDataItem};
        if (rawDataString) newData = {...JSON.parse(rawDataString),...newData};

        return AsyncStorage.setItem(`@SHStore:rawData`, JSON.stringify(newData)).then(() => newData);

    });

};


export const fetchRawData = (dispatch, getState, month, user) => {

    AsyncStorage.getItem(`@SHStore:${user}.${month}`).then(rawDataString => {
        const rawData = rawDataString
            ? JSON.parse(rawDataString)
            : null;

        dispatch(setRawData(rawData));

        subscribeDBRawData(dispatch, getState, month);
    });


};

const subscribeDBRawData = (dispatch, getState, month, user) => {

    const state = getState();
    const userId = state.userData.user.uid;

    const rawDataRef = firebase.database().ref(`rawData/${userId}`);

    dispatch(setRawDataRef(rawDataRef));

    rawDataRef.on('value', (snapshot) => {
        const dbRawData = snapshot.val();
        const localRawData = getState().rawData.data;

        if( !localRawData && dbRawData ){
            AsyncStorage.setItem(`@SHStore:rawData`, JSON.stringify(dbRawData)).then(()=>{
                dispatch(setRawData(dbRawData));
            });
        } else if(localRawData && !dbRawData ) {
            rawDataRef.set(localRawData);
        } else if (localRawData && dbRawData){
            syncRawData(localRawData, dbRawData).then((data)=>{
                if(data){
                    if( data.hasDbChanges ){
                        rawDataRef.set(data.newRawData);
                    } else if(data.hasLocalChanges) {
                        AsyncStorage.setItem(`@SHStore:rawData`, JSON.stringify(data.newRawData)).then(()=>{
                            dispatch(setRawData(data.newRawData));
                        });
                    }
                }
            });
        }
    });
};

const syncRawData = async(localRawData, dbRawData) => {
    try {
        const localKeys = Object.keys(localRawData);
        const dbKeys = Object.keys(dbRawData);
        const allKeys = [...new Set(dbKeys.concat(localKeys))].sort((a,b)=>(a-b));
        const hasLocalChanges = localKeys.length !== allKeys.length;
        const hasDbChanges = dbKeys.length !== allKeys.length;

        if(hasLocalChanges || hasDbChanges){
            return {
                newRawData: allKeys.reduce((newRawData, currentValue)=>{
                    if (!newRawData) newRawData = {};
                    newRawData[currentValue] = localRawData[currentValue] ? localRawData[currentValue] : dbRawData[currentValue];
                    return newRawData;
                },null),
                hasLocalChanges,
                hasDbChanges,
            }
        }
        return null;
    }
    catch (error) {
        console.error(error);
        return null;
    }

};
