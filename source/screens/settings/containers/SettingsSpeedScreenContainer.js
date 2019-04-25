import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSpeed } from '../store/actions';
import SettingsSpeedScreen from '../components/SettingsSpeedScreen';

const mapStateToProps = state => ({
  speed: state.speedData.speed.common,
});

const mapActionsToProps = dispatch => (
  {
    updateSpeed: bindActionCreators(updateSpeed, dispatch),
  }
);

export default connect(mapStateToProps, mapActionsToProps)(SettingsSpeedScreen);
