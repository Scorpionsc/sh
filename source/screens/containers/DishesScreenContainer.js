import { connect } from 'react-redux';
import DishesScreen from "../components/DishesScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
});


const mapActionsToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapActionsToProps)(DishesScreen);
