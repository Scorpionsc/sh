import firebase from "react-native-firebase";
import {AsyncStorage} from "react-native";

export const SET_PRODUCTS_REF = 'SET_PRODUCTS_REF';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const addProduct = (product) => (dispatch, getState) => {
    const state = getState();
    const {products} = state.productsData;
    const updatedProducts = getUpdatedProducts(product, products);

    updateProductsBD(updatedProducts, getState).then(() => {
        console.info('Products was added to database');
    });

    updateProductsLocal(updatedProducts).then(() => {
        console.info('Products was added to local database');
        dispatch(setProducts(products));
    });

};

export const fetchProducts = (dispatch) => {
    fetchLocalProducts().then((localProducts) => {
        console.info('Local Products fetched');
        dispatch(setProducts(localProducts));
        fetchDBProducts(dispatch, localProducts);
    });
};

export const removeProduct = (id) => (dispatch, getState) => {
    const { products } = getState().productsData;
    delete products[id];

    updateProductsLocal(products).then(() => {
        console.info('Products was deleted from local database');
        dispatch(setProducts(products));

        updateProductsBD(products, getState).then(() => {
            console.info('Products was deleted from database');
        });
    });

};

export const setProductsRef = (productsRef) => ({
    type: SET_PRODUCTS_REF,
    payload: productsRef,
});


const fetchDBProducts = (dispatch, localProducts) => {
    const productsRef = firebase.database().ref(`products`);

    dispatch(setProductsRef(productsRef));

    productsRef.on('value', onProductsSnapshot(dispatch, localProducts, productsRef));
};

const fetchLocalProducts = async () => {
    const products = await AsyncStorage.getItem(`@SHStore:products`);
    return products ? JSON.parse(products) : products;
};

const getUpdatedProducts = (product, products) => {
    const productKey = Object.keys(product)[0];
    if (!products) products = {};

    products[productKey] = product[productKey];

    return products;
};

const onProductsSnapshot = (dispatch, localProducts, productsRef) => snapshot => {
    const dbProducts = snapshot.val();

    syncProducts(localProducts, dbProducts).then((data) => {
        if (data) {
            const {localChanged, dbChanged, products} = data;
            if(localChanged){
                updateProductsLocal(products).then(()=>{
                    if(dbChanged){
                        productsRef.update(products);
                    }
                    dispatch(setProducts(products));
                })
            } else {
                if(dbChanged){
                    productsRef.update(products);
                }
            }

        }
    });


};

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

const syncProducts = async (localProducts, dbProducts) => {
    if (!localProducts && !dbProducts) {
        return null;
    } else if (!localProducts) {
        return {
            localChanged: true,
            products: dbProducts,
        }
    } else if (!dbProducts) {
        return {
            dbChanged: true,
            products: dbProducts,
        }
    } else {
        const localKeys = Object.keys(localProducts);
        const dbKeys = Object.keys(dbProducts);
        let isChanged = false;

        if (localKeys.length === dbKeys.length) {
            isChanged = !localKeys.every(localKey => {
                return dbProducts[localKey] && dbProducts[localKey].updatedAt === localProducts[localKey].updatedAt;
            })
        } else {
            isChanged = true;
        }

        if (isChanged) {
            const newKeys = [...new Set(localKeys.concat(dbKeys))];
            const newProducts = newKeys.reduce((products, key) => {
                if (!products) products = {};
                if (localProducts[key] && dbProducts[key]) {
                    if (dbProducts[key].updatedAt > localProducts[key].updatedAt) {
                        products[key] = dbProducts[key];
                    } else {
                        products[key] = localProducts[key];
                    }
                } else if (localProducts[key] && !dbProducts[key]) {
                    products[key] = localProducts[key];
                } else {
                    products[key] = localProducts[key];
                }

                return products;

            }, null);

            return {
                dbChanged: true,
                localChanged: true,
                products: newProducts,
            }
        } else {
            return null;
        }


    }
};

const updateProductsBD = async (products, getState) => {
    const state = getState();
    const {productsRef} = state.productsData;

    return await productsRef.set(products);
};

const updateProductsLocal = async (products) => {
    return await AsyncStorage.setItem(`@SHStore:products`, JSON.stringify(products));
};
