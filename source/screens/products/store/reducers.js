import { SET_PRODUCTS_REF, SET_PRODUCTS } from './actions';

const initialState = {
  products: null,
  productsRef: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_REF:
      return { ...state, productsRef: action.payload };
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
