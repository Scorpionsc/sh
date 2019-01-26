import firebase from "react-native-firebase";
import {AsyncStorage} from "react-native";

export const SET_PRODUCTS_REF = 'SET_PRODUCTS_REF';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = (dispatch) => {
    fetchLocalProducts().then((localProducts) => {
        console.info( 'Local Products fetched' );
        fetchDBProducts(dispatch, localProducts);
    });
};

export const setProductsRef = (productsRef) => ({
    type: SET_PRODUCTS_REF,
    payload: productsRef,
});

export const addProduct = (product) => (dispatch, getState) => {
    const state = getState();
    const { products } = state.productsData;
    const updatedProducts = getUpdatedProducts(product, products);

    addProductToBD(updatedProducts, getState).then(()=>{
        console.info( 'Products was added to databases' );
    });

    addProductToLocal(updatedProducts).then(() => {
        console.info( 'Products was added to local databases' );
        dispatch(setProducts(products));
    });

};

const getUpdatedProducts = (product, products) => {
    const productKey = Object.keys(product)[0];
    if(!products) products = {};

    products[productKey] = product[productKey];

    return products;
};

const addProductToLocal = async(products) => {
    return await AsyncStorage.setItem(`@SHStore:products`, JSON.stringify(products));
};

const addProductToBD = async(products, getState) => {
    const state = getState();
    const {productsRef} = state.productsData;

    return await productsRef.update(products);
};

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

const fetchLocalProducts = async () => {
    return null;
};

const fetchDBProducts = (dispatch, localProducts) => {
    const productsRef = firebase.database().ref(`products`);

    dispatch(setProductsRef(productsRef));

    productsRef.on('value', onProductsSnapshot(dispatch, localProducts, productsRef));
};

const onProductsSnapshot = (dispatch, localProducts, productsRef) => snapshot => {
    const dbProducts = snapshot.val();

    console.log(localProducts);

    console.log(dbProducts);


};
