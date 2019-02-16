import { connect } from 'react-redux';
import FoodScreen from '../components/FoodScreen';

const mapStateToProps = state => ({
  user: state.userData.user,
});

export default connect(mapStateToProps)(FoodScreen);
