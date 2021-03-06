import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData } from '../../../store/dataStorage/actions';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

const mapStateToProps = state => ({
  userUpdatedAt: state.userData.user ? state.userData.user.updatedAt : null,
});


const mapActionsToProps = dispatch => ({
  fetchData: bindActionCreators(fetchData, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(AuthLoadingScreen);
