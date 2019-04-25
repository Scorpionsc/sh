import {
  SET_BG,
  SET_TREATMENTS_LIST,
  SET_TREATMENTS_REFRESH,
  SET_TREATMENTS_TO_ADD,
} from './actions';

const initialState = {
  data: null,
  toDell: null,
  toAdd: [],
  bg: null,
  isRefresh: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BG:
      return { ...state, bg: action.payload };
    case SET_TREATMENTS_LIST:
      return { ...state, data: action.payload };
    case SET_TREATMENTS_TO_ADD:
      return { ...state, toAdd: action.payload };
    case SET_TREATMENTS_REFRESH:
      return { ...state, isRefresh: action.payload };
    default:
      return state;
  }
};
