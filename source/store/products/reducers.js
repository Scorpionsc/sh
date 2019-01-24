import { SET_PRODUCTS_REF } from './actions';

const initialState = {
    products: null,
    productsRef: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS_REF:
            return {...state, productsRef: action.payload };
        default:
            return state;
    }
}