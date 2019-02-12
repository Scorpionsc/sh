import { connect } from 'react-redux';
import DishFabricScreen from "../components/DishFabricScreen";
import {bindActionCreators} from "redux";
import {addDish} from "../../store/dishes/actions";

const mapStateToProps = () => ({});


const mapActionsToProps = (dispatch) => (
    {
        addDish: bindActionCreators(addDish, dispatch),
    }
);

export default connect(mapStateToProps, mapActionsToProps)(DishFabricScreen);
