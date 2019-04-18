import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

export const SET_DISHES_REF = 'SET_DISHES_REF';
export const SET_DISHES = 'SET_DISHES';

const updateDishesBD = async (dishes, getState) => {
  const state = getState();
  const { dishesRef } = state.dishesData;

  return dishesRef.set(dishes);
};

const getUpdatedDishes = (dish, dishes) => {
  const dishKey = Object.keys(dish)[0];
  const result = dishes || {};

  result[dishKey] = dish[dishKey];

  return result;
};

const updateDishesLocal = async dishes => AsyncStorage.setItem('@SHStore:dishes', JSON.stringify(dishes));

const setDishes = dishes => ({
  type: SET_DISHES,
  payload: dishes,
});

const syncDishes = async (localDishes, dbDishes) => {
  if (!localDishes && !dbDishes) {
    return null;
  } if (!localDishes) {
    return {
      localChanged: true,
      dishes: dbDishes,
    };
  } if (!dbDishes) {
    return {
      dbChanged: true,
      dishes: localDishes,
    };
  }
  const localKeys = Object.keys(localDishes);
  const dbKeys = Object.keys(dbDishes);
  let isChanged = false;

  if (localKeys.length === dbKeys.length) {
    isChanged = !localKeys.every(localKey => dbDishes[localKey]
      && dbDishes[localKey].updatedAt === localDishes[localKey].updatedAt);
  } else {
    isChanged = true;
  }

  if (isChanged) {
    const newKeys = [...new Set(localKeys.concat(dbKeys))];
    const newDishes = newKeys.reduce((dishes, key) => {
      const result = dishes;
      if (localDishes[key] && dbDishes[key]) {
        if (dbDishes[key].updatedAt > localDishes[key].updatedAt) {
          result[key] = dbDishes[key];
        } else {
          result[key] = localDishes[key];
        }
      } else if (localDishes[key] && !dbDishes[key]) {
        result[key] = localDishes[key];
      } else {
        result[key] = dbDishes[key];
      }

      return dishes;
    }, {});

    return {
      dbChanged: true,
      localChanged: true,
      dishes: newDishes,
    };
  }
  return null;
};

const onDishesSnapshot = (dispatch, localDishes, dishesRef) => (snapshot) => {
  const dbDishes = snapshot.val();

  syncDishes(localDishes, dbDishes).then((data) => {
    if (data) {
      const { localChanged, dbChanged, dishes } = data;
      if (localChanged) {
        updateDishesLocal(dishes).then(() => {
          if (dbChanged) {
            dishesRef.update(dishes);
          }
          dispatch(setDishes(dishes));
        });
      } else if (dbChanged) {
        dishesRef.update(dishes);
      }
    }
  });
};

export const setDishesRef = dishesRef => ({
  type: SET_DISHES_REF,
  payload: dishesRef,
});

const fetchDBDishes = (dispatch, localDishes) => {
  const dishesRef = firebase.database().ref('dishes');

  dispatch(setDishesRef(dishesRef));

  dishesRef.on('value', onDishesSnapshot(dispatch, localDishes, dishesRef));
};

const fetchLocalDishes = async () => {
  const dishes = await AsyncStorage.getItem('@SHStore:dishes');
  return dishes ? JSON.parse(dishes) : dishes;
};

export const addDish = dish => (dispatch, getState) => {
  const state = getState();
  const { dishes } = state.dishesData;
  const updatedDishes = getUpdatedDishes(dish, dishes);

  updateDishesBD(updatedDishes, getState).then(() => {
    console.info('Dishes was added to database');
  });

  updateDishesLocal(updatedDishes).then(() => {
    console.info('Dishes was added to local database');
    dispatch(setDishes(dishes));
  });
};

export const removeDish = id => (dispatch, getState) => {
  const { dishes } = getState().dishesData;
  delete dishes[id];

  updateDishesLocal(dishes).then(() => {
    console.info('Dishes was deleted from local database');
    dispatch(setDishes(dishes));

    updateDishesBD(dishes, getState).then(() => {
      console.info('Dishes was deleted from database');
    });
  });
};

export const fetchDishes = (dispatch) => {
  fetchLocalDishes().then((localDishes) => {
    console.info('Local Dishes fetched');
    dispatch(setDishes(localDishes));
    fetchDBDishes(dispatch, localDishes);
  });
};
