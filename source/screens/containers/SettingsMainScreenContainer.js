import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, fetchUsers } from '../../user/actions';
import SettingsMainScreen from "../components/SettingsMainScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
    users: state.userData.users,
    usersLoading: state.userData.usersLoading,
});

const mapActionsToProps = dispatch => (
    {
        fetchUsers: bindActionCreators( fetchUsers, dispatch ),
        setUser: bindActionCreators( setUser, dispatch ),
    }
);

export default connect(mapStateToProps, mapActionsToProps)(SettingsMainScreen);
