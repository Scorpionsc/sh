import { connect } from 'react-redux';
import HomeScreen from '../components/HomeScreen';

const mapStateToProps = state => ({
  user: state.userData.user,
});

export default connect(mapStateToProps)(HomeScreen);
