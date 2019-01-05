import { connect } from 'react-redux';
import CalculatorScreen from './../components/CalculatorScreen'

const mapStateToProps = state => ({
    user: state.userData.user,
});


const mapActionsToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapActionsToProps)(CalculatorScreen);
