
import MLab from 'mlab-data-api';
import { AsyncStorage } from 'react-native';

export const SET_TREATMENTS_LIST = 'SET_TREATMENTS_LIST';
export const SET_BG = 'SET_BG';
export const SET_TREATMENTS_REFRESH = 'SET_TREATMENTS_REFRESH';

const mLabConfig = {
  key: 'gXZMIsbVdFiWH9C5cHgK-9OjeqskWcAd',
  database: 'x-drip',
};
const mLab = MLab(mLabConfig);

const fetchLocalTreatments = async () => {
  const treatments = await AsyncStorage.getItem('@SHStore:treatments');
  return treatments ? JSON.parse(treatments) : treatments;
};

const setBG = bg => ({
  type: SET_BG,
  payload: bg,
});

const setTreatmentsList = treatments => ({
  type: SET_TREATMENTS_LIST,
  payload: treatments,
});

const setTreatmentsRefresh = refreshState => ({
  type: SET_TREATMENTS_REFRESH,
  payload: refreshState,
});

const updateTreatmentsLocal = async treatments => AsyncStorage.setItem('@SHStore:treatments', JSON.stringify(treatments));

const fetchDBTreatments = (dispatch) => {
  const timeInMs = Date.now() - 14400000;
  const collectionConfig = {
    collection: 'treatments',
    query: { timestamp: { $gt: timeInMs } },
  };

  mLab.listDocuments(collectionConfig)
    .then((response) => {
      updateTreatmentsLocal(response.data).then(() => {
        console.info('Local Treatments set');
      });
      dispatch(setTreatmentsList(response.data));
      console.info('DataBase Treatments fetched');
    })
    .catch((error) => {
      console.error('error', error);
    });
};

export const fetchTreatments = (dispatch) => {
  fetchLocalTreatments().then((localTreatments) => {
    console.info('Local Treatments fetched');
    if (localTreatments) {
      dispatch(setTreatmentsRefresh(false));
      dispatch(setTreatmentsList(localTreatments));
    }
    fetchDBTreatments(dispatch);
  });
};

export const fetchBG = (dispatch) => {
  const timeInMs = Date.now() - 600000;
  const collectionConfig = {
    collection: 'entries',
    query: { date: { $gt: timeInMs }, delta: { $exists: true } },
  };

  mLab.listDocuments(collectionConfig)
    .then((response) => {
      const bgCount = response.data.length;
      dispatch(setTreatmentsRefresh(false));

      if (bgCount > 0) {
        console.info('DataBase BG fetched');
        const bg = response.data[bgCount - 1];
        const { date, sgv } = bg;

        dispatch(setBG({ date, sgv }));
      }
    })
    .catch((error) => {
      console.error('error', error);
    });
};

export const refreshTreatments = () => (dispatch) => {
  dispatch(setTreatmentsRefresh(true));
  fetchBG(dispatch);
  fetchTreatments(dispatch);
};
