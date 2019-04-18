import { connect } from 'react-redux';
import CalculatorScreen from '../components/CalculatorScreen';

const mapStateToProps = state => ({
  user: state.userData.user,
  dishes: state.dishesData.dishes,
  products: state.productsData.products,
});


const mapActionsToProps = dispatch => ({});

export default connect(mapStateToProps, mapActionsToProps)(CalculatorScreen);
