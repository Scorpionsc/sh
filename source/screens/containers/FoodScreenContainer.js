import { connect } from 'react-redux';
import FoodScreen from "../components/FoodScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
});


const mapActionsToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapActionsToProps)(FoodScreen);
