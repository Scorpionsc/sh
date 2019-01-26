import { connect } from 'react-redux';
import ProductFabricScreen from "../components/ProductFabricScreen";
import {bindActionCreators} from "redux";
import {addProduct} from "../../store/products/actions";

const mapStateToProps = state => ({
    user: state.userData.user,
});


const mapActionsToProps = (dispatch) => (
    {
        addProduct: bindActionCreators(addProduct, dispatch),
    }
);

export default connect(mapStateToProps, mapActionsToProps)(ProductFabricScreen);
