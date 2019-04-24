import { SET_SPEED_REF, SET_SPEED } from './actions';

const initialState = {
  speed: {
    common: {
      insulin: {
        top: 30,
        total: 240,
        power: 170,
      },
      carbs: {
        top: 30,
        total: 240,
        power: 30,
      },
    },
  },
  speedRef: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPEED_REF:
      return { ...state, speedRef: action.payload };
    case SET_SPEED:
      return { ...state, speed: action.payload };
    default:
      return state;
  }
}