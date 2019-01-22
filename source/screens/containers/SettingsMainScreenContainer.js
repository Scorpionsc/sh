import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setJustRegister } from '../../user/actions';
import SettingsMainScreen from "../components/SettingsMainScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
});

const mapActionsToProps = dispatch => (
    {
        setUser: bindActionCreators( setUser, dispatch ),
    }
);

export default connect(mapStateToProps, mapActionsToProps)(SettingsMainScreen);
