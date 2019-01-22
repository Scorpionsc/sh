import { connect } from 'react-redux';
import MoreScreen from "../components/MoreScreen";

const mapStateToProps = state => ({
    user: state.userData.user,
});

export default connect(mapStateToProps)(MoreScreen);
