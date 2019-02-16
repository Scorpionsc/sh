import { connect } from 'react-redux';
import MenusScreen from "../components/MenusScreen";

const mapStateToProps = state => ({
  user: state.userData.user,
});


const mapActionsToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapActionsToProps)(MenusScreen);
