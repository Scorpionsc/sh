import { connect } from 'react-redux';
import ProductFabricScreen from "../components/ProductFabricScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
});


const mapActionsToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapActionsToProps)(ProductFabricScreen);
