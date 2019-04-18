import { SET_DISHES_REF, SET_DISHES } from './actions';

const initialState = {
  dishes: null,
  dishesRef: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DISHES_REF:
      return { ...state, dishesRef: action.payload };
    case SET_DISHES:
      return { ...state, dishes: action.payload };
    default:
      return state;
  }
};
