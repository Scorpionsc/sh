import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

export const SET_SPEED_REF = 'SET_SPEED_REF';
export const SET_SPEED = 'SET_SPEED';

const fetchLocalSpeed = async () => {
  const speed = await AsyncStorage.getItem('@SHStore:speed');
  return speed ? JSON.parse(speed) : speed;
};

const setSpeed = speed => ({
  type: SET_SPEED,
  payload: speed,
});
const setSpeedRef = speedRef => ({
  type: SET_SPEED_REF,
  payload: speedRef,
});

const syncSpeed = async (localSpeed, dbSpeed) => {
  if (!localSpeed && !dbSpeed) {
    return null;
  } if (!localSpeed) {
    return {
      localChanged: true,
      products: dbSpeed,
    };
  } if (!dbSpeed) {
    return {
      dbChanged: true,
      products: localSpeed,
    };
  }

  const localKeys = Object.keys(localSpeed);
  const dbKeys = Object.keys(dbSpeed);
  let isChanged = false;

  if (localKeys.length === dbKeys.length) {
    isChanged = !localKeys.every(localKey => dbSpeed[localKey]
      && (dbSpeed[localKey].updatedAt === localSpeed[localKey].updatedAt));
  } else {
    isChanged = true;
  }

  if (isChanged) {
    const newKeys = [...new Set(localKeys.concat(dbKeys))];
    const newSpeed = newKeys.reduce((speed, key) => {
      const result = speed;

      if (localSpeed[key] && dbSpeed[key]) {
        if (dbSpeed[key].updatedAt > localSpeed[key].updatedAt) {
          result[key] = dbSpeed[key];
        } else {
          result[key] = localSpeed[key];
        }
      } else if (localSpeed[key] && !dbSpeed[key]) {
        result[key] = localSpeed[key];
      } else {
        result[key] = dbSpeed[key];
      }

      return result;
    }, {});

    return {
      dbChanged: true,
      localChanged: true,
      products: newSpeed,
    };
  }
  return null;
};

const updateSpeedLocal = async speed => AsyncStorage.setItem('@SHStore:speed', JSON.stringify(speed));

const onSpeedSnapshot = (dispatch, localSpeed, speedRef) => (snapshot) => {
  const dbSpeed = snapshot.val();

  syncSpeed(localSpeed, dbSpeed).then((data) => {
    if (data) {
      const { localChanged, dbChanged, speed } = data;
      if (localChanged) {
        updateSpeedLocal(speed).then(() => {
          if (dbChanged) {
            speedRef.update(speed);
          }
          dispatch(setSpeed(speed));
        });
      } else if (dbChanged) {
        speedRef.update(speed);
      }
    }
  });
};

const fetchDBSpeed = (dispatch, localSpeed) => {
  const speedRef = firebase.database().ref('speed');

  dispatch(setSpeedRef(speedRef));

  speedRef.on('value', onSpeedSnapshot(dispatch, localSpeed, speedRef));
};

const updateSpeedBD = async (speed, getState) => {
  const state = getState();
  const { speedRef } = state.speedData;

  return speedRef.set(speed);
};

export const fetchSpeed = (dispatch) => {
  fetchLocalSpeed().then((localSpeed) => {
    console.info('Local Speed fetched');
    if (localSpeed) dispatch(setSpeed(localSpeed));
    fetchDBSpeed(dispatch, localSpeed);
  });
};

export const updateSpeed = speed => (dispatch, getState) => {
  updateSpeedLocal(speed).then(() => {
    dispatch(setSpeed(speed));
    updateSpeedBD(speed, getState).then();
  });
};
