import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, fetchUsers } from '../../store/user/actions';
import SettingsMainScreen from '../components/SettingsMainScreen';

const mapStateToProps = state => ({
  speed: state.speed.settings,
});

const mapActionsToProps = dispatch => (
  {
    setNewSpeed: bindActionCreators(fetchUsers, dispatch),
  }
);

export default connect(mapStateToProps, mapActionsToProps)(SettingsMainScreen);
