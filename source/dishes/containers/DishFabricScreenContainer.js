import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DishFabricScreen from '../components/DishFabricScreen';
import { addDish } from '../../store/dishes/actions';

const objectsToArray = items => (items ? Object.keys(items).map(key => ({
  ...items[key],
  id: key,
})) : []);

const mapStateToProps = (state) => {
  const { products } = state.productsData;
  const { dishes } = state.dishesData;

  return {
    products: objectsToArray(products),
    dishes: objectsToArray(dishes),
  };
};

const mapActionsToProps = dispatch => (
  {
    addDish: bindActionCreators(addDish, dispatch),
  }
);

export default connect(mapStateToProps, mapActionsToProps)(DishFabricScreen);
