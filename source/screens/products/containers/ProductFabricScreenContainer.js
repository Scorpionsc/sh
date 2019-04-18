import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductFabricScreen from '../components/ProductFabricScreen';
import { addProduct } from '../store/actions';

const mapStateToProps = () => ({});


const mapActionsToProps = dispatch => (
  {
    addProduct: bindActionCreators(addProduct, dispatch),
  }
);

export default connect(mapStateToProps, mapActionsToProps)(ProductFabricScreen);
