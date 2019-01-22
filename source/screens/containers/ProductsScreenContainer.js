import { connect } from 'react-redux';
import ProductsScreen from "../components/ProductsScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
});


const mapActionsToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapActionsToProps)(ProductsScreen);
