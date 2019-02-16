import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductsScreen from '../components/ProductsScreen';
import { removeProduct } from '../../store/products/actions';

const mapStateToProps = (state) => {
  const { products } = state.productsData;

  return ({
    menuItems: products ? Object.keys(products).map(key => ({
      ...state.productsData.products[key],
      id: key,
    })) : [],
  });
};


const mapActionsToProps = dispatch => ({
  deleteItem: bindActionCreators(removeProduct, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(ProductsScreen);
