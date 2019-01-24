import firebase from "react-native-firebase";

export const SET_PRODUCTS_REF = 'SET_PRODUCTS_REF';

export const fetchProducts = (dispatch) => {
    fetchLocalProducts().then((localProducts)=>{

        fetchDBProducts(dispatch, localProducts).then();

    });
};

export const setProductsRef = (productsRef) => ({
    type: SET_PRODUCTS_REF,
    payload: productsRef,
});


const fetchLocalProducts = async () => {
    return null;
};

const fetchDBProducts = async (dispatch, localProducts) => {
    const productsRef = firebase.database().ref(`products`);

    dispatch(setProductsRef(productsRef));

    productsRef.on('value', onProductsSnapshot(dispatch, localProducts, productsRef));
};

const onProductsSnapshot = (dispatch, localProducts, productsRef) => snapshot => {
    const dbProducts = snapshot.val();

    console.log(888);

    console.log(dbProducts);


};
