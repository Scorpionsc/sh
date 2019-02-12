import { connect } from 'react-redux';
import ProductFabricScreen from "../components/ProductFabricScreen";
import {bindActionCreators} from "redux";
import {addProduct} from "../../store/products/actions";

const mapStateToProps = () => ({});


const mapActionsToProps = (dispatch) => (
    {
        addProduct: bindActionCreators(addProduct, dispatch),
    }
);

export default connect(mapStateToProps, mapActionsToProps)(ProductFabricScreen);
